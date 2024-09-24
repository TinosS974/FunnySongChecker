const axios = require('axios');

exports.getTopSongs = async(accessToken) => {
    try {
        console.log('Using access token:', accessToken);
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