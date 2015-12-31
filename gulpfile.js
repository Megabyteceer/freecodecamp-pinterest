/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _swPrecache = require('sw-precache');

var _swPrecache2 = _interopRequireDefault(_swPrecache);

var _gulpLoadPlugins = require('gulp-load-plugins');

var _gulpLoadPlugins2 = _interopRequireDefault(_gulpLoadPlugins);

var _psi = require('psi');

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = (0, _gulpLoadPlugins2.default)();
var reload = _browserSync2.default.reload;

// Lint JavaScript
_gulp2.default.task('lint', function () {
  return _gulp2.default.src('src/app/controllers/**/*.js').pipe($.eslint()).pipe($.eslint.format()).pipe($.if(!_browserSync2.default.active, $.eslint.failOnError()));
});

// Optimize images
_gulp2.default.task('images', function () {
  return _gulp2.default.src('app/images/**/*').pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true
  }))).pipe(_gulp2.default.dest('dist/images')).pipe($.size({ title: 'images' }));
});

// Copy all files at the root level (app)
_gulp2.default.task('copy', function () {
  return _gulp2.default.src(['app/*', '!app/*.html', 'node_modules/apache-server-configs/dist/.htaccess'], {
    dot: true
  }).pipe(_gulp2.default.dest('dist')).pipe($.size({ title: 'copy' }));
});

// Compile and automatically prefix stylesheets
_gulp2.default.task('styles', function () {
  var AUTOPREFIXER_BROWSERS = ['ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'];

  // For best performance, don't add Sass partials to `gulp.src`
  return _gulp2.default.src(['app/styles/**/*.scss', 'app/styles/**/*.css']).pipe($.newer('.tmp/styles')).pipe($.sourcemaps.init()).pipe($.sass({
    precision: 10
  }).on('error', $.sass.logError)).pipe($.autoprefixer(AUTOPREFIXER_BROWSERS)).pipe(_gulp2.default.dest('.tmp/styles'))
  // Concatenate and minify styles
  .pipe($.if('*.css', $.minifyCss())).pipe($.size({ title: 'styles' })).pipe($.sourcemaps.write('./')).pipe(_gulp2.default.dest('dist/styles'));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enables ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
_gulp2.default.task('scripts', function () {
  return _gulp2.default.src([
  // Note: Since we are not using useref in the scripts build pipeline,
  //       you need to explicitly list your scripts here in the right order
  //       to be correctly concatenated
  'src/app/controllers/**/*.js'
  // Other scripts
  ]).pipe($.newer('.tmp/scripts')).pipe($.sourcemaps.init()).pipe($.babel()).pipe($.sourcemaps.write()).pipe(_gulp2.default.dest('.tmp/scripts')).pipe($.concat('main.min.js')).pipe($.uglify({ preserveComments: 'some' }))
  // Output files
  .pipe($.size({ title: 'scripts' })).pipe($.sourcemaps.write('.')).pipe(_gulp2.default.dest('dist/scripts'));
});

// Scan your HTML for assets & optimize them
_gulp2.default.task('html', function () {
  return _gulp2.default.src('app/**/*.html').pipe($.useref({ searchPath: '{.tmp,app}' }))
  // Remove any unused CSS
  .pipe($.if('*.css', $.uncss({
    html: ['app/index.html'],
    // CSS Selectors for UnCSS to ignore
    ignore: []
  })))

  // Concatenate and minify styles
  // In case you are still using useref build blocks
  .pipe($.if('*.css', $.minifyCss()))

  // Minify any HTML
  .pipe($.if('*.html', $.minifyHtml()))
  // Output files
  .pipe($.if('*.html', $.size({ title: 'html', showFiles: true }))).pipe(_gulp2.default.dest('dist'));
});

// Clean output directory
_gulp2.default.task('clean', function (cb) {
  return (0, _del2.default)(['.tmp', 'dist/*', '!dist/.git'], { dot: true });
});

// Watch files for changes & reload
_gulp2.default.task('serve', ['scripts', 'styles'], function () {
  (0, _browserSync2.default)({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app'],
    port: 3000
  });

  _gulp2.default.watch(['app/**/*.html'], reload);
  _gulp2.default.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  _gulp2.default.watch(['src/app/controllers/**/*.js'], ['lint', 'scripts']);
  _gulp2.default.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
_gulp2.default.task('serve:dist', ['default'], function () {
  return (0, _browserSync2.default)({
    notify: false,
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    port: 3001
  });
});

// Build production files, the default task
_gulp2.default.task('default', ['clean'], function (cb) {
  return (0, _runSequence2.default)('styles', ['lint', 'html', 'scripts', 'images', 'copy'], 'generate-service-worker', cb);
});

// Run PageSpeed Insights
_gulp2.default.task('pagespeed', function (cb) {
  return(
    // Update the below URL to the public URL of your site
    (0, _psi.output)('example.com', {
      strategy: 'mobile'
      // By default we use the PageSpeed Insights free (no API key) tier.
      // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
      // key: 'YOUR_API_KEY'
    }, cb)
  );
});

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
_gulp2.default.task('copy-sw-scripts', function () {
  return _gulp2.default.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js']).pipe(_gulp2.default.dest('dist/scripts/sw'));
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
_gulp2.default.task('generate-service-worker', ['copy-sw-scripts'], function () {
  var rootDir = 'dist';
  var filepath = _path2.default.join(rootDir, 'service-worker.js');

  return _swPrecache2.default.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: _package2.default.name || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: ['scripts/sw/sw-toolbox.js', 'scripts/sw/runtime-caching.js'],
    staticFileGlobs: [
    // Add/remove glob patterns to match your directory setup.
    rootDir + '/images/**/*', rootDir + '/app/controllers/**/*.js', rootDir + '/styles/**/*.css', rootDir + '/*.{html,json}'],
    // Translates a static file path to the relative URL that it's served from.
    stripPrefix: _path2.default.join(rootDir, _path2.default.sep)
  });
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
