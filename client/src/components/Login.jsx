import { React, useState } from "react";
import loginImg from "../assets/login.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [users, setUser] = useState({
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    setUser({
      ...users,
      [e.target.name]: e.target.value,
    });
    console.log();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    await axios
      .post("http://localhost:3500/users/login", users)
      .then(function (response) {
        console.log(response);
        res = response;
      })
      .catch(function (error) {
        console.log(error);
      });
    const user = res.data.user;
    const message = res.data.message;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } else {
      setMsg(message);
      console.log(message);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="flex items-center hidden sm:block bg-gray-800 flex flex-col justify-center ">
          <img
            className="max-w-[400px] max-h-[400px] mx-auto mt-20 place-items-center  bg-transparent p-10 px-10 rounded-lg animate-pulse "
            src={loginImg}
            alt=""
          />
          <h2 className="flex justify-center text-teal-300 py-2 text-6xl">
            {" "}
            <h2 className="flex justify-center  text-pink-500 py-0 text-6xl">
              MID
            </h2>
            CONNECT
          </h2>
        </div>
        <div className="bg-gray-800 flex flex-col justify-center">
          <form className="max-w-[400px] mx-auto mb-20 w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg ">
            <h2 className="text-4xl dark:text-white font-bold text-center">
              LOGIN
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <span>Username</span>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                onChange={handleChange}
                name="username"
                type="text"
                required="required"
              />

              <i></i>
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <span>Password</span>
              <input
                className=" p-2 rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500  focus:bg-gray-800 focus:outline-none"
                onChange={handleChange}
                name="password"
                type="password"
                required="required"
              />
              <i></i>
            </div>
            <div className="flex justify-between text-gray-400 py-2 ">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" /> Remember Me{" "}
              </p>
            </div>
            <input
              className="w-full my-5 py-2 bg-teal-500 shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
              type="submit"
              onClick={handleSubmit}
              value="login"
            />
            <div className="flex justify-center text-gray-400 py-2">
              <p>Don't Have Account?</p>
              <a className="hover:text-white" href="">
                <Link to="/Signup">Sign Up</Link>
              </a>
            </div>
            <p className="text-red-500 text-center">{msg}</p>
          </form>
        </div>
      </div>
    </>
  );
}
