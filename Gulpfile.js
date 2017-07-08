'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var babel = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var watchify = require('watchify')

gulp.task('styles', () => {
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'))
})

gulp.task('assets', () => {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public'))
})

gulp.task('build', () => {
  return compile()
})

function compile (watch) {
  var bundle = browserify('./src/index.js', {debug: true})
  if (watch) {
    bundle = watchify(bundle)
    bundle.on('update', () => {
      console.log('--> Bundling ...')
      rebundle()
    })
  }

  function rebundle () {
    bundle
      .transform(babel, { presets: ['es2015'], plugins: ['syntax-async-functions', 'transform-regenerator'] })
      .bundle()
      .on('error', (err) => { console.log(err); this.emit('end') })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'))
  }
  rebundle()
}

gulp.task('watch', () => { return compile(true) })
gulp.task('default', ['styles', 'assets', 'build'])
