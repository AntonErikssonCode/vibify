import React, { useState, useEffect } from "react";
import useAuth from "../../useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResults from "./TrackSearchResults";
import Player from "../Player";
import "./Dashboard.css";
import OutputCanvas from "../3DComponents/OutputCanvas";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_KEY,
});

function Dashboard({ code }) {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("aretha frankli");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [canvas, setCanvas] = useState(false);
  const [duration, setDuration] = useState(0);
  const [sections, setSections] = useState([]);
  const [bars, setBars] = useState([]);
  const [progression, setProgression] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  function chooseTrack(track) {
    spotifyApi.getAudioFeaturesForTrack(track.id).then(function (data) {
      track.features = data.body;
      spotifyApi.getAudioAnalysisForTrack(track.id).then(function (data) {
        track.audio = data.body;
        setPlayingTrack(track);
        console.dir(track);
        setCanvas(true);

        setSections(
          track.audio.sections.map((section) => {
            return section;
          })
        );

        setBars(
          track.audio.bars.map((bar) => {
            return bar.duration;
          })
        );
        setDuration(track.audio.track.duration);
      });
    });
  }

  async function fetchTrackPosition() {
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      if (res.body === null) return;
      setProgression(res.body.progress_ms / 1000);
    });
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            id: track.id,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  // Fetch current track position every 1sec
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTrackPosition();
    }, 1000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  useEffect(() => {
    let lastPassedSection;
   sections.forEach((section, index)=>{
    if (section.start < progression) {
      lastPassedSection = index;
      
    }
    
   })
   setCurrentSection(lastPassedSection);

  }, [progression]);

  return (
    <div className="dashboard-container">
      <div className="debugThing">
        <p className="debug">Elapsed Time: {progression}</p>
        <p className="debug">Current Section: {currentSection}</p>
      </div>
      <form className="dashboard-search-container">
        <input
          type="text"
          value={search}
          placeholder="Input something"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </form>
      <div className="dashboard-content">
        <div className="dashboard-results-container">
          {searchResults
            ? searchResults.map((track) => (
                <TrackSearchResults
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              ))
            : null}
        </div>
        <div className="dashboard-canvas">
          {canvas ? <OutputCanvas track={playingTrack} /> : null}
        </div>
      </div>
      <div className="dashboard-player-container">
        <Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
          track={playingTrack}
        />
      </div>
    </div>
  );
}

export default Dashboard;
