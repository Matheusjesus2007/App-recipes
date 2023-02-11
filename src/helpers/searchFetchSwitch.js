import { fetchIngredientsMeals,
  fetchNameMeals,
  fetchFirstLetterMeals } from '../services/ApiMeals';

import {
  fetchIngredientsDrinks,
  fetchNameDrinks,
  fetchFirstLetterDrinks } from '../services/ApiDrinks';

export const searchFetchMeals = (searchRadioButton, valueInputSearch) => {
  switch (searchRadioButton) {
  case 'ingredient':
    return fetchIngredientsMeals(valueInputSearch);

  case 'name':
    return fetchNameMeals(valueInputSearch);

  case 'firstLetter':
    return fetchFirstLetterMeals(valueInputSearch);

  default:
    break;
  }
};

export const searchFetchDrinks = (searchRadioButton, valueInputSearch) => {
  switch (searchRadioButton) {
  case 'ingredient':
    return fetchIngredientsDrinks(valueInputSearch);

  case 'name':
    return fetchNameDrinks(valueInputSearch);

  case 'firstLetter':
    return fetchFirstLetterDrinks(valueInputSearch);

  default:
    break;
  }
};
