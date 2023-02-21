import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../styles/RecipeCard.module.css';

function RecipeCard({ location: { pathname }, recipes }) {
  return (
    <section className={ styles.containerCards }>
      {recipes.map((recipe, index) => {
        const { idMeal, idDrink, strMeal,
          strDrink, strMealThumb, strDrinkThumb } = recipe;
        const recipeId = idMeal || idDrink;
        const recipeName = strMeal || strDrink;
        const recipeThumb = strMealThumb || strDrinkThumb;

        return (
          <div key={ recipeId } className={ styles.containerRecipeCard }>
            <Link
              className={ styles.linkStyles }
              to={ `${pathname}/${recipeId}` }

            >
              <div
                className={ styles.recipeCard }
                data-testid={ `${index}-recipe-card` }
              >
                <p data-testid={ `${index}-card-name` }>{recipeName}</p>
                <img
                  src={ recipeThumb }
                  alt={ `Imagem da receita de ${recipeName}` }
                  data-testid={ `${index}-card-img` }
                />

              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
}
RecipeCard.propTypes = {}.isRequired;

export default withRouter(RecipeCard);
