import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { HeaderContext } from '../contexts/HeaderContext';

function Header({ title }) {
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const { valueInputSearch, setValueInputSearch } = useContext(HeaderContext);

  const activeSearchIcon = ['Meals', 'Drinks'];

  const toggleInputSearch = () => {
    setIsInputDisabled(!isInputDisabled);
  };

  return (
    <>
      <h1 data-testid="page-title">{ title }</h1>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
        />
      </Link>

      { activeSearchIcon.includes(title) && (
        <button
          type="button"
          onClick={ toggleInputSearch }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searchIcon"
          />
        </button>)}

      {!isInputDisabled && <input
        data-testid="search-input"
        type="text"
        value={ valueInputSearch }
        onChange={ (e) => setValueInputSearch(e.target.value) }
      />}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: null,
};

export default Header;
