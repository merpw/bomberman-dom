import { FC, ReactNode } from "react";
import store from "#/store/store.ts";
import { Provider } from "react-redux";

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className={"container mx-auto flex h-full py-10"}>
      <Provider store={store}>{children}</Provider>
    </main>
  );
};

export default GlobalLayout;
