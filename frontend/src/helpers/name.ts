import { useAppDispatch, useAppSelector } from "#/store/hooks.ts";
import { usersActions } from "#/store/users.ts";

export const useUsername = () =>
  useAppSelector((state) => state.users.username);

export const useSetUsername = () => {
  const dispatch = useAppDispatch();
  return (username: string | null) =>
    dispatch(usersActions.setUsername(username));
};
