import { Middleware } from "redux";

import { RootState } from "#/store/store";
import { wsConnectionActions } from "#/store/ws/connection";
import wsActions, { sendWSMessage } from "#/store/ws/actions";
import wsHandlers, { WebSocketMessage } from "#/store/ws/handlers.ts";

const wsConnectionMiddleware: Middleware = (store) => {
  let ws: WebSocket;

  return (next) => (action) => {
    if (Object.values(wsConnectionActions).find((a) => a.match(action))) {
      // ignore wsConnection actions
      return next(action);
    }

    if (wsActions.close.match(action)) {
      console.log("ws closed");
      ws.close();
      store.dispatch(wsConnectionActions.connectionClosed());
      return next(action);
    }

    const state = store.getState() as RootState;

    if (wsActions.connect.match(action)) {
      if (state.wsConnection.status !== "disconnected") {
        // already connected or connecting
        return next(action);
      }
      const username = action.payload.username;

      store.dispatch(wsConnectionActions.connectionStarted());

      ws = new WebSocket(
        `${location.protocol.replace("http", "ws")}//${location.host}/ws`
      );
      ws.onopen = () => {
        console.log("ws connected");
        store.dispatch(wsConnectionActions.connectionEstablished());

        store.dispatch(
          sendWSMessage({
            type: "join",
            item: {
              username,
            },
          })
        );
      };
      ws.onclose = () => {
        console.log("ws disconnected");
        store.dispatch(wsConnectionActions.connectionClosed());
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WebSocketMessage<never, never>;

          if (data.type === "error") {
            console.error("ws error", data);
            const message = data.item as string;
            store.dispatch(wsConnectionActions.setConnectionError(message));
            return;
          }

          const { handler } =
            wsHandlers.find(({ type }) => type === data.type) || {};

          if (!handler) {
            console.error("unhandled ws message", data);
            return;
          }

          store.dispatch(handler(data));
        } catch (e) {
          console.error("ws error", e);
        }
      };
    }

    if (wsActions.sendRaw.match(action)) {
      if (state.wsConnection.status === "connecting") {
        // not connected yet, retry later
        setTimeout(() => {
          store.dispatch(action);
        }, 100);
        return next(action);
      }

      ws.send(JSON.stringify(action.payload));
    }

    return next(action);
  };
};

export default wsConnectionMiddleware;
