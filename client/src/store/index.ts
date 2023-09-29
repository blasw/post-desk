import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export {store};
export * from './thunks/fetchPosts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;