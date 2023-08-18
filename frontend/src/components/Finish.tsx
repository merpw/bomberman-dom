import { useAppSelector } from "#/store/hooks.ts";
import useHeroColor from "#/hooks/heroes.ts";

const Finish = () => {
  const onlinePlayers = useAppSelector((state) => {
    const users = state.users.users;
    return state.game.players?.filter((player) => users.includes(player.name));
  });

  const winner = onlinePlayers?.find((player) => player.lives > 0);

  const color = useHeroColor(winner?.name || "");

  if (!onlinePlayers || !winner) return null;

  return (
    <div className={"flex flex-col items-center justify-center h-full"}>
      <h1 className={"text-4xl"}>
        <span style={{ color }}>{winner.name} </span>
        won!
      </h1>
    </div>
  );
};

export default Finish;
