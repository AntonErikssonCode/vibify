import React from "react";
import "./MenuItem.css";
import { Link } from "react-router-dom";  
function MicInput() {
  return (
    <div className="MenuItem-container">
      <h2 className="MenuItem-title">Controll 3D Shape With Your Mic</h2>
      <Link to="/mic" className="MenuItem-button">
        Mic Input
      </Link>
    </div>
  );
}
export default MicInput;
