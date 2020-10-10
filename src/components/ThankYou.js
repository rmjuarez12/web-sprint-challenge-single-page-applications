// Import Dependencies
import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { gsap } from "gsap";

// Import Assets
import sliderImg from './../Assets/Pizza.jpg';
import dogge from './../Assets/Pizza.gif';

export default function ThankYou(props) {

  const [newPizza, setNewPizza] = useState(false);

  console.log("thanks", props.order);

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
      props.resetForm();
    }, 2000);
  }

  return (
    <div id="thankyou">
      <div className="slider">
        <div className="slide" style={{backgroundImage: `url(${sliderImg}`}}>
          <div className="layer">

            <img src={dogge} alt="Doggee" style={{width: 300}}/>

            <div className="heading">
              <span>Thank you for your order {props.order !== null ? props.order.name : ""}.</span>
              Your awesome Pizza is <u>on the way!</u><br />Share with Doggee!
              
              <span>Here are your order details:</span>

              <span><pre>{JSON.stringify(props.order, null, 2)}</pre></span>
            </div>

            <button onClick={newPizzaFunc}>Order Another One?</button>
          </div>
        </div>
      </div>

      {newPizza === true && <Redirect to="/pizza" />}
    </div>
  )
}
