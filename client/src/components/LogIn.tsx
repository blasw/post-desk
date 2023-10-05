import { useState } from "react";
import axios from "axios";
import { login } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import useNotify from "../hooks/useNotify";
import vars from "../vars";

function LogIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [signup, setSignup] = useState<boolean>(false);
  const useDispatch = useAppDispatch();

  const LogInHandler = async () => {
    await axios.post(`${vars.server_url}/users/login`, {
      username: username,
      password: password
    }, { withCredentials: true, headers: { "Content-Type": "application/json" } }).then((res) => {
      const auth = res.data.authorized;
      if (auth) {
        useDispatch(login(username));
        useNotify("success", "Logged in successfully!");
      } else {
        useNotify("error", "Invalid username or password!");
      }
    });
    setPassword("");
    setUsername("");
  }

  const signUpHandler = async () => {
    try{
      await axios.post(`${vars.server_url}/users/signup`, {
        username, email, password
      }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
      useNotify("success", "Signed up successfully!");
      useDispatch(login(username));
    } catch (err: any) {
      if(err.response.status === 409) {
        useNotify("error", "Username already exists!");
        return;
      }
    } finally {
      setPassword("");
      setUsername("");
      setEmail("");
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      {signup ?
        <div className="w-full flex flex-col items-center">
          <h1 className="text-gray-300 text-2xl font-semibold">Sign Up</h1>

          <input value={username} className="w-[50%] h-10 rounded-md bg-[#263243] text-gray-300 px-2 mt-5" placeholder="Username" onChange={(event) => { setUsername(event.target.value) }} />

          <input value={email} className="w-[50%] h-10 rounded-md bg-[#263243] text-gray-300 px-2 mt-5" placeholder="Email" type="email" onChange={(event) => { setEmail(event.target.value) }} />

          <input value={password} className="w-[50%] h-10 rounded-md bg-[#263243] text-gray-300 px-2 mt-5" placeholder="Password" type="password" onChange={(event) => { setPassword(event.target.value) }} />

          <button onClick={signUpHandler} className="w-[20%] h-10 rounded-md bg-[#007720b7] hover:bg-[#007720d6] text-gray-300 px-2 mt-5">Sign Up</button>

          <h1 className="text-gray-500 mt-5 cursor-pointer select-none" onClick={() => setSignup(false)}>Already have an account? Log in here.</h1>
        </div>
        :
        <div className="w-full flex flex-col items-center">
          <h1 className="text-gray-300 text-2xl font-semibold">Log In</h1>

          <input value={username} className="w-[50%] h-10 rounded-md bg-[#263243] text-gray-300 px-2 mt-5" placeholder="Username" onChange={(event) => { setUsername(event.target.value) }} />

          <input value={password} className="w-[50%] h-10 rounded-md bg-[#263243] text-gray-300 px-2 mt-5" placeholder="Password" type="password" onChange={(event) => { setPassword(event.target.value) }} />

          <button onClick={LogInHandler} className="w-[20%] h-10 rounded-md bg-[#007720b7] hover:bg-[#007720d6] text-gray-300 px-2 mt-5">Log In</button>

          <h1 className="text-gray-500 mt-5 cursor-pointer select-none" onClick={() => setSignup(true)}>Don't have an account? Sign up here.</h1>
        </div>
      }


    </div>
  )
}

export default LogIn;