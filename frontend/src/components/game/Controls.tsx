import { FC, useEffect } from "react";
import { useAppDispatch } from "#/store/hooks.ts";
import wsActions, { MoveDirection } from "#/store/ws/actions.ts";

// TODO: maybe use debounce to reduce amount of messages

const MoveKeys: Record<string, MoveDirection> = {
  ArrowUp: "up",
  w: "up",
  W: "up",
  ArrowDown: "down",
  s: "down",
  S: "down",
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
};

const ActionKeys: Record<string, string> = {
  " ": "placeBomb",
} as const;

const Controls: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).tagName === "INPUT") {
        return;
      }

      const newDirection = MoveKeys[event.key];
      if (newDirection) {
        dispatch(wsActions.send.playerMove(newDirection));
        return;
      }

      const newAction = ActionKeys[event.key];
      if (newAction === "placeBomb") {
        dispatch(wsActions.send.playerPlaceBomb());
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return null;
};

export default Controls;
