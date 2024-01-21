import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Star from './Star';

function Recipe({ recipeitem, onRemove }) {
  const { pathname } = useLocation();
  const { image, label, cuisineType, healthLabels, uri, url } = recipeitem;

  // Extracting the recipe ID from the URI
  const id = uri?.split('#recipe')[1];

  // To display only the first 4 health labels
  healthLabels.length = 4;

  return (
    <div className="recipeContainer d-flex flex-column">
      <Link to={`/details/${id}`}>
        <img src={image} alt="Recipe_image" className="recipeImage" />
        <h5 className="recipeTitle">{label}</h5>
        <p className="recipeInfo">Cuisine Type: {cuisineType}</p>
        <div className="healthLabels">
          {healthLabels?.map((item, index) => (
            <span key={index} className="healthLabel">
              {item}
            </span>
          ))}
        </div>
      </Link>

      {/* Conditional rendering based on the route pathname */}
      {pathname === "/favorites" ? (
        <button className="bg-warning w-100 btn p-1 mt-auto" onClick={() => onRemove(url)}>
          Remove from Favorites
        </button>
      ) : (
        <div className="star">
          <Star recipeinfo={{ image, label, cuisineType, healthLabels, uri, url }} />
        </div>
      )}
    </div>
  );
}

export default Recipe;
