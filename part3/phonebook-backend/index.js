import express  from "express"
import morgan from "morgan"
import cors from 'cors'


import Person from "./models/person.js"

const app = express()

app.use(express.json())
morgan.token("body",(req,res) => {
    return req._body ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())


app.get('/api/persons',(request,response) => {
    Person.find({}).then(result=>{
        response.json(result)
    })
})


app.get('/api/persons/:id', (request,response) => {

    Person.findById(request.params.id).then(result => {
        response.json(result)
    })
    
})

app.get('/info',(request,response) => {
    const numEntrys = persons.length
    const content = `<p>Phonebook has info for ${numEntrys} people</p>
    <p>${new Date()}</p>`
    response.send(content).end()
})


app.delete('/api/persons/:id',(request,response) => {

    Person.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end()
    })
})

app.post('/api/persons/',(request,response) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(result=>{
        response.status(200).json(result)
    })    

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})