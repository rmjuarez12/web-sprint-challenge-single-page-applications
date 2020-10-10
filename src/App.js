// Import Dependencies
import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

// Import Components
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import PizzaForm from "./components/PizzaForm";

// Import Assets
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />

      <Route exact path="/">
        <Homepage />
      </Route>

      <Route path="/pizza">
        <PizzaForm />
      </Route>
    </Router>
  );
};
export default App;
