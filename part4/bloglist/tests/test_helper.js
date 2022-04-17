import Blog from '../models/blogs.js'
import User from '../models/user.js'

const initialUsers = [
  {
    username: 'TestUser1',
    password: 'testUser1',
    name: 'Test User',
  },
  {
    username: 'TestUser2',
    password: 'testUser2',
    name: 'Test User 2',
  },
  {
    username: 'TestUser3',
    password: 'testUser3',
    name: 'Test User 3',
  },
  {
    username: 'TestUser4',
    password: 'testUser4',
    name: 'Test User 4',
  },
  {
    username: 'TestUser5',
    password: 'testUser5',
    name: 'Test User 5',
  },
]

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willberemoved',
    author: 'me',
    url: 'http://www.example.com',
    likes: 2,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const userInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

export default {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  userInDb,
}
