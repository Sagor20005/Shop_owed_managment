import React from 'react'
import {
  NavLink
} from 'react-router-dom'
import "./Sidebar.css"
const Sidebar = ()=> {
  return(
    <>
      {
      <div className="sideBar">
        <ul>
          <li>
            <NavLink to="/">Peoples Owed</NavLink>
          </li>
          <li>
            <NavLink to="/sell">Par day sell</NavLink>
          </li>
        </ul>
      </div>
      }
    </>
  );
};
export default Sidebar;