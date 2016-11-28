'use strict'

const bcrypt = require('bcrypt')
const Boom = require('boom')
const User = require('../model/User')
const createUserSchema = require('../schemas/createUser')
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser
const createToken = require('../util/token')

const hashPassword = (password, cb) => {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => cb(err, hash))
  })
}

module.exports = {
  method: 'POST',
  path: '/api/users',
  config: {
    // Before the route handler runs, verify
    // that the user is unique
    pre: [
      { method: verifyUniqueUser }
    ],

    handler: (req, res) => {
      let user = new User()

      user.email = req.payload.email
      user.username = req.payload.username
      user.admin = false

      console.log(req.payload)

      hashPassword(req.payload.password, (err, hash) => {
        if (err) {
          throw Boom.badRequest(err)
        }

        user.password = hash

        user.save((err, user) => {
          if (err) {
            throw Boom.badRequest(err)
          }

          // Issue JWT if the user is saved successfully
          res({ id_token: createToken(user) }).code(201)
        })
      })
    },

    // Validate payload against Joi schema
    validate: {
      payload: createUserSchema
    }
  }
}
