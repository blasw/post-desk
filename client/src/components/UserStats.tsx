import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import vars from "../vars";
import axios from "axios";
import useNotify from "../hooks/useNotify";
import Loader from "./Loader";
import moment from "moment";

type UserStats = {
  username: string,
  email: string,
  created_at: string,
  postsCount: string,
  likesCount: string,
}

function UserStats() {
  const [userStats, setUserStats] = useState<UserStats>();

  const username = useSelector((state: { user: { username: string } }) => state.user.username);

  useEffect(() => {
    try {
      axios.get(`${vars.server_url}/users/stats`, { withCredentials: true, headers: { "Content-Type": "application/json" } }).then((res) => {
        setUserStats(res.data);
      });
    } catch (err) {
      useNotify("error", "Something went wrong!");
    }
  }, []);

  const loading = (
    <div className="w-full h-[400px] flex items-center justify-center">
      <Loader />
    </div>
  );

  let content = (!userStats ?
    loading
    :
    <div className="w-full h-full flex flex-col items-center gap-10 mt-12">
      <h1 className="text-2xl">This Is Your Stats :)</h1>
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 justify-around">
          <div className="flex flex-col items-center">
            <h1 className="text-gray-300 text-3xl font-extrabold">{userStats?.username}</h1>
            <h1 className="text-gray-500 text-lg">Username</h1>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-gray-300 text-3xl font-extrabold">{userStats?.postsCount}</h1>
            <h1 className="text-gray-500 text-lg">Posts Created</h1>
          </div>
        </div>

        <div className="flex flex-col gap-10 justify-around">
          <div className="flex flex-col items-center">
            <h1 className="text-gray-300 text-3xl font-extrabold">{userStats?.email}</h1>
            <h1 className="text-gray-500 text-lg">Email</h1>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-gray-300 text-3xl font-extrabold">{userStats?.likesCount}</h1>
            <h1 className="text-gray-500 text-lg">Likes Given</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-around gap-20">
        <div className="flex flex-col items-center">
          <h1 className="text-gray-300 text-3xl font-extrabold">{moment(userStats?.created_at).fromNow().slice(0, length - 4)}</h1>
          <h1 className="text-gray-500 text-xl">Posting For</h1>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {content}
    </div>
  )
}

export default UserStats;