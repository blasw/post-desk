import FullLogo from "../assets/FullLogo";
import { AiOutlineHome } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

function Header() {
  return (
    <div>
      <div className="fixed w-full flex justify-around items-center h-12 bg-gray-800 z-10">
        <div className="">
          <FullLogo width={150} />
        </div>

        <div></div>

        <div className="flex gap-5 px-2 items-center">

          <AiOutlineHome className="text-gray-200 rounded-md transition-all duration-200 p-1 hover:bg-gray-200 hover:text-gray-800 cursor-pointer" size={35}/>

          <BiUser className="text-gray-200 rounded-md transition-all duration-200 hover:bg-gray-200 hover:text-gray-800 p-1 cursor-pointer" size={35}/>

          <h1 className="text-gray-300">Username</h1>
        </div>
      </div>
    </div>
  )
}

export default Header;