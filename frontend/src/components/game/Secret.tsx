import { FC } from "react";
import { Secret } from "#/store/game";

const Secret: FC<{ secret: Secret }> = ({ secret }) => {
  return (
    <text
      x={secret.x + 0.5}
      y={secret.y + 0.5}
      fill="red"
      fontSize="0.3"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {secret.type}
    </text>
  );
};

export default Secret;
