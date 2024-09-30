const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/top-artists', artistController.getUserTopArtists);

router.get('/search-artists', artistController.searchArtists)

module.exports = router;
