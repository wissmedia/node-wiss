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
app.get('/', (req, res) => {
  res.render('index', {navTitle: 'Beranda'})
})

// 404 page
app.use((req, res) => {
	res.status(404).render('404', { navTitle: '404' })
})
// -- END APP ROUTES --