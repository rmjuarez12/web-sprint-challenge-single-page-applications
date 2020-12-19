// Import Dependencies
import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { gsap } from "gsap";

// Import Assets
import sliderImg from './../Assets/Pizza.jpg';

export default function Homepage() {

  const [newPizza, setNewPizza] = useState(false);
  
  // Animation whenever the component loads
  useEffect(() => {
    gsap.from(".slide", {opacity: 0, scale: 1.1, duration: 1,});
    gsap.from(".slide .layer", {opacity: 0, scale: 1.1, duration: 1, delay: 1});
  }, []);

  const newPizzaFunc = () => {
    gsap.to(".slide .layer", {opacity: 0, scale: 1.1, duration: 1});
    gsap.to(".slide", {opacity: 0, scale: 1.1, duration: 1, delay: 1});

    setTimeout(() => {
      setNewPizza(true);
    }, 2000);
  }
  
  return (
    <div id="homepage">
      <div className="slider">
        <div className="slide" style={{backgroundImage: `url(${sliderImg}`}}>
          <div className="layer">
            <h3><span>Your favorite food</span> delivered while <u>coding</u></h3>

            <button onClick={newPizzaFunc}>Pizza?</button>
          </div>
        </div>
      </div>

      {newPizza === true && <Redirect to="/pizza" />}
    </div>
  )
}
