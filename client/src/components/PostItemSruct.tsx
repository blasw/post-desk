import { BsSuitHeart } from "react-icons/bs";
import { useState } from "react";
import { useSelector } from "react-redux";

interface PostItemStructProps {
  onTitleChange: (value: string) => void,
  onContentChange: (value: string) => void,
  title: string,
  content: string,
}

function PostItemStruct({ onTitleChange, onContentChange, title, content }: PostItemStructProps) {
  const [t, setTitle] = useState<string>(title);
  const [c, setContent] = useState<string>(content);

  const username = useSelector((state: { user: { username: string } }) => state.user.username);

  return (
    <div className="w-full h-[250px] bg-[#263243] rounded-lg shadow-md">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="px-4 pt-2">
          <input value={t} onChange={(e)=>{
            setTitle(e.target.value)
            onTitleChange(e.target.value);
            }} maxLength={30} placeholder="Title" className="text-center text-gray-300 text-xl font-semibold select-none w-full bg-inherit border-0 focus:border-0 focus:outline-none">
            
          </input>
          <div className="">
            <textarea value={c} onChange={(e)=>{
              setContent(e.target.value);
              onContentChange(e.target.value);
              }} maxLength={250} placeholder="Content" className="text-gray-300 select-none w-full h-40 bg-inherit border-0 focus:border-0 focus:outline-none resize-none">
            </textarea>
          </div>
        </div>

        <div className="h-12 rounded-b-lg bg-[#702c95b6] flex items-center justify-around">
          <div className="flex items-center text-center justify-center w-[20%]">
          <BsSuitHeart className="p-2 text-[#94004f]" size={42} />

            <h1 className=" font-semibold select-none"></h1>
          </div>

          <h1 className="font-bold select-none text-center w-[40%]"></h1>

          <h1 className="font-bold select-none text-center w-[40%]">@{username}</h1>
        </div>
      </div>
    </div>
  )
}

export default PostItemStruct;