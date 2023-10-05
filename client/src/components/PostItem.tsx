import { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import moment from "moment";
import axios from "axios";
import useNotify from "../hooks/useNotify";
import { useSelector } from "react-redux";
import vars from "../vars";

interface PostItemProps {
  id: number,
  title: string,
  content: string,
  authorname: string,
  createdAt: string,
  likes_count: number,
  like: boolean
}

function PostItem({ id, title, content, authorname, createdAt, likes_count, like }: PostItemProps) {
  const [liked, setLiked] = useState<boolean>(like);
  const [likes, setLikes] = useState<number>(likes_count);
  const timePassed = moment(createdAt).fromNow();

  const username = useSelector((state: { user: { username: string } }) => state.user.username);

  const sendLike = async () => {
    let res = await axios.post(`${vars.server_url}/posts/like`,
      {
        username,
        post_id: id
      },
      { withCredentials: true });

    return res;
  }

  const undoLike = async () => {
    let res = await axios.post(`${vars.server_url}/posts/unlike`,
      {
        username,
        post_id: id
      },
      { withCredentials: true });

    return res;
  }

  const likeHandler = async () => {
    if(username == null){
      useNotify("error", "You are not authorized!");
      return;
    }

    setLiked(true);
    setLikes(likes+1);
    sendLike();
  }

  const unlikeHandler = async () => {
    if(username == null){
      useNotify("error", "You are not authorized!");
      return;
    }

    setLiked(false);
    setLikes(likes-1);
    undoLike();
  }

  return (
    <div className="w-[32.1%] h-[250px] bg-[#263243] rounded-lg shadow-md transition-all hover:-translate-y-2 hover:scale-[1.03] hover:shadow-lg">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="px-4 pt-2">
          <div className="text-center text-gray-300 text-xl font-semibold select-none">
            {title}
          </div>
          <div className="text-gray-300 select-none">
            {content}
          </div>
        </div>

        <div className="h-12 rounded-b-lg bg-[#702c95b6] flex items-center justify-around">
          <div className="flex items-center text-center justify-center w-[20%]">
            {liked ?
              <BsSuitHeartFill onClick={unlikeHandler} className="p-2 cursor-pointer text-[#94004f] hover:scale-125 transition-all" size={42} />
              :
              <BsSuitHeart onClick={likeHandler} className="p-2 cursor-pointer text-[#94004f] hover:scale-125 transition-all" size={42} />
            }

            <h1 className=" font-semibold select-none">{likes}</h1>
          </div>

          <h1 className="font-bold select-none text-center w-[40%]">{timePassed}</h1>

          <h1 className="font-bold select-none text-center w-[40%]">@{authorname}</h1>
        </div>
      </div>
    </div>
  )
}

export default PostItem;