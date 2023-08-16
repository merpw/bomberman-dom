import { useEffect, useState } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { getName } from "#/helpers/getName.ts";

const UserInfo = () => {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    setUsername(getName() || undefined);
  }, []);

  return (
    <div className={"flex justify-between"}>
      <h1>Username: {username}</h1>
      <button
        onClick={() => {
          localStorage.removeItem("name");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
