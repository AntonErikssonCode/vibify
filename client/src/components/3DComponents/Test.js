import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback
} from "react";
import { random } from "lodash";
import { useFrame } from "@react-three/fiber";

function Test(props) {
  const mesh = useRef();
  const time = useRef(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(isActive);

  // position
  const position = useMemo(() => {
    return [random(-5, 5, true), random(-5, 5, true), random(-5, 5, true)];
  }, []);

  // random time mod factor
  const timeMod = useMemo(() => random(0.1, 4, true), []);

  // color
  const color = isHovered ? 0xe5d54d : (isActive ? 0xf7e7e5 : 0xf95b3c);

  //useEffect of the activeState
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // raf loop
  useFrame(() => {
    mesh.current.rotation.y += 0.02 * timeMod;
    if (isActiveRef.current) {
      time.current += 0.03;
      mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4;
    }
  });

  // Events
  const onHover = useCallback(
    (e, value) => {
      e.stopPropagation();
      setIsHovered(value);
    },
    [setIsHovered]
  );

  const onClick = useCallback(
    e => {
      e.stopPropagation();
      setIsActive(v => !v);
    },
    [setIsActive]
  );

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={e => onClick(e)}
      onPointerOver={e => onHover(e, true)}
      onPointerOut={e => onHover(e, false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 0.25]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};

export default Test;
