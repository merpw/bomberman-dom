import one_up from "./1_up.svg";

import three_up from "./3_up.svg";
import three_down from "./3_down.svg";
import three_left from "./3_left.svg";
import three_right from "./3_right.svg";

type PlayerAssets = {
  up: string;
  down: string;
  left: string;
  right: string;
};

const PlayerAssets: PlayerAssets[] = [
  {
    up: one_up,
    down: one_up,
    left: one_up,
    right: one_up,
  },
  {
    up: one_up,
    down: one_up,
    left: one_up,
    right: one_up,
  },
  {
    up: three_up,
    down: three_down,
    left: three_left,
    right: three_right,
  },
];
export default PlayerAssets;
