const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

// Route pour récupérer les top artists de l'utilisateur
router.get('/top-artists', artistController.getUserTopArtists);

router.get('/search-artists', artistController.searchArtists)

module.exports = router;
