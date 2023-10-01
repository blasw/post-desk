import { useSelector } from "react-redux";
import Header from "../components/Header";
import LogIn from "../components/LogIn";

function UserPage() {
  const username = useSelector((state: { user: { username: string } }) => state.user.username);

  let content;

  if (username == null) {
    content = <LogIn />;
  } else {
    content = (
      <div className="w-full flex justify-center">
        <h1 className="text-3xl text-gray-300">Authorized</h1>
      </div>
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