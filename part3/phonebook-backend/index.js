import express  from 'express'
import morgan from 'morgan'
import cors from 'cors'


import Person from './models/person.js'

const app = express()

app.use(express.json())
morgan.token('body',(req) => {
  return req._body ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

app.use(express.static('build'))

app.get('/api/persons',(request,response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})


app.get('/api/persons/:id', (request,response,next) => {

  Person.findById(request.params.id)
    .then(result => {
      if(result)
      {
        response.json(result)
      }
      else
      {
        response.status(404).send({ error: 'no entry found' })
      }
    })
    .catch(error => next(error))

})

app.get('/info',(request,response) => {
  Person.find({})
    .then(result => {
      const numEntrys=result.length
      const content = `<p>Phonebook has info for ${numEntrys} people</p>
            <p>${new Date()}</p>`
      response.send(content).end()
    })
})


app.delete('/api/persons/:id',(request,response,next) => {

  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if(result){
        response.status(204).end()
      }
      else
      {
        response.status(404).send('No entry found')
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons/',(request,response,next) => {
  const { name, number } = request.body

  const person = new Person({
    name,
    number
  })
  person.save()
    .then(result => {
      response.status(200).json(result)
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id',(request,response,next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id,person,{ new: true })
    .then(updatedPerson => {
      if(updatedPerson)
      {
        response.json(updatedPerson)
      }
      else
      {
        response.status(404).send({ error:'no person found' })
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint= (request,response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name ==='ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})