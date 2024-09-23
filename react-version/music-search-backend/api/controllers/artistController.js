const artistService = require('../services/artistService');

exports.getUserTopArtists = async (req, res) => {
    try {
        const access_token = req.headers.authorization.split('')[1];
        const topArtists = await artistService.getTopArtists(access_token);
        res.json(topArtists);
    } catch (error) {
        res.status(500).json({message: 'Error fetching top artists', error: error.message})
    }
}