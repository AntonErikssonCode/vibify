import React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function ResponsiveShape(props) {
  const ref = useRef();
  /*  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  useFrame((state, delta) => (ref.current.rotation.y += 0.01)); */
  let t = 0.0;
  let xPos = 0;
  let zPos = 0;

/*   ref.current.position.x = 2 * Math.cos(props.renderCounter) + 0;
  ref.current.position.z = 2 * Math.sin(props.renderCounter) + 0;
 */
  return (
    <mesh {...props} ref={ref} scale={props.loudness / 50} position={[0,0,0]}>
      <sphereGeometry args={[1, 20, 20]} />
      <meshStandardMaterial color={props.meshColor.hex()} />
    </mesh>
  );
}

export default ResponsiveShape;
