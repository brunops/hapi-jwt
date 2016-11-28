'use strict'

const Joi = require('joi')

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().token().min(8).max(60).required(),
  email: Joi.string().email().required()
})

module.exports = createUserSchema
