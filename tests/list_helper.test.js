const listHelper = require('../utils/list_helper');

const oneBlogList = [
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

const multipleBlogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
];

test('dummy returns 1', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('of one blog equals the likes of it', () => {
    const result = listHelper.totalLikes(oneBlogList);
    expect(result).toBe(2);
  });

  test('of multiple blogs is the sum of their likes', () => {
    const result = listHelper.totalLikes(multipleBlogList);
    expect(result).toBe(24);
  });
});

describe('favorite blog', () => {
  test('from an empty bloglist is null', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(null);
  });

  test('from a list of one blog is the only blog', () => {
    const result = listHelper.favoriteBlog(oneBlogList);
    expect(result).toEqual({
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    });
  });

  test('from multipile blog is the one with the most likes', () => {
    const result = listHelper.favoriteBlog(multipleBlogList);
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    });
  });
});

describe('most blogs', () => {
  test('in an empty list has no one (null)', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual(null);
  });

  test('in a one blog list has that blogs author', () => {
    const result = listHelper.mostBlogs(oneBlogList);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 1 });
  });

  test('in a multiple blog list is calculated correctly', () => {
    const result = listHelper.mostBlogs(multipleBlogList);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 });
  });
});

describe('most likes', () => {
  test('in an empty list has no one (null)', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual(null);
  });

  test('in a one blog list has that blogs author', () => {
    const result = listHelper.mostLikes(oneBlogList);
    expect(result).toEqual({ author: 'Robert C. Martin', likes: 2 });
  });

  test('in a multiple blog list is calculated correctly', () => {
    const result = listHelper.mostLikes(multipleBlogList);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
