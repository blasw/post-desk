import axios from "axios";
import { changePage } from "../store/slices/postsSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import vars from "../vars";

function PostDeskPagination() {
  const [totalPages, setTotalPages] = useState<number>(0);

  const dispatch = useAppDispatch(); //Use example: dispatch(changePage(2));

  const { page } = useSelector((state: { posts: { page: number } }) => state.posts);

  useEffect(() => {
    axios.get(`${vars.server_url}/posts/pages`).then((res) => {
      setTotalPages(res.data);
    });
  }, []);


  return (
    <div>
      {totalPages}
    </div>
  )
}

export default PostDeskPagination;