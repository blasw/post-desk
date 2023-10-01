import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { login } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

function LogIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const useDispatch = useAppDispatch();

  const LogInHandler = () => {
    axios.post("http://localhost:3000/users/login", {
      username: username,
      password: password
    }, { withCredentials: true, headers: { "Content-Type": "application/json" }}).then((res)=>{
      if(res.status === 200){
        useDispatch(login(res.data.username));
      }
    });
    
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-gray-300 text-2xl font-semibold">Log In</h1>

      <input value={username} className="w-[50%] h-10 rounded-md bg-[#263243] text-gray-300 px-2 mt-5" placeholder="Username" onChange={(event)=>{setUsername(event.target.value)}}/>

      <input value={password} className="w-[50%] h-10 rounded-md bg-[#263243] text-gray-300 px-2 mt-5" placeholder="Password" type="password" onChange={(event)=>{setPassword(event.target.value)}}/>

      <button onClick={LogInHandler} className="w-[20%] h-10 rounded-md bg-[#007720b7] hover:bg-[#007720d6] text-gray-300 px-2 mt-5">Log In</button>
    </div>
  )
}

export default LogIn;