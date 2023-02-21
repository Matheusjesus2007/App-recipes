/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../styles/Recommendations.module.css';

function Recommendations({ fetchRecipeDetails, recipesRecommendation, location }) {
  const { pathname } = location;
  const typeRecommendation = pathname.includes('/meals/') ? 'drinks' : 'meals';

  return (
    <main>
      <h1 className={ styles.titleCarousel }>suggested recipes</h1>
      <section className={ styles.carouselContainer }>
        {recipesRecommendation.map((recipe, index) => {
          const { idMeal, idDrink, strMeal,
            strDrink, strMealThumb, strDrinkThumb } = recipe;
          const recipeId = idMeal || idDrink;
          const recipeName = strMeal || strDrink;
          const recipeThumb = strMealThumb || strDrinkThumb;
          const title = strMeal || strDrink;

          return (
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ recipeId }
              className={ styles.carouselItem }
            >
              <Link
                className={ styles.linkStyles }
                to={ `/${typeRecommendation}/${recipeId}` }
                onClick={ () => fetchRecipeDetails(recipeId, typeRecommendation) }
              >
                <div className={ styles.recommendationCard }>
                  <p data-testid={ `${recipeId}-recommendation-title` }>
                    {recipeName}
                  </p>
                  <img src={ recipeThumb } alt={ title } data-testid="recipe-photo" />
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}

Recommendations.propTypes = {}.isRequired;

export default withRouter(Recommendations);
