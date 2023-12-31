import { configureStore, Dispatch } from "@reduxjs/toolkit";

import chatsReducer from "#/store/chats";
import gameReducer from "#/store/game";
import usersReducer from "#/store/users";
import wsConnectionMiddleware from "#/store/ws/middleware";
import wsConnectionReducer from "#/store/ws/connection";

const store = configureStore({
  reducer: {
    users: usersReducer,
    chats: chatsReducer,
    game: gameReducer,
    wsConnection: wsConnectionReducer,
  },
  middleware: [wsConnectionMiddleware] as never, // RTK 2.0 beta problem, we need it to be able to build
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = Dispatch;
