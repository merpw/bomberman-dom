import { Middleware } from "redux";

import { RootState } from "#/store/store";
import { wsConnectionActions } from "#/store/ws/connection";
import wsActions from "#/store/ws/actions";
import wsHandlers, { WebSocketMessage } from "#/store/ws/handlers.ts";

const wsConnectionMiddleware: Middleware = (store) => {
  let ws: WebSocket;
  let username: string;
  let retryTimeout = 0;

  return (next) => (action) => {
    if (Object.values(wsConnectionActions).find((a) => a.match(action))) {
      // ignore wsConnection actions
      return next(action);
    }

    if (wsActions.close.match(action)) {
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
      username = action.payload.username;

      store.dispatch(wsConnectionActions.connectionStarted());

      ws = new WebSocket(
        `${location.protocol.replace("http", "ws")}//${
          location.host
        }/ws?name=${username}`
      );
      ws.onopen = () => {
        console.log("ws connected");
        store.dispatch(wsConnectionActions.connectionEstablished());
        retryTimeout = 0;
      };
      ws.onclose = () => {
        console.log("ws disconnected");
        setTimeout(() => {
          retryTimeout += 1000;
          store.dispatch(wsConnectionActions.connectionClosed());
          store.dispatch(wsActions.connect({ username }));
        }, retryTimeout);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WebSocketMessage<never, never>;

          if (data.type === "error") {
            console.error("ws error", data);
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

      return next(action);
    }

    if (state.wsConnection.status === "disconnected") {
      store.dispatch(wsActions.connect({ username }));
    }

    if (wsActions.sendRaw.match(action)) {
      if (state.wsConnection.status !== "connected") {
        // not connected yet, retry later
        setTimeout(() => {
          store.dispatch(action);
        }, retryTimeout + 100);

        return next(action);
      }

      ws.send(JSON.stringify(action.payload));
    }

    return next(action);
  };
};

export default wsConnectionMiddleware;
