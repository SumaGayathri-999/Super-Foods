import React, { useState, useEffect } from 'react';
import { fetchRecipe } from '../../utils';
import { useParams } from 'react-router-dom';
import './details.css';

function Details() {
  // State Variables
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // Function to fetch recipe details
  const getRecipe = async () => {
    try {
      const data = await fetchRecipe(id);
      setRecipeData(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch recipe details on initial render
  useEffect(() => {
    getRecipe();
  }, [id]);

  return (
    <div className="recipe-details-container fluid-container">
      {loading ? (
        // loading message while data is being fetched
        <div>Loading...</div>
      ) : (
        //recipe details once data is loaded
        <div className="recipe-details row">
          <h2>{recipeData.label}</h2>
          <div className="image-cont col-12 col-md-6 mt-3">
            {/*recipe image */}
            <img src={recipeData.image} alt={recipeData.label} />
          </div>
          <div className='col-12 col-md-6 mt-3'>
            {/*various details about the recipe */}
            <div className="label">Source:</div>
            <div className="value">{recipeData.source}</div>

            <div className="label">Health Labels:</div>
            <div className="value">{recipeData.healthLabels.map((item) => <span className="health-label" key={item}>{item}</span>)}</div>

            <div className="label">Cautions:</div>
            <div className="value">{recipeData.cautions.join(', ')}</div>

            <div className="label">Ingredients:</div>
            <ul className="ingredients-list">
              {recipeData.ingredients.map((ingredient, index) => (
                <li key={index}> 
                  <i className="fa-solid fa-bowl-food"></i> {ingredient.text}
                </li>
              ))}
            </ul>

            <div className="label">Total Calories:</div>
            <div className="value">{recipeData.calories.toFixed(2)} kcal</div>

            <div className="label">Total Time:</div>
            <div className="value">{recipeData.totalTime} minutes</div>

            {/* Link to view the full recipe */}
            <a className="p-2 bg-warning" href={recipeData.url} target="_blank" rel="noopener noreferrer">
              View Recipe
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
