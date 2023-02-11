/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errorMessageEmail, setErrorMessageEmai] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
    <section>
      <label htmlFor="'input-email'">
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
      <p>{errorMessageEmail}</p>
      <label htmlFor="input-senha">
        <input
          id="input-senha"
          type="password"
          data-testid="password-input"
          placeholder="Senha:"
          onChange={ handleChange }
          name="password"
          value={ user.password }
        />
      </label>
      <p>{errorMessagePassword}</p>
      <button
        type="button"
        disabled={ isButtonDisabled }
        onClick={ submitButton }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
