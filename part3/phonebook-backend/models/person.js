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
    number: {
        type:String,
        minLength:8,
        required: true,
        validate: {
            validator: (v) => {
                return /^\d{2,3}-\d{5,}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    name: {
        type:String,
        minlength: 3,
        required: true
    }
})

personSchema.set('toJSON',{
    transform: (document,retObj) => {
        retObj.id =retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})

export default mongoose.model('Person',personSchema)