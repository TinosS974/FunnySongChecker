const authService = require('../services/authService');

// Contrôleur pour rediriger vers Spotify
exports.redirectToSpotifyLogin = (req, res) => {
  const spotifyAuthURL = authService.getSpotifyAuthURL();
  res.redirect(spotifyAuthURL);
};

exports.handleSpotifyCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    console.log('No authorization code provided');
    return res.status(400).send('No authorization code provided');
  }

  try {
    const accessToken = await authService.exchangeCodeForToken(code);

    res.redirect(`http://localhost:5173/home?access_token=${accessToken}`);
  } catch (error) {
    console.error('Error during token exchange:', error.message);
    res.status(500).send('Failed to authenticate with Spotify');
  }
};




