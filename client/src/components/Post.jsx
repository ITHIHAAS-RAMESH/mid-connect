import React from "react";
import axios from "axios";
import "./post.css";

function Post(props) {
  const user = localStorage.getItem("user");
  const user1 = JSON.parse(user);
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3500/post/${props.id}`)
      .then((res) => {
        console.log(res.data);
        alert("Post deleted");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="feed-container">
      {/* Render posts */}
      <div className="post">
        {/* Post header */}
        <div className="post-header">
          <div className="profile-picture">
            <img src={props.img} />
          </div>
          <div className="post-author">
            <span className="author-name">{props.author}</span>
            <span className="post-time">{props.date}</span>
          </div>
          {props.author == user1.username && (
            <div className="edit-delete-btn-container">
              <span onClick={handleDelete}>
                <img className="edit-delete-btn" src="/trash.png" />
              </span>
            </div>
          )}
        </div>

        {/* Post content */}
        <div className="post-content">
          {/* Post text */}
          <p>{props.title}</p>
          {/* Post image */}
          <img src={props.Img} />
        </div>
        {/* Post actions */}
        <div className="post-actions"></div>
      </div>
      {/* Add more posts here */}
    </div>
  );
}

export default Post;
