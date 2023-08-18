import { FC } from "react";
import { useAppSelector } from "#/store/hooks.ts";
import Cell from "#/components/game/Cell.tsx";
import Player from "#/components/game/Player.tsx";
import Controls from "#/components/game/Controls.tsx";
import Bomb from "#/components/game/Bomb.tsx";

const Game: FC = () => {
  return (
    <div className={"h-full w-full flex bg-base-300"}>
      <svg width={500} height={500} viewBox={`0 0 10 10`} className={"m-auto"}>
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
