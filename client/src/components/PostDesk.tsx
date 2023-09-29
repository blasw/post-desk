import PostDeskHeader from "./PostDeskHeader";
import PostItem from "./PostItem";
import { useEffect } from 'react';
import { fetchPostsThunk } from "../store";
import { useAppSelector } from "./hooks/reduxHooks";
import useThunk from "./hooks/useThunk";
import { useThunkTuple } from "./hooks/useThunk";

function PostDesk() {
  const [doFetchPosts, isFetchingPosts, fetchPostsError] : useThunkTuple = useThunk(fetchPostsThunk);

  const {data} = useAppSelector((state)=>{
    return state.posts;
  })

  useEffect(()=>{
    doFetchPosts();
  }, []);

  let content = (isFetchingPosts ? 
    <h1 className="text-white">Loading...</h1>
    :
    data.map((post) => {
      console.log(post);
      return <PostItem key={post.id} title={post.title} content={post.content} username={post.author} createdAt={post.created_at} likes_count={post.likes_count} />
    })  
  )

  return(
    <div className="w-full flex justify-center h-[900px]">
      <div className="rounded-lg bg-gray-800 w-[85%]">
        <PostDeskHeader />

        <div className="flex justify-center h-[95%]">
          <div className="w-[95%] h-fit flex flex-wrap gap-4 mt-5">
            {content}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PostDesk;