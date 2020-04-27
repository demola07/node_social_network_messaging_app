const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const User = require('../models/user');

const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

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

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getStatus);

router.patch(
  '/status',
  isAuth,
  [body('status', 'Status cannot be empty').trim().not().isEmpty()],
  authController.updateStatus
);

module.exports = router;
