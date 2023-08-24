import React, { useState, useEffect, useRef} from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from "../Modals/OpenModalMenuItem";
import LoginFormPage from "../LoginFormPage";

import LoginFormModal from "../Modals/LoginFormModal";



function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

    const closeMenu = () => setShowMenu(false)

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  return (
    <>
      <button onClick={openMenu} className="user-options-button">
        <i className="fas fa-user-circle" />
      </button>

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
            {/* <li onClick={() => {setShowMenu(false)}} className="login"><NavLink to="/login">Log In</NavLink></li>
            <li onClick={() => setShowMenu(false)}><NavLink to="/signup">Sign Up</NavLink></li> */}
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal/>}
              />
            <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                // modalComponent={}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
