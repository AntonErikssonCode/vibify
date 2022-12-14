import React from "react";
import Login from "./Login";
import "./IntroPage.css";
import Sandbox from "./Sandbox";
import MicInput from "./MicInput"
import Upload from "./Upload";
import Soundcloud from "./Soundcloud";



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
    {/*     <Soundcloud/> */}
      </div>
    </div>
   
  );
}
export default IntroPage;
