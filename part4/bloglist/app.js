import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import expressAsyncErrors from 'express-async-errors'

import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

import blogRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'

const app = express()

logger.info('connecting to', config.DBURL)

mongoose
  .connect(config.DBURL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
