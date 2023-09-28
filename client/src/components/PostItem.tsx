import { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

function PostItem() {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="w-[32.1%] h-[250px] bg-[#263243] rounded-lg shadow-md transition-all hover:-translate-y-2 hover:scale-[1.03] hover:shadow-lg">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="px-4 pt-2 text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis nam aliquid laboriosam excepturi dolorum consequuntur voluptas reprehenderit veniam ullam, tempora dignissimos iusto. Id, tempora enim aut exercitationem ullam voluptate cum.
        </div>

        <div className="h-12 rounded-b-lg bg-[#702c95b6] flex items-center justify-around">
          <div className="flex items-center">
            {liked ?
              <BsSuitHeartFill onClick={() => setLiked(!liked)} className="p-2 cursor-pointer text-[#94004f] hover:scale-125 transition-all" size={42} />
              :
              <BsSuitHeart onClick={() => setLiked(!liked)} className="p-2 cursor-pointer text-[#94004f] hover:scale-125 transition-all" size={42} />
            }

            <h1 className=" font-semibold">9999</h1>
          </div>

          <h1 className="font-bold">5 mins ago</h1>

          <h1 className="font-bold">@Author Author</h1>
        </div>
      </div>
    </div>
  )
}

export default PostItem;