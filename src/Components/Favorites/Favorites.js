import React, { useState, useEffect } from 'react';
import Recipe from '../Home/Recipe';

function Favorites() {

  // State Variables
  const [favorites, setFavorites] = useState([]);

  // useEffect to load the favorites from local storage on First Render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to handle removing a recipe from favorites
  const handleRemoveFromFavorites = (url) => {
    const updatedFavorites = favorites.filter((fav) => fav.url !== url);
    localStorage.setItem('Favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <h1 className="text-center mb-3">Favorite Recipes</h1>

      <div className="recipesContainer d-flex flex-wrap justify-content-around justify-content-md-start">
        {favorites?.length > 0 ? (
          favorites?.map((item) => {
            return <Recipe key={item.url} recipeitem={item} onRemove={handleRemoveFromFavorites} />;
          })
        ) : (
          // Displaying a message when the wishlist is empty
          <h3 className="d-flex" style={{ color: "grey", marginTop: "50vh", marginLeft: "auto", marginRight: "auto" }}>
            Wishlist is empty
          </h3>
        )}
      </div>
    </div>
  );
}

export default Favorites;
