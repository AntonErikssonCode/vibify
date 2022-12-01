import React from "react";
import "./MenuItem.css";
import { Link } from "react-router-dom";

function Upload() {
  return (
    <div className="MenuItem-container">
      <h2 className="MenuItem-title">Upload Your Own Audio</h2>
      <Link to="/upload" className="MenuItem-button">
        UPLOAD AUDIO
      </Link>
    </div>
  );
}
export default Upload;
