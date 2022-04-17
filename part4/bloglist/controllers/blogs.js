import { Router } from 'express'
import jwt from 'jsonwebtoken'

import Blog from '../models/blogs.js'
import User from '../models/user.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog(request.body)

  blog.user = user._id

  console.log('Blog', blog)

  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.url) {
    return response.status(400).send({ error: 'Missing URL' })
  }

  if (!blog.title) {
    return response.status(400).send({ error: 'Missing title' })
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  //const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }

  return response
    .status(401)
    .json({ error: 'request permittet. couldnt authorize' })
})

blogRouter.put('/:id', async (request, response) => {
  const blog = { ...request.body }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  response.json(updatedBlog)
})

export default blogRouter
