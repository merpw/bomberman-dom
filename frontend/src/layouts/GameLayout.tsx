import { FC, ReactNode, useEffect } from "react";
import Chat from "#/components/Chat.tsx";
import UserInfo from "#/components/UserInfo.tsx";
import GlobalLayout from "#/layouts/Global.tsx";
import { useAppDispatch, useAppSelector } from "#/store/hooks.ts";
import { useUsername } from "#/hooks/username.ts";
import wsActions from "#/store/ws/actions.ts";
import { navigate } from "vite-plugin-ssr/client/router";

const GameLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <GlobalLayout>
      <ConnectionManager />
      <main className={"grow"}>{children}</main>
      <aside className={"bg-base-100 rounded w-72"}>
        <UserInfo />
        <Chat />
      </aside>
    </GlobalLayout>
  );
};

const redirectToHome = () => {
  navigate("/").then(() => window.location.reload());
};

const ConnectionManager = () => {
  const wsConnectionError = useAppSelector((state) => state.wsConnection.error);
  const wsConnectionStatus = useAppSelector(
    (state) => state.wsConnection.status
  );

  const dispatch = useAppDispatch();
  const username = useUsername();

  useEffect(() => {
    if (!username) {
      redirectToHome();
      return;
    }
    dispatch(wsActions.connect({ username }));
  }, [dispatch, username]);

  useEffect(() => {
    if (wsConnectionError) {
      console.error(wsConnectionError);
      if (wsConnectionStatus === "disconnected") {
        redirectToHome();
      }
    }

    if (wsConnectionStatus === "connected") {
      window.onbeforeunload = () => {
        return "Are you sure you want to leave?";
      };

      return () => {
        window.onbeforeunload = null;
      };
    }
  }, [dispatch, username, wsConnectionError, wsConnectionStatus]);

  return null;
};

export default GameLayout;
