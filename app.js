// -- IMPORT --
const express = require('express')
const path = require('path')
const morgan = require('morgan')
// -- END IMPORT--

// -- EXPRESS APP --
const app = express()
const port = process.env.PORT || 2020

// buka port
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

// register view engine
app.set('view engine', 'ejs')

// register file statik
app.use(express.static(path.join(__dirname, 'public')))

// register logger
app.use(morgan('dev'))

// -- END EXPRESS APP --

// -- APP ROUTES --
const navMenus = [
  { link: '/qbank', icon: 'fas fa-warehouse', label: 'Question Bank' },
  { link: '/quesioner', icon: 'fas fa-newspaper', label: 'Quesioner' },
  { link: '/result', icon: 'fas fa-poll', label: 'Result' },
  { link: '/settings', icon: 'fas fa-cogs', label: 'Settings' },
]

// index
app.get('/', (req, res) => {
  const menus = [
    { link: '/qbank', icon: 'fas fa-warehouse', label: 'Question Bank' },
  ]
  res.render('index', {navTitle: 'Beranda', navMenus})
})

// qbank
app.get('/qbank', (req, res) => {
  res.render('pages/qbank', {navTitle: 'Q-Bank'})
})
app.get('/qbank-add', (req, res) => {
  res.render('pages/qbank-add', {navTitle: 'Q-Bank Add'})
})

// 404 page
app.use((req, res) => {
	res.status(404).render('404', { navTitle: '404' })
})
// -- END APP ROUTES --