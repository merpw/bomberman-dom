import { FC, ReactNode } from "react";
import store from "#/store/store.ts";
import { Provider } from "react-redux";

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className={
        "container mx-auto h-screen flex flex-col md:flex-row p-10 bg-base-300"
      }
    >
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default GlobalLayout;
