# Vibify 
Vibify is a React research project with the goal of visualizing sound in 3D. Several approaches are being investigated such as real time audio extraction from your own uploaded audio as well as the implementation of the Spotify API and SDK. 

## Features

- Spotify Authentication, Song Search, Playback And Feature Mapping
- Demo Song and Real Time Audio Feature extraction using [Meyda](https://meyda.js.org/)
- Basic Manipulatable React 3D-components

## Installation

Vibify requires [Node.js](https://nodejs.org/) to run.

Clone the repository. 

If you want to use the Spotify functionality you need to [Create a Spotify App ](https://developer.spotify.com/dashboard/login) to get access to you client and secret key. Create a .env file in the root folder with the following variables:

```sh
CLIENT_KEY = <"YOUR CLIENT KEY">
SECRET_KEY = <"YOUR SECRET CLIENT KEY">
```

**Install** the Node Modules for the frontend...

```sh
cd client
npm install
```
...and the backend. Note that the backend is only used for Spotify API authorization. 
```sh
cd server
npm install
```


**Run** the project by starting up the client...
```sh
cd client
npm start
```
...and the server.
```sh
cd server
npm run devStart
```

