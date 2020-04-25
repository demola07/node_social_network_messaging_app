const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const MONGODB_URL = process.env.MONGODB_URI;

const feedRoutes = require('./routes/feed');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({
    message: message,
  });
});

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    app.listen(8080, () => {
      console.log('Server Running');
    });
  })
  .catch((err) => {
    console.log(err);
  });
