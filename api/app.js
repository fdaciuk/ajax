'use strict';

var connect = require( 'connect' );
var connectRoute = require( 'connect-route' );
var app = connect();

var users = {
  joao: { name: 'João da Silva', age: 30 },
  maria: { name: 'Maria Firmina', age: 26 },
  paulo: { name: 'Paulo Torres', age: 25 }
};

app.use( connectRoute( function( router ) {
  function postRequest( req, res, next ) {
    res.setHeader( 'Content-Type', 'application/json' );
    res.end( JSON.stringify( users[ req.params.slug ] ) );
  }

  router.get( '/api/users', function( req, res, next ) {
    res.setHeader( 'Content-Type', 'application/json' );
    res.end( JSON.stringify( users ) );
  });

  router.post( '/api/user/:slug', postRequest );
  router.put( '/api/user/:slug', postRequest );
  router.delete( '/api/user/:slug', postRequest );
}));

app.listen( 3000 );

exports = module.exports = app;