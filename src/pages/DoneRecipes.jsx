/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavAndShareButton from '../components/FavAndShareButton';
import FilterMealOrDrink from '../components/FilterMealOrDrink';
import Header from '../components/Header';
import { ButtonsCaterogiriesContext } from '../contexts/ButtonsCategoriesContext';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const { renderDoneRecipes,
    setRenderDoneRecipes } = useContext(ButtonsCaterogiriesContext);

  const updateDoneRecipes = (removeId) => {
    const newDoneRecipes = doneRecipes.filter((recipe) => recipe.id !== removeId);
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    setRenderDoneRecipes(newDoneRecipes);
  };

  useEffect(() => {
    setRenderDoneRecipes(doneRecipes);
  }, []);

  return (
    <>
      <Header title="Done Recipes" />
      <FilterMealOrDrink />
      {renderDoneRecipes.map((recipe, index) => {
        const { image, nationality, category, id,
          type, name, doneDate, tags, alcoholicOrNot } = recipe;

        return (
          <section key={ index }>
            <Link
              to={ `${type}s/${id}` }
            >
              <img
                src={ image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {type === 'drink' ? alcoholicOrNot : `${nationality} - ${category}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
            <p data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</p>
            <p data-testid={ `${index}-${tags[1]}-horizontal-tag` }>{tags[1]}</p>

            <FavAndShareButton
              curRecipe={ recipe }
              recipeId={ id }
              type={ `${type}s` }
              index={ index }
            />

            <button
              type="button"
              onClick={ () => updateDoneRecipes(id) }
            >
              Remove Recipe
            </button>
          </section>
        );
      })}
    </>
  );
}

DoneRecipes.propTypes = {}.isRequired;

export default DoneRecipes;
