const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const title = process.argv[3];
const author = process.argv[4];
const urli = process.argv[5];
const likes = process.argv[6];

const url = `mongodb+srv://ella:${password}@cluster0-hucyi.mongodb.net/blog-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const blog = new Blog({
  title: title,
  author: author,
  url: urli,
  likes: likes
});

blog.save().then(() => {
  console.log('blog saved!');
  mongoose.connection.close();
});
