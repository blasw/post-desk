import { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

interface PostItemProps {
  title: string,
  content: string,
  username: string,
  createdAt: string,
  likes_count: number,
}

function PostItem({title, content, username, createdAt, likes_count}: PostItemProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(likes_count);

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
          <div className="flex items-center">
            {liked ?
              <BsSuitHeartFill onClick={() => {
                setLiked(!liked);
                setLikes(likes - 1);
              }} className="p-2 cursor-pointer text-[#94004f] hover:scale-125 transition-all" size={42} />
              :
              <BsSuitHeart onClick={() => {
                setLiked(!liked);
                setLikes(likes + 1);
              }} className="p-2 cursor-pointer text-[#94004f] hover:scale-125 transition-all" size={42} />
            }

            <h1 className=" font-semibold select-none">{likes}</h1>
          </div>

          <h1 className="font-bold select-none">{createdAt}</h1>

          <h1 className="font-bold select-none">@{username}</h1>
        </div>
      </div>
    </div>
  )
}

export default PostItem;