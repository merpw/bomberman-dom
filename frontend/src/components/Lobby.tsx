import { useAppSelector } from "#/store/hooks.ts";
import { FC } from "react";
import useHeroColor from "#/components/game/heroes.ts";

const Lobby = () => {
  const users = useAppSelector((state) => state.users.users);
  const state = useAppSelector((state) => state.game.state);
  const emptySpots = users.filter((user) => user === "").length;

  return (
    <div className={"mx-auto"}>
      <h1>Lobby</h1>
      <p>Game state: {state}</p>
      <CountDown />
      {users.length && (
        <p>
          {users.length - emptySpots} of {users.length} players joined
        </p>
      )}
      <div className={"flex gap-2"}>
        {users.map((user, key) => (
          <UserCard user={user} key={key} />
        ))}
      </div>
    </div>
  );
};

const UserCard: FC<{ user: string }> = ({ user }) => {
  const color = useHeroColor(user);
  if (user === "")
    return <div className={"bg-base-200 p-5 rounded"}>Empty spot</div>;

  return (
    <div
      className={"bg-base-200 p-5 text-info rounded"}
      style={{
        color,
      }}
    >
      {user}
    </div>
  );
};

const CountDown = () => {
  const countdown = useAppSelector((state) => state.game.countdown);

  if (countdown === null) return null;

  return (
    <span className="countdown font-mono text-6xl">
      <span style={{ "--value": countdown / 1000 } as never}></span>
    </span>
  );
};

export default Lobby;
