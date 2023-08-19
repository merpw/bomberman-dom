import { useAppSelector } from "#/store/hooks.ts";
import { FC } from "react";
import useHeroColor from "#/hooks/heroes.ts";
import CountDown from "#/components/CountDown.tsx";
import PlayerAssets from "#/components/game/assets/players";

const Lobby = () => {
  const users = useAppSelector((state) => state.users.users);
  const state = useAppSelector((state) => state.game.state);
  const emptySpots = users.filter((user) => user === "").length;

  return (
    <div className={"flex flex-col items-center mt-20 mr-10"}>
      <h1 className={"text-2xl"}>Lobby</h1>
      <p>Game state: {state}</p>
      <CountDown className={"font-mono text-6xl"} />
      {users.length && (
        <p>
          {users.length - emptySpots} of {users.length} players joined
        </p>
      )}
      <div className={"grid grid-cols-2 gap-2 md:grid-cols-4 min-w-[70%]"}>
        {users.map((user, key) => (
          <UserCard user={user} userNumber={key} key={key} />
        ))}
      </div>
    </div>
  );
};

const UserCard: FC<{ user: string; userNumber: number }> = ({
  user,
  userNumber,
}) => {
  const color = useHeroColor(user);

  const playerAssets = PlayerAssets[userNumber] || null;
  const asset = playerAssets?.down ?? null;

  return (
    <div
      className={
        "p-5 w-full rounded max-w-full flex flex-col items-center justify-center" +
        " " +
        (user === "" ? "bg-base-200 opacity-70" : "bg-base-100")
      }
      style={{ color }}
    >
      {user ? (
        <>
          <img src={asset} alt={`Image of ${user}`} className={"h-[90%]"} />
          <p className={"mt-2"}>{user}</p>
        </>
      ) : (
        "Empty"
      )}
    </div>
  );
};

export default Lobby;
