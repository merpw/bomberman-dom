import { FC } from "react";
import { useAppSelector } from "#/store/hooks.ts";
import Cell from "#/components/game/Cell.tsx";
import Player from "#/components/game/Player.tsx";
import Controls from "#/components/game/Controls.tsx";

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
  const map = useAppSelector((state) => state.game.map);

  const players = useAppSelector((state) => state.game.players);

  return (
    <g>
      {map?.map((row, y) => (
        <g key={y}>
          {row.map((cell, key) => (
            <Cell key={key} cell={cell} />
          ))}
        </g>
      ))}
      {players?.map((player) => (
        <Player key={player.name} player={player} />
      ))}
    </g>
  );
};

export default Game;
