import { FC } from "react";
import { Secret } from "#/store/game";
import PowerUpAssets from "#/components/game/assets/power-ups";

const Secret: FC<{ secret: Secret }> = ({ secret }) => {
  const asset = PowerUpAssets[secret.type];

  return (
    <image href={asset} x={secret.x + 0.2} y={secret.y + 0.2} width={0.6} />
  );
};

export default Secret;
