const userService = require('../services/userService');

exports.getUserInfo = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    
    const userProfile = await userService.getUserInfos(accessToken);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: `Error fetching User's infos`, error: error.message });
  }
};
