import { createAction } from "@reduxjs/toolkit";
import { WebSocketMessage } from "#/store/ws/handlers.ts";

const sendRaw = createAction<WebSocketMessage<never, never>>("ws/send");

export const sendWSMessage = <Type extends string, Item>(
  message: WebSocketMessage<Type, Item>
) => sendRaw(message as never);

const close = createAction("ws/close");

const connect = createAction<{ username: string }>("ws/connect");

const sendChatMessage = (content: string) =>
  sendWSMessage({
    type: "chat/message",
    item: {
      content,
    },
  });

export type MoveDirection = "up" | "down" | "left" | "right";

const sendPlayerMove = (direction: MoveDirection) =>
  sendWSMessage({
    type: "game/playerMove",
    item: {
      direction,
    },
  });

export const sendPlayerPlaceBomb = () =>
  sendWSMessage({
    type: "game/playerPlaceBomb",
    item: undefined,
  });

const send = {
  chatMessage: sendChatMessage,
  playerMove: sendPlayerMove,
  playerPlaceBomb: sendPlayerPlaceBomb,
};

const wsActions = {
  send,
  sendRaw,
  close,
  connect,
};

export default wsActions;
