import React, { useState, useEffect } from 'react';

function Star({ recipeinfo }) {
  const { label, url } = recipeinfo;

  // State variables for Favorites
  const [isFavorite, setIsFavorites] = useState(false);

  // useEffect for checking if the recipe is in favorites or not and then set the favorites accordingly
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    setIsFavorites(favorites.some((item) => item.url === url));
  }, [url, recipeinfo]);

  // handling adding/removing recipes from favorites
  const handleFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.url !== url);
      localStorage.setItem('Favorites', JSON.stringify(updatedFavorites));
      setIsFavorites(false);
    } else {
      const updatedFavorites = [...favorites, recipeinfo];
      localStorage.setItem('Favorites', JSON.stringify(updatedFavorites));
      setIsFavorites(true);
    }
  };

  return (
    <div>
      {!isFavorite ? (
        <i className="fa-regular fa-heart" style={{ color: 'white' }} onClick={handleFavorites} />
      ) : (
        <i className="fa-solid fa-heart" style={{ color: '#f05' }} onClick={handleFavorites} />
      )}
    </div>
  );
}

export default Star;
