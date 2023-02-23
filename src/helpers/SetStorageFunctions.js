export const setStartRecipeStorage = (isMealsOrDrinks, recipeId, recipeIngredients) => {
  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  localStorage.setItem('inProgressRecipes', JSON.stringify(
    { ...progressRecipes,
      [isMealsOrDrinks]: {
        ...progressRecipes[isMealsOrDrinks],
        [recipeId]: recipeIngredients,
      },
    },
  ));
};

export const setFavoriteRecipesStorage = (recipeDetailsRender) => {
  const recipeData = {
    id: recipeDetailsRender.idMeal || recipeDetailsRender.idDrink,
    type: recipeDetailsRender.idMeal ? 'meal' : 'drink',
    nationality: recipeDetailsRender.strArea || '',
    category: recipeDetailsRender.strCategory || '',
    alcoholicOrNot: recipeDetailsRender.strAlcoholic || '',
    name: recipeDetailsRender.idMeal
      ? recipeDetailsRender.strMeal
      : recipeDetailsRender.strDrink,
    image: recipeDetailsRender.idMeal
      ? recipeDetailsRender.strMealThumb
      : recipeDetailsRender.strDrinkThumb,
  };

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  localStorage.setItem('favoriteRecipes', JSON.stringify(
    [...favoriteRecipes, recipeData],
  ));
};

export const setDoneRecipesStorage = (recipeDetailsRender) => {
  const recipeData = {
    id: recipeDetailsRender.idMeal || recipeDetailsRender.idDrink,
    type: recipeDetailsRender.idMeal ? 'meal' : 'drink',
    nationality: recipeDetailsRender.strArea || '',
    category: recipeDetailsRender.strCategory || '',
    alcoholicOrNot: recipeDetailsRender.strAlcoholic || '',
    name: recipeDetailsRender.idMeal
      ? recipeDetailsRender.strMeal
      : recipeDetailsRender.strDrink,
    image: recipeDetailsRender.idMeal
      ? recipeDetailsRender.strMealThumb
      : recipeDetailsRender.strDrinkThumb,
    doneDate: new Date().toLocaleString(),
    tags: recipeDetailsRender.strTags
      ? recipeDetailsRender.strTags.split(',')
      : [],
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  localStorage.setItem('doneRecipes', JSON.stringify(
    [...doneRecipes, recipeData],
  ));
};
