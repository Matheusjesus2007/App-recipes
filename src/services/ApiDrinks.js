export const fetchIngredientsDrinks = async (ingrediente) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchNameDrinks = async (nome) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchFirstLetterDrinks = async (primeiraLetra) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
