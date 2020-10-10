// Import Dependencies
import React, { useState } from 'react'
import * as yup from "yup";
import { gsap } from "gsap";
import axios from "axios";

// Import Components
import FormField from "./FormField";

export default function PizzaForm() {

  // Set the state for the pizza object
  const [ pizza, setPizza ] = useState({name: ""});

  // Set the state for the errors for validation
  const [ errors, setErrors ] = useState({});

  // Set state for to disable submit button
  const [disableSubmit, setDisableSubmit] = useState(false);

  // Set a state in case we get server error
  const [serverError, setServerError] = useState(null);

  // Set a state for the post data
  const [post, setPost] = useState(null);

  // Handle the change of form fields
  const handleChange = (e) => {
    e.persist();

    const createPizza = {...pizza, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,};

    setPizza(createPizza);
  }

  // Form schema to be used for form validation
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    size: yup.string(),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    ham: yup.boolean(),
    onion: yup.boolean(),
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

    console.log("pizza", pizza);
    console.log("errors", errors);

    // Check for valudation first
    formErrors();

    formSchema.isValid(pizza).then((valid) => {
      console.log("is my form valid?", valid);

      if (valid) {
        // Ensure to eliminate all errors if form is valid
        setErrors({});

        // Clear the form
        setPizza({name: ""});

        // Submit the form
        axios
          .post("https://reqres.in/api/users", pizza)
          .then((resp) => {
            // update temp state with value from API to display in <pre>
            setPost(resp.data);

            // if successful request, clear any server errors
            setServerError(null);
          })
          .catch((err) => {
            // this is where we could create a server error in the form! if API request fails, say for authentication (that user doesn't exist in our DB),
            // set serverError
            setServerError("oops! something happened!");
          });
      } else {
        // Add a little animation if not valid
        const errorAnim = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        errorAnim.to(".pizza-form", { x: -50, duration: 0.2 });
        errorAnim.to(".pizza-form", { x: 50, duration: 0.2 });
        errorAnim.to(".pizza-form", { x: -20, duration: 0.2 });
        errorAnim.to(".pizza-form", { x: 20, duration: 0.2 });
        errorAnim.to(".pizza-form", { x: 0, duration: 0.2 });

        // Disable the submit button while the animation plays
        setDisableSubmit(true);

        setTimeout(() => {
          setDisableSubmit(false);
        }, 1000);
      }
    });
  }

  return (
    <div className="pizza-form">
      <form onSubmit={handleSubmission}>
        <h3>Build Your Own Pizza</h3>

        <FormField
          name="name"
          type="text"
          label="Name"
          value={pizza.name !== undefined ? pizza.name : ""}
          handleChange={handleChange}
          error={errors.name}
        />

        <FormField
          name="size"
          type="select"
          label="Select Pizza Size"
          value={pizza.size !== undefined ? pizza.size : ""}
          selections={["Small", "Medium", "Large"]}
          handleChange={handleChange}
        />

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

        <FormField
          name="instructions"
          type="textarea"
          label="Enter Special Instructions"
          value={pizza.instructions !== undefined ? pizza.instructions : ""}
          handleChange={handleChange}
        />

        <input type="submit" value="Submit Form" disabled={disableSubmit} />
      </form>

      {post !== null && <pre>{JSON.stringify(post, null, 2)}</pre>}
    </div>
  )
}
