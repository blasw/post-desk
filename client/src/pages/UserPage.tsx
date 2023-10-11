import { useSelector } from 'react-redux';
import Header from "../components/Header";
import LogIn from "../components/LogIn";
import UserStats from "../components/UserStats";
import { useEffect } from "react";
import { useAppDispatch } from '../hooks/reduxHooks';
import { changeSortBy } from '../store/slices/postsSlice';

function UserPage() {
  const username = useSelector((state: { user: { username: string } }) => state.user.username);

  const useDispatch = useAppDispatch();

  let content;

  if (username == null) {
    content = <LogIn />;
  } else {
    content = (
      <UserStats />
    )
  }

  useEffect(()=>{
    useDispatch(changeSortBy("most_likes"));
    useDispatch(changeSortBy("new"));
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <Header />

      <div className="w-full flex justify-center h-[650px]">
        <div className="rounded-lg bg-gray-800 w-[90%] md:w-[70%]">
          {content}
        </div>
      </div>
    </div>
  )
}

export default UserPage;