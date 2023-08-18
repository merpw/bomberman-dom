import { useAppSelector } from "#/store/hooks.ts";
import useHeroColor from "#/components/game/heroes.ts";

const Finish = () => {
  const players = useAppSelector((state) => state.game.players);

  const winner = players?.find((player) => player.lives > 0);

  const color = useHeroColor(winner?.name || "");

  if (!players || !winner) return null;

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
