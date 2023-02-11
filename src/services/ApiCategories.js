export const fetchCategoriesMeals = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCategoriesDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
