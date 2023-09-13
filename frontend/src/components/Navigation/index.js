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
        <NavLink exact to="/">Home</NavLink>
      </li>
      <div className='user-options'>
        {sessionUser && (
          <li>
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
