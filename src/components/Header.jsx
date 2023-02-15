import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import { HeaderContext } from '../contexts/HeaderContext';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [isInputSearchEnabled, setInputSearchEnabled] = useState(false);
  const { inputSearchValue, setInputSearchValue } = useContext(HeaderContext);

  const isSearchableTitle = ['Meals', 'Drinks'].includes(title);

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>

      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      </Link>

      { isSearchableTitle && (
        <button
          type="button"
          onClick={ () => setInputSearchEnabled(!isInputSearchEnabled) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Ícone de busca"
          />
        </button>
      )}

      {isInputSearchEnabled && (
        <input
          data-testid="search-input"
          type="text"
          value={ inputSearchValue }
          onChange={ ({ target }) => setInputSearchValue(target.value) }
        />
      )}

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: null,
};

export default Header;
