const axios = require('axios');

exports.getTopArtists = async(accessToken) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=10", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.items;

    } catch (error) {
        throw new Error('Error fetching top artists: ' + error.message)

    }
}