const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/user');
const FeedController = require('../controllers/feed');

describe('Feed Controller', function () {
  before(function (done) {
    mongoose
      .connect(process.env.MONGODB_URI_TEST)
      .then((result) => {
        const user = new User({
          email: 'test@test.com',
          password: 'tester',
          name: 'test',
          posts: [],
          _id: '5c0f66b979af55031b34728a',
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  it('should add a created post to the posts of the creator', function (done) {
    const req = {
      body: {
        title: 'Test Post',
        content: 'Test Content',
      },
      file: {
        path: 'abc',
      },
      userId: '5c0f66b979af55031b34728a',
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property('posts');
      expect(savedUser.posts).to.have.length(1);
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
