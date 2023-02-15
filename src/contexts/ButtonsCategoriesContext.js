import { createContext, useMemo, useState } from 'react';

export const ButtonsCaterogiriesContext = createContext('');

function ButtonsCategories({ children }) {
  const [renderDoneRecipes, setRenderDoneRecipes] = useState([]);
  const [renderFavoriteRecipes, setRenderFavoriteRecipes] = useState([]);

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
