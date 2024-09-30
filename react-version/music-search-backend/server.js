const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const artistRoutes = require('./api/routes/artistRoute');
const authRoutes = require('./api/routes/authRoute');
const userRoutes = require('./api/routes/userRoute');
const songRoutes = require('./api/routes/songRoute')

app.use('/api/spotify', artistRoutes);
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/spotify', songRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
