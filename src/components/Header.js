// Import Dependencies
import React from 'react'
import { NavLink  } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="container">
        <h1>Lambda Eats</h1>

        <nav className="top-menu">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/help">Help</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
