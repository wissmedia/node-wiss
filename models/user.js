const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter a valid email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
}, { timestamps: true })

// fire a func before doc saved to db (hash password)
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// // fire a func after doc saved to db
// userSchema.post('save', function (doc, next) {
//   console.log('new user was created & saved', doc)
//   next()
// })

// // fire a func before doc saved to db
// userSchema.pre('save', function (next) {
//   console.log('user about to be created & saved', this)
//   next()
// })

const User = mongoose.model('user', userSchema)

module.exports = User