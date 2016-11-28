'use strict'

const jwt = require('jsonwebtoken')
const secret = require('../../../config')

const createToken = user => {
  let scopes

  // Check if the user object passed in
  // is an admin, and if so,
  // set scopes to 'admin'
  if (user.admin) {
    scopes = 'admin'
  }

  // Sign JWT
  return jwt.sign({
    id: user._id,
    username: user.username,
    scope: scopes
  }, secret, {
    algorithm: 'HS256',
    expiresIn: '1h'
  })
}

module.exports = createToken
