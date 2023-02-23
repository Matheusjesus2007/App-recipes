/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecipesContext } from '../contexts/RecipesContext';
import { setStartRecipeStorage } from '../helpers/SetStorageFunctions';
import { fetchRecipeDetailsAux,
  filterIngredientsAux } from '../helpers/fetchDetailsAndFilter';
import FavAndShareButton from './FavAndShareButton';
import Recommendations from './Recommendations';
import styles from '../styles/RecipeDetails.module.css';

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

  const { strMealThumb, strDrinkThumb, strMeal, strDrink, strCategory, strAlcoholic,
    strInstructions, strYoutube, idMeal, idDrink } = recipeDetailsRender;
  const recipeId = idMeal || idDrink;
  const title = strMeal || strDrink;
  const recipeThumb = strMealThumb || strDrinkThumb;
  const video = strYoutube && strYoutube.replace('watch?v=', 'embed/');

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
    <section className={ styles.containerDetails }>
      <div className={ styles.containerTitleCategorie }>
        <h1 className={ styles.center } data-testid="recipe-title">{title}</h1>
        <p className={ styles.center } data-testid="recipe-category">
          {idDrink ? `${strCategory} - ${strAlcoholic}` : strCategory}
        </p>
      </div>

      <img
        className={ styles.detailsImg }
        src={ recipeThumb }
        alt={ title }
        data-testid="recipe-photo"
      />

      <div className={ styles.containerIngredients }>
        <p>Ingredients</p>
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
      </div>

      <div className={ styles.containerIntructions }>
        <p>instructions:</p>
        <span data-testid="instructions">{strInstructions}</span>
      </div>

      {isMealsOrDrinks === 'meals'
      && (
        <div className="ratio ratio-16x9">
          <iframe
            src={ video }
            data-testid="video"
            title={ title }
          />
        </div>
      )}

      <div>
        <p className={ styles.titleCarousel }>suggested recipes</p>
        <Recommendations
          fetchRecipeDetails={ fetchRecipeDetails }
          recipesRecommendation={ recipesRecommendation }
        />
      </div>

      <FavAndShareButton
        recipeId={ recipeId }
        type={ isMealsOrDrinks }
      />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className={ styles.startButton }
        onClick={ handleStartOrContinueRecipe }
      >
        {buttonContinueRecipe ? 'Continue Recipes' : 'Start Recipes'}
      </button>
    </section>

  );
}

RecipeDetails.propTypes = {}.isRequired;

export default RecipeDetails;
