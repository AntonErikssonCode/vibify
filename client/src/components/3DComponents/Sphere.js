import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Sphere(props) {
  const trackMode = props.track.features.mode;
/*   console.dir(trackMode);
 */  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
/*   useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  useFrame((state, delta) => (ref.current.position.z = 0.01)); */
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[1, 20, 20]} />
      <meshStandardMaterial
        color={hovered ? "red" : "orange"}
        transparent
        opacity={1}
        wireframe={trackMode === 1 ? true : false}
      />
    </mesh>
  );
}
export default Sphere;
