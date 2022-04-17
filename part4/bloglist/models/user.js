import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
  },
  name: String,
  passwordHash: String,
})

userSchema.set('toJSON', {
  transform: (document, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
    delete retObj.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

export default User
