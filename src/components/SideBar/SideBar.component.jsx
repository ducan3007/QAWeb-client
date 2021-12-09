import React from 'react';
import {NavLink} from 'react-router-dom';


import './SideBar.styles.scss';

const SideBar = () => (
  <div className='side-bar-container'>
    <div className='side-bar-tabs'>
      <div className='public-tabs'>
      <NavLink
        exact
        activeClassName='active'
        className='link nav_link'
        to='/'
      >
        <p>Home</p>
      </NavLink>
        <NavLink
          activeClassName='active'
          className='link nav_link'
          to='/questions'
        >
          <p>
            All Questions
          </p>
        </NavLink>
        <NavLink activeClassName='active' className='link nav_link' to='/tags'>
          <p>Tags</p>
        </NavLink>
        <NavLink activeClassName='active' className='link nav_link' to='/users'>
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  </div>
);

export default SideBar;
