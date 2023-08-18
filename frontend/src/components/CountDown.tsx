import { useAppSelector } from "#/store/hooks.ts";
import { FC } from "react";

const CountDown: FC<{ className?: string }> = ({ className }) => {
  const countdown = useAppSelector((state) => state.game.countdown);

  if (countdown === null) return null;

  return (
    <span className={"countdown" + " " + (className || "")}>
      <span style={{ "--value": countdown / 1000 } as never}></span>
    </span>
  );
};

export default CountDown;
