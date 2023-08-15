import { DocumentProps } from "#/renderer/types.ts";

import GameLayout from "#/layouts/GameLayout.tsx";
import Game from "#/components/Game.tsx";

export const Layout = GameLayout;

export const Page = () => {
  return <Game />;
};

export const documentProps: DocumentProps = {
  // This title and description will override the defaults
  title: "Game",
};
