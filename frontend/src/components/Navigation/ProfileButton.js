import React, { useState, useEffect, useRef} from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from "../Modals/OpenModalMenuItem";
import useModal from "../../context/OpenModalContext";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import { NavLink, useHistory } from "react-router-dom/";



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { setOnModalContent } = useModal();
  const history = useHistory();


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

  const handleModalOpen = () => {
    setOnModalContent(<LoginFormModal/>);
};

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    setOnModalContent(null)
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  return (
    <>
      <button onClick={openMenu} className="user-options-button">
        <i className="fas fa-user-circle" />
      </button>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div>
            <li>Hello, {user.firstName}</li>
            <li>{user.email}</li>
            <hr></hr>
            <li onClick={closeMenu}><NavLink to='/spots/current'>Manage Spots</NavLink></li>
            <hr></hr>
            <li>
              <button onClick={logout} className="logout-button">Log Out</button>
            </li>
          </div>
        ) : (
          <div style={{paddingRight:'70px', paddingLeft:'10px'}}>
            <OpenModalMenuItem
                itemText="Sign up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
            />
               <OpenModalMenuItem
              itemText="Log in"
              onItemClick={() => {closeMenu(); handleModalOpen()}}
              modalComponent={<LoginFormModal />}
              />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
