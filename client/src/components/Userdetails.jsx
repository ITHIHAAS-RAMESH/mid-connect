import React, { useState } from "react";
import "./userdetails.css";
import axios from "axios";

const Userdetails = () => {
  const maskedPassword = "**********";
  const user = localStorage.getItem("user");
  const user1 = JSON.parse(user);
  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState({
    profilePicture: user1.profilePicture,
    username: user1.username,
    email: user1.email,
    password: user1.password,
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    axios
      .put(`http://localhost:3500/users/${user1._id}`, userProfile)
      .then((res) => {
        console.log(res.data);
        alert("user updated");
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setEditMode(false);
  };
  const handleImgChange = async (event) => {
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
        setUserProfile({ ...userProfile, profilePicture: data.url });
        alert("Image uploaded");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="user-profile-outer">
      <div className={`user-profile ${editMode ? "edit-mode" : ""}`}>
        <div className="profile-pic-container">
          <img
            className="profile-pic"
            src={userProfile.profilePicture}
            alt="Profile"
          />
          {editMode ? (
            <input
              className="edit-input"
              type="file"
              name="profilePic"
              onChange={handleImgChange}
            />
          ) : null}
        </div>
        <div className="profile-field">
          <label className="label">Username:</label>
          {editMode ? (
            <input
              className="edit-input"
              type="text"
              name="username"
              value={userProfile.username}
              onChange={handleInputChange}
              readOnly={true}
            />
          ) : (
            <span>{userProfile.username}</span>
          )}
        </div>
        <div className="profile-field">
          <label className="label">Email:</label>
          {editMode ? (
            <input
              className="edit-input"
              type="email"
              name="email"
              value={userProfile.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userProfile.email}</span>
          )}
        </div>
        <div className="profile-field">
          <label className="label">Password:</label>
          {editMode ? (
            <input
              className="edit-input"
              type="text"
              name="password"
              value={userProfile.password}
              onChange={handleInputChange}
            />
          ) : (
            <span>{maskedPassword}</span>
          )}
        </div>
        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="save-btn" onClick={handleSaveClick}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={handleEditClick}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userdetails;
