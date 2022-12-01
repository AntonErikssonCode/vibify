import React from "react";
import Login from "./Login";
import "./IntroPage.css";
import Sandbox from "./Sandbox";
import Demo from "./Demo";
import Upload from "./Upload";



function IntroPage() {
  return (
    <div className="IntroPage-container">
      <h1 className="IntroPage-titel"> Vibify Animator</h1>
      <h2 className="IntroPage-subtitle"> Created By Anton Eriksson</h2>
      <div className="IntroPage-menu">
        <Login />
        <Upload/>
        <Demo/>
        <Sandbox/>
      </div>
    </div>
   
  );
}
export default IntroPage;
