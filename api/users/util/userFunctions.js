'use strict'

const Boom = require('boom')
const User = require('../model/User')
const bcrypt = require('bcrypt')

const verifyUniqueUser = (req, res) => {
  // Find an entry from the database that
  // matches either the email or username
  User.findOne({
    $or: [
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }, (err, user) => {
    // Error out if `username` or `email`
    // is already taken
    if (user) {
      if (user.username === req.payload.username) {
        return res(Boom.badRequest('Username taken'))
      }

      if (user.email === req.payload.email) {
        return res(Boom.badRequest('Email taken'))
      }
    }

    // If everything checks out, send the payload through
    // to the route handler
    res(req.payload)
  })
}

const verifyCredentials = (req, res) => {
  const password = req.payload.password

  // Find an entry from the database that
  // matches either the email or the password
  User.findOne({
    $or: [
      { username: req.payload.username },
      { password: req.payload.password }
    ],
  }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (!isValid) {
          return res(Boom.badRequest('Incorrect password.'))
        }

        res(user)
      })
    } else {
      res(Boom.badRequest('Incorrect username or password.'))
    }
  })
}

module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials
}
