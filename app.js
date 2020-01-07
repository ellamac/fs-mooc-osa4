const config = require('./utils/config');
const express = require('express');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

module.exports = app;
