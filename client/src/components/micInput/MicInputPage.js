import React from "react";
import "./MicInputPage.css";
import MediaStream from "./MediaStream";
function DemoPage(props) {
  return (
    <div className="MicInputPage-Container">
      <h2>Controll Shape With Your Microphone</h2>
      <h3>Currently based on loudness </h3>

      <MediaStream />
    </div>
  );
}

export default DemoPage;
