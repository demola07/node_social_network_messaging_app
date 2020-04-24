const express = require('express');

const router = express.Router();

const feedController = require('../controllers/feed');

app.get('/posts', feedController.getPosts);

app.get('/posts', feedController.createPost);

module.exports = router;
