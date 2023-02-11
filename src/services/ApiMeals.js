export const fetchIngredientsMeals = async (ingrediente) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchNameMeals = async (nome) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchFirstLetterMeals = async (primeiraLetra) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
