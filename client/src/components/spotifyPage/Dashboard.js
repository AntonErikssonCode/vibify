import React, { useState, useEffect } from "react";
import useAuth from "../../useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResults from "./TrackSearchResults";
import Player from "../Player";
import "./Dashboard.css";
import OutputCanvas from "../3DComponents/OutputCanvas";
import WebPlayback from "../SpotifyPlayer";

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
  const [reachedSections, setReachedSections] = useState([]);
  const [bars, setBars] = useState([]);
  const [startAt, setStartAt] = useState();
  const [progression, setProgression] = useState(0);
  const [realProgression, setRealProgression] = useState(0);
  const [updateTime, setUpdateTime] = useState(performance.now());
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [deviceID, setDeviceID] = useState(0);

  function handleDeviceId(deviceID) {
    setDeviceID(deviceID);
  }

  function chooseTrack(track) {
    spotifyApi.getAudioFeaturesForTrack(track.id).then(function (data) {
      track.features = data.body;
      spotifyApi.getAudioAnalysisForTrack(track.id).then(function (data) {
        track.audio = data.body;
        setPlayingTrack(track);
        console.dir(track);
        setCanvas(true);
        setStartAt(track.audio.bars[0].start);
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

  // Progression
  function handleProgression(progression) {
    setProgression(progression);
  }

  // Progression
  function handleRealProgression(realProgression) {
    setRealProgression(realProgression);
  }

  const handleStart = () => {
    console.dir("start");
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    console.dir("resume");
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    console.dir("reset");
    setIsActive(false);
    setTime(0);
  };

  const updateRealtime = (newTime, newProgression) => {
    console.dir("Time = " + newTime);
    console.dir("Progression = " + newProgression);
    console.dir("Time + Progression = " + newTime + newProgression);
    setRealProgression(newTime + newProgression);
  };

  async function fetchTrackPosition() {
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      if (res.body === null) return;
      console.dir(res.body.progress_ms);
      setRealProgression(res.body.progress_ms/1000);
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
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 100);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, time]);

  return (
    <div className="dashboard-container">
      <div className="debugThing">
        {/*         <p className="debug">{progression}</p>
         */}{" "}
        <p className="debug">{realProgression}</p>
        {/*   <p className="debug">{time}</p>
        <p className="debug">{deviceID}</p> */}
        <button
          className="debug"
          onClick={(event) =>console.dir(sections)}
        >
          section
        </button>
        {/*  <button onClick={fetchTrackPosition}>Get Time</button> */}
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
      <div className="dashboard-segements-container">
        {sections.map((section, index) => {
          let color = index % 2 == 0 ? "#252525" : "#dedede";
          const procentWidth = (section.duration / duration) * 100;
          if(section.start < realProgression){
            color= "green";
          }
          const segmentStyle = {
            width: procentWidth + "%",
            backgroundColor: color,
          };
          return (
            <div
              key={"segment" + index}
              className="dashboard-segment"
              style={segmentStyle}
            ></div>
          );
        })}
      </div>
      <div className="dashboard-bars-container">
        <div
          className="dashboard-bars white-bar"
          style={{ width: (startAt / duration) * 100 + "%" }}
        ></div>
        {bars.map((bar, index) => {
          const color = index % 2 == 0 ? "#252525" : "#dedede";
          const procentWidth = (bar / duration) * 100;
          const barStyle = {
            width: procentWidth + "%",
            backgroundColor: color,
          };

          return (
            <div
              key={"segment" + index}
              className="dashboard-bars"
              style={barStyle}
            ></div>
          );
        })}

        <div className="dashboard-bars white-bar" style={{ flex: 1 }}></div>
      </div>
      <div className="dashboard-player-container">
        <Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
          track={playingTrack}
          progressionCallback={handleProgression}
          handleStart={handleStart}
          handlePauseResume={handlePauseResume}
          handleReset={handleReset}
          handleDeviceId={handleDeviceId}
        />
      </div>
    </div>
  );
}

export default Dashboard;
