export const fetchByCategoryMeals = async (catMeal) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catMeal}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchByCategoryDrinks = async (catDrink) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catDrink}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
