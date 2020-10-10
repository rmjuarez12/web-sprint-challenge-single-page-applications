// Import Dependencies
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { gsap } from "gsap";

// Import Assets
import sliderImg from './../Assets/Pizza.jpg';

export default function Homepage() {
  
  // Animation whenever the component loads
  useEffect(() => {
    gsap.from(".slide", {opacity: 0, scale: 1.1, duration: 1,});
    gsap.from(".slide .layer", {opacity: 0, scale: 1.1, duration: 1, delay: 1});
  }, []);
  
  return (
    <div id="homepage">
      <div className="slider">
        <div className="slide" style={{backgroundImage: `url(${sliderImg}`}}>
          <div className="layer">
            <h3><span>Your favorite food</span> delivered while <u>coding</u></h3>

            <Link to="/pizza">Pizza?</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
