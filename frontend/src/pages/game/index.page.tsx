import { DocumentProps } from "#/renderer/types.ts";

import GameLayout from "#/layouts/GameLayout.tsx";
import { useEffect } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { getName } from "#/helpers/getName.ts";
import Lobby from "#/components/Lobby.tsx";

export const Layout = GameLayout;

export const Page = () => {
  useEffect(() => {
    const name = getName();
    if (!name) {
      navigate("/");
    }
  }, []);
  return <Lobby />;
};

export const documentProps: DocumentProps = {
  // This title and description will override the defaults
  title: "Game",
};
