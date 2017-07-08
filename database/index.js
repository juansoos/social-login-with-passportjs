'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* Se crea el esquema para la colección usuario */
const UserSchema = new Schema({
  email: { type: String, lowercase: true },
  provider_id: String,
  provider: String,
  displayName: String,
  photoProfile: String,
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

module.exports = mongoose.model('User', UserSchema)
