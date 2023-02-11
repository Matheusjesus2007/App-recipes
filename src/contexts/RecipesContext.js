import { createContext, useMemo, useState } from 'react';

export const RecipesContext = createContext('');

function RecipesProvider({ children }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);

  const values = useMemo(() => ({
    allRecipes, renderRecipes, setAllRecipes, setRenderRecipes,
  }), [allRecipes, renderRecipes, setAllRecipes, setRenderRecipes]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
