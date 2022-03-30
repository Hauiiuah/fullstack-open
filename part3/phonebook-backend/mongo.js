
import dotenv from 'dotenv'
import mongoose from 'mongoose'






const name = process.argv[2]
const number = process.argv[3]

dotenv.config()
const url = process.env.DBURL || ""

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person',personSchema)

if(process.argv.length === 4){


    const person = new Person({
        name,
        number
    })
    
    person.save().then(result => {
        console.log(`added ${result.name} ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
else
{
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
            
        })
        mongoose.connection.close()
    })
 
}



