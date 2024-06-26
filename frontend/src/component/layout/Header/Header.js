import './Navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from "../../../images/menu.png";
import Search from "../../../images/search.png";
import Shop from "../../../images/shopping.png";

function Header() {
  const [open, setOpen] = useState(false);
  
  return (
    <nav>
      <div className="left">
        <div className="menuicon">
          <img src={Menu} alt="Menu" onClick={() => setOpen(prev => !prev)} />
        </div>
      </div>
      <div className="right">
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/"><img src={Search} /></Link>
          <Link to="/"><span>Search</span></Link>
          <Link to="/"><img src={Shop} /></Link>
          
          <Link to="/"><span>Cart</span></Link>
          <Link to="/"></Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
