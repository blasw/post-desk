import "../assets/css.css";
import DropDown from "./DropDown";
import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useNotify from "../hooks/useNotify";
import vars from "../vars";
import { BsSuitHeart } from "react-icons/bs";

interface PostDeskHeaderProps {
  reff? : any,
  onPostCreate: () => void;
}

function PostDeskHeader({reff, onPostCreate} : PostDeskHeaderProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const modalRef = useRef<HTMLDialogElement>(null);

  const username = useSelector((state: { user: { username: string } }) => state.user.username);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const submitHandler = async () => {
    if (username == null){
      useNotify("error", "You are not authorized!");
      return;
    }

    if (content.length < 5) {
      useNotify("error", "Content is too short!");
      return;
    }

    await axios.post(`${vars.server_url}/posts/add`, {
      title, content, username
    }, {withCredentials: true}).then((res) => {
      if (res.status === 500){
        useNotify("Error", "Something went wrong, sorry!");
      }
    });

    setTitle("");
    setContent("");

    onPostCreate();
  }

  const PostItemStruct = (
    <div className="w-full h-[250px] bg-[#263243] rounded-lg shadow-md">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="px-4 pt-2">
          <input value={title} onChange={(e)=>{
            setTitle(e.target.value)
            }} maxLength={30} placeholder="Title" className="text-center text-gray-300 text-xl font-semibold select-none w-full bg-inherit border-0 focus:border-0 focus:outline-none">
            
          </input>
          <div className="">
            <textarea value={content} onChange={(e)=>{
              setContent(e.target.value);
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




  return (
    <div ref={reff} className="w-full h-12 flex items-center justify-around rounded-t-lg bg-[#222d3c] shadow-xl">
      <div />
      <button className="button text-center w-36 text-lg select-none" onClick={openModal}>+ Add Post!</button>
      <DropDown />

      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-[350px] md:w-[500px] bg-gray-800">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 select-none focus:outline-none">✕</button>
          </form>
          <h3 className="font-bold text-lg text-center mb-5">Your Post</h3>
          {PostItemStruct}

          <form method="dialog" className="flex justify-center items-center">
            <button onClick={submitHandler} className="w-[20%] h-10 rounded-md bg-[#007720b7] hover:bg-[#007720d6] text-gray-300 px-2 mt-5">Submit</button>
          </form>

        </div>
      </dialog>
      
    </div>
  )
}

export default PostDeskHeader;