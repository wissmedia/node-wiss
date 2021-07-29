// -- IMPORT --
const express = require('express')
// -- END IMPORT--

// -- EXPRESS APP --
const app = express()
const port = process.env.PORT || 2020

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
// -- END EXPRESS APP --

// -- APP ROUTES --
app.get('/', (req, res) => {
  res.json({message: 'app is running'})
})
// -- END APP ROUTES --