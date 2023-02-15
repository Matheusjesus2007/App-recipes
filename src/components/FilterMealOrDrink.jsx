import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { ButtonsCaterogiriesContext } from '../contexts/ButtonsCategoriesContext';

function FilterMealOrDrink({ history: { location: { pathname } } }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const { setRenderFavoriteRecipes,
    setRenderDoneRecipes } = useContext(ButtonsCaterogiriesContext);

  const isDonePage = pathname.includes('done');
  const setRenderRecipes = isDonePage ? setRenderDoneRecipes : setRenderFavoriteRecipes;
  const recipes = isDonePage ? doneRecipes : favoriteRecipes;

  const handleFilter = ({ target: { value } }) => {
    const filteredRecipes = recipes.filter((recipe) => recipe.type === value);
    setRenderRecipes(filteredRecipes);
  };

  const showAllSavedRecipes = () => {
    setRenderRecipes(recipes);
  };

  return (
    <>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ showAllSavedRecipes }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ handleFilter }
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ handleFilter }
      >
        Drinks
      </button>
    </>
  );
}

FilterMealOrDrink.propTypes = {}.isRequired;

export default withRouter(FilterMealOrDrink);
