import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useNotify from "../hooks/useNotify";
import { fetchPostsThunk } from "../store";
import { changePage, changeSortBy } from "../store/slices/postsSlice";
import vars from "../vars";
import Arrow from "./Arrow";
import Loader from "./Loader";
import PostDeskHeader from "./PostDeskHeader";
import PostItem from "./PostItem";

function PostDesk() {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showArrow, setShowArrow] = useState<boolean>(false);

  const useDispatch = useAppDispatch();
  const { data, isLoading, error, sortBy, page } = useAppSelector((state) => {
    return state.posts;
  });

  const username = useAppSelector((state) => {
    return state.user.username;
  });

  const loadMore = () => {
    useDispatch(changePage(page + 1));
    useDispatch(fetchPostsThunk({ sortTerm: sortBy, page: page + 1 }));
  };

  const lastProductRef = useIntersectionObserver<HTMLElement>(() => {
    //this section is triggered when reference element is on the user's screen
    loadMore();
  }, [!isLoading, page < totalPages]);

  const postDeskHeaderRef = useIntersectionObserver<HTMLElement>(
    () => {
      //this section is triggered when reference element is on the user's screen
      setShowArrow(false);
    },
    [],
    () => {
      //this section is triggered when reference element is not on the user's screen
      setShowArrow(true);
    }
  );

  useEffect(() => {
    useDispatch(fetchPostsThunk({ sortTerm: sortBy, page }));
    if (error) {
      useNotify("error", "Error loading posts!");
    }
  }, [username, useDispatch, sortBy]);

  useEffect(() => {
    axios
      .get(`${vars.server_url}/posts/pages`)
      .then((res) => setTotalPages(res.data));
  }, []);

  const loading = (
    <div className="w-full h-[500px] flex items-center justify-center">
      <Loader />
    </div>
  );

  let content = (
    <div className="w-[95%] justify-center md:justify-start flex flex-wrap mt-5 gap-4">
      {data.map((post, i, posts) => {
        return (
          <PostItem
            reff={posts.length - 1 === i ? lastProductRef : null}
            key={i}
            id={Number(post.id)}
            title={post.title}
            content={post.content}
            authorname={post.author}
            createdAt={post.created_at}
            likes_count={post.likes_count}
            like={post.like}
          />
        );
      })}
      {isLoading && loading}
    </div>
  );

  const createPostHandler = async () => {
    console.log(sortBy);
    if (sortBy === "new") {
      useDispatch(changePage(1));
      useDispatch(fetchPostsThunk({ sortTerm: "new", page: 1 }));
    }
    useDispatch(changeSortBy("new"));

    useNotify("success", "Post created successfully!");
  };

  return (
    <div className={`w-full flex justify-center h-fit`}>
      <div className="rounded-lg bg-gray-800 w-[85%]">
        <PostDeskHeader
          reff={postDeskHeaderRef}
          onPostCreate={createPostHandler}
        />

        <div className="flex flex-col items-center justify-center gap-4">
          {content}
        </div>
      </div>
      {showArrow && <Arrow />}
    </div>
  );
}

export default PostDesk;
