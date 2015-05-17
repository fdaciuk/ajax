;(function ( root, factory ) {
  'use strict';
  /* istanbul ignore next */
  if ( typeof define === 'function' && define.amd ) {
    define([ 'chai.should', 'chai.expect', 'Ajax' ], factory );
  }
  else if ( typeof exports === 'object' ) {
    exports = module.exports = factory(
      require( 'chai' ).should(),
      require( 'chai' ).expect,
      require( '../src/ajax' )
    );
  }
  else {
    root.testAjax = factory( root.chai.should(), root.chai.expect, root.Ajax );
  }
})(this, function( should, expect, Ajax ) {
  'use strict';

  describe( '#AJAX - Test `get` method', function() {
    var ajax;
    beforeEach(function() {
      ajax = new Ajax();
    });

    it( 'Should return an object (users list)', function( done ) {
      ajax.get( 'http://127.0.0.1:3000/api/users' ).done(function( response ) {
        response.should.be.an( 'object' );
        done();
      });
    });

    it( 'Should return 404 error', function( done ) {
      ajax.get( 'http://127.0.0.1:3000/api/something' ).error(function( response, xhr ) {
        xhr.status.should.be.equal( 404 );
        done();
      });
    });

    it( 'Should return 404 error on `always` promise', function( done ) {
      ajax.get( 'http://127.0.0.1:3000/api/something' ).always(function( response, xhr ) {
        xhr.status.should.be.equal( 404 );
        done();
      });
    });

    it( 'Should return the same result on both promises `done` and `always`', function( done ) {
      ajax.get( 'http://127.0.0.1:3000/api/users' )
        .done(function requestResponse( response, xhr ) {
          console.log( 'done' );
          response.should.be.an( 'object' );
          done();
        })
        .always(function requestResponse( response, xhr ) {
          console.log( 'always' );
          response.should.be.an( 'object' );
          done();
        });
    });
  });
});