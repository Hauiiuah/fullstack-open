import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blogs.js'
import helper from './test_helper.js'

const api = supertest(app)

let authHeader = null

beforeAll(async () => {
  const result = await api.post('/api/login').send(helper.initialUsers[0])
  const token = result.body.token
  authHeader = { Authorization: `bearer ${token}` }
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog property id exists _id is truncated', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
  expect(blogs[0]._id).not.toBeDefined()
})

test('create a new blog complete', async () => {
  const newBlog = {
    author: 'Hauilicious',
    url: 'http://www.jan-haubrock.de',
    title: 'The worst/best',
    likes: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(authHeader)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((b) => b.title)
  expect(titles).toContain('The worst/best')
})

test('create a new blog fails without authorization', async () => {
  const newBlog = {
    author: 'Hauilicious',
    url: 'http://www.jan-haubrock.de',
    title: 'The worst/best',
    likes: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const titles = blogsAtEnd.map((b) => b.title)
  expect(titles).not.toContain('The worst/best')
})

test('create a new blog with missing likes get defaulted to 0', async () => {
  const newBlog = {
    author: 'Hauilicious',
    url: 'http://www.jan-haubrock.de',
    title: 'The missing property',
  }

  const createdBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set(authHeader)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(createdBlog.body.likes).toBeDefined()
  expect(createdBlog.body.likes).toEqual(0)
})

test('respond with bad request (400) if title and url are missing', async () => {
  const blogMissingURL = {
    author: 'Hauilicious',
    title: 'Who you gonna call?',
  }

  const blogMissingTitle = {
    author: 'Hauilicious',
    url: 'http://localhost',
  }
  await api.post('/api/blogs').send(blogMissingURL).set(authHeader).expect(400)
  await api
    .post('/api/blogs')
    .send(blogMissingTitle)
    .set(authHeader)
    .expect(400)
})

test('a single blog can be deleted', async () => {
  const newBlog = {
    author: 'Hauilicious',
    url: 'http://www.jan-haubrock.de',
    title: 'The worst/best',
    likes: 0,
  }
  const createdBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set(authHeader)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  await api
    .delete(`/api/blogs/${createdBlog.body.id}`)
    .set(authHeader)
    .expect(204)
})

test('a single blog cant be deleted without authorization', async () => {
  const newBlog = {
    author: 'Hauilicious',
    url: 'http://www.jan-haubrock.de',
    title: 'The worst/best',
    likes: 0,
  }
  const createdBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set(authHeader)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  await api.delete(`/api/blogs/${createdBlog.body.id}`).expect(401)
})

test('a blog can be updated. likes will be increased', async () => {
  const blogs = await helper.blogsInDb()
  const blogToEdit = blogs[0]

  const result = await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send({ likes: 1500 })
    .expect(200)

  expect(result.body.likes).not.toEqual(blogToEdit.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
