import { DocumentProps } from "#/renderer/types.ts";

import GameLayout from "#/layouts/GameLayout.tsx";
import { useEffect } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { useUsername } from "#/helpers/name.ts";
import Lobby from "#/components/Lobby.tsx";
import { useAppSelector } from "#/store/hooks.ts";
import Game from "#/components/game/Game.tsx";

export const Layout = GameLayout;

export const Page = () => {
  const name = useUsername();
  const gameState = useAppSelector((state) => state.game.state);

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name]);

  if (!gameState) return null;

  if (gameState === "playing") {
    return <Game />;
  }

  return <Lobby />;
};

export const documentProps: DocumentProps = {
  // This title and description will override the defaults
  title: "Game",
};
