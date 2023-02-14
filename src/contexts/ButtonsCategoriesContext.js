import { createContext, useMemo, useState } from 'react';

export const ButtonsCaterogiriesContext = createContext('');

function ButtonsCategories({ children }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [renderDoneRecipes, setRenderDoneRecipes] = useState(doneRecipes);
  const [renderFavoriteRecipes, setRenderFavoriteRecipes] = useState(favoriteRecipes);

  const values = useMemo(() => ({
    renderDoneRecipes,
    renderFavoriteRecipes,
    setRenderDoneRecipes,
    setRenderFavoriteRecipes,
  }), [renderDoneRecipes,
    renderFavoriteRecipes,
    setRenderDoneRecipes,
    setRenderFavoriteRecipes]);

  return (
    <ButtonsCaterogiriesContext.Provider value={ values }>
      { children }
    </ButtonsCaterogiriesContext.Provider>
  );
}

ButtonsCategories.propTypes = {}.isRequired;

export default ButtonsCategories;
