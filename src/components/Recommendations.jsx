/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchDefaultDrinks, fetchDefaultMeals } from '../services/ApiDefaultSearchFood';

function Recommendations({ history: { location: { pathname } } }) {
  const isMealsOrDrinks = pathname.includes('/meals/') ? 'meals' : 'drinks';
  const [recipesRecommendation, setRecipesRecommendation] = useState([]);

  const maxNumberOfRecommendation = 6;

  const setRecomendations = async () => {
    const recommendationDefault = isMealsOrDrinks === 'meals'
      ? await fetchDefaultDrinks()
      : await fetchDefaultMeals();

    const category = isMealsOrDrinks === 'meals' ? 'drinks' : 'meals';
    setRecipesRecommendation(recommendationDefault[category]
      .slice(0, maxNumberOfRecommendation));
  };

  useEffect(() => {
    setRecomendations();
  }, []);

  return (
    <div className="scroll">
      {recipesRecommendation.map((recipe, index) => (
        <div
          data-testid={ `${index}-recommendation-card` }
          key={ index }
          className="quad"
        >

          <h1 data-testid={ `${index}-recommendation-title` }>
            {recipe.strMeal || recipe.strDrink}
          </h1>
        </div>
      ))}
    </div>
  );
}

Recommendations.propTypes = {}.isRequired;

export default withRouter(Recommendations);
