import { FC, FormEventHandler, useState } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { getGameStatus } from "#/api/game-status.ts";

const NameForm: FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const inputName = new FormData(e.currentTarget).get("name") as string;
    if (!inputName) {
      return;
    }
    localStorage.setItem("name", inputName.toString());

    try {
      const gameStatus = await getGameStatus();
      console.log(gameStatus);
      if (gameStatus.gameState !== "waiting") {
        setError("Game is already started");
        return;
      }

      if (gameStatus?.users.includes(inputName)) {
        setError("This username is already taken");
        return;
      }
    } catch (e) {
      setError(e as string);
      return;
    }

    navigate("/game");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Choose your name</h1>
      <input type="text" name={"name"} placeholder="Enter your name" required />
    </form>
  );
};

export default NameForm;
