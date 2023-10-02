import "../assets/css.css";
import DropDown from "./DropDown";
import { useRef, useState } from "react";
import PostItemStruct from "./PostItemSruct";
import axios from "axios";
import { useSelector } from "react-redux";
import useNotify from "../hooks/useNotify";

interface PostDeskHeaderProps {
  onPostCreate: () => void;
}

function PostDeskHeader({onPostCreate} : PostDeskHeaderProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const modalRef = useRef<HTMLDialogElement>(null);

  const username = useSelector((state: { user: { username: string } }) => state.user.username);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const titleChangeHandler = (value: string) => {
    setTitle(value);
  }

  const contentChangeHandler = (value: string) => {
    setContent(value);
  }

  const submitHandler = async () => {
    if (username == null){
      useNotify("error", "You are not authorized!");
      return;
    }

    await axios.post("http://localhost:3000/posts/add", {
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

  return (
    <div className="w-full h-12 flex items-center justify-around rounded-t-lg bg-[#222d3c] shadow-xl">
      <div />
      <button className="button text-center w-36 text-lg select-none" onClick={openModal}>+ Add Post!</button>
      <DropDown />

      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-[500px] bg-gray-800">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 select-none focus:outline-none">✕</button>
          </form>
          <h3 className="font-bold text-lg text-center mb-5">Your Post</h3>
          <PostItemStruct onContentChange={contentChangeHandler} onTitleChange={titleChangeHandler} content={content} title={title}/>

          <form method="dialog" className="flex justify-center items-center">
            <button onClick={submitHandler} className="w-[20%] h-10 rounded-md bg-[#007720b7] hover:bg-[#007720d6] text-gray-300 px-2 mt-5">Submit</button>
          </form>

        </div>
      </dialog>
      
    </div>
  )
}

export default PostDeskHeader;