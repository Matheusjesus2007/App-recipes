/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchDetailsDrinks, fetchDetailstMeals } from '../services/ApiRecipeDetails';
import FavAndShareButton from './FavAndShareButton';

function RecipeInProgress({ history, match }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;
  const isMealsOrDrinks = pathname.includes('/meals/') ? 'meals' : 'drinks';

  const { recipeDetailsRender, recipeIngredients,
    setDetailsRender, setRecipeIngredients } = useContext(RecipesContext);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const { strImageSource, strMeal, strDrink, strCategory, strAlcoholic,
    strInstructions, idMeal, idDrink } = recipeDetailsRender;
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

  const handleCheckboxChange = (index) => {
    setCheckedIngredients((prevCheckedIngredients) => ({
      ...prevCheckedIngredients,
      [index]: !prevCheckedIngredients[index],
    }));
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
    <>
      <img src={ strImageSource } alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{title}</h1>
      <FavAndShareButton
        recipeId={ recipeId }
        type={ isMealsOrDrinks }
      />
      <p data-testid="recipe-category">
        {`${strCategory} - ${strAlcoholic}`}
      </p>
      <p data-testid="instructions">{strInstructions}</p>

      <ol>
        {recipeIngredients.map((ingredient, index) => (
          <div key={ index }>
            <label
              htmlFor={ `checkbox-${index}` }
              data-testid={ `${index}-ingredient-step` }
            >
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
                className={ checkedIngredients[index] ? 'completed' : '' }
              >
                {`${Object.keys(ingredient)} - ${Object.values(ingredient)} `}
              </li>

              <input
                type="checkbox"
                id={ `checkbox-${index}` }
                checked={ !!checkedIngredients[index] }
                onChange={ () => handleCheckboxChange(index) }
              />
            </label>

          </div>
        ))}
      </ol>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </>
  );
}

RecipeInProgress.propTypes = {}.isRequired;

export default withRouter(RecipeInProgress);
