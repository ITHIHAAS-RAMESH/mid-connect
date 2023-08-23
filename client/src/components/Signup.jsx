import { React, useState } from "react";
import loginImg from "../assets/login.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Signup() {
  const [image, setImage] = useState(null);
  const [users, setUser] = useState({
    username: "",
    password: "",
    email: "",
    profilePicture:
      "https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM=",
  });
  const handleImgSubmit = (event) => {
    const image = event.target.files[0];
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Dbmsproject");
    data.append("cloud_name", "ddqidcsv4");
    fetch("https://api.cloudinary.com/v1_1/ddqidcsv4/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        alert("Image Uploaded Successfully");
        setUser({ ...users, profilePicture: data.url });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setUser({
      ...users,
      [e.target.name]: e.target.value,
    });
    console.log();
  };
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3500/users/signup", users)
      .then((response) => setMsg(response.data.message))
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="flex items-center hidden sm:block bg-gray-800 flex flex-col justify-center">
        <img
          className="max-w-[400px] w-full mx-auto mt-36 bg-transparent p-10 px-10 rounded-lg animate-pulse "
          src={loginImg}
          alt=""
        />
        <h2 className="flex justify-center text-teal-300 py-2 text-4xl">
          {" "}
          <h2 className="flex justify-center  text-pink-500 py-0 text-4xl">
            MID
          </h2>
          CONNECT
        </h2>
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN UP
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
            <span>Profile Picture</span>
            <input
              type="file"
              placeholder="Select Profile picture"
              onChange={handleImgSubmit}
            />
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <span>Email-ID</span>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              onChange={handleChange}
              name="email"
              type="email"
              required="required"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <span>Create Password</span>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              onChange={handleChange}
              name="password"
              type="password"
              required="required"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <span>Confirm Password</span>
            <input
              className=" p-2 rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500  focus:bg-gray-800 focus:outline-none"
              type="password"
              required="required"
            />
            <i></i>

            <input
              className="w-full my-5 py-2 bg-teal-500 shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
              type="submit"
              value="Create Account"
              onClick={handleSubmit}
            />
          </div>
          <div className="flex justify-center gap-2">
            <p className="text-gray-400">Have Account? </p>
            <a className="text-gray-400 hover:text-white" href="">
              <Link to="/">Login</Link>
            </a>
          </div>

          <p className="text-red-500 text-center">{msg}</p>
        </form>
      </div>
    </div>
  );
}
