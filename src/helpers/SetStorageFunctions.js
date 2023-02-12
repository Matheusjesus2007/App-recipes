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
  let id;
  let type;
  let nationality;
  let category;
  let alcoholicOrNot;
  let name;
  let image;

  if (recipeDetailsRender.idMeal) {
    const { idMeal, strArea, strCategory,
      strMeal, strMealThumb, strAlcoholic } = recipeDetailsRender;
    id = idMeal;
    type = 'meal';
    nationality = strArea || '';
    category = strCategory || '';
    alcoholicOrNot = strAlcoholic || '';
    name = strMeal;
    image = strMealThumb;
  }

  if (recipeDetailsRender.idDrink) {
    const { idDrink, strArea, strCategory,
      strAlcoholic, strDrink, strDrinkThumb } = recipeDetailsRender;

    id = idDrink;
    type = 'drink';
    nationality = strArea || '';
    category = strCategory || '';
    alcoholicOrNot = strAlcoholic || '';
    name = strDrink;
    image = strDrinkThumb;
  }

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  localStorage.setItem('favoriteRecipes', JSON.stringify(
    [...favoriteRecipes,
      {
        id,
        type,
        nationality,
        category,
        alcoholicOrNot,
        name,
        image,
      },
    ],
  ));
};
