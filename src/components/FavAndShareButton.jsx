/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import { withRouter } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { setFavoriteRecipesStorage } from '../helpers/SetStorageFunctions';
import { RecipesContext } from '../contexts/RecipesContext';

function FavAndShareButton({ index, idItem, type, history }) {
  const { location: { pathname } } = history;
  const { recipeDetailsRender } = useContext(RecipesContext);
  const [isCopied, setIsCopied] = useState(false);
  const [isfavorite, setFavorite] = useState(false);
  const [clickEvent, setClickEvent] = useState({});

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  useEffect(() => {
    const isFavorite = favoriteRecipes.some((recipe) => recipe.id === idItem);
    return setFavorite(isFavorite);
  }, [recipeDetailsRender]);

  const timer = 500;
  const disabledLinkCopied = () => {
    setTimeout(() => { setIsCopied(false); }, timer);
  };

  const removeRecipe = () => {
    const newData = favoriteRecipes.filter((recipe) => recipe.id !== idItem);
    setFavorite(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  };

  const setFavoriteAndStorage = () => {
    setFavorite(true);
    setFavoriteRecipesStorage(recipeDetailsRender);
  };

  const cinco = 5;
  const vinteECinco = 25;

  return (
    <div>
      <button
        type="button"
        data-testid={ pathname.includes('favorite')
          ? `${index}-horizontal-favorite-btn`
          : 'favorite-btn' }
        src={ isfavorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ isfavorite
          ? () => removeRecipe()
          : () => setFavoriteAndStorage() }
      >
        <img
          src={ isfavorite ? blackHeartIcon : whiteHeartIcon }
          type="imge'svg+xml'"
          alt={ isfavorite ? 'BlackHeart Icon' : 'WhiteHeart Icon' }
        />
      </button>
      <button
        type="button"
        data-testid={ pathname.includes('favorite')
          ? `${index}-horizontal-share-btn`
          : 'share-btn' }
        id="copy-button"
        src={ shareIcon }
        onClick={ (e) => {
          setIsCopied(true);
          clipboardCopy(`http://localhost:3000/${type}/${idItem}`);
          setClickEvent(e);
          disabledLinkCopied();
        } }
        style={ {
          borderRadius: '100%',
          padding: '8px',
          backgroundColor: 'lightblue',
          border: 'none',
        } }
      >
        <img
          src={ shareIcon }
          type="image/svg+xml"
          alt="Share Icon"
        />
      </button>
      {isCopied && (
        <div
          style={ {
            backgroundColor: 'black',
            borderRadius: '10px',
            color: 'white',
            padding: '2px 5px 2px 5px',
            fontSize: '15px',
            position: 'absolute',
            top: clickEvent ? clickEvent.pageY - cinco : 0,
            left: clickEvent ? clickEvent.pageX + vinteECinco : 0,
          } }
        >
          Link copied!
        </div>
      ) }
    </div>
  );
}

FavAndShareButton.propTypes = {}.isRequired;

export default withRouter(FavAndShareButton);
