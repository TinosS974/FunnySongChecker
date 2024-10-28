const axios = require('axios');
const { query } = require('express');

exports.getTopSongs = async (accessToken, timeStamp) => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=12&time_range=${timeStamp}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Spotify API response (Top Songs):', response.data);
      return response.data.items;
    } catch (error) {
      if (error.response) {
        console.error('Spotify API response error (Top Songs):', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response from Spotify API:', error.request);
      } else {
        console.error('Error during Spotify API request setup:', error.message);
      }
      throw new Error('Error fetching top songs: ' + error.message);
    }
  };

exports.getTracksRecentlyPlayed = async(accessToken, query) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=20", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query
            }
        });
        return response.data.items;

    } catch (error) {
        if (error.response) {
            console.error('Spotify API response error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received from Spotify API:', error.request);
        } else {
            console.error('Error during Spotify API request setup:', error.message);
        }
        throw new Error('Error fetching recently played tracks: ' + error.message);
    }
    
}

exports.getArtistTopTracks = async (accessToken, id) => {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                market: 'from_token',
            },
        });
        return response.data.tracks;
    } catch (error) {
        if (error.response) {
            console.error('Spotify API response error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received from Spotify API:', error.request);
        } else {
            console.error('Error during Spotify API request setup:', error.message);
        }
        throw new Error('Error fetching artist top tracks: ' + error.message);
    }
};

