const dummy = blogs => {
  return blogs.length + 1;
};

const totalLikes = blogs => {
  return blogs.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = blogs => {
  return blogs.length === 0
    ? null
    : blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
};

const mostBlogs = blogs => {
  //Tekee taulukon kaikista blogin kirjoittajan blogeista
  const filter = blog =>
    blogs.filter(currentBlog => currentBlog.author === blog.author);

  //Palauttaa sen kirjoittan kaikki blogit, jolla on eniten blogeja
  const reducer = (max, blog) =>
    max.length > filter(blog).length ? filter(max) : filter(blog);

  return blogs.length === 0
    ? null
    : {
        author: [].concat(blogs.reduce(reducer))[0].author,
        blogs: [].concat(blogs.reduce(reducer)).length
      };
};

const mostLikes = blogs => {
  //Tekee taulukon blogggaajan kaikista blogeista
  const filter = blog =>
    blogs.filter(currentBlog => currentBlog.author === blog.author);

  //Palauttaa sen kirjoittajan kaikki blogit, jolla on eniten tykkäyksiä
  const reducer = (max, blog) =>
    max.totalLikes > filter(blog).totalLikes ? filter(max) : filter(blog);

  return blogs.length === 0
    ? null
    : {
        author: [].concat(blogs.reduce(reducer))[0].author,
        likes: totalLikes([].concat(blogs.reduce(reducer)))
      };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
