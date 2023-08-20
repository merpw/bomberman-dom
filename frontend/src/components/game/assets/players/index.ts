import one_up from "./1_up.svg";
import one_down from "./1_down.svg";
import one_left from "./1_left.svg";
import one_right from "./1_right.svg";

import two_up from "./2_up.svg";
import two_down from "./2_down.svg";
import two_left from "./2_left.svg";
import two_right from "./2_right.svg";

import three_up from "./3_up.svg";
import three_down from "./3_down.svg";
import three_left from "./3_left.svg";
import three_right from "./3_right.svg";

import four_up from "./4_up.svg";
import four_down from "./4_down.svg";
import four_left from "./4_left.svg";
import four_right from "./4_right.svg";

type PlayerAssets = {
  up: string;
  down: string;
  left: string;
  right: string;
};

const PlayerAssets: PlayerAssets[] = [
  {
    up: one_up,
    down: one_down,
    left: one_left,
    right: one_right,
  },
  {
    up: two_up,
    down: two_down,
    left: two_left,
    right: two_right,
  },
  {
    up: three_up,
    down: three_down,
    left: three_left,
    right: three_right,
  },
  {
    up: four_up,
    down: four_down,
    left: four_left,
    right: four_right,
  },
];
export default PlayerAssets;
