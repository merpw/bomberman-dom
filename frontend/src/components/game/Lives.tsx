import { useAppSelector } from "#/store/hooks.ts";
import { FC } from "react";
import { Player } from "#/store/game";
import useHeroColor from "#/components/game/heroes.ts";

const Lives = () => {
  const players = useAppSelector((state) => state.game.players);

  return (
    <div className={"flex gap-2 mx-auto"}>
      {players?.map((player, key) => (
        <LifeCard key={key} player={player} />
      ))}
    </div>
  );
};

const LifeCard: FC<{ player: Player }> = ({ player }) => {
  const color = useHeroColor(player.name);
  return (
    <span>
      <span style={{ color }}>{player.name}: </span>
      <span>{player.lives}❤️</span>
    </span>
  );
};

export default Lives;
