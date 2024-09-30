const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

exports.getSpotifyAuthURL = () => {
  const SCOPE = 'user-top-read user-follow-read user-read-private user-read-recently-played user-read-email';
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${encodeURIComponent(SCOPE)}`;
};


exports.exchangeCodeForToken = async (code) => {
  try {
    console.log('Exchanging code for token:', code);

    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Access token response:', response.data);

    return response.data.access_token;
  } catch (error) {
    console.error('Error exchanging code for token:', error.message);
    throw new Error('Failed to exchange code for access token');
  }
};


