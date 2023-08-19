import { FC } from "react";
import { Player } from "#/store/game";
import { useIsUserConnected } from "#/hooks/users.ts";
import { useAppSelector } from "#/store/hooks.ts";
import PlayerAssets from "#/components/game/assets/players";

const Player: FC<{ player: Player }> = ({ player }) => {
  const isConnected = useIsUserConnected(player.name);

  const playerNumber = useAppSelector(
    (state) => state.game.players?.indexOf(player) ?? -1
  );

  const playerAssets = PlayerAssets[playerNumber] || null;

  if (!isConnected || !playerAssets) return null;

  const asset = playerAssets[player.direction ?? "down"];

  return (
    <image
      className={"transition-all"}
      href={asset}
      x={player.x}
      y={player.y}
      width={1}
      height={1}
    />
  );
};

export default Player;
