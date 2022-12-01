import React, { useRef, useEffect } from "react";
import "./Background.css";
import { createNoise3D } from "simplex-noise";
import useWindowDimensions from "../../hooks/useWindowDimensions"

const Background = () => {
  const { height, width } = useWindowDimensions();
  console.log(height, width)
  const canvasRef = useRef();
  const noise3D = createNoise3D();
  const tRef = useRef(0);
  const rafRef = useRef();
  const lerp = (x, x1, x2, y1, y2) => y1 + (x - x1) * ((y2 - y1) / (x2 - x1));

  const getPixel = (noise, palette) => {
    let rgb = [];

    for (let i = 0; i < 3; i++) {
      rgb.push(lerp(Math.abs(noise), 0, 1, palette[0][i], palette[1][i]));
    }
    return rgb;
  };
  const scale = 300
  const palette = [
    [255, 129, 0],
    [255, 0, 114],
  ];
  useEffect(() => {
    const frame = () => {
      const ctx = canvasRef.current.getContext("2d");
      const imageData = ctx.createImageData(scale, scale);

      for (let x = 0; x < scale; x++) {
        for (let y = 1; y < scale; y++) {
          const index = (x + y * scale) * 4;

          const noise = noise3D(x / 100, y / 100, tRef.current / 750); //Scaling of noise
          const pixel = getPixel(noise, palette);

          imageData.data[index] = pixel[0];
          imageData.data[index + 1] = pixel[1];
          imageData.data[index + 2] = pixel[2];
          imageData.data[index + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      tRef.current++;
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* const imageData = ctx.createImageData(100, 100); */

  return (
    <canvas
      className="background"
      width={scale +"px"}
      height={scale+"px"}
      ref={canvasRef}
    />
  );
};
export default Background;
