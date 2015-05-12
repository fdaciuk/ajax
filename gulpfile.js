'use strict';

var gulp = require( 'gulp' );
var g = require( 'gulp-load-plugins' )();
var exec = require( 'child_process' ).exec;

var testFiles = 'tests/**/*.js';
var coreFiles = 'src/**/*.js';
var allFiles = [ testFiles, coreFiles ];

gulp.task( 'assets', function() {
  gulp.src([
    'node_modules/gulp-mocha/node_modules/mocha/mocha.{js,css}',
    'node_modules/chai/chai.js'
  ])
  .pipe( gulp.dest( 'public' ) );
});

gulp.task( 'test', [ 'coverage' ], function( done ) {
  var coverageFile = 'coverage/coverage.json';
  return gulp.src( 'index.html', { read: false } )
    .pipe( g.mochaPhantomjs({
      phantomjs: {
        hooks: 'mocha-phantomjs-istanbul',
        coverageFile: coverageFile
      }
    }) )
    .on( 'finish', function() {
      gulp.src( coverageFile )
        .pipe( g.istanbulReport() );
    });
});

gulp.task( 'coverage', function( done ) {
  return exec( 'istanbul cover _mocha tests/test.ajax.js', function( stdin, stdout, stderr ) {
    done();
  });
});

gulp.task( 'python', function() {
  exec( 'python -m SimpleHTTPServer 9001' );
  console.log( 'Server listen on port 9001' );
});

gulp.task( 'default', [ 'assets' ], function() {
  require( './api/app' );
  gulp.watch( allFiles, [ 'test' ]);
});