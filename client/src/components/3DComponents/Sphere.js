import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Sphere(props) {
  const trackMode = props.track.features.mode;
  /*   console.dir(trackMode);
   */ // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame

  let move = null;
  const [size, setSize] = useState(1);

  useFrame((state, delta) => {
    if (props.moveDirection % 2 == 0) {
      setSize((prev) => size + 0.01);
    } else {
      setSize((prev) => size - 0.01);
    }
  });

  useEffect(() => {
    setSize(1);
  }, [props.track]);
  /* useFrame((state, delta) => (ref.current.position.z = 0.01)); */
  // Return the view, these are regular Threejs elements expressed in JSX

  return (
    <mesh
      {...props}
      ref={ref}
      /* scale={clicked ? 1.5 : 1} */
      scale={size}
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
