import { chatHandlers } from "#/store/chats";
import { AnyAction } from "@reduxjs/toolkit";

export type WebSocketMessage<Type extends string, Item> = {
  type: Type;
  item: Item;
};

export type WSHandler = {
  type: string;
  handler: (message: WebSocketMessage<never, never>) => AnyAction;
};

const wsHandlers: WSHandler[] = [...chatHandlers];

export default wsHandlers;
