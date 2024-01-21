import React, { useEffect, useState } from 'react';

function SearchRecipe({ setQuery }) {
  // State variable for input
  const [inputText, setInputText] = useState("");

  // useEffect to debounce the input and set the query after 1.5 seconds of inactivity
  useEffect(() => {
    let timerId;

    if (inputText.trim() !== "") {
      timerId = setTimeout(() => {
        setQuery(inputText);
      }, 1500);
    }

    // Cleanup the timer on component unmount 
    return () => {
      clearTimeout(timerId);
    };
  }, [inputText]);

  
  // Handle input change event
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="searchContainer">
      {/* Input field for searching recipes */}
      <input
        type="text"
        placeholder="Search Recipe..."
        value={inputText}
        onChange={handleChange}
        className="searchInput"
      />
    </div>
  );
}

export default SearchRecipe;
