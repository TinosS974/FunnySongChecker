const axios = require('axios');

exports.getTopArtists = async (accessToken) => {
  try {
    console.log('Using access token:', accessToken);  // Log du token
    const response = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=12", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Spotify API response:', response.data);  // Log de la réponse complète
    return response.data.items;

  } catch (error) {
    if (error.response) {
      console.error('Spotify API response error:', error.response.data);
    } else if (error.request) {
      console.error('No response from Spotify API:', error.request);
    } else {
      console.error('Error during Spotify API request setup:', error.message);
    }
    throw new Error('Error fetching top artists: ' + error.message);
  }
};
