/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { fetchDefaultDrinks, fetchDefaultMeals } from '../services/ApiDefaultSearchFood';

function Recommendations({ history: { location: { pathname } } }) {
  const [recipesRecommendation, setRecipesRecommendation] = useState([]);

  const typeRecommendation = pathname.includes('/meals/') ? 'drinks' : 'meals';
  const maxNumberOfRecommendation = 6;

  const setRecomendations = async () => {
    let defaultFood = JSON.parse(localStorage.getItem('defaultFood'));

    if (!defaultFood || !defaultFood[typeRecommendation]) {
      const defaultMeals = await fetchDefaultMeals();
      const defaultDrinks = await fetchDefaultDrinks();
      localStorage.setItem('defaultFood', JSON.stringify({
        meals: defaultMeals.meals,
        drinks: defaultDrinks.drinks }));
    }
    defaultFood = JSON.parse(localStorage.getItem('defaultFood'));
    setRecipesRecommendation(defaultFood[typeRecommendation] || []
      .slice(0, maxNumberOfRecommendation));
  };

  useEffect(() => {
    setRecomendations();
  }, []);

  useEffect(() => {
  }, [typeRecommendation]);

  return (
    <div className="scroll">
      {recipesRecommendation.map((recipe, index) => (
        <div
          data-testid={ `${index}-recommendation-card` }
          key={ index }
          className="quad"
        >
          <Link to={ `/${typeRecommendation}/${recipe.idMeal || recipe.idDrink}` }>
            <h1 data-testid={ `${index}-recommendation-title` }>
              {recipe.strMeal || recipe.strDrink}
            </h1>
          </Link>
        </div>
      ))}
    </div>
  );
}

Recommendations.propTypes = {}.isRequired;

export default withRouter(Recommendations);
