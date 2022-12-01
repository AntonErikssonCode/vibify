 require('dotenv').config();

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
/* require('dotenv').config(); */

//TEST
//TEST
//TESTd


// npm run devStart
const clientKey = process.env.REACT_APP_CLIENT_KEY;
const secretKey = process.env.REACT_APP_SECRET_KEY;
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
  console.dir("REFRESH")
  console.dir(process.env.REACT_APP_CLIENT_KEY)
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.CLIENT_KEY,//"e1e42dc2ef98422c8bb7a97f90120da7",/*  process.env.REACT_APP_CLIENT_KEY ,// *//*  clientKey.toString() , */ //"e1e42dc2ef98422c8bb7a97f90120da7",
    clientSecret:process.env.SECRET_KEY, /* process.env.REACT_APP_SECRET_KEY, //  */ /* secretKey.toString(), */ //"3b98ddaf76714dc2a41953b50056f66f",
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })

    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  console.dir("LOGIN")
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.CLIENT_KEY,//"e1e42dc2ef98422c8bb7a97f90120da7",/* secretKey.toString(), *////  process.env.REACT_APP_CLIENT_KEY,//
    clientSecret:process.env.SECRET_KEY, /* secretKey.toString() */// process.env.REACT_APP_SECRET_KEY,//
    
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.dir(err)
      res.sendStatus(400)
    })
})
app.listen(3001)