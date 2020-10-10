// Import Dependencies
import React from 'react';
import { Link } from "react-router-dom";

// Import Assets
import sliderImg from './../Assets/Pizza.jpg';

export default function Homepage() {
  return (
    <main>
      <div className="slider">
        <div className="slide" style={{backgroundImage: `url(${sliderImg}`}}>
          <div className="layer">
            <h3>Your favorite food, delivered while <u>coding</u></h3>

            <Link to="/pizza">Pizza?</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
