import { useAppSelector } from "#/store/hooks.ts";
import { FC } from "react";
import { Player, PowerUp } from "#/store/game";
import useHeroColor from "#/hooks/heroes.ts";
import { useIsUserConnected } from "#/hooks/users.ts";
import { useUsername } from "#/hooks/username.ts";
import PowerUpAssets from "#/components/game/assets/power-ups";

const Lives = () => {
  const players = useAppSelector((state) => state.game.players);

  const meName = useUsername();

  const me = players?.find((player) => player.name === meName);

  const otherPlayers = players?.filter((player) => player.name !== meName);

  return (
    <div className={"flex gap-2 mx-auto bg-base-100 px-5 py-3 rounded-b-xl"}>
      {otherPlayers?.map((player, key) => (
        <LifeCard key={key} player={player} />
      ))}
      <span className={"border"} />
      {me && (
        <div className={"flex gap-3"}>
          <LifeCard player={me} />
          {me.powerUp && <PowerUpStatus powerUp={me.powerUp} />}
        </div>
      )}
    </div>
  );
};

const LifeCard: FC<{ player: Player }> = ({ player }) => {
  const color = useHeroColor(player.name);

  const isConnected = useIsUserConnected(player.name);
  if (!isConnected) return null;

  const isDead = player.lives <= 0;

  return (
    <span>
      <span style={{ color }}>{player.name}: </span>
      {isDead ? (
        <span className={"text-red-500"}>💀</span>
      ) : (
        <span>{player.lives}❤️</span>
      )}
    </span>
  );
};

const powerUpText: Record<PowerUp, string> = {
  bombCount: "+1💣",
  bombPower: "+1📏",
  speed: "x1.5🏃",
  life: "+1❤️",
};

const PowerUpStatus: FC<{ powerUp: PowerUp }> = ({ powerUp }) => {
  const asset = PowerUpAssets[powerUp];

  return (
    <span className={"flex"}>
      <img src={asset} alt={`power up ${powerUp}`} className={"w-5"} />
      <span className={"w"}>{powerUpText[powerUp]}</span>
    </span>
  );
};

export default Lives;
