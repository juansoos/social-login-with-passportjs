'use strict'

var yo = require('yo-yo')

module.exports = () => {
  return yo`<div class="content">
    <h1 class="title">Login social usando PassportJS</h1>
    <div class="icon-container">
      <h3 class="description">Login exitoso.</h3>
      <div class="row text-center">
        <div class="col col-xs-12">
          <a href="/logout" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Cerrar sesión</a>
        </div>
      </div>
    </div>
  </div>`
}
