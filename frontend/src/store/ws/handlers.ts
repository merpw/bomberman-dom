import { chatHandlers } from "#/store/chats";
import { AnyAction } from "@reduxjs/toolkit";
import { usersHandlers } from "#/store/users.ts";
import { gameHandlers } from "#/store/game";

export type WebSocketMessage<Type extends string, Item> = {
  type: Type;
  item: Item;
};

export type WSHandler = {
  type: string;
  handler: (message: WebSocketMessage<never, never>) => AnyAction;
};

const wsHandlers: WSHandler[] = [
  ...chatHandlers,
  ...usersHandlers,
  ...gameHandlers,
];

export default wsHandlers;
