const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

// Route pour récupérer les top artists de l'utilisateur
router.get('/top-tracks', songController.getUserTopSongs);

router.get('/recently-played', songController.getUserRecentlyPlayed)

module.exports = router;
