import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function RecipeCard({ location: { pathname }, recipes }) {
  return (
    <section>
      {recipes.map((recipe, index) => {
        const { idMeal, idDrink, strMeal,
          strDrink, strMealThumb, strDrinkThumb } = recipe;
        const recipeId = idMeal || idDrink;
        const recipeName = strMeal || strDrink;
        const recipeThumb = strMealThumb || strDrinkThumb;

        return (
          <Link to={ `${pathname}/${recipeId}` } key={ recipeId }>
            <div data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{recipeName}</p>
              <img
                src={ recipeThumb }
                alt={ `Imagem da receita de ${recipeName}` }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        );
      })}
    </section>
  );
}
RecipeCard.propTypes = {}.isRequired;

export default withRouter(RecipeCard);
