const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour démarrer l'authentification avec Spotify
router.get('/login', authController.redirectToSpotifyLogin);

// Route pour traiter le callback de Spotify après authentification
router.get('/callback', authController.handleSpotifyCallback);

module.exports = router;
