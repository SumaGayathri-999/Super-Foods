
import React, { useState, useEffect, useRef } from 'react';
import Recipe from './Recipe';
import { fetchRecipes } from '../../utils';
import SearchRecipe from './SearchRecipe';
import './home.css';
import Favoricon from './Favoricon';

function Home() {
  // State variables
  const [recipedata, setRecipeData] = useState();
  const [query, setQuery] = useState('vegan');
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(true);
  const loadRef = useRef(null);

  // Intersection Observer to load more recipes when user scrolls to the bottom
  useEffect(() => {
    let loadVideosObserver = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        fetchData();
      }
    }, {
      rootMargin: '50px',
    });

    if (loadRef.current) {
      loadVideosObserver.observe(loadRef.current);
    }

    // Cleanup observer when the component unmounts or when the limit changes
    return () => {
      if (loadRef.current) {
        loadVideosObserver.unobserve(loadRef.current);
      }
    };
  }, [limit]);


  // Function to fetch recipes
  const fetchData = async () => {
    try {
      const data = await fetchRecipes(query, limit);
      setRecipeData(data);
      setLimit((prevLimit) => prevLimit + 10);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // Initial data fetching on first render
  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <div id="homeContainer">
      <div className="d-flex" style={{ justifyContent: 'space-between' }}>
        <SearchRecipe setQuery={setQuery} />
        <Favoricon />
      </div>

      {loading ? (
        <h1 className="loadingText">Loading...</h1>
      ) : (
        <div id="recipesContainer" className="d-flex flex-wrap justify-content-around">
          {recipedata?.map((recipeitem, index) => (
            <Recipe key={index} recipeitem={recipeitem.recipe} />
          ))}
          {/* Loading indicator for more recipes */}
          <h1 className='text-center mx-auto' ref={loadRef}>Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
