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


      <div className="logu">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT51nj0y-e3B1byuXfXQJWfLAAT_tiCiWIDDw&usqp=CAU" alt="logu" />
      <h2>J</h2>
    </div>
  </div>
</div>
}
</>
);
};
export default Navbar;