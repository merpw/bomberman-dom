import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketMessage, WSHandler } from "#/store/ws/handlers.ts";

export type GameState =
  | "alone"
  | "waiting"
  | "starting"
  | "playing"
  | "finished"
  | null;

/** 0 = empty, 1 = wall */
export type CellType = 0 | 1;

export type Cell = {
  type: CellType;
  x: number;
  y: number;
};

export type Player = {
  name: string;
  x: number;
  y: number;
};

const initialState: {
  state: GameState;
  countdown: number | null;
  map?: Cell[][];
  players?: Player[];
} = {
  state: null,
  countdown: null,
  map: undefined,
  players: undefined,
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
    handleUpdateMap: {
      reducer: (state, action: PayloadAction<{ map: CellType[][] }>) => {
        const gameMap = action.payload.map;

        state.map = gameMap.map((row, x) => {
          return row.map((cell, y) => {
            return {
              type: cell,
              x,
              y,
            };
          });
        });
      },
      prepare: (
        message: WebSocketMessage<
          "game/updateMap",
          {
            map: CellType[][];
          }
        >
      ) => ({
        payload: message.item,
      }),
    },

    handleUpdatePlayer: {
      reducer: (state, action: PayloadAction<Player>) => {
        const player = action.payload;

        if (!state.players) {
          state.players = [];
        }
        const playerPos = state.players.findIndex(
          (p) => p.name === player.name
        );

        if (playerPos !== -1) {
          state.players[playerPos] = player;
          return;
        }

        state.players.push(player);
      },
      prepare: (message: WebSocketMessage<"game/updatePlayer", Player>) => ({
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
  {
    type: "game/updateMap",
    handler: gameActions.handleUpdateMap,
  },
  {
    type: "game/updatePlayer",
    handler: gameActions.handleUpdatePlayer,
  },
];

export default gameSlice.reducer;
