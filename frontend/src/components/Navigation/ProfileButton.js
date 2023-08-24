import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { LoginContext } from "../../context/LoginModalContext";



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const {setOpenLogin} = useContext(LoginContext);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false)
    setOpenLogin(false)
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  return (
    <>
      {user ? (
        <>
          <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
          </button>
        </>
      ) : (
        <>
          <button onClick={openMenu}>
            <i class="fa-solid fa-bars" style={{color: "#000000"}}></i>
          </button>
        </>
      )}

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button className="logout-button" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li onClick={() => {setShowMenu(false); setOpenLogin(true)}} className="login"><NavLink to="/login">Log In</NavLink></li>
            <li onClick={() => setShowMenu(false)}><NavLink to="/signup">Sign Up</NavLink></li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
