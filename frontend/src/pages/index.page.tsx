import { DocumentProps } from "#/renderer/types.ts";
import { useEffect, useState } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import NameForm from "#/components/NameForm.tsx";

import GlobalLayout from "#/layouts/Global.tsx";

export const Layout = GlobalLayout;

export const Page = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    if (name) {
      navigate("/game");
    }
  }, [name]);

  return <NameForm />;
};

export const documentProps: DocumentProps = {
  title: "Home",
};
