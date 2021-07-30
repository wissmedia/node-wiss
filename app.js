// -- IMPORT --
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Question = require('./models/question')
const { render } = require('ejs')
// -- END IMPORT--

// -- EXPRESS APP --
const app = express()
const port = process.env.PORT || 2020
const host = '0.0.0.0'
const dbURI = 'mongodb://kitakoleksi.my.id:27017/node-wiss'

// MOngoDB Connect dan buka port app
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log(`Connected to DB at ${dbURI}`)
    // buka port
    app.listen(port, host, () => {
      console.log(`App listening at http://${host}:${port}`)
    })
  })
  .catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs')

// express middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// -- END EXPRESS APP --

// -- APP ROUTES --
// index
app.get('/', (req, res) => {
  const navMenus = [
    { link: '/qbank', icon: 'fas fa-warehouse', label: 'Bank Pertanyaan' },
    { link: '/quesioner', icon: 'fas fa-newspaper', label: 'Kuesioner' },
    { link: '/result', icon: 'fas fa-poll', label: 'Hasil' },
    { link: '/settings', icon: 'fas fa-cogs', label: 'Pengaturan' },
  ]
  res.render('index', { navTitle: 'Beranda', navMenus })
})

// qbank
app.get('/qbank', (req, res) => {
  const menus = []
  const navMenus = [
    { link: '/', icon: 'fas fa-home', label: 'Beranda' },
    { link: '/qbank/add', icon: 'fas fa-plus-circle', label: 'Tambah' },
  ]
  Question.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('pages/qbank', { navTitle: 'Bank Pertanyaan', menus, navMenus, questions: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post('/qbank', (req, res) => {
  console.log(req.body)
  const question = new Question(req.body)

  question.save()
    .then((result) => {
      res.redirect('/qbank')
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/qbank/:id', (req, res) => {
  const id = req.params.id
  const navMenus = [
    { link: '/qbank', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  Question.findById(id)
    .then((result) => {
      res.render('pages/qbank-details', { question: result, navTitle: 'Detail Pertanyaan', navMenus })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/qbank/add', (req, res) => {
  const menus = []
  const navMenus = []
  res.render('pages/qbank-add', { navTitle: 'Tambah Pertanyaan', menus, navMenus })
})

app.delete('/qbank/:id', (req, res) => {
  const id = req.params.id

  Question.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/qbank' })
    })
    .catch((err) => {
      console.log(err)
    })
})

// kuesioner
app.get('/quesioner', (req, res) => {
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
app.get('/settings', (req, res) => {
  const menus = [
    { link: '/', icon: 'fas fa-user-circle', label: 'Akun' },
  ]
  const navMenus = []
  res.render('pages/settings', { navTitle: 'Settings', menus, navMenus })
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { navTitle: '404' })
})
// -- END APP ROUTES --