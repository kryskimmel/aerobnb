import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

import LogInModal from '../Modals/LoginModal';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const [openLoginModal, setOpenLoginModal] = useState(false);



  return (
    <>
    <ul className='nav-links-div'>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} toggleLoginModal={setOpenLoginModal} />
        </li>
      )}
    </ul>
    <div>
      <LogInModal open={openLoginModal} toggleLoginModal={setOpenLoginModal}/>
    </div>
    </>
  );
}

export default Navigation;
