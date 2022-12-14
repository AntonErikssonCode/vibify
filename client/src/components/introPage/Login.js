import React from "react";
import "./MenuItem.css";



const client_id = process.env.REACT_APP_CLIENT_KEY;
  
// Fix this on deployment
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id="+ client_id +"&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-position%20app-remote-control"


function Login() {
  
  return (
    <div className="MenuItem-container">
    <h2 className="MenuItem-title">Use Spotify Audio And Features</h2>
    <a className="MenuItem-button" href={AUTH_URL}> Spotify Audio</a>
  </div>
  );
}
export default Login;
