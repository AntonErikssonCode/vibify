import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Box from './Box';
import Sphere from "./Sphere";

export default function OutputCanvas(props) {
  const track = props.track;
  
  return (
    <Canvas >
      <ambientLight intensity={0.1} />
      <spotLight position={[50, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
     
      <Sphere position={[0, 0, 0]} track={track} moveDirection={props.moveDirection}/>
    </Canvas>
  )
}