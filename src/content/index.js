'use strict'

var page = require('page')
var empty = require('empty-element')
var title = require('title')
var template = require('./template')

page('/', (ctx, next) => {
  title('Login social usando PassportJS')
  var main = document.getElementById('main-container')
  empty(main).appendChild(template())
})
