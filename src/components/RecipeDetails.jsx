/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import { setStartRecipeStorage } from '../helpers/SetStorageFunctions';
import { fetchRecipeDetailsAux,
  filterIngredientsAux } from '../helpers/fetchDetailsAndFilter';
import FavAndShareButton from './FavAndShareButton';
import Recommendations from './Recommendations';

function RecipeDetails({ history, match }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;
  const maxNumberOfRecommendation = 6;

  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  const isMealsOrDrinks = pathname.includes('/meals/') ? 'meals' : 'drinks';
  const typeRecommendation = pathname.includes('/meals/') ? 'drinks' : 'meals';

  const { recipeDetailsRender, recipeIngredients,
    setRecipeDetailsRender, setRecipeIngredients } = useContext(RecipesContext);
  const [recipesRecommendation, setRecipesRecommendation] = useState([]);
  const [buttonContinueRecipe, setButtonContinueRecipe] = useState(false);

  const { strImageSource, strMeal, strDrink, strCategory, strAlcoholic,
    strInstructions, strYoutube, idMeal, idDrink } = recipeDetailsRender;
  const recipeId = idMeal || idDrink;
  const title = strMeal || strDrink;

  const fetchRecipeDetails = async (newRecipeId, recipeType) => {
    const recipeDetailsFetch = await fetchRecipeDetailsAux(newRecipeId, recipeType);
    setRecipeDetailsRender(recipeDetailsFetch);
  };

  const filterIngredients = () => {
    const ingredients = filterIngredientsAux(recipeDetailsRender);
    setRecipeIngredients(ingredients);
  };

  const handleStartOrContinueRecipe = () => {
    const path = `/${isMealsOrDrinks}/${recipeId}/in-progress`;
    if (buttonContinueRecipe) {
      history.push(path);
    } else {
      setStartRecipeStorage(isMealsOrDrinks, recipeId, recipeIngredients);
      history.push(path);
    }
  };

  const setRecomendations = async () => {
    const defaultFood = JSON.parse(localStorage.getItem('defaultFood'));
    setRecipesRecommendation(defaultFood[typeRecommendation]
      .slice(0, maxNumberOfRecommendation));
  };

  useEffect(() => {
    fetchRecipeDetails(id, isMealsOrDrinks);
  }, []);

  useEffect(() => {
    setRecomendations();
    if (recipeDetailsRender) {
      filterIngredients();
      setButtonContinueRecipe(
        progressRecipes[isMealsOrDrinks]
        && progressRecipes[isMealsOrDrinks][recipeId],
      );
    }
  }, [recipeDetailsRender]);

  return (
    <section>
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
            {`${Object.keys(ingredient)[0]} 
            - ${Object.values(ingredient)[0]} `}
          </li>
        ))}
      </ol>
      <p data-testid="instructions">{strInstructions}</p>
      {isMealsOrDrinks === 'meals' && <iframe
        src={ strYoutube }
        data-testid="video"
        width="480"
        height="350"
        title={ title }
      />}

      <Recommendations
        fetchRecipeDetails={ fetchRecipeDetails }
        recipesRecommendation={ recipesRecommendation }
      />
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
        {buttonContinueRecipe ? 'Continue Recipes' : 'Start Recipes'}
      </button>
    </section>
  );
}

RecipeDetails.propTypes = {}.isRequired;

export default RecipeDetails;
