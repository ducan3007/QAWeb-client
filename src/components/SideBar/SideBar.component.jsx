import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';


import './SideBar.styles.scss';

const SideBar = ({auth:{loading}}) =>{
  return (
    <div className='side-bar-container'>
    {
      loading ? ("") :
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
    }
      
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps,null)(SideBar);
