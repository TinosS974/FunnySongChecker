const songService = require('../services/songService');

exports.getUserTopSongs = async (req, res) => {
    try {
        const access_token = req.headers.authorization.split(' ')[1];
        const topSongs = await songService.getTopSongs(access_token)
        res.json(topSongs);
    } catch (error) {
        res.status(500).json({message: 'Error fetching top songs', error: error.message})
    }
}

exports.getUserRecentlyPlayed = async(req, res) => {
    try {
        const access_token = req.headers.authorization.split(' ')[1];
        const recently = await songService.getTracksRecentlyPlayed(access_token);
        res.json(recently);
    } catch (error) {
        res.status(500).json({message: 'Error fetching recently played', error: error.message})
    }
}

exports.getArtistTopTracks = async(req, res) => {
    try {
        const access_token = req.headers.authorization.split(' ')[1];
        const id = req.query.q;
        const artistTopTracks = await songService.getArtistTopTracks(access_token, id);
        res.json(artistTopTracks);
    } catch (error) {
        res.status(500).json({message: 'Error fetching artist top tracks', error: error.message})
    }
}