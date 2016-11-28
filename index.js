'use strict'

const PORT = 3000

const Hapi = require('hapi')
const Boom = require('boom')
const mongoose = require('mongoose')
const glob = require('glob')
const path = require('path')
const secret = require('./config')

const server = new Hapi.Server()

server.connection({ port: PORT })

const dbUrl = 'mongodb://localhost:27017/hapi-jwt'

server.register(require('hapi-auth-jwt'), err => {
  // We're giving the strategy both
  // a name and scheme of 'jwt'
  server.auth.strategy('jwt', 'jwt', {
    key: secret,
    verifyOptions: {
      algorithms: [ 'HS256' ]
    }
  })

  // Look through all the routes
  // in all the subdirectories of API
  // and create a new route for each
  glob.sync('api/**/routes/*.js', {
    root: __dirname
  }).forEach(file => {
    const route = require(path.join(__dirname, file))
    server.route(route)
  })
})

// Start the server
server.start(err => {
  if (err) {
    throw err
  }

  console.log(`Server started on port ${PORT}...`)

  // Once started, connect to Mongo through Mongoose
  mongoose.connect(dbUrl, {}, err => {
    if (err) {
      throw err
    }

    console.log(`Connected to database ${dbUrl}`)
  })
})
