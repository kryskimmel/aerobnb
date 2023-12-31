import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';




function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  return (
    <ul className='nav-links-div'>
      <li className='home' onClick={() => {history.push('/')}}>
        <img src='/images/aerobnb-logo.png' style={{width:"75px", height:"75px"}} alt='aerobnb-logo'/>
      </li>

      <div className='user-options'>
        {sessionUser && (
          <li className='create-spot-link'>
            <NavLink to="/spots/new">Create a New Spot</NavLink>
          </li>
        )}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>

    </ul>
  );
}

export default Navigation;
