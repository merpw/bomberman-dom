type GameStatus = {
  users: string[];
  gameState: "waiting" | "playing" | "finished";
};

export const getGameStatus = async () =>
  fetch("/api/status").then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as GameStatus;
  });
