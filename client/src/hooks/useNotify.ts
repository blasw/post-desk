import { toast, ToastOptions, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cfg: ToastOptions = {
  position: "bottom-right" as ToastPosition,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

function useNotify(type: string, message: string) {
  switch(type){
    case "success":
      return toast.success(message, cfg);
    case "error":
      return toast.error(message, cfg);
    case "info":
      return toast.info(message, cfg);
    default:
      return null;
  }
}

export default useNotify;
