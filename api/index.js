const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const build = require('./package.json')
const knexfile = require('./knexfile.js')

const app = express()
const port = process.env.PORT
const origin = process.env.CORS_ORIGIN

knex(knexfile).migrate.latest()
  .then((latest) => {
    console.warn(latest)
    knex(knexfile).migrate.list()
      .then((list) => console.log(list))
  })
  .catch((errors) => console.error(errors))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin }))
app.use((request, response, next) => {
  console.log(origin)
  console.log(build.number)
  response.header('build-number', build.number)
  next()
})

app.get('/', (request, response) => {
  response.status(200).json({ message: 'ok' })
})

app.listen(port, () => {
  console.log(`Server api is running at ${port}`)
})
