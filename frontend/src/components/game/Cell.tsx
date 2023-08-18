import { FC } from "react";
import { Cell } from "#/store/game";

const Cell: FC<{ cell: Cell }> = ({ cell }) => {
  return (
    <rect
      width={1}
      height={1}
      x={cell.x}
      y={cell.y}
      fill={cell.type === 1 ? "black" : "white"}
      stroke="black"
      strokeWidth={0.05}
    />
  );
};

export default Cell;