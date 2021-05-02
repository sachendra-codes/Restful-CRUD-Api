const express = require('express')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log('connected succefully')
  })
  .catch((err) => {
    console.log('could not connect')
    process.exit()
  })

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to easy notes application' })
})

require('./app/routes/note.routes.js')(app)

app.listen(3000, () => {
  console.log('server is listening at port 3000')
})
