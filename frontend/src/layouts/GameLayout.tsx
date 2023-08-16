import { FC, ReactNode, useEffect } from "react";
import Chat from "#/components/Chat.tsx";
import { Provider } from "react-redux";
import store from "#/store/store.ts";
import UserInfo from "#/components/UserInfo.tsx";

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
    <div className={"container mx-auto flex h-full py-10"}>
      <Provider store={store}>
        <main className={"grow"}>{children}</main>
        <aside className={"bg-base-100 rounded w-72"}>
          <UserInfo />
          <Chat />
        </aside>
      </Provider>
    </div>
  );
};

export default GameLayout;
