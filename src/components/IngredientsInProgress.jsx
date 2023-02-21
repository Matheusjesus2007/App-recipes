/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { filterIngredientsAux } from '../helpers/fetchDetailsAndFilter';

function IngredientsInProgress({ location, recipeId, updateFinishButtonStatus }) {
  const { pathname } = location;
  const isMealsOrDrinks = pathname.includes('/meals/') ? 'meals' : 'drinks';

  const { recipeDetailsRender, recipeIngredients,
    setRecipeIngredients } = useContext(RecipesContext);

  const filterIngredients = () => {
    const ingredients = filterIngredientsAux(recipeDetailsRender);
    setRecipeIngredients(ingredients);
  };

  const checkIngredient = (ingredient) => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const currentRecipeIngredients = progressRecipes[isMealsOrDrinks][recipeId];
    const ingredientStatus = currentRecipeIngredients.find((obj) => obj[ingredient]);
    return ingredientStatus ? ingredientStatus.checked : false;
  };

  const handleCheckboxChange = (ingredient) => {
    let progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
    updateFinishButtonStatus();
  };
  useEffect(() => {
    if (recipeDetailsRender) {
      filterIngredients();
    }
    updateFinishButtonStatus();
  }, [recipeDetailsRender]);

  return (
    recipeIngredients.map((ingredient, index) => (
      <section key={ index }>
        <label
          htmlFor={ `checkbox-${index}` }
          data-testid={ `${index}-ingredient-step` }
          className={ checkIngredient(Object.keys(ingredient)[0]) ? 'completed' : '' }
        >
          {`${Object.keys(ingredient)[0]} 
            - ${Object.values(ingredient)[0]} `}

          <input
            type="checkbox"
            id={ `checkbox-${index}` }
            checked={ checkIngredient(Object.keys(ingredient)[0]) }
            onChange={ () => handleCheckboxChange(Object.keys(ingredient)[0]) }
          />
        </label>

      </section>
    ))
  );
}

export default withRouter(IngredientsInProgress);
