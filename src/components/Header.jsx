import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import { HeaderContext } from '../contexts/HeaderContext';
import searchIcon from '../images/searchIcon.svg';
import styles from '../styles/Header.module.css';

function Header({ title }) {
  const [isInputSearchEnabled, setInputSearchEnabled] = useState(false);
  const { inputSearchValue, setInputSearchValue } = useContext(HeaderContext);

  const isSearchableTitle = ['Meals', 'Drinks'].includes(title);

  return (
    <header className={ styles.containerHeader }>
      <Link to="/profile" className={ styles.linkToProfile }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      </Link>
      <h1
        className={ styles.title }
        data-testid="page-title"
      >
        {title}
      </h1>
      { isSearchableTitle && (
        <div className={ styles.inputSearch }>
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
              name="teste"
              data-testid="search-input"
              type="text"
              placeholder="Type Here"
              value={ inputSearchValue }
              onChange={ ({ target }) => setInputSearchValue(target.value) }
            />
          )}
        </div>)}
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
