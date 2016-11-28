'use strict'

const Boom = require('boom')
const User = require('../model/User')

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

module.exports = {
  verifyUniqueUser: verifyUniqueUser
}
