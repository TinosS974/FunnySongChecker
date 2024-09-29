const axios = require('axios');

exports.getTopArtists = async (accessToken) => {
  try {
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

exports.searchArtists = async (accessToken, query) => {
    try {
        // Step 1: Search for artists using Spotify's search API
        const searchResponse = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: 'artist',
                limit: 10, // Limit the number of results
            },
        });

        const artists = searchResponse.data.artists.items;
        const artistIds = artists.map((artist) => artist.id).join(',');

        // Step 2: Check if the user follows the artists
        const followResponse = await axios.get(`https://api.spotify.com/v1/me/following/contains`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                type: 'artist',
                ids: artistIds,
            },
        });

        // Combine artist data with follow status
        return artists.map((artist, index) => ({
            ...artist,
            isFollowed: followResponse.data[index],
        }));
    } catch (error) {
        console.error('Error searching artists in Spotify API:', error.message);
        throw new Error('Error searching for artists: ' + error.message);
    }
};

