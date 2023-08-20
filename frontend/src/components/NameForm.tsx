import { FC, FormEventHandler, useState } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { getGameStatus } from "#/api/game-status.ts";
import { useSetUsername } from "#/hooks/username.ts";

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
    <form
      onSubmit={handleSubmit}
      className={"flex flex-col items-center m-auto gap-5"}
    >
      <h1 className={"font-ibm_mono text-5xl text-neutral text-center my-5"}>
        BOMBERMAN-<span className={"text-success"}>BIM!</span>
      </h1>
      <input
        className={
          "z-50 bg-transparent border-b border-neutral text-center focus:outline-none w-72"
        }
        type="text"
        name={"name"}
        minLength={1}
        maxLength={10}
        placeholder="Enter your name"
        required
      />

      <button
        type="submit"
        className={
          "z-50 btn btn-primary text-secondary rounded-none w-36 font-ibm_mono"
        }
      >
        Submit
      </button>
      {error && <p className={"text-error"}>{error}</p>}
    </form>
  );
};

export default NameForm;
