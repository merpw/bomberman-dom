import { FC, ReactNode } from "react";

const GameLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={"container mx-auto flex h-full"}>
      <main className={"grow h-full"}>{children}</main>
      <aside>
        <h1>Bar</h1>
      </aside>
    </div>
  );
};

export default GameLayout;
