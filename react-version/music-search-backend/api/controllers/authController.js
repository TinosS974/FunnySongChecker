const authService = require('../services/authService');

// Contrôleur pour rediriger vers Spotify
exports.redirectToSpotifyLogin = (req, res) => {
  const spotifyAuthURL = authService.getSpotifyAuthURL();
  console.log('Redirecting to Spotify login:', spotifyAuthURL);
  res.redirect(spotifyAuthURL);  // Rediriger l'utilisateur vers Spotify
};

exports.handleSpotifyCallback = async (req, res) => {
  const code = req.query.code;

  console.log('Authorization code received:', code);  // Log ici pour vérifier que le code est bien reçu

  if (!code) {
    console.log('No authorization code provided');
    return res.status(400).send('No authorization code provided');
  }

  try {
    console.log('Exchanging authorization code for access token...');
    const accessToken = await authService.exchangeCodeForToken(code);
    console.log('Access token received:', accessToken);  // Log ici pour voir si le token est bien reçu

    // Rediriger vers le frontend avec le token dans l'URL
    res.redirect(`http://localhost:5173/home?access_token=${accessToken}`);
  } catch (error) {
    console.error('Error during token exchange:', error.message);
    res.status(500).send('Failed to authenticate with Spotify');
  }
};




