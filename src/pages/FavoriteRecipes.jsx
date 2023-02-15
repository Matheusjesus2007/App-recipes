/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavAndShareButton from '../components/FavAndShareButton';
import FilterMealOrDrink from '../components/FilterMealOrDrink';
import Header from '../components/Header';
import { ButtonsCaterogiriesContext } from '../contexts/ButtonsCategoriesContext';

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
          <section key={ id }>
            <Link
              to={ `/${type}s/${id}` }
            >
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                name="HorizontalName"
                data-testid={ `${index}-horizontal-name` }
              >
                {`${name}`}
              </p>
            </Link>
            <p
              name="HorizontalTopText"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {nationality ? `${nationality} - ${category}`
                : `${alcoholicOrNot}`}
            </p>
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
