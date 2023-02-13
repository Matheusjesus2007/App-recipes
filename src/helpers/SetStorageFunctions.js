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
  let nationality = '';
  let category = '';
  let alcoholicOrNot = '';
  let name;
  let image;

  if (recipeDetailsRender.idMeal) {
    id = recipeDetailsRender.idMeal;
    type = 'meal';
    nationality = recipeDetailsRender.strArea || '';
    category = recipeDetailsRender.strCategory || '';
    alcoholicOrNot = recipeDetailsRender.strAlcoholic || '';
    name = recipeDetailsRender.strMeal;
    image = recipeDetailsRender.strMealThumb;
  } else if (recipeDetailsRender.idDrink) {
    id = recipeDetailsRender.idDrink;
    type = 'drink';
    nationality = recipeDetailsRender.strArea || '';
    category = recipeDetailsRender.strCategory || '';
    alcoholicOrNot = recipeDetailsRender.strAlcoholic || '';
    name = recipeDetailsRender.strDrink;
    image = recipeDetailsRender.strDrinkThumb;
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

export const setDoneRecipesStorage = (recipeDetailsRender) => {
  console.log(recipeDetailsRender);
  let id;
  let type;
  let nationality = '';
  let category = '';
  let alcoholicOrNot = '';
  let name;
  let image;
  let doneDate;
  let tags;

  if (recipeDetailsRender.idMeal) {
    id = recipeDetailsRender.idMeal;
    type = 'meal';
    nationality = recipeDetailsRender.strArea || '';
    category = recipeDetailsRender.strCategory || '';
    alcoholicOrNot = recipeDetailsRender.strAlcoholic || '';
    name = recipeDetailsRender.strMeal;
    image = recipeDetailsRender.strMealThumb;
    doneDate = new Date().toISOString();
    tags = recipeDetailsRender.strTags ? recipeDetailsRender.strTags.split(',') : [];
  } else if (recipeDetailsRender.idDrink) {
    id = recipeDetailsRender.idDrink;
    type = 'drink';
    nationality = recipeDetailsRender.strArea || '';
    category = recipeDetailsRender.strCategory || '';
    alcoholicOrNot = recipeDetailsRender.strAlcoholic || '';
    name = recipeDetailsRender.strDrink;
    image = recipeDetailsRender.strDrinkThumb;
    doneDate = new Date().toISOString();
    tags = recipeDetailsRender.strTags ? recipeDetailsRender.strTags.split(',') : [];
  }

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  localStorage.setItem('doneRecipes', JSON.stringify(
    [...doneRecipes,
      {
        id,
        type,
        nationality,
        category,
        alcoholicOrNot,
        name,
        image,
        doneDate,
        tags,
      }],
  ));
};
