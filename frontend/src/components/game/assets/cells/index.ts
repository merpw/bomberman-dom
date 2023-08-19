import { CellType } from "#/store/game";
import Empty from "./Empty.svg";
import Block from "./Block.svg";
import Wall from "./Wall.svg";

const CellAssets: Record<CellType, string> = {
  "0": Empty,
  "1": Block,
  "2": Wall,
};

export default CellAssets;
