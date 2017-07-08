'use strict'

var yo = require('yo-yo')

module.exports = () => {
  return yo`<div class="container">
    <h1 class="title">Login social usando PassportJS</h1>
    <div class="icon-container">
      <h3 class="description">Selecciona con cuál deseas realizar login.</h3>
      <div class="row">
        <!-- Twitter -->
        <div class="social-icons col col-xs-12 col-md-3">
          <a href="/auth/twitter" class="btn btn-block btn-social btn-twitter">
            <span class="fa fa-twitter"></span>
            Inicia sesión con Twitter
          </a>
        </div>
        <!-- Twitter -->
        <!-- facebook -->
        <div class="social-icons col col-xs-12 col-md-3">
          <a href="/auth/facebook" class="btn btn-block btn-social btn-facebook">
            <span class="fa fa-facebook"></span>
            Inicia sesión con facebook
          </a>
        </div>
        <!-- facebook -->
        <!-- google -->
        <div class="social-icons col col-xs-12 col-md-3">
          <a href="/auth/google" class="btn btn-block btn-social btn-google">
            <span class="fa fa-google"></span>
            Inicia sesión con google
          </a>
        </div>
        <!-- google -->
        <!-- linkedin -->
        <div class="social-icons col col-xs-12 col-md-3">
          <a href="/auth/linkedin" class="btn btn-block btn-social btn-linkedin">
            <span class="fa fa-linkedin"></span>
            Inicia sesión con linkedin
          </a>
        </div>
        <!-- linkedin -->
      </div>
    </div>
  </div>`
}
