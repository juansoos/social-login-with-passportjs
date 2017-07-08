/*
  Realiza el proceso de autenticación usando PassportJS y
  las estrategias de Facebook, Twitter, Google y Linkedin.
*/
'use strict'

var FacebookStrategy = require('passport-facebook').Strategy
var TwitterStrategy = require('passport-twitter').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var LinkedinStrategy = require('passport-linkedin').Strategy

var User = require('../database')
var config = require('../config')

/* Estrategia para realizar login con Facebook */
exports.facebookStrategy = new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accesToken, refreshToken, profile, done) => {
  /* Se consulta si existe el registro del usuario en la base de datos */
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) throw err
    /* Si el usuario existe se actualiza el campo lastLogin y se resuelve el callback */
    if (!err && user != null) {
      User.update({ provider_id: user.provider_id }, { $set: { lastLogin: Date.now() } }, (err, usr) => {
        if (err) throw err
      })
      done(null, user)
    /* Si el usuario no existe se crea y se resuelve el callback */
    } else {
      user = new User({
        provider_id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photoProfile: profile.photos[0].value,
        provider: profile.provider
      })
      user.save((err) => {
        if (err) throw err
        done(null, user)
      })
    }
  })
})

/* Estrategia para realizar login con Twitter */
exports.twitterStrategy = new TwitterStrategy({
  consumerKey: config.twitter.consumerKey,
  consumerSecret: config.twitter.consumerSecret,
  callbackURL: config.twitter.callbackURL
}, (token, tokenSecret, profile, done) => {
  /* Se consulta si existe el registro del usuario en la base de datos */
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) throw err
    /* Si el usuario existe se actualiza el campo lastLogin y se resuelve el callback */
    if (!err && user != null) {
      User.update({ provider_id: user.provider_id }, { $set: { lastLogin: Date.now() } }, (err, usr) => {
        if (err) throw err
      })
      done(null, user)
    /* Si el usuario no existe se crea y se resuelve el callback */
    } else {
      user = new User({
        provider_id: profile.id,
        displayName: profile.displayName,
        photoProfile: profile.photos[0].value,
        provider: profile.provider
      })
      user.save((err) => {
        if (err) throw err
        done(null, user)
      })
    }
  })
})

/* Estrategia para realizar login con Google */
exports.googleStrategy = new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
}, (accesToken, refreshToken, profile, done) => {
  /* Se consulta si existe el registro del usuario en la base de datos */
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) throw err
    /* Si el usuario existe se actualiza el campo lastLogin y se resuelve el callback */
    if (!err && user != null) {
      User.update({ provider_id: user.provider_id }, { $set: { lastLogin: Date.now() } }, (err, usr) => {
        if (err) throw err
      })
      done(null, user)
    } else {
      /* Si el usuario no existe se crea y se resuelve el callback */
      user = new User({
        provider_id: profile.id,
        displayName: profile.displayName,
        photoProfile: profile.photos[0].value,
        email: profile.emails[0].value,
        provider: profile.provider
      })
      user.save((err) => {
        if (err) throw err
        done(null, user)
      })
    }
  })
})

/* Estrategia para realizar login con Linkedin */
exports.linkedinStrategy = new LinkedinStrategy({
  consumerKey: config.linkedIn.clientID,
  consumerSecret: config.linkedIn.clientSecret,
  callbackURL: config.linkedIn.callbackURL,
  profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
}, (token, tokenSecret, profile, done) => {
  /* Se consulta si existe el registro del usuario en la base de datos */
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) throw err
    /* Si el usuario existe se actualiza el campo lastLogin y se resuelve el callback */
    if (!err && user != null) {
      User.update({ provider_id: user.provider_id }, { $set: { lastLogin: Date.now() } }, (err, usr) => {
        if (err) throw err
      })
      done(null, user)
    /* Si el usuario no existe se crea y se resuelve el callback */
    } else {
      user = new User({
        provider_id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        provider: profile.provider
      })
      user.save((err) => {
        if (err) throw err
        done(null, user)
      })
    }
  })
})

/* función para serealizar usurio */
exports.serializeUser = function (user, done) {
  done(null, {
    id: user._id,
    token: user.token
  })
}
/* función para deserealizar usurio */
exports.deserializeUser = function (user, done) {
  User.find({ _id: user.id }, (err, usr) => {
    usr.token = user.token
    done(err, usr)
  })
}
