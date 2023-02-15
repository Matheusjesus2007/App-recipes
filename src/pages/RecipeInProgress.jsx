/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { setDoneRecipesStorage,
  setStartRecipeStorage } from '../helpers/SetStorageFunctions';
import { fetchDetailsDrinks, fetchDetailstMeals } from '../services/ApiRecipeDetails';
import FavAndShareButton from '../components/FavAndShareButton';

function RecipeInProgress({ history, match }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;
  const isMealsOrDrinks = pathname.includes('/meals/') ? 'meals' : 'drinks';

  const { recipeDetailsRender, recipeIngredients,
    setDetailsRender, setRecipeIngredients } = useContext(RecipesContext);
  const [clicked, setClicked] = useState(false);
  const [finishButtonIsDisabled, setFinishButtonIsDisabled] = useState(true);

  const { strImageSource, strMeal, strDrink, strCategory,
    strInstructions, idMeal, idDrink } = recipeDetailsRender;
  const recipeId = idMeal || idDrink;
  const title = strMeal || strDrink;

  const filterIngredients = () => {
    const ingredientEntries = Object.entries(recipeDetailsRender);

    const filteredEntries = ingredientEntries
      .filter(([key, value]) => key.includes('Ingredient') && value);

    const ingredients = filteredEntries.map(([key, value]) => {
      const numberBase = key.replace(/[^0-9]/g, '');
      const measure = recipeDetailsRender[`strMeasure${numberBase}`] || 'To Taste';
      return { [value]: measure, checked: false };
    });

    setRecipeIngredients(ingredients);
  };

  const fetchDetails = async () => {
    const recipeDetailsFetch = isMealsOrDrinks === 'meals'
      ? await fetchDetailstMeals(id)
      : await fetchDetailsDrinks(id);
    setDetailsRender(recipeDetailsFetch[isMealsOrDrinks][0]);
  };

  const isChecked = (ingredient) => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!progressRecipes) return false;
    const currentRecipeIngredients = progressRecipes[isMealsOrDrinks][recipeId];
    const ingredientStatus = currentRecipeIngredients.find((obj) => obj[ingredient]);
    return ingredientStatus ? ingredientStatus.checked : false;
  };

  const getInProgressRecipes = () => {
    let progRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!progRecipes) {
      progRecipes = setStartRecipeStorage(isMealsOrDrinks, recipeId, recipeIngredients);
      progRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    return progRecipes;
  };

  const handleCheckboxChange = (ingredient) => {
    let progressRecipes = getInProgressRecipes();
    const updatedArray = progressRecipes[isMealsOrDrinks][recipeId].map(
      (obj) => (obj[ingredient] ? { ...obj, checked: !obj.checked } : obj),
    );
    progressRecipes = {
      ...progressRecipes,
      [isMealsOrDrinks]: {
        ...progressRecipes[isMealsOrDrinks],
        [recipeId]: updatedArray,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipes));
    setClicked(!clicked);
  };

  const finishRecipe = () => {
    setDoneRecipesStorage(recipeDetailsRender);
    history.push('/done-recipes');
  };

  useEffect(() => {
    if (recipeId) {
      const progressRecipes = getInProgressRecipes();
      const statusFinishButton = progressRecipes[isMealsOrDrinks][recipeId].some(
        ({ checked }) => !checked,
      );
      setFinishButtonIsDisabled(statusFinishButton);
    }
  }, [clicked]);

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    if (recipeDetailsRender) {
      filterIngredients();
    }
  }, [recipeDetailsRender]);

  return (
    <>
      <img src={ strImageSource } alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{title}</h1>
      <FavAndShareButton
        recipeId={ recipeId }
        type={ isMealsOrDrinks }
      />
      <p data-testid="recipe-category">
        {`${strCategory}`}
      </p>
      <p data-testid="instructions">{strInstructions}</p>

      {recipeIngredients.map((ingredient, index) => (
        <section key={ index }>
          <label
            htmlFor={ `checkbox-${index}` }
            data-testid={ `${index}-ingredient-step` }
            className={ isChecked(Object.keys(ingredient)[0]) ? 'completed' : '' }
          >
            {`${Object.keys(ingredient)[0]} 
            - ${Object.values(ingredient)[0] || 'To Taste'} `}

            <input
              type="checkbox"
              id={ `checkbox-${index}` }
              checked={ isChecked(Object.keys(ingredient)[0]) }
              onChange={ () => handleCheckboxChange(Object.keys(ingredient)[0]) }
            />
          </label>

        </section>
      ))}

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ finishButtonIsDisabled }
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
    </>
  );
}

RecipeInProgress.propTypes = {}.isRequired;

export default withRouter(RecipeInProgress);
