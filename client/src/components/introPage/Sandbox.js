import React from "react";
import "./MenuItem.css";
import { Link } from 'react-router-dom';
function Sandbox() {
  return (
    <div className="MenuItem-container">
      <h2 className="MenuItem-title">Play Around with  Basic Parameters in a Sandbox</h2>
      <Link to="/sandbox" className="MenuItem-button">
       3D Sandbox
      </Link>
    </div>
  );
}
export default Sandbox;
