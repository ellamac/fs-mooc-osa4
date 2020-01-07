const bcrypt = require('bcrypt');
const User = require('../models/user');
const usersRouter = require('express').Router();

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1
    });
    response.json(users.map(u => u.toJSON()));
  } catch (exception) {
    response.status(400).json({ error: exception.message });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    response.status(400).json({ error: exception.message });
  }
});

module.exports = usersRouter;
