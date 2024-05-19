/* eslint-disable*/
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import "./styles/login.css";
import googleLogo from "./images/google.png";
import facebookLogo from "./images/facebook.png";
import doctor from "./images/doctor.png";
import { login } from "./../actions/auth";

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login({ email, password });
  };
  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  // try {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const newUser = JSON.stringify({
  //     email,
  //     password,
  //   });

  //   const res = await axios.post(
  //     "http://localhost:5000/api/v1/users/login",
  //     newUser,
  //     config
  //   );
  //   // const res = await axios({
  //   //   method: "POST",
  //   //   url: "http://localhost:5000/api/v1/users/login",
  //   //   data: {
  //   //     user: newUser,
  //   //   },
  //   // });
  //   if (res.data.status === "success") {
  //     console.log("success", "User Logged in Successfully!!");
  //     props.setAlert("User Logged in Successfully!!", "success");

  //     // window.setTimeout(() => {
  //     //   location.assign("/");
  //     // }, 1500);
  //   }
  // } catch (err) {
  //   // console.log(`error ${err.response.data.message}`);
  //   // console.log(err.response.data.message);
  // }

  return (
    <div className='grid grid--1x2 container'>
      <div className='login-form '>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='top-text'>
            <h3>DoctorEase</h3>
            <h2>Log In to your Account</h2>
            <p className='text'>Welcome Back! Select Method to login</p>
          </div>
          <div className='social-div'>
            <button className='social-login'>
              <img src={googleLogo} alt='Google Logo' className='logo' /> Google
            </button>
            <button className='social-login'>
              <img src={facebookLogo} alt='Facebook logo' className='logo' />{" "}
              Facebook
            </button>
          </div>
          <p className='text'>
            ----------------- Or continue with Email ----------------
          </p>
          <div className='input-div'>
            <input
              className='form-input'
              type='email'
              placeholder='Email'
              name='email'
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className='form-input'
              type='password'
              placeholder='Password'
              name='password'
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='remember-me-div'>
            <p className='text'>Remember me</p>
            <a href='/' target='_self' className='link'>
              Forgot Password
            </a>
          </div>
          <div className='button-div' type='submit'>
            <button className='main-button'>Log In</button>
          </div>
          <div className='no-account-div'>
            <p className='text'>Don't have an account?</p>
            <Link to='/signup' target='_self' className='link'>
              Create Account
            </Link>
          </div>
        </form>
        <div className='side-graphic'>
          <img className='side-img' alt='A doctor' src={doctor} />
          <p className='side-text'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  // setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginForm);
// export default LoginForm;
