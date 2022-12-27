import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

function Player({ accessToken, trackUri }) {
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
        magnifySliderOnHover={true}
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
          if (state.isPlaying) {
            console.dir("state is playing");
          } else {
            console.dir("state is  NOT playing");
          }
        }}
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  );
}

export default Player;
