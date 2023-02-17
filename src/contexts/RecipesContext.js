import { createContext, useMemo, useState } from 'react';

export const RecipesContext = createContext('');

function RecipesProvider({ children }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [recipeDetailsRender, setRecipeDetailsRender] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const values = useMemo(() => ({
    allRecipes,
    renderRecipes,
    recipeDetailsRender,
    recipeIngredients,
    setAllRecipes,
    setRenderRecipes,
    setRecipeDetailsRender,
    setRecipeIngredients,
  }), [allRecipes, renderRecipes, recipeDetailsRender, recipeIngredients,
    setAllRecipes, setRenderRecipes, setRecipeDetailsRender, setRecipeIngredients]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
