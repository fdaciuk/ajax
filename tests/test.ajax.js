;(function ( root, factory ) {
  'use strict';
  /* istanbul ignore next */
  if ( typeof define === 'function' && define.amd ) {
    define([ 'chai.should', 'Ajax' ], factory );
  }
  else if ( typeof exports === 'object' ) {
    exports = module.exports = factory( require( 'chai' ).should(), require( '../src/ajax' ) );
  }
  else {
    root.Ajax = factory( root.chai.should(), root.Ajax );
  }
})(this, function( should, Ajax ) {
  'use strict';

  describe( 'Test module interface', function() {
    var ajax = new Ajax();

    it( 'Should have `get` method', function() {
      ajax.should.have.property( 'get' );
    });

    it( 'Should have `post` method', function() {
      ajax.should.have.property( 'post' );
    });

    it( 'Should have `put` method', function() {
      ajax.should.have.property( 'put' );
    });

    it( 'Should have `delete` method', function() {
      ajax.should.have.property( 'delete' );
    });

    it( 'Should `get` method return `done` method', function() {
      var getRequest = ajax.get();
      getRequest.should.have.property( 'done' );
    });

    it( 'Should `get` method return `error` method', function() {
      var getRequest = ajax.get();
      getRequest.should.have.property( 'error' );
    });

    it( 'Should `post` method return `done` method', function() {
      var postRequest = ajax.post();
      postRequest.should.have.property( 'done' );
    });

    it( 'Should `post` method return `error` method', function() {
      var postRequest = ajax.post();
      postRequest.should.have.property( 'error' );
    });

    it( 'Should `put` method return `done` method', function() {
      var putRequest = ajax.put();
      putRequest.should.have.property( 'done' );
    });

    it( 'Should `put` method return `error` method', function() {
      var putRequest = ajax.put();
      putRequest.should.have.property( 'error' );
    });

    it( 'Should `delete` method return `done` method', function() {
      var deleteRequest = ajax.delete();
      deleteRequest.should.have.property( 'done' );
    });

    it( 'Should `delete` method return `error` method', function() {
      var deleteRequest = ajax.delete();
      deleteRequest.should.have.property( 'error' );
    });
  });

  describe( 'Test `get` method', function() {
    it( 'Should return an object', function( done ) {
      var ajax = new Ajax();
      ajax.get( 'http://localhost:3000/api/users' ).done(function( response ) {
        response.should.be.an( 'object' );
        done();
      });
    });
  });

  describe( 'Test `post` method', function() {
    it( 'Should return an object', function( done ) {
      var ajax = new Ajax();
      ajax.post( 'http://localhost:3000/api/user/joao' ).done(function( response ) {
        response.should.be.an( 'object' );
        done();
      });
    });

    it( 'Should return data about `joao`', function( done ) {
      var ajax = new Ajax();
      ajax.post( 'http://localhost:3000/api/user', 'slug=joao' ).done(function( response ) {
        console.log( response );
        response.name.should.be.equal( 'João da Silva' );
        done();
      });
    });
  });
});