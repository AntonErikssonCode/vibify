import React from "react";
import "./MenuItem.css";

// Fix this on deployment
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=e1e42dc2ef98422c8bb7a97f90120da7&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-position%20app-remote-control"


function Login() {
  return (
    <div className="MenuItem-container">
    <h2 className="MenuItem-title">Login With Spotify</h2>
    <a className="MenuItem-button" href={AUTH_URL}> LOGIN</a>
  </div>
  );
}
export default Login;
