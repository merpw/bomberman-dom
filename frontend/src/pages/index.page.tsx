import { DocumentProps } from "#/renderer/types.ts";
import { useEffect } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import NameForm from "#/components/NameForm.tsx";

import GlobalLayout from "#/layouts/Global.tsx";
import { useUsername } from "#/helpers/name.ts";

export const Layout = GlobalLayout;

export const Page = () => {
  const name = useUsername();
  useEffect(() => {
    if (name) {
      navigate("/game");
    }
  }, [name]);

  return <NameForm />;
};

export const documentProps: DocumentProps = {
  title: "Home",
};
