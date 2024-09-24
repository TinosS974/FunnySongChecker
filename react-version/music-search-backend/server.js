const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Importer les routes de l'artiste depuis le dossier api
const artistRoutes = require('./api/routes/artistRoute');
const authRoutes = require('./api/routes/authRoute');
const userRoutes = require('./api/routes/userRoute');

// Utiliser les routes de l'artiste pour l'API
app.use('/api/spotify', artistRoutes);
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
