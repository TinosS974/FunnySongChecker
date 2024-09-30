const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

// Route pour récupérer les top artists de l'utilisateur
router.get('/user-top-tracks', songController.getUserTopSongs);

router.get('/recently-played', songController.getUserRecentlyPlayed);

router.get('/artist-top-tracks/:id', songController.getArtistTopTracks)

module.exports = router;
