const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is my second post',
        imageUrl: 'images/Dell.jpg',
        creator: { name: 'Ademola' },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation Failed, Entered Data is incorrect',
      errors: errors.array(),
    });
  }

  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: 'Post created successfully',
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: { name: 'Ademola' },
      createdAt: new Date(),
    },
  });
};
