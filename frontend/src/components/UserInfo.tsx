import { navigate } from "vite-plugin-ssr/client/router";
import { useSetUsername, useUsername } from "#/hooks/username.ts";
import wsActions from "#/store/ws/actions.ts";
import { useAppDispatch } from "#/store/hooks.ts";
import useHeroColor from "#/hooks/heroes.ts";

const UserInfo = () => {
  const username = useUsername();
  const setUsername = useSetUsername();

  const dispatch = useAppDispatch();

  const color = useHeroColor(username || "");

  return (
    <div
      className={"flex justify-between items-center bg-base-300 p-2 rounded-t"}
    >
      <h1 className={"text-xl"} style={{ color }}>
        {username}
      </h1>
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
