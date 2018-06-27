import React from "react";
import "./Button.css";
import { Link } from 'react-router-dom';


const Button = () => (
  <div>
    <div className="container">
      <div>
        <Link to="/cxplaces">
        <button className="material-bubble">Get Started</button>
        </Link>
      </div>
    </div>
  </div>

);


export default Button;
