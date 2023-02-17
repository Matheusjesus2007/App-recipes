/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Recommendations({ fetchRecipeDetails, recipesRecommendation, location }) {
  const { pathname } = location;
  const typeRecommendation = pathname.includes('/meals/') ? 'drinks' : 'meals';

  return (
    <section className="scroll">
      {recipesRecommendation.map((recipe, index) => {
        const { idMeal, idDrink, strMeal, strDrink } = recipe;
        const recipeId = idMeal || idDrink;
        const recipeName = strMeal || strDrink;

        return (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ recipeId }
            className="quad"
          >
            <Link
              to={ `/${typeRecommendation}/${recipeId}` }
              onClick={ () => fetchRecipeDetails(recipeId, typeRecommendation) }
            >
              <h1 data-testid={ `${recipeId}-recommendation-title` }>
                {recipeName}
              </h1>
            </Link>
          </div>
        );
      })}
    </section>
  );
}

Recommendations.propTypes = {}.isRequired;

export default withRouter(Recommendations);
