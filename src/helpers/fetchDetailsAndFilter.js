import { fetchDetailsDrinks, fetchDetailstMeals } from '../services/ApiRecipeDetails';

export const fetchRecipeDetailsAux = async (newRecipeId, recipeType) => {
  const recipeDetailsFetch = recipeType === 'meals'
    ? await fetchDetailstMeals(newRecipeId)
    : await fetchDetailsDrinks(newRecipeId);
  return recipeDetailsFetch[recipeType][0];
};

export const filterIngredientsAux = (recipeDetailsRender) => {
  const ingredientEntries = Object.entries(recipeDetailsRender);

  const filteredEntries = ingredientEntries
    .filter(([key, value]) => key.includes('Ingredient') && value);

  const ingredients = filteredEntries.map(([key, value]) => {
    const numberBase = key.replace(/[^0-9]/g, '');
    const measure = recipeDetailsRender[`strMeasure${numberBase}`] || 'To Taste';
    return { [value]: measure, checked: false };
  });
  return ingredients;
};
