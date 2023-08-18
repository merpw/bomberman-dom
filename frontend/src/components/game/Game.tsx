import { FC } from "react";
import { useAppSelector } from "#/store/hooks.ts";
import Cell from "#/components/game/Cell.tsx";
import Player from "#/components/game/Player.tsx";
import Controls from "#/components/game/Controls.tsx";
import Bomb from "#/components/game/Bomb.tsx";
import Lives from "#/components/game/Lives.tsx";

const Game: FC = () => {
  const mapWidth = useAppSelector((state) => state.game.map?.length);
  const mapHeight = useAppSelector((state) => state.game.map?.[0]?.length);

  if (mapWidth === undefined || mapHeight === undefined) {
    return null;
  }

  return (
    <div className={"h-full w-full flex flex-col bg-base-300"}>
      <Lives />

      <svg
        width={500}
        height={500}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className={"m-auto"}
      >
        <Field />
        <Controls />
      </svg>
    </div>
  );
};

const Field: FC = () => {
  return (
    <g>
      <Map />
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

export default Game;
