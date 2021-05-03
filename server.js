const express = require('express')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
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

const makeRequest = require('./app/routes/note.routes.js')
makeRequest(app)

app.listen(4000, () => {
  console.log('server is listening at port 4000')
})
