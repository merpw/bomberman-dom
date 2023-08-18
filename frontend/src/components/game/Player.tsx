import { FC } from "react";
import { Player } from "#/store/game";
import useHeroColor from "#/hooks/heroes.ts";
import { useIsUserConnected } from "#/hooks/users.ts";

const Player: FC<{ player: Player }> = ({ player }) => {
  const color = useHeroColor(player.name);

  const isConnected = useIsUserConnected(player.name);
  if (!isConnected) return null;

  return (
    <>
      <rect
        className={"transition-all"}
        x={player.x}
        y={player.y}
        width={1}
        height={1}
        fill={color}
      />
      <text
        className={"transition-all"}
        x={player.x + 0.5}
        y={player.y + 0.5}
        fill={"black"}
        textAnchor={"middle"}
        dominantBaseline={"middle"}
        fontSize={0.5}
      >
        {player.direction === "up"
          ? "/\\"
          : player.direction === "down"
          ? "\\/"
          : player.direction === "left"
          ? "<"
          : player.direction === "right"
          ? ">"
          : null}
      </text>
    </>
  );
};

export default Player;
