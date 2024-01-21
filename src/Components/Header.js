import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header d-flex align-items-center">
      <Link to="/" className="d-flex align-items-center">
        <img src="/logo.png" alt="icon" style={{ width: "50px", height: "50px" }} />
        <h3 style={{ marginLeft: "10px", marginBottom: "0" }}>SUPER FOODS</h3>
      </Link>
    </div>
  );
}

export default Header;
