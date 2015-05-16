'use strict';

var gulp = require( 'gulp' );
var karma = require( 'karma' ).server;
var jshint = require( 'gulp-jshint' );
var exec = require( 'child_process' ).exec;

var allFiles = '{test/src}/**/*.js';

gulp.task( 'lint', function() {
  gulp.src( allFiles )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'default' ) );
});

gulp.task( 'test', [ 'lint' ], function( done ) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done );
});

gulp.task( 'webserver', function() {
  require( './api/app' );
  exec( 'python -m SimpleHTTPServer 9001', function() {
    console.log( 'Server listen on port 9001' );
  });
});

gulp.task( 'watch', [ 'test' ], function() {
  gulp.watch( '{test,src}/**/*.js', [ 'test' ]);
});

gulp.task( 'default', [ 'webserver', 'watch' ]);