import { FC } from "react";
import { Cell } from "#/store/game";
import CellAssets from "#/components/game/assets/cells";

const Cell: FC<{ cell: Cell }> = ({ cell }) => {
  const asset = CellAssets[cell.type];
  const emptyAsset = CellAssets[0];

  return (
    <>
      <image
        href={emptyAsset}
        width={1}
        height={1}
        x={cell.x}
        y={cell.y}
        className={"brightness-50"}
      />
      {asset !== emptyAsset && (
        <image
          className={"brightness-90"}
          href={asset}
          width={0.8}
          height={0.8}
          x={cell.x + 0.1}
          y={cell.y + 0.2}
          stroke="black"
          strokeWidth={0.05}
        />
      )}
    </>
  );
};

export default Cell;
