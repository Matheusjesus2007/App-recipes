import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavAndShareButton from '../components/FavAndShareButton';
import Header from '../components/Header';

function DoneRecipes({ history }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [renderDoneRecipes, setRenderDoneRecipes] = useState(doneRecipes);

  const handleFilter = ({ target: { value } }) => {
    const filteredRecipes = value === 'all'
      ? doneRecipes
      : doneRecipes.filter((recipe) => recipe.type === value);

    setRenderDoneRecipes(filteredRecipes);
  };

  return (
    <>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ handleFilter }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ handleFilter }
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ handleFilter }
      >
        Drinks
      </button>
      {renderDoneRecipes.map((recipe, index) => {
        const { image, nationality, category, id,
          type, name, doneDate, tags, alcoholicOrNot } = recipe;

        return (
          <div key={ index }>
            <Link
              to={ `${type}s/${id}` }
            >
              <img
                src={ image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '200px' } }
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
              recipeId={ id }
              type={ `${type}s` }
              index={ index }
            />
          </div>
        );
      })}
    </>
  );
}

DoneRecipes.propTypes = {}.isRequired;

export default DoneRecipes;
