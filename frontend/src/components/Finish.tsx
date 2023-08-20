import { useAppSelector } from "#/store/hooks.ts";
import useHeroColor from "#/hooks/heroes.ts";
import CountDown from "#/components/CountDown.tsx";
import { useUsername } from "#/hooks/username.ts";

const Finish = () => {
  const onlinePlayers = useAppSelector((state) => {
    const users = state.users.users;
    return state.game.players?.filter((player) => users.includes(player.name));
  });

  const winner = onlinePlayers?.find((player) => player.lives > 0);

  const color = useHeroColor(winner?.name || "");

  const username = useUsername();

  if (!onlinePlayers || !winner) return null;

  return (
    <div className={"flex flex-col items-center justify-center h-full"}>
      <h1 className={"text-[17rem] font-ibm_mono text-success my-11"}>BIM!</h1>
      <p className={"text-lg"}>
        <span style={{ color }}>
          {username === winner.name ? "You" : winner.name}{" "}
        </span>
        won!
      </p>
      <span className={"text-xl mt-3 opacity-60"}>
        Leaving in <CountDown className={"font-mono text-2xl"} />
      </span>
    </div>
  );
};

export default Finish;
