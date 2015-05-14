'use strict';

var gulp = require( 'gulp' );
var karma = require( 'karma' ).server;
var exec = require( 'child_process' ).exec;
var plato = require( 'plato' );

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

gulp.task( 'watch', [ 'test', 'plato' ], function() {
  gulp.watch( '{test,src}/**/*.js', [ 'test', 'plato' ]);
});

gulp.task( 'plato', function( done ) {
  var files = [ 'src/**/*.js' ];
  var outputDir = './plato';
  var options = { title: '#Ajax' };
  function callback( report ) { done(); };
  plato.inspect( files, outputDir, options, callback );
});

gulp.task( 'default', [ 'webserver', 'watch' ]);