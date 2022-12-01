import React from "react";
import { useControls, folder, button } from "leva";
import { Canvas, useFrame } from "@react-three/fiber";
import SandboxShape from "../3DComponents/SandboxShape";
import "./SandboxPage.css";
import { createNoise2D } from "simplex-noise";
import Background from "../background/Background";
import Noiseee from "../../sandbox/3dNoise";
function SandboxPage(props) {
  const noise2D = createNoise2D();
  console.log(noise2D(10, 10));
  console.log(noise2D(2, 2.2));
  console.log(noise2D(2, 2.3));

  const { color } = useControls("canvas", { color: "black" });
  return (
    <div className="SandboxPage-canvas">
      {/* <canvas className="SandboxPage-background" id="mycanvas">
        {" "}
      </canvas> */}
<Background/>
      <Canvas /*  style={{ background: color }} */>
        <ambientLight intensity={0.1} />
        <spotLight position={[50, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
     {/*    <SandboxShape /> */}
        <Noiseee/>
      </Canvas>
    </div>
  );
}

export default SandboxPage;
