import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import appReducer from "./reducers/AppSlice";
import courseContentReducer from "./reducers/CourseContentSlice";

const rootReducer = combineReducers({
  userReducer,
  appReducer,
  courseContentReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
