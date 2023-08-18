import { FC } from "react";
import { Bomb } from "#/store/game";

const Bomb: FC<{ bomb: Bomb }> = ({ bomb }) => {
  console.log("bomb", bomb);
  return (
    <>
      {bomb.damagedCells === null ? (
        <rect x={bomb.x} y={bomb.y} width={1} height={1} fill="red" />
      ) : (
        <DamagedCells damagedCells={bomb.damagedCells} />
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
        />
      ))}
    </>
  );
};

export default Bomb;
