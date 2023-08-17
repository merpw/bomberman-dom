import { GameState } from "#/store/game";

type GameStatus = {
  users: string[];
  gameState: GameState;
};

export const getGameStatus = async () =>
  fetch("/api/status").then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as GameStatus;
  });
