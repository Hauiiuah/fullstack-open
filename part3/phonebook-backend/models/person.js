import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("Error connecting to DB: ",error.message)
    })


const personSchema = new mongoose.Schema({
    number: String,
    name: String
})

personSchema.set('toJSON',{
    transform: (document,retObj) => {
        retObj.id =retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})

export default mongoose.model('Person',personSchema)