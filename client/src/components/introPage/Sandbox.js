import React from "react";
import "./MenuItem.css";
import { Link } from 'react-router-dom';
function Sandbox() {
  return (
    <div className="MenuItem-container">
      <h2 className="MenuItem-title">Play Around with Parameters in a Sandbox</h2>
      <Link to="/sandbox" className="MenuItem-button">
       USE SANDBOX
      </Link>
    </div>
  );
}
export default Sandbox;
