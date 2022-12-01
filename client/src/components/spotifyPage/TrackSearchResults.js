import React from 'react';
import "./TrackSearchResults.css"
function TrackSearchResults({track, chooseTrack}) {
  function handlePlay(){
    chooseTrack(track)
  }
  return (
    <div  className="trackSearchResults-container" onClick={handlePlay}>
        <img src={track.albumUrl} style={{height: "64px", width:"64px"}}/>
        <div>
          <div className="trackSearchResults-title">{track.title}</div>
          <div className="trackSearchResults-artist">{track.artist}</div>
        </div>
    </div>
  );
}

export default TrackSearchResults;