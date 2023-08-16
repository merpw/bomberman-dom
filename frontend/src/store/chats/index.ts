import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketMessage, WSHandler } from "#/store/ws/handlers.ts";
import { sendWSMessage } from "#/store/ws/actions.ts";

export type ChatMessage = {
  username: string;
  content: string;
};

const initialState: {
  messages: ChatMessage[];
} = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    handleChatMessage: {
      reducer: (state, action: PayloadAction<ChatMessage>) => {
        state.messages.push(action.payload);
      },
      prepare: (message: WebSocketMessage<"chat/message", ChatMessage>) => ({
        payload: message.item,
      }),
    },
  },
});

export const chatActions = chatSlice.actions;

export const chatHandlers: WSHandler[] = [
  {
    type: "chat/message",
    handler: chatActions.handleChatMessage,
  },
];

export const sendChatMessage = (content: string) =>
  sendWSMessage({
    type: "chat/message",
    item: {
      content,
    },
  });

export default chatSlice.reducer;
