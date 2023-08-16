import { FC, ReactNode } from "react";
import Chat from "#/components/Chat.tsx";
import { Provider } from "react-redux";
import store from "#/store/store.ts";

const GameLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={"container mx-auto flex h-full"}>
      <Provider store={store}>
        <main className={"grow h-full"}>{children}</main>
        <aside>
          <Chat />
        </aside>
      </Provider>
    </div>
  );
};

export default GameLayout;
