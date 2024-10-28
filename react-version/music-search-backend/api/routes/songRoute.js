const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('/user-top-tracks/:timeRange', songController.getUserTopSongs);
router.get('/recently-played', songController.getUserRecentlyPlayed);
router.get('/artist-top-tracks/:id', songController.getArtistTopTracks);

module.exports = router;
