import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blogs.js'
import helper from './test_helper.js'

const api = supertest(app)

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
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((b) => b.title)
  expect(titles).toContain('The worst/best')
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
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(createdBlog.body.likes).toBeDefined()
  expect(createdBlog.body.likes).toEqual(0)
})

test('respond with bad request (400) if title and url are missing', async () => {
  const blogMissingURL = {
    author:'Hauilicious',
    title:'Who you gonna call?'
  }

  const blogMissingTitle = {
    author: 'Hauilicious',
    url:'http://localhost'
  }
  await api
      .post('/api/blogs')
      .send(blogMissingURL)
      .expect(400)


})
