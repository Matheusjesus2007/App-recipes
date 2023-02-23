/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { setDoneRecipesStorage } from '../helpers/SetStorageFunctions';
import FavAndShareButton from '../components/FavAndShareButton';
import { fetchRecipeDetailsAux } from '../helpers/fetchDetailsAndFilter';
import styles from '../styles/RecipeInProgress.module.css';
import IngredientsInProgress from '../components/IngredientsInProgress';

function RecipeInProgress({ history, match }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;

  const isMealsOrDrinks = pathname.includes('/meals/') ? 'meals' : 'drinks';

  const { recipeDetailsRender, setRecipeDetailsRender } = useContext(RecipesContext);
  const [finishButtonIsDisabled, setFinishButtonIsDisabled] = useState(true);
  const [updateInputs, setUpdateInputs] = useState(false);

  const { strMealThumb, strDrinkThumb, strMeal, strDrink,
    strInstructions, idMeal, idDrink } = recipeDetailsRender;
  const recipeId = idMeal || idDrink;
  const title = strMeal || strDrink;
  const recipeThumb = strMealThumb || strDrinkThumb;

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
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const isDone = doneRecipes.some((recipe) => recipe.id === id);
    if (!isDone) {
      setDoneRecipesStorage(recipeDetailsRender);
    }
    history.push('/done-recipes');
  };

  return (
    <section className={ styles.containerProgress }>
      <h1 className={ styles.title } data-testid="recipe-title">{title}</h1>

      <img
        className={ styles.progressImg }
        src={ recipeThumb }
        alt={ title }
        data-testid="recipe-photo"
      />

      <div className={ styles.containerIntructions }>
        <p>instructions:</p>
        <span data-testid="instructions">{strInstructions}</span>
      </div>

      <IngredientsInProgress
        recipeId={ recipeId }
        updateFinishButtonStatus={ updateFinishButtonStatus }
      />

      <div className={ styles.FavoriteShareFinishButton }>
        <FavAndShareButton
          recipeId={ recipeId }
          type={ isMealsOrDrinks }
        />

        <button
          className={ styles.finishButton }
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ finishButtonIsDisabled }
          onClick={ finishRecipe }
        >
          { finishButtonIsDisabled ? 'Complete all steps to finish' : 'Finish Recipe' }
        </button>
      </div>

    </section>
  );
}

RecipeInProgress.propTypes = {}.isRequired;

export default withRouter(RecipeInProgress);
