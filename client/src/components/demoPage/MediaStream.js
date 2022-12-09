import React, { useEffect, useRef, useState } from "react";
import Meyda from "meyda";
import { Canvas, useFrame } from "@react-three/fiber";
import ResponsiveShape from "../3DComponents/ResponsiveShape";
import Color from "color";

function MediaStream(props) {
  const streamRef = useRef();
  const [loudness, setLoudness] = useState(0);
  const [renderCounter, setRenderCounter] = useState(0);
  const baseColor = Color.rgb(64, 128, 200);

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      function (stream) {
        // create the MediaStreamAudioSourceNode
        var context = new AudioContext();
        var source = context.createMediaStreamSource(stream);
        source.connect(context.destination);

        if (typeof Meyda === "undefined") {
          console.log("Meyda could not be found! Have you included it?");
        } else {
          console.log("Meyda exist!");
          const analyzer = Meyda.createMeydaAnalyzer({
            audioContext: context,
            source: source,
            bufferSize: 512,
            featureExtractors: ["loudness"],

            callback: (features) => {
              console.log(features.loudness.total);
              setLoudness(features.loudness.total);
              setRenderCounter((prevActiveStep) => prevActiveStep + 0.01);
            },
          });
          analyzer.start();
        }
      },
      function (e) {}
    );
  }, []);

  return (
    <div className="coverScreen">
      <Canvas>
        <ambientLight intensity={0.1} />
        <spotLight position={[0, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <ResponsiveShape
          loudness={loudness}
          meshColor={baseColor}
          renderCounter={0}
        />
      </Canvas>
    </div>
  );
}

export default MediaStream;
