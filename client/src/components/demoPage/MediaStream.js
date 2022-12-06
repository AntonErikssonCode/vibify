import React, { useEffect, useRef } from "react";
import Meyda from "meyda";
function MediaStream(props) {
  const streamRef = useRef();

  /*   useEffect(()=>{
    navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: true,
    })
    .then((stream) => {
      streamRef.current.srcObject = stream;
      console.dir("stream")
    })
    .catch(console.error);

  }, [])
  */
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
            },
          });
          analyzer.start();
        }
      },
      function (e) {}
    );
  }, []);

  return (
    <div>
      <video ref={streamRef} autoPlay>
        Video Stream Not Available
      </video>
    </div>
  );
}

export default MediaStream;
