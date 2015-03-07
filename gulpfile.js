'use strict';

var gulp = require( 'gulp' );
var g = require( 'gulp-load-plugins' )();

var allTestFiles = './tests/**/*.js';

gulp.task( 'assets', function() {
  gulp.src([
    'node_modules/gulp-mocha/node_modules/mocha/mocha.{js,css}',
    'node_modules/chai/chai.js'
  ])
  .pipe( gulp.dest( 'public' ) );
});

gulp.task( 'mocha', function() {
  gulp.src([ allTestFiles ], { read : false })
  .pipe(
    g.mocha({ reporter: 'list' })
  );
});

gulp.task( 'test', function( done ) {
  gulp.src([ allTestFiles ])
    .pipe( g.istanbul() )
    .on( 'finish', function() {
      gulp.src([ allTestFiles ])
      .pipe( g.mocha() )
      .on( 'error', done )
      .pipe( g.istanbul.writeReports() )
      .on( 'end', done );
    });
});

gulp.task( 'default', [ 'assets' ], function() {
  gulp.watch([ allTestFiles, 'src/ajax.js' ], [ 'test' ]);
});