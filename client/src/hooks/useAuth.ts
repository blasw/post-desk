import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "./reduxHooks";
import { login } from "../store/slices/userSlice";

function useAuth(){
  const dispatch = useAppDispatch();

  useEffect(()=>{
    axios.get("http://localhost:3000/users/auth", {withCredentials: true}).then((res)=>{
      if (res.status == 200){
        dispatch(login(res.data.username.username));
      }
    });
  }, [])
}

export default useAuth;