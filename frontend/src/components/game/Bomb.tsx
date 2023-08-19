import { FC } from "react";
import { Bomb } from "#/store/game";
import { DamagedCellAsset } from "#/components/game/assets/bombs";

const Bomb: FC<{ bomb: Bomb }> = ({ bomb }) => {
  console.log("bomb", bomb);
  return (
    <>
      {bomb.damagedCells ? (
        <DamagedCells damagedCells={bomb.damagedCells} />
      ) : (
        <rect x={bomb.x} y={bomb.y} width={1} height={1} fill="red" />
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
