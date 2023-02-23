/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavAndShareButton from '../components/FavAndShareButton';
import FilterMealOrDrink from '../components/FilterMealOrDrink';
import Header from '../components/Header';
import { ButtonsCaterogiriesContext } from '../contexts/ButtonsCategoriesContext';
import styles from '../styles/DoneRecipes.module.css';

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
          type, name, doneDate, alcoholicOrNot } = recipe;

        return (
          <section key={ index } className={ styles.containerDoneRecipes }>
            <Link
              className={ styles.linkDoneRecipes }
              to={ `${type}s/${id}` }
            >
              <h1 data-testid={ `${index}-horizontal-name` }>{ name }</h1>
              <img
                src={ image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
              />

            </Link>
            <div data-testid={ `${index}-horizontal-top-text` }>
              {type === 'drink'
                ? (
                  <div className={ styles.containerTopText }>
                    <p>{`Category: ${category}`}</p>
                    <p>{`Alcoholic: ${alcoholicOrNot}`}</p>
                  </div>
                ) : (
                  <div>
                    <p>{`Category: ${category}`}</p>
                    <p>{`Nationality: ${nationality}`}</p>
                  </div>)}
            </div>

            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              <span>Completion date: </span>
              { doneDate }
            </p>

            <FavAndShareButton
              curRecipe={ recipe }
              recipeId={ id }
              type={ `${type}s` }
              index={ index }
            />

            <button
              className={ styles.removeButton }
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
