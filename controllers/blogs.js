const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1
    });
    response.json(blogs);
  } catch (exception) {
    response.status(400).json(exception.message);
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (exception) {
    response.status(400).json(exception.message);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    response.status(400).json(exception.message);
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      runValidators: true,
      context: 'query'
    });
    response.status(200).json(updatedBlog.toJSON());
  } catch (exception) {
    response.status(400).json(exception.message);
  }
});

module.exports = blogsRouter;
