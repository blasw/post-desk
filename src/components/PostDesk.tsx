import PostDeskHeader from "./PostDeskHeader";
import PostItem from "./PostItem";

function PostDesk() {
  return(
    <div className="w-full flex justify-center h-[900px]">
      <div className="rounded-lg bg-gray-800 w-[85%]">
        <PostDeskHeader />

        <div className="flex justify-center h-[95%]">
          <div className="w-[95%] h-fit flex flex-wrap gap-4 mt-5">
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </div>
        </div>

      </div>
    </div>
  )
}

export default PostDesk;