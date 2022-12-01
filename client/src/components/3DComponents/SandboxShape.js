import React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls, folder, button } from "leva";

function SandboxShape(props) {
  const [
    { scale, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, color},
    set,
  ] = useControls("Box", () => ({
    transform: folder({
      scale: { value: 1, min: 0.4, max: 5, step: 0.1 },

      positionX: { value: 0, min: -10, max: 10, step: 0.1 },
      positionY: { value: 0, min: -10, max: 10, step: 0.1 },
      positionZ: { value: 0, min: -10, max: 10, step: 0.1 },

      rotationX: { value: 0, min: 0, max: 0.1, step: 0.01 },
      rotationY: { value: 0, min: 0, max: 0.1, step: 0.01 },
      rotationZ: { value: 0, min: 0, max: 0.1, step: 0.01 },
    }),
    color: folder({color: "#00ffff"}), 
    reset: button(() => [
      set({
        scale: 1,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0.0,
        rotationY: 0.0,
        rotationZ: 0.0,
      }),
    ]),
  }));

  const ref = useRef();
  useFrame((state, delta) => (ref.current.rotation.x += rotationX));
  useFrame((state, delta) => (ref.current.rotation.y += rotationY));
  useFrame((state, delta) => (ref.current.rotation.x += rotationZ));
  useFrame((state, delta) => (ref.current.rotation.x += rotationZ));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={scale}
      position={[positionX, positionY, positionZ]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default SandboxShape;
