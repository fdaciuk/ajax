'use strict';

var gulp = require( 'gulp' );
var g = require( 'gulp-load-plugins' )();
var exec = require( 'child_process' ).exec;

var allTestFiles = './tests/**/*.js';

gulp.task( 'assets', function() {
  gulp.src([
    'node_modules/gulp-mocha/node_modules/mocha/mocha.{js,css}',
    'node_modules/chai/chai.js'
  ])
  .pipe( gulp.dest( 'public' ) );
});

gulp.task( 'test', function( done ) {
  gulp.src([ allTestFiles ])
    .pipe( g.istanbul() )
    .on( 'finish', function() {
      gulp.src([ 'src/ajax.js', allTestFiles ])
      .pipe( g.istanbul.writeReports() )
      .on( 'end', done );
    });
});

gulp.task( 'python', function() {
  exec( 'python -m SimpleHTTPServer 9001' );
});

gulp.task( 'default', [ 'assets' ], function() {
  require( './api/app' );
  gulp.watch([ allTestFiles, 'src/ajax.js' ], [ 'test' ]);
});