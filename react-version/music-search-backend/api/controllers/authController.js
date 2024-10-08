const authService = require('../services/authService');

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
    const { accessToken, refreshToken, expiresIn } = await authService.exchangeCodeForToken(code);

    res.redirect(
      `${process.env.FRONT_URI}/home?access_token=${accessToken}&refresh_token=${refreshToken}&expires_in=${expiresIn}`
    );
  } catch (error) {
    console.error('Error during token exchange:', error.message);
    res.status(500).send('Failed to authenticate with Spotify');
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.refresh_token;

  if (!refreshToken) {
    return res.status(400).send('No refresh token provided');
  }

  try {
    const { accessToken, expiresIn } = await authService.refreshAccessToken(refreshToken);
    res.json({ accessToken, expiresIn });
  } catch (error) {
    console.error('Error during token refresh:', error.message);
    res.status(500).send('Failed to refresh token');
  }
};
