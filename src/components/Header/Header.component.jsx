import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/auth/auth.actions';

import { ReactComponent as Search } from '../../assets/Search.svg';
import Spinner from '../Spinner/Spinner.component';
import SideMenuBar from '../MenuBar/SideMenuBar.component';
import LinkButton from '../LinkButton/LinkButton.component';

import './Header.styles.scss';

const Header = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [show, setShow] = useState(false);

  let history = useHistory();


  const authLinks = (
    <div className='btns'>
      {loading || user === null ? (
        <Spinner width='50px' height='50px' />
      ) : (
        <a href={`/users/${user?.id}`}>
          <img
            alt='user-logo'
            className='logo'
            src={`https://secure.gravatar.com/avatar/${user?.id}?s=164&d=identicon`}
          />
        </a>
      )}
      <LinkButton
        text={'Log out'}
        link={'/login'}
        type={'s-btn__filled'}
        handleClick={logout}
      />
      
    </div>
  );

  const guestLinks = (
    <div className='btns'>
      <LinkButton text={'Log in'} link={'/login'} type={'btn-login'} />
      <LinkButton text={'Sign up'} link={'/register'} type={'btn-signup'} />
    </div>
  );

  const SearchBar = () => {
    return (
      <form
          onSubmit={(e) => history.push(`/questions`)}
          className = 'subForm'
          autoComplete='off'
      >
        <input
              autoComplete='off'
              type='text'
              name='search'
              maxLength='35'
              placeholder='Search...'
            />
      </form>
    );
  } 

  return loading ? (
    ''
  ) : (
    <Fragment>
   
      <nav className='navbar fixed-top navbar-expand-lg navbar-light bs-md'>
        <div className='flex-item'>
          <SideMenuBar className='hidden menu' />
          <Link  to='/'>
          <div className="logo-brand"></div>
          </Link>
         
        </div>
        <form
          id='search'
          onSubmit={(e) => history.push(`/questions`)}
          className={`grid--cell fl-grow1 searchbar px12 js-searchbar`}
          autoComplete='off'
        >
          <div className='ps-relative search-frame'>
            <input
              className='s-input s-input__search h100 search-box'
              autoComplete='off'
              type='text'
              name='search'
              maxLength='35'
              placeholder='Search...'
            />
            <Search />
          </div>
        </form>
        <div className='flex-item'>
          
            
            <Search className='hidden searchBtn' onClick = {() => setShow(!show)} />
          
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </nav>
      {show && <SearchBar/>}
    </Fragment>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
