import mongoose from 'mongoose'
import supertest from 'supertest'
import bcrypt from 'bcrypt'
import app from '../app.js'
import User from '../models/user.js'
import helper from './test_helper.js'

const api = supertest(app)
const saltRounds = 10

describe('User creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const promiseArray = helper.initialUsers.map(async (user) => {
      const passwordHash = await bcrypt.hash(user.password, saltRounds)
      const newUser = new User({ ...user, passwordHash })
      return newUser.save()
    })

    await Promise.all(promiseArray)
  })

  test('Users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('User get created', async () => {
    const usersBefore = await helper.userInDb()

    const newUser = {
      username: 'testUser',
      password: 'testPassword',
      name: 'Test User',
    }

    const returnedUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(returnedUser.password).not.toBeDefined()

    const usersAfter = await helper.userInDb()

    expect(usersAfter.length).toBeGreaterThan(usersBefore.length)
  })

  test('User creation gets refused without password', async () => {
    const usersBefore = await helper.userInDb()
    const newUser = {
      username: 'testUser1234',
      name: 'Test User',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'password must be at least 3 characters'
    )
    const usersAfter = await helper.userInDb()

    expect(usersAfter.length).toEqual(usersBefore.length)
  })

  test('User creation gets refused without username', async () => {
    const usersBefore = await helper.userInDb()
    const newUser = {
      password: 'test1234',
      name: 'Test User',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed')

    const usersAfter = await helper.userInDb()

    expect(usersAfter.length).toEqual(usersBefore.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
