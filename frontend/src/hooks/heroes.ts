// TODO: improve colors
import { useAppSelector } from "#/store/hooks.ts";

export const HeroColors = ["#ee6666", "#016701", "#0000FF", "#949400"];

const useHeroColor = (username: string) => {
  const users = useAppSelector((state) => state.users.users);
  const index = username ? users.indexOf(username) : -1;
  return HeroColors[index];
};

export default useHeroColor;
