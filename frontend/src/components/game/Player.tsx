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
      x={player.x + 0.05}
      y={player.y + 0.07}
      width={0.9}
      height={0.9}
    />
  );
};

export default Player;
