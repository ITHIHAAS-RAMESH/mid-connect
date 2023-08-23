import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import "./feed.css"; // Import your custom CSS for styling
import Post from "./Post";
import axios from "axios";

function WhatsOnYourMind() {
  const user = localStorage.getItem("user");
  const user1 = JSON.parse(user);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([{}]);
  const [author, setAuthor] = useState([{}]);
  useEffect(() => {
    axios
      .get("http://localhost:3500/post/all")
      .then((res) => {
        setPosts(res.data);
        setAuthor(res.data.userId);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [inputValue, setInputValue] = useState({
    title: "",
    userId: user1._id,
    img: "",
  });

  const handleInputChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleImgSubmit = async (event) => {
    event.preventDefault();
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
        setInputValue({ ...inputValue, img: data.url });
        alert("Image uploaded");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    console.log(inputValue);
    axios
      .post("http://localhost:3500/post", inputValue)
      .then((res) => {
        alert("Post created");
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setInputValue({
      title: "",
      userId: user1._id,
      img: "",
    });
  };

  return (
    <>
      <h1>MY FEED</h1>
      <div className="whats-on-your-mind-container">
        <div className="feed-inner-container">
          <div className="profile-picture">
            <img src={user1.profilePicture} />
          </div>
          <textarea
            className="input-field"
            name="title"
            placeholder="What's on your mind?"
            value={inputValue.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="post-feed-container">
          <input
            type="file"
            className="post-image"
            onChange={handleImgSubmit}
          />
          <button className="post-button" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>

      {posts.map((post) => {
        const formattedDate = dayjs(post.createdAt).format("DD/MM/YYYY");
        const user = post.userId;

        return (
          <Post
            title={post.title}
            Img={post.img}
            id={post._id}
            key={post._id}
            date={formattedDate}
            author={user?.username || "loading"}
            img={user?.profilePicture || "loading"}
          />
        );
      })}
    </>
  );
}

export default WhatsOnYourMind;
