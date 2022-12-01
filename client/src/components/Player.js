import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { start } from "tone";

function Player({
  accessToken,
  trackUri,
  track,
  progressionCallback,
  
  handleStart,
  handlePauseResume,
  handleReset

}) {
  const [play, setPlay] = useState(false);


  useEffect(() => setPlay(true), [trackUri]);




  if (!accessToken) return null;
  return (
    <div>
      
      <SpotifyPlayer
        token={accessToken}
        play={play}
        initialVolume={1}
        name={"Vibify Animator"}
        styles={{
          activeColor: "#1A1A1A",
          bgColor: "#212121 ",
          color: "#b8b8b8",
          loaderColor: "#fff",
          sliderColor: "#36e572",
          trackArtistColor: "#b8b8b8",
          trackNameColor: "#fff",
        }}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
          if(state.isPlaying){
            console.dir("state is playing")
            handleStart();
          
          
          }
          else{
            console.dir("state is  NOT playing")
            handleReset();
           
           
          }
       
         
          progressionCallback(state.progressMs);
         
        }}
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  );
}

export default Player;
