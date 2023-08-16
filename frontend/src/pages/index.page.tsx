import { DocumentProps } from "#/renderer/types.ts";
import { useEffect } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import NameForm from "#/components/NameForm.tsx";

import GlobalLayout from "#/layouts/Global.tsx";
import { getName } from "#/helpers/getName.ts";

export const Layout = GlobalLayout;

export const Page = () => {
  useEffect(() => {
    const name = getName();
    if (name) {
      navigate("/game");
    }
  }, []);

  return <NameForm />;
};

export const documentProps: DocumentProps = {
  title: "Home",
};
