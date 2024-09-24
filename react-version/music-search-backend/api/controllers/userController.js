const userService = require('../services/userService');

exports.getUserInfo = async (req, res) => {
  try {
    // Extraire le token d'accès depuis le header Authorization
    const accessToken = req.headers.authorization.split(' ')[1];  // Corrige la séparation par l'espace (entre "Bearer" et le token)
    
    const userProfile = await userService.getUserInfos(accessToken);  // Appel du service pour obtenir les infos
    res.json(userProfile);  // Répondre avec les infos de l'utilisateur
  } catch (error) {
    res.status(500).json({ message: `Error fetching User's infos`, error: error.message });
  }
};
