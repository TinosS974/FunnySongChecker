const artistService = require('../services/artistService');

exports.getUserTopArtists = async (req, res) => {
    try {
        const access_token = req.headers.authorization.split(' ')[1];
        const topArtists = await artistService.getTopArtists(access_token);
        res.json(topArtists);
    } catch (error) {
        res.status(500).json({message: 'Error fetching top artists', error: error.message})
    }
}

exports.searchArtists = async (req, res) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const query = req.query.q;
  
      const artistsWithStatus = await artistService.searchArtists(accessToken, query);
      res.json(artistsWithStatus);
      
    } catch (error) {
      console.error('Error in searchArtists controller:', error.message);
      res.status(500).json({ message: 'Error fetching artists', error: error.message });
    }
  };
