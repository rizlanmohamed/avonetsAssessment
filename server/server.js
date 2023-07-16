const dotenv = require('dotenv');
dotenv.config({ path: './.env' })
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./db/config');

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`app running on ${process.env.PORT}`);
});