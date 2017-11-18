const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./middlewares/cors')
const helmet = require('helmet')
const jwt = require('./middlewares/jwt')

const models = require('../infra/database/sequelize/models')
models.sequelize.sync()
  .then(() => console.log('database/sequelize: ok'))
  .catch(() => console.log('database/sequelize: erro'))

const app = express()
app.use(bodyParser.json())
app.use(cors)
app.use(helmet())

const exclusions = ['/api/auth/signin', '/api/auth/signup']
app.use(jwt({ exclusions }))

const routes = require('../units')
routes(app)

module.exports = app
