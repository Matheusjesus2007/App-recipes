import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={ styles.containerFooter } data-testid="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          type="image/svg+xml"
          alt="Drink Icon"
        />
      </Link>

      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          type="image/svg+xml"
          alt="Meal Icon"
        />
      </Link>
    </footer>
  );
}

export default withRouter(Footer);
