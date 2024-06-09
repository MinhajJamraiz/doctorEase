import "./styles/header.css";
import { connect, useSelector } from "react-redux";
import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// import signedOut from "./images/profile.png";
import hamburger from "./images/hamburger.png";
import cross from "./images/cross.png";

import { logout } from "./../actions/auth";

const Header = ({ logout }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const [toggled, setToggled] = useState(false);
  const [image, setImage] = useState(hamburger);

  const authLinks = (
    <ul className='list nav__list collapsible__content'>
      {/* <li className='nav__item'>
        <Link to='#!'>About us</Link>
      </li>
      <li className='nav__item'>
        <Link to='#!'>Services</Link>
      </li> */}
      <li className='nav__item'>
        <Link to='/chatbox'>Diagnose</Link>
      </li>
      <li className='nav__item'>
        <Link to='/history'>History</Link>
      </li>
      <li className='nav__item'>
        <Link to='/reportAnalysis'>Report Analysis</Link>
      </li>
      <li className='nav__item'>
        {!user ? "" : <Link to='#'>{user.name.trim().split(" ")[0]}</Link>}
      </li>
      <li className='nav__item'>
        <Link onClick={logout} to='#!'>
          Logout
        </Link>
      </li>
      <li className='nav__item nav__profile-item'>
        <Link to='/userProfile'>
          <img
            className='nav__profile-image'
            // src={!user ? "" : require(`./images/${user.profileImage}`)}
            src={!user ? "" : require(`./images/users/${user.profileImage}`)}
            alt=''
          />
        </Link>
      </li>
    </ul>
  );
  const GuestLinks = (
    <ul className='list nav__list collapsible__content'>
      <li className='nav__item'>
        <Link to='/signup'>Signup</Link>
      </li>
      <li className='nav__item'>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  const toggleDropdown = () => {
    setToggled(!toggled);
    setImage(toggled ? hamburger : cross);
  };
  return (
    <div>
      <div
        className={
          toggled ? "nav collapsible collapsible--expanded" : "nav collapsible"
        }
      >
        <Link to='/'>
          <button className='header-main-btn'>DoctorEase</button>
        </Link>

        <a href='#!'>
          <img
            className='icon icon--white nav__menu-btn collapsible__icon'
            src={hamburger}
            onClick={toggleDropdown}
            alt=''
          />
        </a>
        {/* <svg class='icon icon--white nav__menu-btn'>
          <use xlink:href='images/sprite.svg#menu'></use>
        </svg> */}
        {!isLoading && (
          <Fragment>{isAuthenticated ? authLinks : GuestLinks}</Fragment>
        )}
      </div>

      {/* <nav class='nav collapsible'>
        <a class='nav__logo' href='#'>
          <img src='images/logo.svg' alt='' />
        </a>
        <svg class='icon icon--white nav__menu-btn'>
          <use xlink:href='images/sprite.svg#menu'></use>
        </svg>
        <ul class='list nav__list collapsible__content'>
          <li class='nav__item'>
            <a href='#'>Hosting</a>
          </li>
          <li class='nav__item'>
            <a href='#'>VPS</a>
          </li>
          <li class='nav__item'>
            <a href='#'>Domain</a>
          </li>
          <li class='nav__item'>
            <a href='#'>Pricing</a>
          </li>
        </ul>
      </nav> */}
      {/* <div className='mid-buttons'>
        <button className='nav-button'>Home</button>
        <button className='nav-button'>About us</button>
        <button className='nav-button'>Services</button>
        <button className='nav-button'>Contact</button>
      </div> */}
      {/* <div>
        <button className='profile-button'>
          <img className='profile-img' alt='User' src={signedOut} />
        </button>
      </div> */}
    </div>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
};
export default connect(null, { logout })(Header);
