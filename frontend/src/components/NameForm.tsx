import { FC, FormEventHandler, useState } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { getGameStatus } from "#/api/game-status.ts";
import { useSetUsername } from "#/helpers/name.ts";

const NameForm: FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const setUsername = useSetUsername();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const inputName = new FormData(e.currentTarget).get("name") as string;
    if (!inputName) {
      return;
    }

    try {
      const gameStatus = await getGameStatus();
      console.log(gameStatus);
      if (
        gameStatus.gameState === "playing" ||
        gameStatus.gameState === "starting" ||
        gameStatus.gameState === "finished"
      ) {
        setError("Game is already started");
        return;
      }

      if (gameStatus.users.includes(inputName)) {
        setError("This username is already taken");
        return;
      }

      const isFull = gameStatus.users.findIndex((user) => !user) === -1;
      if (isFull) {
        setError("Game is full");
        return;
      }

      setUsername(inputName);
    } catch (e) {
      setError(e as string);
      return;
    }

    navigate("/game");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Choose your name</h1>
      <input
        className={"input"}
        type="text"
        name={"name"}
        placeholder="Enter your name"
        required
      />

      <button type="submit" className={"btn"}>
        Submit
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default NameForm;
