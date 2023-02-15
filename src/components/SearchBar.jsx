import { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { HeaderContext } from '../contexts/HeaderContext';
import { RecipesContext } from '../contexts/RecipesContext';
import { searchFetchDrinks, searchFetchMeals } from '../services/ApiSearchBarSwitch';

function SearchBar({ history }) {
  const { location: { pathname } } = history;
  const [selectedRadioButton, setSelectedRadioButton] = useState('');
  const { inputSearchValue } = useContext(HeaderContext);
  const { setAllRecipes } = useContext(RecipesContext);

  const handleValidatedData = (data) => {
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
    if (selectedRadioButton === 'firstLetter' && inputSearchValue.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const searchFn = pathname === '/meals' ? searchFetchMeals : searchFetchDrinks;
    const data = await searchFn(selectedRadioButton, inputSearchValue);

    return handleValidatedData(data);
  };

  return (
    <section>
      <label htmlFor="searchBy">
        <span>Ingredient</span>
        <input
          name="searchBy"
          value="ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
          onChange={ ({ target }) => setSelectedRadioButton(target.value) }
        />

        <span>Name</span>
        <input
          name="searchBy"
          value="name"
          data-testid="name-search-radio"
          type="radio"
          onChange={ ({ target }) => setSelectedRadioButton(target.value) }
        />

        <span>First letter</span>
        <input
          name="searchBy"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          type="radio"
          onChange={ ({ target }) => setSelectedRadioButton(target.value) }
        />

      </label>

      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearch }
      >
        Search
      </button>
    </section>
  );
}

SearchBar.propTypes = {}.isRequired;

export default withRouter(SearchBar);
