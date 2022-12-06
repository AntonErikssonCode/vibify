import React from "react";
import "./MenuItem.css";
import { Link } from "react-router-dom";  
function Demo() {
  return (
    <div className="MenuItem-container">
      <h2 className="MenuItem-title">View A Demo Song</h2>
      <Link to="/demo" className="MenuItem-button">
        DEMO AUDIO
      </Link>
    </div>
  );
}
export default Demo;
