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


// index
app.get('/', (req, res) => {
  const navMenus = [
    { link: '/qbank', icon: 'fas fa-warehouse', label: 'Bank Pertanyaan' },
    { link: '/quesioner', icon: 'fas fa-newspaper', label: 'Kuesioner' },
    { link: '/result', icon: 'fas fa-poll', label: 'Hasil' },
    { link: '/settings', icon: 'fas fa-cogs', label: 'Pengaturan' },
  ]
  res.render('index', {navTitle: 'Beranda', navMenus})
})

// qbank
app.get('/qbank', (req, res) => {
  const navMenus = [
    { link: '/qbank', icon: 'fas fa-warehouse', label: 'Bank Pertanyaan' },
    { link: '/quesioner', icon: 'fas fa-newspaper', label: 'Kuesioner' },
    { link: '/result', icon: 'fas fa-poll', label: 'Hasil' },
    { link: '/settings', icon: 'fas fa-cogs', label: 'Pengaturan' },
  ]
  res.render('pages/qbank', {navTitle: 'Q-Bank', navMenus})
})
app.get('/qbank-add', (req, res) => {
  res.render('pages/qbank-add', {navTitle: 'Q-Bank Add'})
})

// 404 page
app.use((req, res) => {
	res.status(404).render('404', { navTitle: '404' })
})
// -- END APP ROUTES --