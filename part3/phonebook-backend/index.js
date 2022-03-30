import express  from "express";
import morgan from "morgan"

const app = express()

app.use(express.json())
morgan.token("body",(req,res) => {
    return req._body ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [{ 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }]



app.get('/api/persons',(request,response) => {
    response.json(persons)
})


app.get('/api/persons/:id', (request,response) => {
    const pId = Number(request.params.id)
    const person = persons.find(f => f.id ===pId)
    if(person){
        response.json(person)
    }
    else
    {
        response.sendStatus(404).end()
    }
})

app.get('/info',(request,response) => {
    const numEntrys = persons.length
    const content = `<p>Phonebook has info for ${numEntrys} people</p>
    <p>${new Date()}</p>`
    response.send(content).end()
})


app.delete('/api/persons/:id',(request,response) => {
    const pId = Number(request.params.id)
    persons = persons.filter(p => p.id !==pId)
    response.status(204).end()
})

app.post('/api/persons/',(request,response) => {
    const body = request.body

    if(!body.name){
        return response.status(400).json({error:"No name submitted"})
    }

    if(!body.number){
        return response.status(400).json({error: "No number submitted"})
    }

    if(persons.find(p => p.name === body.name)){
        return response.status(400).json({error: "name must be unique"})
    }


    body.id =Math.floor(Math.random()*498390)
    persons = persons.concat(body)
    response.status(200).json(body)
    

})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})