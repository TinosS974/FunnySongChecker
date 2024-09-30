const axios = require('axios');
require('dotenv').config();

exports.getUserInfos = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user info from Spotify: ' + error.message);
  }
};
