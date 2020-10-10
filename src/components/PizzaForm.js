// Import Dependencies
import React, { useState, useEffect } from 'react'
import * as yup from "yup";
import { gsap } from "gsap";
import axios from "axios";

// Import Components
import FormField from "./FormField";
import ThankYou from "./ThankYou";

// Import Assets
import pizzaImg from './../Assets/pizza-make.jpg';
import { Route, useRouteMatch, Link, Redirect } from 'react-router-dom';

export default function PizzaForm(props) {

  // Set the state for the pizza object
  const [ pizza, setPizza ] = useState({name: "", size: "0", "glutten-free": false});

  // Set the state for the errors for validation
  const [ errors, setErrors ] = useState({});

  // Set state for to disable submit button
  const [disableSubmit, setDisableSubmit] = useState(false);

  // Set a state in case we get server error
  const [serverError, setServerError] = useState(null);

  // Set a state for the post data
  const [post, setPost] = useState(null);

  // Animation whenever the component loads
  useEffect(() => {

      gsap.from("#pizza-form", {opacity: 0, scale: 0.9, duration: 1});
      gsap.from("#pizza-form form", {opacity: 0, duration: 1, delay: 1});

  }, []);

  // Handle the change of form fields
  const handleChange = (e) => {
    e.persist();

    const createPizza = {...pizza, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,};

    setPizza(createPizza);
  }

  // Form schema to be used for form validation
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    size: yup.string().matches(/\D/g),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    ham: yup.boolean(),
    onion: yup.boolean(),
    "glutten-free": yup.boolean(),
    instructions: yup.string(),
  });

  // Form to catch any errors if the form did not validated
  const formErrors = (e) => {
    // Make a copy of the errors state
    let allErrors = { ...errors };

    // Cycle through all data and check
    for (const pizzaData in pizza) {
      yup
        .reach(formSchema, pizzaData)
        .validate(pizza[pizzaData])
        .then((valid) => {
          allErrors[`${pizzaData}`] = "";
          console.log(pizzaData, valid);
        })
        .catch((err) => {
          allErrors[`${pizzaData}`] = err.errors[0];
        });
    }

    // Set the errors into the state
    setErrors(allErrors);
  };

  // Handle Form Submission
  const handleSubmission = (e) => {
    e.preventDefault();

    // Check for valudation first
    formErrors();

    formSchema.isValid(pizza).then((valid) => {
      console.log("is my form valid?", valid);

      if (valid) {
        // Ensure to eliminate all errors if form is valid
        setErrors({});

        // Clear the form
        setPizza({name: "", "glutten-free": false});

        gsap.to("#pizza-form form", {opacity: 0, x: "-100vw", duration: 1});
        gsap.to("#pizza-form", {opacity: 0, scale: 0.5, duration: 1, display: "none", delay: 1});

        // Submit the form
        setTimeout(() => {
          axios
          .post("https://reqres.in/api/users", pizza)
          .then((resp) => {
            // update temp state with value from API to display in <pre>
            setPost(resp.data);

            console.log("Post", resp.data);

            // if successful request, clear any server errors
            setServerError(null);
          })
          .catch((err) => {
            // this is where we could create a server error in the form! if API request fails, say for authentication (that user doesn't exist in our DB),
            // set serverError
            setServerError("oops! something happened!");
          });
        }, 2000)
        
      } else {
        // Add a little animation if not valid
        const errorAnim = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        errorAnim.to("#pizza-form form", { x: -50, duration: 0.2 });
        errorAnim.to("#pizza-form form", { x: 50, duration: 0.2 });
        errorAnim.to("#pizza-form form", { x: -20, duration: 0.2 });
        errorAnim.to("#pizza-form form", { x: 20, duration: 0.2 });
        errorAnim.to("#pizza-form form", { x: 0, duration: 0.2 });

        // Disable the submit button while the animation plays
        setDisableSubmit(true);

        setTimeout(() => {
          setDisableSubmit(false);
        }, 1000);
      }
    });
  }

  const toggleBtn = (fieldName) => {

    if(pizza[fieldName] === false || pizza[fieldName] === undefined) {
      setPizza({...pizza, [fieldName]: true});
    } else {
      setPizza({...pizza, [fieldName]: false});
    }
    
  }

  const resetForm = () => {
    setPost(null);
    console.log("Reset post", post);

    gsap.to("#pizza-form", {opacity: 1, scale: 1, display: "flex", duration: 1});
    gsap.to("#pizza-form form", {x:0, opacity: 1, delay: 1});
  }

  return (
    <div id="pizza-form-page">
      <Route exact path="/pizza/thanks">
        <ThankYou order={post} resetForm={resetForm} />
      </Route> 
      
      <div id="pizza-form">
        <form onSubmit={handleSubmission}>
          <h3>Build Your Own Pizza</h3>

          <img src={pizzaImg} alt="Make Pizza" />

          <fieldset>
            <legend><Link to="/pizza">User Information</Link></legend>

            <Route exact path="/pizza">
              <FormField
                name="name"
                type="text"
                label="Name"
                value={pizza.name !== undefined ? pizza.name : ""}
                handleChange={handleChange}
                error={errors.name}
              />
            </Route>
          </fieldset>

          <fieldset className="pizza-size">
            <legend><Link to="/pizza/size">Pizza Size</Link></legend>

            <Route path="/pizza/size">
              <FormField
                name="size"
                type="select"
                label="Select Pizza Size"
                value={pizza.size !== undefined ? pizza.size : ""}
                selections={["Small", "Medium", "Large"]}
                handleChange={handleChange}
              />
            </Route>
          </fieldset>

          <fieldset className="checkboxes">
            <legend><Link to="/pizza/toppings">Toppings</Link></legend>

            <Route path="/pizza/toppings">
              <FormField
                name="pepperoni"
                type="checkbox"
                label="Pepperoni"
                value={pizza.pepperoni !== undefined ? pizza.pepperoni : ""}
                handleChange={handleChange}
              />

              <FormField
                name="sausage"
                type="checkbox"
                label="Sausage"
                value={pizza.sausage !== undefined ? pizza.sausage : ""}
                handleChange={handleChange}
              />

              <FormField
                name="ham"
                type="checkbox"
                label="Ham"
                value={pizza.ham !== undefined ? pizza.ham : ""}
                handleChange={handleChange}
              />

              <FormField
                name="onion"
                type="checkbox"
                label="Onion"
                value={pizza.onion !== undefined ? pizza.onion : ""}
                handleChange={handleChange}
              />
            </Route>
          </fieldset>

          <fieldset className="pizza-substitute">
            <legend><Link to="/pizza/substitute">Choice of Substitute</Link></legend>

            <Route path="/pizza/substitute">
              <div className={`toggle-field ${pizza["glutten-free"] ? "active" : ""}`} onClick={() => toggleBtn("glutten-free")}>
                <div className="toggle-switch">
                  <div className="toggle-btn"></div>
                  <div className="toggle-bar"></div>
                </div>
                <label>Glutten Free Crust (+ $1.00)</label>
              </div>   
            </Route>       
          </fieldset>

          <fieldset className="pizza-extra">
            <legend><Link to="/pizza/extra">Special Instructions</Link></legend>

            <Route path="/pizza/extra">
              <FormField
                name="instructions"
                type="textarea"
                label="Anything to add?"
                value={pizza.instructions !== undefined ? pizza.instructions : ""}
                handleChange={handleChange}
              />
            </Route>
          </fieldset>

          <input type="submit" value="Submit Form" disabled={disableSubmit} data-cy="submit" />

        </form>
      </div>    

      {post !== null && <Redirect to="/pizza/thanks" />} 
    </div>
  )
}
