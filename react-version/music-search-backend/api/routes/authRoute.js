const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.redirectToSpotifyLogin);
router.get('/callback', authController.handleSpotifyCallback);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
