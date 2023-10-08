import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "./reduxHooks";
import { login } from "../store/slices/userSlice";
import vars from "../vars";

function useAuth(){
  const dispatch = useAppDispatch();

  useEffect(()=>{
    axios.get(`${vars.server_url}/users/auth`, {withCredentials: true}).then((res)=>{
      if (res.status == 200){
        dispatch(login(res.data.username.username));
      }
    });
  }, [])
}

export default useAuth;