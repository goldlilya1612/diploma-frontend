import { combineReducers, configureStore } from '@reduxjs/toolkit';
import generalInfoReducer from './reducers/GeneralInfoSlice';

const rootReducer = combineReducers({
  generalInfoReducer
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
