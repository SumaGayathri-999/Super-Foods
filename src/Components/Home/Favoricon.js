import React from 'react';
import {Link} from 'react-router-dom';

function Favicon() {

  return (
    <Link to="/favorites">
       <div style={{position:"relative",marginRight:"20px"}} title="Favorites">
          <i className="fa-solid fa-bookmark fa-2x" style={{color:'black'}}></i>
       </div>
    </Link>
  )
}

export default Favicon;