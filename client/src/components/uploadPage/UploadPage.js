import React, { useEffect, useRef, useState } from "react";
import "./UploadPage.css";
import demoTune from "../../assets/track1.mp3";
import Meyda from "meyda";
import { Canvas, useFrame } from "@react-three/fiber";
import ResponsiveShape from "../3DComponents/ResponsiveShape";
import Color from "color";
import CircleShape from "../3DComponents/CircleShape";
import Test from "../3DComponents/Test";

function UploadPage(props) {
  const demoRef = useRef(null);
  const [rms, setRms] = useState(0);
  const [zcr, setZcr] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [amplitudeSpectrum, setAmplitudeSpectrum] = useState(0);
  const [powerSpectrum, setPowerSpectrum] = useState(0);
  const [spectralCentroid, setSpectralCentroid] = useState(0);
  const [spectralFlatness, setSpectralFlatness] = useState(0);
  const [spectralSlope, setSpectralSlope] = useState(0);
  const [spectralRolloff, setSpectralRolloff] = useState(0);
  const [spectralSpread, setSpectralSpread] = useState(0);
  const [spectralSkewness, setSpectralSkewness] = useState(0);
  const [spectralKurtosis, setSpectralKurtosis] = useState(0);
  const [spectralCrest, setSpectralCrest] = useState(0);
  const [chroma, setChroma] = useState(0);
  const [loudness, setLoudness] = useState(0);
  const [perceptualSpread, setPerceptualSpread] = useState(0);
  const [perceptualSharpness, setPerceptualSharpness] = useState(0);
  const [mfcc, setMfcc] = useState(0);
  const [complexSpectrum, setComplexSpectrum] = useState(0);
  const baseColor = Color.rgb(0, 0, 0);
  const [color, setColor] = useState(baseColor);
  const decimals = 2;
  const [renderCounter, setRenderCounter] = useState(0);

  const [audio, setAudio] = useState(demoTune);
  const [beat, setBeat] = useState(false);
  const keys = [
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B",
  ];
  const hzCutOff = 200;

  // AUDIO CONTEXT
  useEffect(() => {
    console.dir(audio);
    const audioContext = new AudioContext();
    const htmlAudioElement = demoRef.current;
    const source = audioContext.createMediaElementSource(htmlAudioElement);

    //LOWPASS FILTER
    let filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(hzCutOff, audioContext.currentTime, 0);
    source.connect(filter);
    /*  filter.connect(audioContext.destination) */

    //LOWPASS FILTER
    source.connect(audioContext.destination);

    if (typeof Meyda === "undefined") {
      console.log("Meyda could not be found! Have you included it?");
    } else {
      console.log("Meyda exist!");
      const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512 * 4,
        featureExtractors: [
          "rms",
          "zcr",
          "energy",
          "amplitudeSpectrum",
          "powerSpectrum",
          "spectralCentroid",
          "spectralFlatness",
          "spectralSlope",
          "spectralRolloff",
          "spectralSpread",
          "spectralSkewness",
          "spectralKurtosis",
          "spectralCrest",
          "chroma",
          "loudness",
          "perceptualSpread",
          "perceptualSharpness",
          "mfcc",
          "complexSpectrum",
        ],
        callback: (features) => {
          setRms(features.rms);
          setZcr(features.zcr);
          setEnergy(features.energy);
          setAmplitudeSpectrum(features.amplitudeSpectrum);
          setPowerSpectrum(features.powerSpectrum);
          setSpectralCentroid(features.spectralCentroid);
          setSpectralFlatness(features.spectralFlatness);
          setSpectralSlope(features.spectralSlope);
          setSpectralRolloff(features.spectralRolloff);
          setSpectralSpread(features.spectralSpread);
          setSpectralSkewness(features.spectralSkewness);
          setSpectralCrest(features.spectralCrest);
          setSpectralKurtosis(features.spectralKurtosis);
          setChroma(features.chroma);
          setLoudness(features.loudness.total);
          setPerceptualSpread(features.perceptualSpread);
          setPerceptualSharpness(features.perceptualSharpness);
          setMfcc(features.mfcc);
          setComplexSpectrum(features.complexSpectrum);
          setColor(
            color
              .red(features.spectralSpread * 255)
              .green(features.rms)
              .blue(features.spectralCentroid * 2)
          );
          setRenderCounter((prevActiveStep) => prevActiveStep + 0.01);
        },
      });
      analyzer.start();
    }

    if (typeof Meyda === "undefined") {
      console.log("Meyda could not be found! Have you included it?");
    } else {
      console.log("Meyda exist!");
      const lowPassAnalyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: filter,
        bufferSize: 512 * 4,
        featureExtractors: ["energy"],
        callback: (features) => {
          console.dir("lowpass" + features.energy);
          if (features.energy > 50) {
            setBeat(true);
          } else {
            setBeat(false);
          }
        },
      });
      lowPassAnalyzer.start();
    }
  }, [audio]);

  return (
    <div className="UploadPage-container">
      <h2>Feature Extration Demo</h2>
      <audio
        ref={demoRef}
        controls
        id="audioThing"
        src={audio}
        type="audio/wav"
        autoPlay={true}
        loop
      >
        Your browser does not support the audio element.
      </audio>

      <ul>
        <li>RMS : {rms.toFixed(decimals)}</li>
        <li>ZCR : {zcr.toFixed(decimals)}</li>
        <li>Energy : {energy.toFixed(decimals)}</li>
        <li>Spectral Centroid : {spectralCentroid.toFixed(decimals)}</li>
        <li>Spectral Slope : {spectralSlope.toFixed(decimals)}</li>
        <li>Spectral Rolloff : {spectralRolloff.toFixed(decimals)}</li>
        <li>Spectral Spread : {spectralSpread.toFixed(decimals)}</li>
        <li>Spectral Skewness : {spectralSkewness.toFixed(decimals)}</li>
        <li>Spectral Kurtosis : {spectralKurtosis.toFixed(decimals)}</li>
        <li>Spectral Crest : {spectralCrest.toFixed(decimals)}</li>
        <li>Loudness : {loudness.toFixed(decimals)}</li>
        <li>Perceptual Spread : {perceptualSpread.toFixed(decimals)}</li>
        <li>Perceptual Sharpness : {perceptualSharpness.toFixed(decimals)}</li>
        {/*         <li>Mel-Frequency Cepstral Coefficients :{mfcc}</li> */}
        {/*   <li>Complex Spectrum : {complexSpectrum}</li> */}
        {/*         <li>AmplitudeSpectrum : {amplitudeSpectrum}</li> */}
        {/*         <li>Power Spectrum : {powerSpectrum}</li> */}
        {/*         <li>Spectral Flatness : {spectralFlatness}</li> */}

        <li>
          Chroma :{" "}
          <div className="chromaDiv">
            {keys.map((element, index) => {
              return (
                <div
                  className="chromaKeys"
                  key={element}
                  style={{
                    opacity: chroma[index],
                    fontWeight: chroma[index] * 1000,
                  }}
                >
                  {element}
                </div>
              );
            })}
          </div>
        </li>
        <li>Lowpassfilter ({hzCutOff} hz) energy beattracker: </li>
        <div
          className="beatDiv"
          style={beat ? { background: "red" } : { background: "blue" }}
        ></div>
      </ul>

      <div className="coverScreen">
        <Canvas>
          <ambientLight intensity={0.1} />
          <spotLight position={[0, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <ResponsiveShape
            loudness={loudness}
            meshColor={color}
            renderCounter={renderCounter}
          />

          {/* 
          <CircleShape
            ref={CircleShape}
            renderCounter={renderCounter}
            spectralSkewness={spectralSkewness}
            yAngle={0.5}
            angle={0}
          />

          <CircleShape
            ref={CircleShape}
            renderCounter={renderCounter}
            spectralSkewness={spectralSkewness}
            yAngle={0.5}
            angle={90}
          />

          <CircleShape
            ref={CircleShape}
            renderCounter={renderCounter}
            spectralSkewness={spectralSkewness}
            yAngle={0.5}
            angle={45}
          />
           <CircleShape
          renderCounter={renderCounter}
          spectralSkewness={spectralSkewness}
          yAngle={0.5}
          angle={900}
        />
        
        <CircleShape
          renderCounter={renderCounter}
          spectralSkewness={spectralSkewness}
          yAngle={0.5}
          angle={123}
        />
         <CircleShape
          renderCounter={renderCounter}
          spectralSkewness={spectralSkewness}
          yAngle={0.5}
          angle={-45}
        /> */}
        </Canvas>
      </div>
    </div>
  );
}

export default UploadPage;
