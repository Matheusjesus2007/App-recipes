/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import { setStartRecipeStorage } from '../helpers/SetStorageFunctions';
import { fetchDetailsDrinks, fetchDetailstMeals } from '../services/ApiRecipeDetails';
import FavAndShareButton from './FavAndShareButton';
import Recommendations from './Recommendations';

function RecipeDetails({ history, match }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;
  const isMealsOrDrinks = pathname.includes('/meals/') ? 'meals' : 'drinks';

  const { recipeDetailsRender, recipeIngredients,
    setDetailsRender, setRecipeIngredients } = useContext(RecipesContext);

  const { strImageSource, strMeal, strDrink, strCategory, strAlcoholic,
    strInstructions, strYoutube, idMeal, idDrink } = recipeDetailsRender;
  const recipeId = idMeal || idDrink;
  const title = strMeal || strDrink;

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

  const isRecipeInProgress = () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    return (
      progressRecipes[isMealsOrDrinks]
      && progressRecipes[isMealsOrDrinks][recipeId]
    );
  };

  const handleStartOrContinueRecipe = () => {
    const path = `/${isMealsOrDrinks}/${recipeId}/in-progress`;
    if (isRecipeInProgress()) {
      history.push(path);
    } else {
      setStartRecipeStorage(isMealsOrDrinks, recipeId, recipeIngredients);
      history.push(path);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    if (recipeDetailsRender) {
      filterIngredients();
    }
  }, [recipeDetailsRender]);

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
      <Recommendations />
      <FavAndShareButton
        recipeId={ recipeId }
        type={ isMealsOrDrinks }
      />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-button"
        onClick={ handleStartOrContinueRecipe }
      >
        {isRecipeInProgress() ? 'Continue Recipes' : 'Start Recipes'}
      </button>
    </div>

  );
}

RecipeDetails.propTypes = {}.isRequired;

export default RecipeDetails;
