'use strict';

var connect = require( 'connect' );
var app = connect();
var PORT = 3000;

var connectRoute = require( 'connect-route' );
var bodyParser = require( 'body-parser' );
var users = require( './data/users' );

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.use(function cors( req, res, next ) {
  res.setHeader( 'Access-Control-Allow-Origin', '*' );
  next();
});

app.use( connectRoute( function routes( router ) {
  function handleRequest( req, res, next ) {
    var userRequested = req.params.slug || req.body.slug;
    var user = userRequested ? users[ userRequested ] : users;
    if( !user ) {
      res.statusCode = 404;
      user = '404 - Not found';
    }
    res.setHeader( 'Content-Type', 'application/json' );
    res.end( JSON.stringify( user ) );
  }

  router.get( '/api/users/', handleRequest );
  router.get( '/api/user/:slug', handleRequest );
  router.post( '/api/user', handleRequest );
  router.post( '/api/user/:slug', handleRequest );
  router.put( '/api/user/:slug', handleRequest );
  router.delete( '/api/user/:slug', handleRequest );
}));

app.listen( PORT );
console.log( 'Server listen on port ', PORT );

exports = module.exports = app;
