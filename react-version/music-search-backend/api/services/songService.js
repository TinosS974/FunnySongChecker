const axios = require('axios');

exports.getTopSongs = async(accessToken) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=12", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.items;

    } catch (error) {
        throw new Error('Error fetching top tracks: ' + error.message)

    }
}

exports.getTracksRecentlyPlayed = async(accessToken) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
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