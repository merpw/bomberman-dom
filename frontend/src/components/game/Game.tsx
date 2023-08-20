import { FC } from "react";
import { useAppSelector } from "#/store/hooks.ts";
import Cell from "#/components/game/Cell.tsx";
import Player from "#/components/game/Player.tsx";
import Controls from "#/components/game/Controls.tsx";
import Bomb from "#/components/game/Bomb.tsx";
import Lives from "#/components/game/Lives.tsx";
import Secret from "#/components/game/Secret.tsx";

const Game: FC = () => {
  const mapWidth = useAppSelector((state) => state.game.map?.length);
  const mapHeight = useAppSelector((state) => state.game.map?.[0]?.length);

  const isDead = useAppSelector((state) => {
    const username = state.users.username;
    const player = state.game.players?.find(
      (player) => player.name === username
    );
    return player ? player.lives <= 0 : undefined;
  });

  if (mapWidth === undefined || mapHeight === undefined) {
    return null;
  }

  return (
    <div className={"h-full w-full flex flex-col bg-base-300"}>
      <Lives />

      <svg
        width={"100%"}
        height={"100%"}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className={"m-auto"}
      >
        <Field />
        {!isDead && <Controls />}
      </svg>
    </div>
  );
};

const Field: FC = () => {
  return (
    <g>
      <Map />
      <Secrets />
      <Players />
      <Bombs />
    </g>
  );
};

const Map = () => {
  const map = useAppSelector((state) => state.game.map);

  return (
    <g>
      {map?.map((row, y) => (
        <g key={y}>
          {row.map((cell, key) => (
            <Cell key={key} cell={cell} />
          ))}
        </g>
      ))}
    </g>
  );
};

const Players = () => {
  const players = useAppSelector((state) => state.game.players);

  return (
    <g>
      {players?.map((player) => (
        <Player key={player.name} player={player} />
      ))}
    </g>
  );
};

const Bombs = () => {
  const bombs = useAppSelector((state) => state.game.bombs);

  return (
    <g>
      {bombs?.map((bomb, key) => (
        <Bomb bomb={bomb} key={key} />
      ))}
    </g>
  );
};

const Secrets = () => {
  const secrets = useAppSelector((state) => state.game.secrets);

  return (
    <g>
      {secrets?.map((secret, key) => (
        <Secret secret={secret} key={key} />
      ))}
    </g>
  );
};

export default Game;
