'use strict';

var connect = require( 'connect' );
var app = connect();
var PORT = 3000;
require( './routes' );

app.listen( PORT );
console.log( 'Server listen on port ', PORT );

exports = module.exports = app;