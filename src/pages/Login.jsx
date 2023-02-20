/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import openEye from '../images/fa-eye.png';
import closedEye from '../images/fa-eye-slash.png';

function Login({ history }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errorMessageEmail, setErrorMessageEmai] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPassWord, setShowPassWord] = useState(false);

  const regex = /\S+@\S+\.\S+/;
  const minPasswordLength = 6;
  const isEmailValid = regex.test(user.email);
  const isPasswordValid = user.password.length > minPasswordLength;

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitButton = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/meals');
  };

  useEffect(() => {
    if (user.email.length > 0 && !isEmailValid) {
      setErrorMessageEmai('Invalid email address');
    } else {
      setErrorMessageEmai('');
    }

    if (user.password.length > 0 && !isPasswordValid) {
      setErrorMessagePassword('Password must be at least 6 characters long');
    } else {
      setErrorMessagePassword('');
    }

    setIsButtonDisabled(!isEmailValid || !isPasswordValid);
  }, [user.email, user.password]);

  return (
    <main className={ styles.containerMain }>
      <form className={ styles.containerForm }>
        <h1>Welcome</h1>
        <label
          htmlFor="'input-email'"
          className={ styles.labelEmail }
        >
          <input
            id="input-email"
            type="email"
            data-testid="email-input"
            placeholder="Email:"
            onChange={ handleChange }
            name="email"
            value={ user.email }
          />
        </label>
        <p className={ styles.errorMessage }>{errorMessageEmail}</p>
        <label
          htmlFor="input-senha"
          className={ styles.labelPass }
        >
          <input
            id="input-senha"
            type={ showPassWord ? 'text' : 'password' }
            data-testid="password-input"
            placeholder="Senha:"
            onChange={ handleChange }
            name="password"
            value={ user.password }
          />
          <button
            className={ styles.btnEyes }
            type="button"
            onClick={ () => setShowPassWord(!showPassWord) }
          >
            <img
              className={ styles.eyes }
              src={ showPassWord ? openEye : closedEye }
              alt={ showPassWord ? 'open Eye' : 'closed Eye' }

            />
          </button>
        </label>
        <p className={ styles.errorMessage }>{errorMessagePassword}</p>
        <label htmlFor="input-remember" className={ styles.containerRemember }>
          Remember me
          <input
            id="input-remember"
            type="checkbox"
            name="remember"
          />
        </label>
        <Link to="*" className={ styles.forgotPassword }>Forgot password?</Link>
        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ submitButton }
          data-testid="login-submit-btn"
          className={ styles.buttonSingIn }
        >
          Sign in
        </button>
      </form>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
