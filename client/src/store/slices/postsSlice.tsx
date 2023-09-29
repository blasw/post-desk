import { createSlice } from "@reduxjs/toolkit";
import { fetchPostsThunk } from "../thunks/fetchPosts";

interface Post {
  id: string,
  title: string,
  content: string,
  author: string,
  created_at: string,
  likes_count: number
}

const initialState = {
  data: [] as Array<Post>,
  isLoading: false,
  error: null as object | null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //FETCHING POSTS
    builder.addCase(fetchPostsThunk.pending, (state, action)=>{
      state.isLoading = true;
    });
    builder.addCase(fetchPostsThunk.fulfilled, (state, action)=>{
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPostsThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    })
  }
});

export const postsReducer = postsSlice.reducer;