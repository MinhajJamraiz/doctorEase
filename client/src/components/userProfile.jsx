import "./styles/userProfile.css";
import { Navigate, Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { useState } from "react";
import signedOut from "./images/defaultUser.png";
import { updatePassword } from "./../actions/auth";
import { setAlert } from "./../actions/alert";
import PropTypes from "prop-types";

import axios from "axios";

const UserProfile = ({ updatePassword, setAlert }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [userName, setUserName] = useState(`${!user ? "" : user.name}`);
  const [disabledProfile, setdisabledProfile] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  // TO UPDATE SETTINGS
  const handleDataSave = (e) => {
    e.preventDefault();
    let userData;
    userData = {
      name: document.getElementById("name").value,
      id: user._id,
      profileImage: profileImage,
    };

    updateData(userData);
  };
  //SEt File
  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  //TO UPDATE PASSWORD
  const handlePasswordSave = (e) => {
    e.preventDefault();
    let userData;
    userData = {
      password: document.getElementById("password").value,
      newPassword: document.getElementById("newPassword").value,
      id: user._id,
    };
    updatePassword(userData);
    // const userData = new FormData();
    // userData.append("password", document.getElementById("password").value);
    // userData.append(
    //   "newPassword",
    //   document.getElementById("newPassword").value
    // );
    // console.log(userData);
    // updateData(userData, "password");
  };

  // DIsabled Profile Button
  const handleDisabledProfile = () => {
    setdisabledProfile(!disabledProfile);
  };
  // Disabled Password Button
  const handleDisabledPassword = () => {
    setDisabledPassword(!disabledPassword);
  };
  // const handleClick = () => {
  //   window.location.reload();
  // };
  const updateData = async (data) => {
    try {
      // const url =
      //   type === "password"
      //     ? "http://localhost:5000/api/v1/user/updateMyPassword"
      //     : "http://localhost:5000/api/v1/user/updateMe";

      const res = await axios.patch(
        "http://localhost:5000/api/v1/user/updateMe",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.status === "success") {
        // showAlert("success", `User ${type.toUpperCase()} updated successfully`);
        setAlert("User Data Updated Successfully", "success");

        window.setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      }
    } catch (err) {
      // showAlert("error", err.response.data.message);
      console.log(err);
      setAlert("Failed to update User Data", "error");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <div className='profile-container'>
      <div className='sidebar--profile'>
        <button className='sidebar-option'>Profile</button>
        <button className='sidebar-option'>
          <Link to='/history'>Diagnosis History</Link>
        </button>
        <button className='sidebar-option'>Logout</button>
      </div>

      <div>
        <form className='settings form-user-data'>
          <h1 className='settings-header'>Profile</h1>
          <div className='img-upload-div'>
            <img
              className='profile-img-preview'
              src={require(`./images/users/${user.profileImage}`)}
            />

            <div className='pfp-buttons-div'>
              <input
                name='profileImage'
                id='profileImage'
                accept='image/*'
                type='file'
                onChange={handleFileChange}
                disabled={disabledProfile}
                className='pfp-button blue-button'
              />
            </div>
          </div>
          <div className='text-input-div'>
            <p className='input-name'>Email Address</p>
            <p disabled={true} className='input-field'>
              {user.email}
            </p>
            <p className='input-name'>Name</p>
            <input
              id='name'
              className='input-field'
              type='text'
              value={userName}
              disabled={disabledProfile}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className='button-div'>
            <button
              type='submit'
              onClick={handleDataSave}
              disabled={disabledProfile}
              className='button'
            >
              Save Settings
            </button>
          </div>
        </form>
        <div className='button-div'>
          <button onClick={handleDisabledProfile} className='button'>
            {disabledProfile ? "Enable Edit" : "Disable Edit"}
          </button>
        </div>
        <form className='settings form-user-password'>
          <h1 className='settings-header'>Change Password</h1>

          <div className='text-input-div'>
            <p className='input-name'>Old Password</p>
            <input
              id='password'
              className='input-field'
              type='password'
              placeholder='Enter your Old Password'
              disabled={disabledPassword}
            />
            <p className='input-name'>New Password</p>
            <input
              id='newPassword'
              className='input-field'
              type='password'
              placeholder='******'
              disabled={disabledPassword}
            />
          </div>
          <div className='button-div'>
            <button
              type='submit'
              onClick={handlePasswordSave}
              disabled={disabledPassword}
              className='button'
            >
              Save Settings
            </button>
          </div>
        </form>
        <div className='button-div'>
          <button onClick={handleDisabledPassword} className='button'>
            {disabledPassword ? "Enable Edit" : "Disable Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { updatePassword, setAlert })(UserProfile);
