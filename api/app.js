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
  function postRequest( req, res, next ) {
    var userRequested = req.params.slug || req.body.slug;
    var user = users[ userRequested ];
    if( !user )
      res.statusCode = 404;
    res.setHeader( 'Content-Type', 'application/json' );
    res.end( JSON.stringify( user ) );
  }

  router.get( '/api/users', function( req, res, next ) {
    res.setHeader( 'Content-Type', 'application/json' );
    res.end( JSON.stringify( users ) );
  });

  router.post( '/api/user', postRequest );
  router.post( '/api/user/:slug', postRequest );
  router.put( '/api/user/:slug', postRequest );
  router.delete( '/api/user/:slug', postRequest );
}));

app.listen( PORT );
console.log( 'Server listen on port ', PORT );

exports = module.exports = app;