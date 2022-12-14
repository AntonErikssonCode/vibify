import React from "react";
import Login from "./Login";
import "./IntroPage.css";
import Sandbox from "./Sandbox";
import MicInput from "./MicInput"
import Upload from "./Upload";
/* import dotenv from "dotenv" */



function IntroPage() {
 
  return (
    <div className="IntroPage-container">
      <h1 className="IntroPage-titel"> Vibify</h1>
      <h2 className="IntroPage-subtitle"> Created By Anton Eriksson</h2>
      <div className="IntroPage-menu">
        <Login />
        <Upload/>
        <MicInput/>
        <Sandbox/>
      </div>
    </div>
   
  );
}
export default IntroPage;
