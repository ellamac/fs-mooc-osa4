const http = require('http');
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogsRouter = require('./controllers/blogs');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
