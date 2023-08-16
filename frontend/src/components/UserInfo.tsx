import { useEffect, useState } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { getName } from "#/helpers/getName.ts";
import wsActions from "#/store/ws/actions.ts";
import { useAppDispatch } from "#/store/hooks.ts";

const UserInfo = () => {
  const [username, setUsername] = useState<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setUsername(getName() || undefined);
  }, []);

  return (
    <div
      className={"flex justify-between items-center bg-base-300 p-2 rounded-t"}
    >
      <h1 className={"text-xl"}>{username}</h1>
      <button
        className={"btn btn-sm btn-ghost opacity-70 hover:opacity-100"}
        onClick={() => {
          localStorage.removeItem("name");
          dispatch(wsActions.close());
          navigate("/");
        }}
        title={"Leave the game"}
      >
        Leave
      </button>
    </div>
  );
};

export default UserInfo;
