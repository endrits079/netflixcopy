import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className='left-items'>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/tvshows">
            TV Shows
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/movies">
            Movies
          </NavLink>
        </li>
      </ul>

      <ul className='right-items'>
        <li>
          <NavLink exact to="/search">
            <i className="fas fa-search"></i>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/login">
            <i className="fas fa-user"></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
