import { Router } from 'express'
import Blog from '../models/blogs.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.url) {
    return response.status(400).send({ error: 'Missing URL' })
  }

  if (!blog.title) {
    return response.status(400).send({ error: 'Missing title' })
  }
  const result = await blog.save()
  response.status(201).json(result)
})

export default blogRouter
