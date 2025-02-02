const gulp = require('gulp'); // task runner
const browserSync = require('browser-sync').create(); // server
const sass = require('gulp-sass')(require('sass')); // compile sass to css
const autoprefixer = require('gulp-autoprefixer'); // add vendor prefixes to CSS rules
const cleanCSS = require('gulp-clean-css'); // minify css
const sourceMaps = require('gulp-sourcemaps'); // generate source maps
const webpack = require('webpack-stream'); // webpack
const babel = require('gulp-babel'); // babel
const sassGlob = require('gulp-sass-glob'); // globbing for sass
const fileInclude = require('gulp-file-include'); // file include
const fontello = require('gulp-fontello'); // fontello

const ROOT_PATH = './';
const PATHES = {
  browserSync: {
    server: ROOT_PATH,
  },
  html: {
    src: ROOT_PATH + 'html/**/*.html',
    dest: ROOT_PATH
  },
  scss: {
    src: ROOT_PATH + 'scss/**/*.scss',
    dest: ROOT_PATH + 'css/'
  },
  js: {
    src: ROOT_PATH + 'babel/**/*.js',
    dest: ROOT_PATH + 'js/'
  },
  fontello: {
    src: ROOT_PATH + 'fontello.json',
    dest: ROOT_PATH + 'fontello/'
  }
}

function _bs() {
  browserSync.init({
    server: PATHES.browserSync.server,
    open: false
  });
}

function _whatching() {
  gulp.watch(PATHES.html.src, _html);
  gulp.watch(PATHES.scss.src, _sass);
  gulp.watch(PATHES.js.src, _js);
  gulp.watch(PATHES.fontello.src, _fontello);
}

function _html() {
  const date = new Date();
  const time = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()} (Minsk)`;

  return gulp.src(PATHES.html.src)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        class: "",
        versiontime: time,
      }
    }))
    .pipe(gulp.dest(PATHES.html.dest))
    .pipe(browserSync.stream());
}

function _sass() {
  return gulp.src(PATHES.scss.src)
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
    .pipe(gulp.dest(PATHES.scss.dest))
    .pipe(browserSync.stream());
}

function _js() {
  return gulp.src(PATHES.js.src)
    .pipe(sourceMaps.init())
    .pipe(babel())
    .pipe(webpack(require('./webpack.config')))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(PATHES.js.dest))
    .pipe(browserSync.stream());
}

function _fontello() {
  return gulp.src(PATHES.fontello.src)
    .pipe(fontello())
    .pipe(gulp.dest(PATHES.fontello.dest))
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