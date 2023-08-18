import { FC, useEffect, useRef } from "react";
import { useAppDispatch } from "#/store/hooks.ts";
import wsActions, { MoveDirection } from "#/store/ws/actions.ts";

// TODO: maybe use debounce to reduce amount of messages

const KeysInterval = 75;

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

type KeyState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

const getDirection = (keyState: KeyState): MoveDirection | null => {
  if (keyState.up && !keyState.down) return "up";
  if (keyState.down && !keyState.up) return "down";
  if (keyState.left && !keyState.right) return "left";
  if (keyState.right && !keyState.left) return "right";

  return null;
};

const ActionKeys: Record<string, string> = {
  " ": "placeBomb",
} as const;

const Controls: FC = () => {
  const dispatch = useAppDispatch();

  const keyState = useRef<KeyState>({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    const direction = getDirection(keyState.current);
    if (direction) {
      dispatch(wsActions.send.playerMove(direction));
    }
    interval.current = setInterval(() => {
      const direction = getDirection(keyState.current);
      if (direction) {
        dispatch(wsActions.send.playerMove(direction));
      }
    }, KeysInterval) as never;
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).tagName === "INPUT") {
        return;
      }

      if (event.repeat) return;

      const newDirection = MoveKeys[event.key];
      if (newDirection) {
        keyState.current[newDirection] = true;
        return;
      }

      const newAction = ActionKeys[event.key];
      if (newAction === "placeBomb") {
        dispatch(wsActions.send.playerPlaceBomb());
        return;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).tagName === "INPUT") {
        return;
      }

      const newDirection = MoveKeys[event.key];
      if (newDirection) {
        keyState.current[newDirection] = false;
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch, keyState]);

  return null;
};

export default Controls;
