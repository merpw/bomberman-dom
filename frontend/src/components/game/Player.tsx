import { FC } from "react";
import { Player } from "#/store/game";
import useHeroColor from "#/components/game/heroes.ts";

const Player: FC<{ player: Player }> = ({ player }) => {
  const color = useHeroColor(player.name);
  return <rect x={player.x} y={player.y} width={1} height={1} fill={color} />;
};

export default Player;
