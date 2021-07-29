// -- IMPORT --
const express = require('express')
const path = require('path')
// -- END IMPORT--

// -- EXPRESS APP --
const app = express()
const port = process.env.PORT || 2020

// buka port
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
// register file statik
app.use(express.static(path.join(__dirname, 'public')))
// -- END EXPRESS APP --

// -- APP ROUTES --
app.get('/', (req, res) => {
  res.json({message: 'app is running'})
})
// -- END APP ROUTES --