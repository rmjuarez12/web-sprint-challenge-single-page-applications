// Import Dependencies
import React from 'react'
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="container">
        <h1 className="logo"><span>Lambda</span> Eats</h1>

        <nav className="top-menu">
          <ul>
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/help" activeClassName="active">Help</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
