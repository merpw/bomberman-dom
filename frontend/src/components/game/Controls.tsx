import { FC, useEffect } from "react";
import { useAppDispatch } from "#/store/hooks.ts";
import wsActions, { MoveDirection } from "#/store/ws/actions.ts";

// TODO: maybe use debounce to reduce amount of messages

const Keys: Record<string, MoveDirection> = {
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

const Controls: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).tagName === "INPUT") {
        return;
      }
      const newDirection = Keys[event.key];
      if (newDirection) {
        dispatch(wsActions.send.playerMove(newDirection));
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
