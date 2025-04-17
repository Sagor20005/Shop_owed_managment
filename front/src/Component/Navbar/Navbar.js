import React from 'react'
import {
  NavLink
} from 'react-router-dom'
import "./Navbar.css"
import Icons from "../Icons.json"

const Navbar = ()=> {
  return(
    <>
      {
      <div className="navbar">
        <h2 className="app_name">Aka Shop</h2>
        <ul>

          <li>
            <NavLink to="/">Owed</NavLink>
          </li>
          <li>
            <NavLink to="/sell">Sell</NavLink>
          </li>
          <li>
            <NavLink to="/change-admin">Change_Pass</NavLink>
          </li>

        </ul>

        <div className="logo_search">
          <label htmlFor="search" id="search_lbl">
            <img src={Icons.search} alt="search" />
        </label>
        <input id="search" type="search" placeholder="Search" />


      </div>
</div>
}
</>
);
};
export default Navbar;
