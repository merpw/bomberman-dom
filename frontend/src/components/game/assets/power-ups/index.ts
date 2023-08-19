import { PowerUp } from "#/store/game";
import bombCountAsset from "./BombCount.svg";
import bombPowerAsset from "./BombPower.svg";
import speedAsset from "./Speed.svg";
import lifeAsset from "./Life.svg";

const PowerUpAssets: Record<PowerUp, string> = {
  bombCount: bombCountAsset,
  bombPower: bombPowerAsset,
  speed: speedAsset,
  life: lifeAsset,
};

export default PowerUpAssets;
