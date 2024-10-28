const axios = require('axios');

exports.getTopArtists = async (accessToken, timeStamp) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=12&time_range=${timeStamp}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Spotify API response (Top Artists):', response.data);
    return response.data.items;
  } catch (error) {
    if (error.response) {
      console.error('Spotify API response error (Top Artists):', error.response.status, error.response.data);
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
        const searchResponse = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: 'artist',
                limit: 10,
            },
        });

        const artists = searchResponse.data.artists.items;
        const artistIds = artists.map((artist) => artist.id).join(',');

        const followResponse = await axios.get(`https://api.spotify.com/v1/me/following/contains`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                type: 'artist',
                ids: artistIds,
            },
        });

        return artists.map((artist, index) => ({
            ...artist,
            isFollowed: followResponse.data[index],
        }));
    } catch (error) {
        console.error('Error searching artists in Spotify API:', error.message);
        throw new Error('Error searching for artists: ' + error.message);
    }
};

