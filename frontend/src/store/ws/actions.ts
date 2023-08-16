import { createAction } from "@reduxjs/toolkit";
import { WebSocketMessage } from "#/store/ws/handlers.ts";
import { sendChatMessage } from "#/store/chats";

const sendRaw = createAction<WebSocketMessage<never, never>>("ws/send");

export const sendWSMessage = <Type extends string, Item>(
  message: WebSocketMessage<Type, Item>
) => sendRaw(message as never);

const close = createAction("ws/close");

const connect = createAction<{ username: string }>("ws/connect");

const send = {
  chatMessage: sendChatMessage,
};

const wsActions = {
  send,
  sendRaw,
  close,
  connect,
};

export default wsActions;
