import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostsThunk = createAsyncThunk('posts/fetch', async ()=>{
  const response = await axios.get("http://localhost:3000/posts/all");

  return response.data;
})