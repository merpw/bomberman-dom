import { DocumentProps } from "#/renderer/types.ts";

import GameLayout from "#/layouts/GameLayout.tsx";
import Lobby from "#/components/Lobby.tsx";
import { useAppSelector } from "#/store/hooks.ts";
import Game from "#/components/game/Game.tsx";
import Finish from "#/components/Finish.tsx";

export const Layout = GameLayout;

export const Page = () => {
  const gameState = useAppSelector((state) => state.game.state);

  if (!gameState) return null;

  if (gameState === "playing") {
    return <Game />;
  }

  if (gameState === "finished") {
    return <Finish />;
  }

  if (gameState === "empty") return null;

  return <Lobby />;
};

export const documentProps: DocumentProps = {
  // This title and description will override the defaults
  title: "Game",
};
