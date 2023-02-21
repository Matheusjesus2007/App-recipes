/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchCategoriesMeals, fetchCategoriesDrinks } from '../services/ApiCategories';
import { fetchDefaultDrinks, fetchDefaultMeals } from '../services/ApiDefaultSearchFood';
import { fetchByCategoryDrinks, fetchByCategoryMeals } from '../services/ApiByCategories';
import RecipeCard from './RecipeCard';
import styles from '../styles/Recipes.module.css';

function Recipes({ history: { location: { pathname } } }) {
  const isMealsOrDrinks = pathname.slice(1);
  const { allRecipes, renderRecipes,
    setRenderRecipes, setAllRecipes } = useContext(RecipesContext);
  const [initialCategories, setInitialCategories] = useState([]);
  const [categoryInUse, setCategoryInUse] = useState('');

  const maxNumberOfRecipes = 12;
  const maxNumberOfCategories = 5;

  const filterAndSetRecipesToRender = () => {
    const limitedRecipes = allRecipes.slice(0, maxNumberOfRecipes);
    setRenderRecipes(limitedRecipes);
  };

  const setDefaultFood = async () => {
    let defaultFood = JSON.parse(localStorage.getItem('defaultFood'));

    if (!defaultFood || !defaultFood[isMealsOrDrinks]) {
      const defaultMeals = await fetchDefaultMeals();
      const defaultDrinks = await fetchDefaultDrinks();
      localStorage.setItem('defaultFood', JSON.stringify({
        meals: defaultMeals.meals,
        drinks: defaultDrinks.drinks }));
    }
    defaultFood = JSON.parse(localStorage.getItem('defaultFood'));
    setAllRecipes(defaultFood[isMealsOrDrinks] || []);
  };

  const setDefaultCategories = async () => {
    let defaultCategories = JSON.parse(localStorage.getItem('defaultCategories'));

    if (!defaultCategories || !defaultCategories[isMealsOrDrinks]) {
      const defaultCategoriesMeals = await fetchCategoriesMeals();
      const defaultCategoriesDrinks = await fetchCategoriesDrinks();

      localStorage.setItem('defaultCategories', JSON.stringify({
        meals: defaultCategoriesMeals.meals,
        drinks: defaultCategoriesDrinks.drinks,
      }));
    }
    defaultCategories = JSON.parse(localStorage.getItem('defaultCategories'));
    setInitialCategories(defaultCategories[isMealsOrDrinks]
      .slice(0, maxNumberOfCategories));
  };

  const fetchFoodByCategory = async (category) => {
    const recipesByCategory = isMealsOrDrinks === 'meals'
      ? await fetchByCategoryMeals(category)
      : await fetchByCategoryDrinks(category);
    setAllRecipes(recipesByCategory[isMealsOrDrinks]);
    setCategoryInUse(category);
  };

  const handleCategoryFilterChange = async ({ target: { value } }) => {
    if (categoryInUse === value) {
      setCategoryInUse('');
      return setDefaultFood();
    }
    fetchFoodByCategory(value);
  };

  useEffect(() => {
    setDefaultFood();
    setDefaultCategories();
  }, []);

  useEffect(() => {
    filterAndSetRecipesToRender();
  }, [allRecipes]);

  return (
    <main className={ styles.containerRecipes }>
      <section className={ styles.containerButtons }>
        <h3>Menu Suggestions</h3>
        <div className={ styles.containerCategories }>
          {initialCategories.map(({ strCategory }) => (
            <button
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              value={ strCategory }
              onClick={ handleCategoryFilterChange }
              selected="selected"
            >
              {strCategory}
            </button>
          ))}
        </div>
        <button
          className={ styles.btnAllCategories }
          type="button"
          data-testid="All-category-filter"
          onClick={ setDefaultFood }
          selected="selected"
        >
          ALL
        </button>
      </section>
      {renderRecipes && <RecipeCard recipes={ renderRecipes } />}
    </main>
  );
}

Recipes.propTypes = {}.isRequired;

export default withRouter(Recipes);
