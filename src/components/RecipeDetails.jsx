/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchDetailsDrinks, fetchDetailstMeals } from '../services/ApiRecipeDetails';

function RecipeDetails({ history, match }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;
  const isMealsOrDrinks = pathname.includes('/meals/') ? 'meals' : 'drinks';

  const { recipeDetailsRender, setDetailsRender } = useContext(RecipesContext);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const filterIngredients = () => {
    const ingredientEntries = Object.entries(recipeDetailsRender);

    const filteredEntries = ingredientEntries
      .filter(([key, value]) => key.includes('Ingredient') && value);

    const ingredients = filteredEntries.map(([key, value]) => {
      const numberBase = key.replace(/[^0-9]/g, '');
      const measure = recipeDetailsRender[`strMeasure${numberBase}`];
      return { [value]: measure };
    });

    setRecipeIngredients(ingredients);
  };

  const fetchDetails = async () => {
    const recipeDetailsFetch = isMealsOrDrinks === 'meals'
      ? await fetchDetailstMeals(id)
      : await fetchDetailsDrinks(id);
    setDetailsRender(recipeDetailsFetch[isMealsOrDrinks][0]);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    if (recipeDetailsRender) {
      filterIngredients();
    }
  }, [recipeDetailsRender]);

  const { strImageSource, strMeal, strDrink, strCategory, strAlcoholic,
    strInstructions, strYoutube } = recipeDetailsRender;

  const title = strMeal || strDrink;
  return (

    <div>
      <img src={ strImageSource } alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{title}</h1>
      <p data-testid="recipe-category">
        {`${strCategory} - ${strAlcoholic}`}
      </p>
      <ol>
        {recipeIngredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${Object.keys(ingredient)} - ${Object.values(ingredient)} `}

          </li>
        ))}
      </ol>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        src={ strYoutube }
        data-testid="video"
        width="480"
        height="350"
        title={ title }
      />
    </div>

  );
}

RecipeDetails.propTypes = {}.isRequired;

export default RecipeDetails;
