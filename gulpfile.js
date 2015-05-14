'use strict';

var gulp = require( 'gulp' );
var karma = require( 'karma' ).server;
var exec = require( 'child_process' ).exec;

gulp.task( 'test', function( done ) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done );
});

gulp.task( 'webserver', function() {
  require( './api/app' );
  exec( 'python -m SimpleHTTPServer 9001' );
  console.log( 'Server listen on port 9001' );
});

gulp.task( 'watch', [ 'test' ], function() {
  gulp.watch( '{test,src}/**/*.js', [ 'test' ]);
});

gulp.task( 'default', [ 'webserver', 'watch' ]);