import { FC } from "react";
import { Player } from "#/store/game";
import useHeroColor from "#/hooks/heroes.ts";
import { useIsUserConnected } from "#/hooks/users.ts";

const Player: FC<{ player: Player }> = ({ player }) => {
  const color = useHeroColor(player.name);

  const isConnected = useIsUserConnected(player.name);
  if (!isConnected) return null;

  return <rect x={player.x} y={player.y} width={1} height={1} fill={color} />;
};

export default Player;
