const songService = require('../services/songService');

exports.getUserTopSongs = async (req, res) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const timeRange = req.params.timeRange || 'medium_term';
  
      const topSongs = await songService.getTopSongs(accessToken, timeRange);
      res.json(topSongs);
    } catch (error) {
      console.error('Error in getUserTopSongs controller:', error.message);
      res.status(500).json({ message: 'Error fetching top songs', error: error.message });
    }
  };

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
        const id = req.params.id;
        const artistTopTracks = await songService.getArtistTopTracks(access_token, id);
        res.json(artistTopTracks);
    } catch (error) {
        res.status(500).json({message: 'Error fetching artist top tracks', error: error.message})
    }
}