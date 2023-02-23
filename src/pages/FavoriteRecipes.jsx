/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavAndShareButton from '../components/FavAndShareButton';
import FilterMealOrDrink from '../components/FilterMealOrDrink';
import Header from '../components/Header';
import { ButtonsCaterogiriesContext } from '../contexts/ButtonsCategoriesContext';
import styles from '../styles/FavoriteRecipes.module.css';

function FavoriteRecipes() {
  const { renderFavoriteRecipes,
    setRenderFavoriteRecipes } = useContext(ButtonsCaterogiriesContext);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setRenderFavoriteRecipes(favoriteRecipes);
  }, []);

  return (
    <>
      <Header title="Favorite Recipes" />
      <FilterMealOrDrink />
      {renderFavoriteRecipes.map((recipe, index) => {
        const { image, nationality, category, id,
          type, name, alcoholicOrNot } = recipe;

        return (
          <section key={ id } className={ styles.containerFavoriteRecipes }>
            <Link
              className={ styles.linkFavoriteRecipes }
              to={ `/${type}s/${id}` }
            >
              <h1 data-testid={ `${index}-horizontal-name` }>{ name }</h1>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div
              className={ styles.containerTopText }
              data-testid={ `${index}-horizontal-top-text` }
            >
              {type === 'drink'
                ? (
                  <div>
                    <p>{`Category: ${category}`}</p>
                    <p>{`Alcoholic: ${alcoholicOrNot}`}</p>

                  </div>
                ) : (
                  <div>
                    <p>{`Category: ${category}`}</p>
                    <p>{`Nationality: ${nationality}`}</p>

                  </div>)}
            </div>
            <FavAndShareButton
              curRecipe={ recipe }
              recipeId={ id }
              type={ `${type}s` }
              index={ index }
            />
          </section>
        );
      })}
    </>
  );
}

export default FavoriteRecipes;
