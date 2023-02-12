import { createContext, useMemo, useState } from 'react';

export const RecipesContext = createContext('');

function RecipesProvider({ children }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [recipeDetailsRender, setDetailsRender] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const values = useMemo(() => ({
    allRecipes,
    renderRecipes,
    recipeDetailsRender,
    recipeIngredients,
    setAllRecipes,
    setRenderRecipes,
    setDetailsRender,
    setRecipeIngredients,
  }), [allRecipes, renderRecipes, recipeDetailsRender, recipeIngredients,
    setAllRecipes, setRenderRecipes, setDetailsRender, setRecipeIngredients]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
