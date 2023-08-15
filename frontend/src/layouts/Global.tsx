import { FC, ReactNode } from "react";

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <main className={"container mx-auto h-full"}>{children}</main>;
};

export default GlobalLayout;
