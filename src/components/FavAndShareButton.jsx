/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import { withRouter } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { setFavoriteRecipesStorage } from '../helpers/SetStorageFunctions';
import { RecipesContext } from '../contexts/RecipesContext';
import { ButtonsCaterogiriesContext } from '../contexts/ButtonsCategoriesContext';
import styles from '../styles/FavAndShareButton.module.css';

function FavAndShareButton({ index, recipeId, type, history }) {
  const duration = 500;
  const defaultFood = JSON.parse(localStorage.getItem('defaultFood'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const { location: { pathname } } = history;
  const { recipeDetailsRender } = useContext(RecipesContext);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { setRenderFavoriteRecipes } = useContext(ButtonsCaterogiriesContext);

  const linkCopied = () => {
    setIsCopied(true);
    setTimeout(() => { setIsCopied(false); }, duration);
  };

  const handleClickButtonShare = () => {
    linkCopied();
    clipboardCopy(`http://localhost:3000/${type}/${recipeId}`);
  };

  const removeFavoriteRecipe = () => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setRenderFavoriteRecipes(newFavoriteRecipes);
  };

  const addFavoriteRecipe = () => {
    const idItem = type === 'meals' ? 'idMeal' : 'idDrink';
    if (recipeDetailsRender.length === 0) {
      const defaultFoodAux = defaultFood[type].find((food) => food[idItem] === recipeId);
      return setFavoriteRecipesStorage(defaultFoodAux);
    }
    setFavoriteRecipesStorage(recipeDetailsRender);
  };

  const handleClickButtonFavorite = () => {
    if (isFavorite) {
      removeFavoriteRecipe();
    } else {
      addFavoriteRecipe();
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const isRecipeInFavorites = favoriteRecipes.some((recipe) => recipe.id === recipeId);
    return setIsFavorite(isRecipeInFavorites);
  });

  return (
    <div className={ styles.containerButtons }>
      <button
        className={ styles.favoriteButton }
        onClick={ handleClickButtonFavorite }
      >
        <img
          data-testid={ pathname.includes('favorite')
            ? `${index}-horizontal-favorite-btn`
            : 'favorite-btn' }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt={ isFavorite ? 'BlackHeart Icon' : 'WhiteHeart Icon' }
        />
      </button>
      <button
        className={ styles.shareButton }
        onClick={ handleClickButtonShare }
      >
        <img
          data-testid={ pathname.includes('favorite') || pathname.includes('done')
            ? `${index}-horizontal-share-btn`
            : 'share-btn' }
          src={ shareIcon }
          alt="Share Icon"
        />
        {isCopied && <span> Link copied!</span>}
      </button>
    </div>
  );
}

FavAndShareButton.propTypes = {}.isRequired;

export default withRouter(FavAndShareButton);
