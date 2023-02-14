/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import FavAndShareButton from '../components/FavAndShareButton';
import FilterMealOrDrink from '../components/FilterMealOrDrink';
import Header from '../components/Header';
import { ButtonsCaterogiriesContext } from '../contexts/ButtonsCategoriesContext';

function FavoriteRecipes() {
  const { renderFavoriteRecipes } = useContext(ButtonsCaterogiriesContext);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <FilterMealOrDrink />
      {renderFavoriteRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
          >
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p
              name="HorizontalName"
              data-testid={ `${index}-horizontal-name` }
            >
              {`${recipe.name}`}
            </p>
          </Link>
          <p
            name="HorizontalTopText"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.nationality ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <FavAndShareButton
            recipeId={ recipe.id }
            type={ `${recipe.type}s` }
            index={ index }
          />
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
