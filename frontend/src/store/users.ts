import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketMessage } from "#/store/ws/handlers.ts";

const initialState: {
  users: string[];
} = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    handleUsersUpdate: {
      reducer: (state, action: PayloadAction<string[]>) => {
        state.users = action.payload;
      },
      prepare: (
        message: WebSocketMessage<"users/update", { users: string[] }>
      ) => ({
        payload: message.item.users,
      }),
    },
  },
});

export const usersActions = usersSlice.actions;

export const usersHandlers = [
  {
    type: "users/update",
    handler: usersActions.handleUsersUpdate,
  },
];

export default usersSlice.reducer;
