'use strict';

var app = require( 'connect' )();
var connectRoute = require( 'connect-route' );
var bodyParser = require( 'body-parser' );
var users = require( './data/users' );

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use(function( req, res, next ) {
  res.setHeader( 'Access-Control-Allow-Origin', '*' );
  next();
});

app.use( connectRoute( function( router ) {
  function postRequest( req, res, next ) {
    var user = req.params.slug || req.body.slug;
    res.setHeader( 'Content-Type', 'application/json' );
    res.end( JSON.stringify( users[ user ] ) );
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