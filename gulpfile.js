const gulp = require('gulp'); // task runner
const browserSync = require('browser-sync').create(); // server
const sass = require('gulp-sass')(require('sass')); // compile sass to css
const autoprefixer = require('gulp-autoprefixer'); // add vendor prefixes to CSS rules
const cleanCSS = require('gulp-clean-css'); // minify css
const sourceMaps = require('gulp-sourcemaps'); // generate source maps
const webpack = require('webpack-stream'); // webpack
const babel = require('gulp-babel'); // babel
const sassGlob = require('gulp-sass-glob'); // globbing for sass]
const fileInclude = require('gulp-file-include'); // file include
const fontello = require('gulp-fontello'); // fontello

// Browsersync init
function _bs() {
  browserSync.init({
    // proxy: 'localhost/',
    // port: 80,
    server: './',
    open: false
  });
}

// Whatching
function _whatching() {
  gulp.watch(['html/**/*.html'], _html);
  gulp.watch('scss/**/*.scss', _sass);
  gulp.watch(['babel/**/*.js'], _js);
  gulp.watch(['fontello.json'], _fontello);
}

function _html() {

  return gulp.src(['html/*.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
      context: require('./html-vars.js')
    }))
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream());
}

// SCSS to CSS
function _sass() {
  return gulp.src(["scss/**/*.scss"])
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass({

    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({
      compatibility: 'ie9',
      format: 'beautify'
    }))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
}

function _js() {
  return gulp.src('babel/**/*.js')
    .pipe(sourceMaps.init())
    .pipe(babel())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
}

function _fontello() {
  return gulp.src('fontello.json')
    .pipe(fontello())
    .pipe(gulp.dest('fontello'))
    .pipe(browserSync.stream());
}

exports.default = gulp.series(
  _html,
  _sass,
  _js,
  _fontello,
  gulp.parallel(
    _bs,
    _whatching
  )
);

exports.css = _sass;
exports.js = _js;
exports.html = _html;
exports.fontello = _fontello;

exports.test = function (cb) {
  console.log(process.argv);
  
  cb();
}