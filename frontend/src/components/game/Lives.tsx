import { useAppSelector } from "#/store/hooks.ts";
import { FC } from "react";
import { Player } from "#/store/game";
import useHeroColor from "#/hooks/heroes.ts";
import { useIsUserConnected } from "#/hooks/users.ts";

const Lives = () => {
  const players = useAppSelector((state) => state.game.players);

  return (
    <div className={"flex gap-2 mx-auto bg-base-100 px-5 py-3 rounded-b-xl"}>
      {players?.map((player, key) => (
        <LifeCard key={key} player={player} />
      ))}
    </div>
  );
};

const LifeCard: FC<{ player: Player }> = ({ player }) => {
  const color = useHeroColor(player.name);

  const isConnected = useIsUserConnected(player.name);
  if (!isConnected) return null;

  const isDead = player.lives <= 0;

  return (
    <span>
      <span style={{ color }}>{player.name}: </span>
      {isDead ? (
        <span className={"text-red-500"}>💀</span>
      ) : (
        <span>{player.lives}❤️</span>
      )}
    </span>
  );
};

export default Lives;
