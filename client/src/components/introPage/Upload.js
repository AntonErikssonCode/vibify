import React from "react";
import "./MenuItem.css";
import { Link } from "react-router-dom";

function Upload() {
  return (
    <div className="MenuItem-container">
      <h2 className="MenuItem-title">View Demo Audio With Real Time Feature Extraction</h2>
      <Link to="/upload" className="MenuItem-button">
        Demo Audio
      </Link>
    </div>
  );
}
export default Upload;
