// signup_get, login_get, signup_post, login_post
const User = require('../models/user')

const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { email: '', password: '' }
  // duplicate errors
  if (err.code === 11000) {
    errors.email = 'Email is already registered'
    return errors
  }
  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

const signup_get = (req, res) => {
  const menus = []
  const navMenus = []
  res.render('signup', { navTitle: "Daftar", menus, navMenus, })
}
const login_get = (req, res) => {
  const menus = []
  const navMenus = []
  res.render('login', { navTitle: "Masuk", menus, navMenus, })
}
const signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    res.status(201).json(user)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}
const login_post = async (req, res) => {
  const { email, password } = req.body

  console.log(email, password)
  res.send('new login')
}
const logout = (req, res) => {
  res.render('logout')
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
}