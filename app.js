// -- IMPORT --
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const { requireAuth, checkUser } = require('./middleware/authMiddleware')
const qbankRoutes = require('./routes/qbankRoutes')
const authRoutes = require('./routes/authRoutes')
// -- END IMPORT--

// -- EXPRESS APP --
const app = express()
const port = process.env.PORT || 2020
const host = '0.0.0.0'
// const dbURI = 'mongodb://kitakoleksi.my.id:27017/node-auth'
const dbURI = 'mongodb://nodewiss:nodewiss@kitakoleksi.my.id:2021/node-wiss'

// MOngoDB Connect dan buka port app
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(result => {
    console.log(`Connected to DB at ${dbURI}`)
    // buka port
    app.listen(port, host, () => {
      console.log(`App listening at http://${host}:${port}`)
    })
  })
  .catch(err => console.log(err))

// view engine
app.set('view engine', 'ejs')

// express middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

// -- END EXPRESS APP --


// -- APP ROUTES --
app.get('*', checkUser)
// index
app.get('/', (req, res) => {
  const navMenus = [
    { link: '/qbank', icon: 'fas fa-warehouse', label: 'Bank Pertanyaan' },
    { link: '/quesioner', icon: 'fas fa-newspaper', label: 'Kuesioner' },
    { link: '/result', icon: 'fas fa-poll', label: 'Hasil' },
    { link: '/account', icon: 'fas fa-user-circle', label: 'Akun' },
  ]
  res.render('index', { navTitle: 'Beranda', navMenus })
})

// auth routes
app.use(authRoutes)

// qbank routes
app.use('/qbank', qbankRoutes)

// kuesioner
app.get('/quesioner', requireAuth , (req, res) => {
  const menus = []
  const navMenus = []
  res.render('pages/quesioner', { navTitle: 'Quesioner', menus, navMenus })
})

// hasil
app.get('/result', (req, res) => {
  const menus = []
  const navMenus = []
  res.render('pages/result', { navTitle: 'Result', menus, navMenus })
})

// settings
app.get('/account', (req, res) => {
  const menus = [
    { link: '/', icon: 'fas fa-cogs', label: 'Pengaturan' },
    { link: '/', icon: 'fas fa-user-circle', label: 'Set Kategori' },
    { link: '/', icon: 'fas fa-user-circle', label: 'Panduan' },
    { link: '/', icon: 'fas fa-user-circle', label: 'Tentang' },
    { link: '/', icon: 'fas fa-user-circle', label: 'Kontak' },
    { link: '/signup', icon: 'fas fa-user-circle', label: 'Daftar' },
    { link: '/login', icon: 'fas fa-user-circle', label: 'Masuk' },
    { link: '/logout', icon: 'fas fa-user-circle', label: 'Keluar' },
  ]
  const navMenus = [
    { link: '/', icon: 'fas fa-home', label: 'Beranda' },
    { link: '/', icon: 'fas fa-sign-out-alt', label: 'Keluar' },
  ]
  res.render('pages/account', { navTitle: 'Akun', menus, navMenus })
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { navTitle: '404' })
})
// -- END APP ROUTES --

// // COOKIES
// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookie', 'newUser = true')
//   res.cookie('newUser', false, { httpOnly: true })
//   res.cookie('isEmployee', true, { maxAge: 1000 * 5 })
//   res.send('You got the cookie!')
// })
// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies
//   console.log(cookies)

//   res.json(cookies)
// })