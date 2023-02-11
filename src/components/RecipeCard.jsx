import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';

function RecipeCard({ history: { location: { pathname } } }) {
  const { renderRecipes } = useContext(RecipesContext);
  return (
    <div>
      {renderRecipes && renderRecipes.map((recipe, index) => {
        const { idMeal, idDrink, strMeal,
          strDrink, strMealThumb, strDrinkThumb } = recipe;

        const recipeId = idMeal || idDrink;
        const recipeName = strMeal || strDrink;
        const recipeThumb = strMealThumb || strDrinkThumb;

        return (
          <Link
            to={ `${pathname}/${recipeId}` }
            key={ index }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>
                {recipeName}
              </p>
              <img
                src={ recipeThumb }
                alt={ recipeThumb }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

RecipeCard.propTypes = {}.isRequired;

export default withRouter(RecipeCard);
