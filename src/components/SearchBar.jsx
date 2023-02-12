import { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { HeaderContext } from '../contexts/HeaderContext';
import { RecipesContext } from '../contexts/RecipesContext';
import { searchFetchDrinks, searchFetchMeals } from '../helpers/SearchFetchSwitch';

function SearchBar({ history }) {
  const [selectedRadioButton, setSelectedRadioButton] = useState('');
  const { valueInputSearch } = useContext(HeaderContext);
  const { setAllRecipes } = useContext(RecipesContext);

  const validateRoute = (data, pathname) => {
    if (!data.meals && !data.drinks) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    const items = pathname === '/meals' ? data.meals : data.drinks;
    const idItem = pathname === '/meals' ? data.meals[0].idMeal : data.drinks[0].idDrink;

    setAllRecipes(items);

    if (items.length === 1) {
      history.push(`${pathname}/${idItem}`);
    }
  };

  const handleSearch = async () => {
    const { location: { pathname } } = history;
    if (selectedRadioButton === 'firstLetter' && valueInputSearch.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const data = pathname === '/meals'
      ? await searchFetchMeals(selectedRadioButton, valueInputSearch)
      : await searchFetchDrinks(selectedRadioButton, valueInputSearch);

    return validateRoute(data, pathname);
  };

  return (
    <>
      <label htmlFor="ingredient">
        Ingredient:
        <input
          name="search"
          id="ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
          onChange={ ({ target }) => setSelectedRadioButton(target.id) }
        />
      </label>

      <label htmlFor="name">
        Name:
        <input
          name="search"
          id="name"
          data-testid="name-search-radio"
          type="radio"
          onChange={ ({ target }) => setSelectedRadioButton(target.id) }
        />
      </label>

      <label htmlFor="firstLetter">
        First letter:
        <input
          name="search"
          id="firstLetter"
          data-testid="first-letter-search-radio"
          type="radio"
          onChange={ ({ target }) => setSelectedRadioButton(target.id) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearch }
      >
        Search

      </button>
    </>
  );
}

SearchBar.propTypes = {}.isRequired;

export default withRouter(SearchBar);
