'use strict'

var express = require('express')
var config = require('./config')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var expressSesion = require('express-session')
var passport = require('passport')
var auth = require('./auth')
var helmet = require('helmet')
var mongoose = require('mongoose')

var app = express()
app.use(helmet())

app.set(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSesion({ secret: config.secret, resave: false, saveUninitialized: false }))

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'pug')
app.use(express.static('public'))

/* Estrategias de login */
passport.use(auth.facebookStrategy)
passport.use(auth.twitterStrategy)
passport.use(auth.googleStrategy)
passport.use(auth.linkedinStrategy)

passport.deserializeUser(auth.deserializeUser)
passport.serializeUser(auth.serializeUser)

/* Función para verificar que el proceso de login sea exitoso */
function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.status(401).send({ error: 'not authenticated' })
}

/* Rutas de acceso */
app.get('/', (req, res) => { res.render('index') })
app.get('/success', (req, res) => { res.render('index') })
app.get('/whoami', function (req, res) { res.status(200).send({ user: req.user }) })
app.get('/auth', ensureAuth, (req, res) => { res.redirect('success') })
app.get('/logout', (req, res) => { req.logout(); res.redirect('/') })

/* Rutas de autenticación */
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))
app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }))
app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }))

/* Rutas de callback */
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth', failureRedirect: '/' }))
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/auth', failureRedirect: '/' }))
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/auth', failureRedirect: '/' }))
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { successRedirect: '/auth', failureRedirect: '/' }))

/* Conexión a la base de datos y levantamiento del servidor */
mongoose.connect(config.db, { useMongoClient: true }, (err, res) => {
  if (err) { return console.log(`Error al conectar a la base de datos: ${err}`) }
  console.log('Conexión a la base de datos establecida.')
  app.listen(config.port, (req, res) => { console.log(`Listening in http://localhost:${config.port}`) })
})
