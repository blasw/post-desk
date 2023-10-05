import { createAsyncThunk } from "@reduxjs/toolkit";
import vars from "../../vars";
import axios from "axios";

export const fetchPostsThunk = createAsyncThunk('posts/fetch', async ()=>{
  const response = await axios.get(`${vars.server_url}/posts/all`, {withCredentials: true});

  return response.data;
})