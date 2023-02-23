import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Profile.module.css';
import foods from '../images/banquete.jpg';

function Profile({ history }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const logoutUserAndClearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <section className={ styles.containerProfile }>
      <Header title="Profile" />

      <h1
        className={ styles.emailUser }
        htmlFor="input-email"
        type="email"
        name="email"
        data-testid="profile-email"
      >
        { user && `User: ${user.email}` }
      </h1>

      <div className={ styles.containerRoutes }>
        <div className={ styles.containerDoneAndFavorite }>

          <Link to="/done-recipes">
            <button
              type="button"
              name="done-recipes"
              data-testid="profile-done-btn"
            >
              Done Recipes
            </button>
          </Link>

          <Link to="/favorite-recipes">
            <button
              type="button"
              name="bnt-favorite"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>
        </div>

        <div className={ styles.containerDoneAndFavorite }>
          <Link to="/">
            <button
              type="button"
              name="btn-logout"
              data-testid="profile-logout-btn"
              onClick={ logoutUserAndClearLocalStorage }
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className={ styles.wallpaperChef }>
        <img src={ foods } alt="cozinheiro" />
      </div>
      <Footer />
    </section>
  );
}

Profile.propTypes = {}.isRequired;

export default withRouter(Profile);
