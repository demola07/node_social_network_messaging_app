const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const User = require('../models/user');

const authController = require('../controllers/auth');

router.put(
  '/signup',
  [
    body('email', 'Please enter a valid email')
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email address already exists');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().trim().not().isEmpty(),
  ],
  authController.signup
);

router.post('/login');

module.exports = router;
