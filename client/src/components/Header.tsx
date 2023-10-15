import axios from "axios";
import { AiOutlineHome } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FullLogo from "../assets/FullLogo";
import { useAppDispatch } from "../hooks/reduxHooks";
import { clear } from "../store/slices/postsSlice";
import { logout } from "../store/slices/userSlice";
import vars from "../vars";

function Header() {
  const username = useSelector(
    (state: { user: { username: string } }) => state.user.username
  );
  const useDispatch = useAppDispatch();

  const notifyInfo = () =>
    toast.info("Logged out!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleLogOut = async () => {
    //removing token from cookies
    await axios.get(`${vars.server_url}/users/logout`, {
      withCredentials: true,
    });
    useDispatch(logout());
    useDispatch(clear());
    notifyInfo();
  };

  return (
    <div>
      <div className="fixed w-full flex justify-around items-center h-12 bg-gray-800 z-10">
        <div className="">
          <FullLogo width={150} />
        </div>

        <div className=""></div>

        <div className="flex gap-5 px-2 items-center">
          <Link to={"/"}>
            <AiOutlineHome
              className="text-gray-200 rounded-md transition-all duration-200 p-1 hover:bg-gray-200 hover:text-gray-800 cursor-pointer"
              size={35}
            />
          </Link>

          <Link to={"/user"}>
            <BiUser
              className="text-gray-200 rounded-md transition-all duration-200 hover:bg-gray-200 hover:text-gray-800 p-1 cursor-pointer"
              size={35}
            />
          </Link>

          {username !== null && (
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="m-1 select-none">
                {username}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-[#263243] rounded-lg w-28"
              >
                <li
                  className="text-gray-300 hover:cursor-pointer"
                  onClick={handleLogOut}
                >
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
