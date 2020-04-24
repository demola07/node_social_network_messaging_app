exports.getPosts = (req, res, next) => {
  res.status(200).json([
    {
      posts: [{ title: 'Firt Post', content: 'This is my second post' }],
    },
  ]);
};

exports.createPost = (req, res, next) => {};
