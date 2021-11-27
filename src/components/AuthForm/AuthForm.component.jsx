import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../redux/auth/auth.actions';
import {register} from '../../redux/auth/auth.actions';



import './AuthForm.styles.scss';

const AuthForm = ({register, login, action}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword:''
  });

  const {username, password,confirmPassword} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === 'Sign up') {
      register({username, password, confirmPassword});
    } else {
      login({username, password});
    }
  };

  const signUpLink = (
    <Fragment>
      <span style={{fontSize:15}}>Already have an account?</span>{' '}
      <Link to='/login' name='login' style={{fontSize:15}}>
        Log in
      </Link>
    </Fragment>
  );

  const logInLink = (
    <Fragment >
     <span style={{fontSize:15}}> Don't have an account?</span>{' '}
      <Link to='/register' name='register' style={{fontSize:15}}>
        Sign up
      </Link>
    </Fragment>
  );


  
  return (
    <Fragment>
      <div>
        <div className='form-container'>
          <form className='login-form' onSubmit={(e) => onSubmit(e)}>
            <div>
              <label className='form-label s-label fc-black-600'>
                Username
              </label>
              <input
                className='form-input s-input'
                type='text'
                name='username'
                value={username}
                onChange={(e) => onChange(e)}
                id='username'
                required
              />
            </div>
            <div>
              <label className='form-label s-label fc-black-600'>
                Password
              </label>
              <input
                className='form-input s-input'
                type='password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                id='password'
                required
              />
            </div>
            {
              (action==='Sign up') ?  
              ( <div>
              <label className='form-label s-label fc-black-600'>
                Confirm Password
              </label>
              <input
                className='form-input s-input'
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => onChange(e)}
                id='confirmPassword'
                required
              />
            </div>) : ('')
            }
            <div className='grid gs4 gsy fd-column js-auth-item '>
              <button
                className='s-btn s-btn__primary'
                id='submit-button'
                name='submit-button'
              >
                {action}
              </button>
            </div>
          </form>
        </div>
        <div className='redirects fc-black-500'>
          {action === 'Sign up' ? signUpLink : logInLink}
        </div>
      </div>
    </Fragment>
  );
};

AuthForm.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login, register})(AuthForm);
