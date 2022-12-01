import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useUpdate } from "@react-three/fiber";
import * as THREE from "three";
import Color from "color";

function CircleShape(props) {
  const mesh = useRef();
  /*  useFrame((state, delta) => {
    ref.current.position.x = 1.7 * Math.cos((props.renderCounter * speed) ) + 0;
    ref.current.position.x += 0.01;
  });
  useFrame((state, delta) => (ref.current.rotation.y += 0.01));
 */
  /*  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);
  const timeMod = useMemo(() => random(0.1, 4, true), []);

  // raf loop
  useFrame(() => {
    mesh.current.rotation.y += 0.02 * timeMod;
    if (isActiveRef.current) {
      time.current += 0.03;
      mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4;
    }
  }); */
  const radie = 2;
  const rotationSpeed = 1;

  let positionVariation = { x: 0, y: 0, z: 0 };
  const [variation, setVariation] = useState({ x: 0, y: 0, z: 0 });

  const [color, setColor] = useState("white");

  useEffect(() => {
    const xVariation = Math.random() * (1 - 0) + -0;
    const yVariation = Math.random() * (1 - 0) + -0;
    const zVariation = Math.random() * (1 - 0) + -0;

    setVariation({
      x: xVariation,
      y: yVariation,
      z: zVariation,
    });
    const r = Math.round(xVariation * 256);
    const g = Math.round(yVariation * 256);
    const b = Math.round(zVariation * 256);
    console.dir(r);
    console.dir(g);

    console.dir(b);

    const color = Color.rgb(r, g, b);

    setColor(color.hex());
  }, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const x = radie * Math.sin((-t * rotationSpeed +variation.x)/*  * variation.x */) + variation.x/2;
    const y =  Math.cos(props.angle) * x ;
    const z = radie * Math.cos((-t * rotationSpeed +  variation.z) /* * variation.z */) + variation.z/2;
    mesh.current.position.x = x;
    mesh.current.position.y = y;
    mesh.current.position.z = z;
  });

  const speed = 0.1;
  return (
    <mesh
      {...props}
      ref={mesh}
            scale={0.11/* props.spectralSkewness / 50 */}
     
      position={[
        0, 0, 0,
        /*  1.7 * Math.cos((props.renderCounter * speed) / variation.x) + variation.x, */
        /*  1.7 * Math.cos((props.renderCounter * speed) / variation.y) + variation.y, */
        /*  1.7 * Math.sin((props.renderCounter * speed) / variation.z) + variation.z, */
      ]}
    >
      <sphereGeometry args={[1, 20, 20]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default CircleShape;
