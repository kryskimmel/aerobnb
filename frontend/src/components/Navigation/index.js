import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import { LoginContext } from '../../context/LoginModalContext';
// import LoginModal from '../Modals/LoginModal';
import * as sessionActions from "../../store/spots";





function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // const {openLogin, setOpenLogin} = useContext(LoginContext);

  // if (sessionUser) setOpenLogin(false) //works but causes rendering issue (see console)


  return (
    <>
    <ul className='nav-links-div'>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </>
  );
}

export default Navigation;
