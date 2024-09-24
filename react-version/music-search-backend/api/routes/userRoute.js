const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Route pour récupérer les infos du compte spotify de l'utilisateur
router.get('/', userController.getUserInfo);

module.exports = router;
