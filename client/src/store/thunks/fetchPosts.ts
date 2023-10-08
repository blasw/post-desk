import { createAsyncThunk } from "@reduxjs/toolkit";
import vars from "../../vars";
import axios from "axios";

export const fetchPostsThunk = createAsyncThunk('posts/fetch', async ({ sortTerm, page }: { sortTerm: string, page: number })=>{

  const response = await axios.get(`${vars.server_url}/posts/all?sort=${sortTerm}&page=${page}`, {withCredentials: true});

  return response.data;
});