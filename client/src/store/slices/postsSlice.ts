import { createSlice } from "@reduxjs/toolkit";
import { fetchPostsThunk } from "../thunks/fetchPosts";
import { fetchPostsPushbackThunk } from "../thunks/fetchPostsPushback";

interface Post {
  id: string,
  title: string,
  content: string,
  author: string,
  created_at: string,
  likes_count: number,
  like: boolean,
}

const initialState = {
  data: [] as Array<Post>,
  sortBy: "new",
  page: 1,
  isLoading: false,
  error: null as object | null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    changeSortBy(state, action) {
      state.data = [];
      state.sortBy = action.payload;
      state.page = 1;
    },
    changePage(state,action){
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    //FETCHING POSTS
    builder.addCase(fetchPostsThunk.pending, (state, action)=>{
      state.isLoading = true;
    });
    builder.addCase(fetchPostsThunk.fulfilled, (state, action)=>{
      state.data.push(...action.payload);
      state.isLoading = false;
    });
    builder.addCase(fetchPostsThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  }
});

export const { changeSortBy, changePage } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;