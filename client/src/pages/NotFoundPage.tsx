import axios from "axios";

function NotFoundPage() {
  return (
    <div className="w-full h-full">
      <button className="text-white text-3xl w-40 h-40" onClick={() => {
        axios.post("http://localhost:3000/users/signup", {
          username: "blasw2",
          email: "blasw2@gmail.com",
          password: "blasw2",
        }, {
          withCredentials: true,
        })
      }}>Create User</button>

      <button className="text-white text-3xl w-40 h-40" onClick={() => {
        axios.post("http://localhost:3000/users/login", {
          username: "blasw",
          password: "blasw"
        }, { withCredentials: true })
      }}>Login User</button>

      <button className="text-white text-3xl w-40 h-40" onClick={() => {
        axios.get("http://localhost:3000/users/test", {
          withCredentials: true
        })
      }}>Test</button>

      <button className="text-white text-3xl w-40 h-40" onClick={() => {
        axios.get("http://localhost:3000/users/auth", {
          withCredentials: true
        })
      }}>Test2</button>
    </div>
  )
}

export default NotFoundPage;