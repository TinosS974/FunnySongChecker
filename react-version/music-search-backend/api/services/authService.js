const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Fonction pour générer l'URL d'authentification Spotify
exports.getSpotifyAuthURL = () => {
  const SCOPE = 'user-top-read user-read-private user-read-recently-played user-read-email';
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
};


// Fonction pour échanger le code d'autorisation contre un token d'accès
exports.exchangeCodeForToken = async (code) => {
  try {
    console.log('Exchanging code for token:', code);  // Log ici pour voir le code

    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_URI,  // Vérifie que ce `redirect_uri` correspond bien à celui utilisé dans Spotify Developer Dashboard
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Access token response:', response.data);  // Log ici pour vérifier la réponse

    return response.data.access_token;
  } catch (error) {
    console.error('Error exchanging code for token:', error.message);  // Log des erreurs
    throw new Error('Failed to exchange code for access token');
  }
};


