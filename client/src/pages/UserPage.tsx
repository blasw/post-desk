import { useSelector } from "react-redux";
import Header from "../components/Header";
import LogIn from "../components/LogIn";
import UserStats from "../components/UserStats";

function UserPage() {
  const username = useSelector((state: { user: { username: string } }) => state.user.username);

  let content;

  if (username == null) {
    content = <LogIn />;
  } else {
    content = (
      <UserStats />
    )
  }

  return (
    <div className="flex flex-col gap-16">
      <Header />

      <div className="w-full flex justify-center h-[600px]">
        <div className="rounded-lg bg-gray-800 w-[70%]">
          {content}
        </div>
      </div>
    </div>
  )
}

export default UserPage;