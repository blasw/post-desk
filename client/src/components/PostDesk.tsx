import PostDeskHeader from "./PostDeskHeader";
import PostItem from "./PostItem";
import { useEffect } from 'react';
import { fetchPostsThunk } from "../store";
import { useAppSelector } from "../hooks/reduxHooks";
import useThunk from "../hooks/useThunk";
import { useThunkTuple } from "../hooks/useThunk";
import Loader from "./Loader";
import useNotify from "../hooks/useNotify";

function PostDesk() {
  const [doFetchPosts, isFetchingPosts, fetchPostsError] : useThunkTuple = useThunk(fetchPostsThunk);

  const {data} = useAppSelector((state)=>{
    return state.posts;
  });

  useEffect(()=>{
    doFetchPosts();
  }, []);

  const loading = (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );

  let content = (isFetchingPosts ? 
    loading
    :
    data.map((post) => {
      return <PostItem key={post.id} id={Number(post.id)} title={post.title} content={post.content} authorname={post.author} createdAt={post.created_at} likes_count={post.likes_count} like={post.like}/>
    })  
  );
  
  const createPostHandler = async () => {
    await doFetchPosts();
    useNotify("success", "Post created successfully!");
  }

  return(
    <div className="w-full flex justify-center h-[900px]">
      <div className="rounded-lg bg-gray-800 w-[85%]">
        <PostDeskHeader onPostCreate={createPostHandler}/>

        <div className="flex justify-center h-[95%]">
          <div className="w-[95%] h-fit flex flex-wrap gap-4 mt-5">
            {content}
          </div>
        </div>

      </div>
    </div>
  )
};

export default PostDesk;