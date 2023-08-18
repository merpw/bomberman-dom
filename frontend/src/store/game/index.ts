import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketMessage, WSHandler } from "#/store/ws/handlers.ts";

export type GameState =
  | "empty"
  | "alone"
  | "waiting"
  | "starting"
  | "playing"
  | "finished"
  | undefined;

/** 0 = empty, 1 = wall, 2 = unbreakable wall */
export type CellType = 0 | 1 | 2;

export type Cell = {
  type: CellType;
  x: number;
  y: number;
};

export type PowerUp = "bombCount" | "bombPower" | "speed" | "life";

export type Secret = {
  x: number;
  y: number;
  type: PowerUp;
};

export type Player = {
  name: string;
  lives: number;
  x: number;
  y: number;
  powerUp?: PowerUp;
};

export type Bomb = {
  x: number;
  y: number;
  damagedCells: { x: number; y: number }[] | undefined;
};

const initialState: {
  state: GameState;
  countdown: number | null;
  map?: Cell[][];
  secrets?: Secret[];
  players?: Player[];
  bombs?: Bomb[];
} = {
  state: undefined,
  countdown: null,
  map: undefined,
  secrets: undefined,
  players: undefined,
  bombs: undefined,
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
      reducer: (
        state,
        action: PayloadAction<{ map: CellType[][]; secrets: Secret[] }>
      ) => {
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

        state.secrets = action.payload.secrets;
      },
      prepare: (
        message: WebSocketMessage<
          "game/updateMap",
          {
            map: CellType[][];
            secrets: Secret[];
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

    handleUpdateBombs: {
      reducer: (state, action: PayloadAction<Bomb[]>) => {
        state.bombs = action.payload;
      },
      prepare: (
        message: WebSocketMessage<"game/updateBombs", { bombs: Bomb[] }>
      ) => ({
        payload: message.item.bombs,
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
  {
    type: "game/updateBombs",
    handler: gameActions.handleUpdateBombs,
  },
];

export default gameSlice.reducer;
