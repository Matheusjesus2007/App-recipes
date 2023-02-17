/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { setDoneRecipesStorage } from '../helpers/SetStorageFunctions';
import FavAndShareButton from '../components/FavAndShareButton';
import { fetchRecipeDetailsAux } from '../helpers/fetchDetailsAndFilter';
import ProgressIngredients from '../components/IngredientsInProgress';

function RecipeInProgress({ history, match }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;

  const isMealsOrDrinks = pathname.includes('/meals/') ? 'meals' : 'drinks';

  const { recipeDetailsRender, setRecipeDetailsRender } = useContext(RecipesContext);
  const [finishButtonIsDisabled, setFinishButtonIsDisabled] = useState(true);
  const [updateInputs, setUpdateInputs] = useState(false);

  const { strMealThumb, strDrinkThumb, strMeal, strDrink, strCategory,
    strInstructions, idMeal, idDrink } = recipeDetailsRender;
  const recipeId = idMeal || idDrink;
  const title = strMeal || strDrink;
  const image = strMealThumb || strDrinkThumb;

  const fetchRecipeDetails = async (newRecipeId, recipeType) => {
    const recipeDetailsFetch = await fetchRecipeDetailsAux(newRecipeId, recipeType);
    setRecipeDetailsRender(recipeDetailsFetch);
  };

  useEffect(() => {
    fetchRecipeDetails(id, isMealsOrDrinks);
  }, []);

  const updateFinishButtonStatus = () => {
    if (recipeId) {
      const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const statusFinishButton = progressRecipes[isMealsOrDrinks][recipeId].some(
        ({ checked }) => !checked,
      );
      setUpdateInputs(!updateInputs);
      setFinishButtonIsDisabled(statusFinishButton);
    }
  };

  const finishRecipe = () => {
    setDoneRecipesStorage(recipeDetailsRender);
    history.push('/done-recipes');
  };

  return (
    <section>
      <h1 data-testid="recipe-title">{title}</h1>
      <p data-testid="recipe-category">
        { strCategory }
      </p>
      <img src={ image } alt={ title } data-testid="recipe-photo" />
      <p data-testid="instructions">{strInstructions}</p>

      <ProgressIngredients
        recipeId={ recipeId }
        updateFinishButtonStatus={ updateFinishButtonStatus }
      />
      <FavAndShareButton
        recipeId={ recipeId }
        type={ isMealsOrDrinks }
      />

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ finishButtonIsDisabled }
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
    </section>
  );
}

RecipeInProgress.propTypes = {}.isRequired;

export default withRouter(RecipeInProgress);
