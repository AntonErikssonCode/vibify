import React, { useEffect, useRef } from "react";

function MediaStream(props) {
  const streamRef = useRef();

  useEffect(()=>{
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
 

  return (
    <div>
      <video ref={streamRef} autoPlay>
        Video Stream Not Available
      </video>
    </div>
  );
}

export default MediaStream;
