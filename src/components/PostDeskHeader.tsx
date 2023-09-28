import "../assets/css.css";
import DropDown from "./DropDown";

function PostDeskHeader() {
  return(
    <div className="w-full h-12 flex items-center justify-around rounded-t-lg bg-[#222d3c] shadow-xl">
      <div />
      <button className="button text-center w-36 text-lg">+ Add Post!</button>
      <DropDown></DropDown>
    </div>
  )
}

export default PostDeskHeader;