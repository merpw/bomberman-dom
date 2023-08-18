import { useAppSelector } from "#/store/hooks.ts";

export const useIsUserConnected = (user: string): boolean => {
  return useAppSelector((state) => state.users.users.includes(user) || false);
};
