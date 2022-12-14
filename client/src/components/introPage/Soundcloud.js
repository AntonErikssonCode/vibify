import React from "react";
import "./MenuItem.css";
import { Link } from "react-router-dom";

function Soundcloud() {
  return (
    <div className="MenuItem-container">
    <h2 className="MenuItem-title">Soundcloud Test</h2>
    <Link to="/soundcloud" className="MenuItem-button">
      Soundcloud
      </Link>
  </div>
  );
}
export default Soundcloud;
