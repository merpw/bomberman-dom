import { navigate } from "vite-plugin-ssr/client/router";
import { useSetUsername, useUsername } from "#/helpers/name.ts";
import wsActions from "#/store/ws/actions.ts";
import { useAppDispatch } from "#/store/hooks.ts";

const UserInfo = () => {
  const username = useUsername();
  const setUsername = useSetUsername();

  const dispatch = useAppDispatch();

  return (
    <div
      className={"flex justify-between items-center bg-base-300 p-2 rounded-t"}
    >
      <h1 className={"text-xl"}>{username}</h1>
      <button
        className={"btn btn-sm btn-ghost opacity-70 hover:opacity-100"}
        onClick={() => {
          setUsername(null);
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
