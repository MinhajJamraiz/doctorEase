/* eslint-disable*/
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import "./styles/login.css";
import googleLogo from "./images/google.png";
import facebookLogo from "./images/facebook.png";
import doctor from "./images/doctor.png";
import { register } from "./../actions/auth";
import PropTypes from "prop-types";

const SignupForm = ({ register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    register({ name, email, password });
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
  //     name,
  //     email,
  //     password,
  //   });

  //   const res = await axios.post(
  //     "http://localhost:5000/api/v1/users/signup",
  //     newUser,
  //     config
  //   );
  //   // const res = await axios({
  //   //   method: "POST",
  //   //   url: "http://localhost:5000/api/v1/users/signup",
  //   //   data: {
  //   //     user: newUser,
  //   //   },
  //   // });
  //   if (res.data.status === "success") {
  //     console.log("success", "User Signed up Successfully!!");
  //     setAlert("User Signed up Successfully!!", "success");
  //     window.setTimeout(() => {
  //       location.assign("/");
  //     }, 5000);
  //   }
  // } catch (err) {
  //   // console.log(`error ${err.response.data.message}`);
  //   console.log(err.response.data.message);
  // }

  return (
    <div className='grid grid--1x2 container'>
      <div className='login-form'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='top-text'>
            <h3>DoctorEase</h3>
            <h2>Create Account</h2>
            <p className='text'>Welcome ! Select Method to Create Account</p>
          </div>
          {/* <div className='social-div'>
            <button className='social-login'>
              <img src={googleLogo} alt='Google Logo' className='logo' /> Google
            </button>
            <button className='social-login'>
              <img src={facebookLogo} alt='Facebook Logo' className='logo' />{" "}
              Facebook
            </button>
            <p className='text'>
              ----------------- Or continue with Email ----------------
            </p>
          // </div> */}
          <div className='input-div'>
            <div className='input'>
              <p className='input__label-name'>Name</p>
              <input
                className='form-input'
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
                // required
              />
            </div>
            <div className='input'>
              <p className='input__label-name'>Email</p>
              <input
                className='form-input'
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={(e) => onChange(e)}
                // required
              />
            </div>
            <div className='input'>
              <p className='input__label-name'>Password</p>
              <input
                className='form-input'
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => onChange(e)}
                // required
                // minLength='8'
              />
            </div>
          </div>
          <div className='button-div' type='submit'>
            <button className='main-button'>Sign Up</button>
          </div>
          <div className='no-account-div'>
            <p className='text'>Already have an account?</p>
            <Link to='/login' target='_self' className='link'>
              Login
            </Link>
          </div>
        </form>
      </div>

      <div className='side-graphic'>
        <img className='side-img' alt='A doctor' src={doctor} />
        <p className='side-text'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>
    </div>
  );
};

SignupForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(SignupForm);
