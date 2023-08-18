import { FC } from "react";
import { Bomb } from "#/store/game";

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
        <rect
          key={key}
          x={cell.x}
          y={cell.y}
          width={1}
          height={1}
          fill="pink"
          opacity={0.7}
        />
      ))}
    </>
  );
};

export default Bomb;
