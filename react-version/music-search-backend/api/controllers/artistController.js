const artistService = require('../services/artistService');

exports.getUserTopArtists = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const timeRange = req.params.timeRange || 'medium_term';
    console.log('Access Token:', accessToken);
    console.log('Time Range:', timeRange);

    const topArtists = await artistService.getTopArtists(accessToken, timeRange);
    res.json(topArtists);
  } catch (error) {
    console.error('Error in getUserTopArtists controller:', error.message);
    res.status(500).json({ message: 'Error fetching top artists', error: error.message });
  }
};

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
