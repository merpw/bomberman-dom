import { FC, ReactNode, useEffect } from "react";
import Chat from "#/components/Chat.tsx";
import UserInfo from "#/components/UserInfo.tsx";
import GlobalLayout from "#/layouts/Global.tsx";

const GameLayout: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    window.onbeforeunload = () => {
      return "Are you sure you want to leave?";
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <GlobalLayout>
      <main className={"grow"}>{children}</main>
      <aside className={"bg-base-100 rounded w-72"}>
        <UserInfo />
        <Chat />
      </aside>
    </GlobalLayout>
  );
};

export default GameLayout;
