// TODO: improve colors
import { useAppSelector } from "#/store/hooks.ts";

export const HeroColors = ["#008146", "#98f0f6", "#ffa1d2", "#874cc0"];

const useHeroColor = (username: string) => {
  const users = useAppSelector((state) => state.users.users);
  const index = username ? users.indexOf(username) : -1;
  return HeroColors[index];
};

export default useHeroColor;
