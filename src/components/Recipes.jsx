/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchCategoriesMeals, fetchCategoriesDrinks } from '../services/ApiCategories';
import { fetchDefaultDrinks, fetchDefaultMeals } from '../services/ApiDefaultSearchFood';
import { fetchByCategoryDrinks, fetchByCategoryMeals } from '../services/ApiByCategories';
import RecipeCard from './RecipeCard';

function Recipes({ history: { location: { pathname } } }) {
  const isMealsOrDrinks = pathname.slice(1);
  const { allRecipes, setRenderRecipes, setAllRecipes } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [existFilter, setExisfilter] = useState('');

  const maxNumberOfRecipes = 12;
  const maxNumberOfCategories = 5;

  const filterAndSetRecipesToRender = () => {
    const limitedRecipes = allRecipes.slice(0, maxNumberOfRecipes);
    setRenderRecipes(limitedRecipes);
  };

  const setDefaultFood = async () => {
    const recipesDefault = isMealsOrDrinks === 'meals'
      ? await fetchDefaultMeals()
      : await fetchDefaultDrinks();
    setAllRecipes(recipesDefault[isMealsOrDrinks]);
  };

  const setDefaulCategories = async () => {
    const defaultCategories = isMealsOrDrinks === 'meals'
      ? await fetchCategoriesMeals()
      : await fetchCategoriesDrinks();
    setCategories(defaultCategories[isMealsOrDrinks].slice(0, maxNumberOfCategories));
  };

  const fetchFoodByCategory = async (category) => {
    const categoryFood = isMealsOrDrinks === 'meals'
      ? await fetchByCategoryMeals(category)
      : await fetchByCategoryDrinks(category);
    setAllRecipes(categoryFood[isMealsOrDrinks]);
    setExisfilter(category);
  };

  const handleFoodCategoryFilter = async ({ target: { value } }) => {
    if (existFilter === value) {
      setExisfilter('');
      return setDefaultFood();
    }
    fetchFoodByCategory(value);
  };

  useEffect(() => {
    setDefaultFood();
    setDefaulCategories();
  }, []);

  useEffect(() => {
    filterAndSetRecipesToRender();
  }, [allRecipes]);

  return (
    <>
      <nav>
        {categories.map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            value={ category.strCategory }
            onClick={ handleFoodCategoryFilter }
          >
            {category.strCategory}
          </button>
        ))}
      </nav>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ setDefaultFood }
      >
        ALL

      </button>
      <RecipeCard />
    </>
  );
}

Recipes.propTypes = {}.isRequired;

export default withRouter(Recipes);
