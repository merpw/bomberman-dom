import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketMessage, WSHandler } from "#/store/ws/handlers.ts";

export type GameState =
  | "alone"
  | "waiting"
  | "starting"
  | "playing"
  | "finished"
  | null;

const initialState: {
  state: GameState;
  countdown: number | null;
} = {
  state: null,
  countdown: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    handleUpdateState: {
      reducer: (
        state,
        action: PayloadAction<{ state: GameState; countdown: number | null }>
      ) => {
        state.state = action.payload.state;
        state.countdown = action.payload.countdown;
      },
      prepare: (
        message: WebSocketMessage<
          "game/updateState",
          {
            state: GameState;
            countdown: number | null;
          }
        >
      ) => ({
        payload: message.item,
      }),
    },
  },
});

export const gameActions = gameSlice.actions;

export const gameHandlers: WSHandler[] = [
  {
    type: "game/updateState",
    handler: gameActions.handleUpdateState,
  },
];

export default gameSlice.reducer;
