import { FC } from "react";
import { Bomb } from "#/store/game";
import { BombAsset, DamagedCellAsset } from "#/components/game/assets/bombs";

const Bomb: FC<{ bomb: Bomb }> = ({ bomb }) => {
  const asset = BombAsset;

  return (
    <>
      {bomb.damagedCells ? (
        <DamagedCells damagedCells={bomb.damagedCells} />
      ) : (
        <image
          href={asset}
          width={0.8}
          height={0.8}
          x={bomb.x + 0.1}
          y={bomb.y + 0.1}
        />
      )}
    </>
  );
};

const DamagedCells: FC<{ damagedCells: { x: number; y: number }[] }> = ({
  damagedCells,
}) => {
  return (
    <>
      {damagedCells.map((cell, key) => (
        <image
          href={DamagedCellAsset}
          key={key}
          x={cell.x}
          y={cell.y}
          width={1}
          height={1}
          opacity={0.7}
        />
      ))}
    </>
  );
};

export default Bomb;
