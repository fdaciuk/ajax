;(function( should, expect, Ajax ) {
  'use strict';

  describe( '#AJAX - Test `get` promises interface', function() {
    var ajax = new Ajax();
    var getRequest = ajax.get();

    it( 'Should `get` method return `done` method', function() {
      getRequest.should.have.property( 'done' );
    });

    it( 'Should `get` method return `error` method', function() {
      getRequest.should.have.property( 'error' );
    });

    it( 'Should `get` method return `always` method', function() {
      getRequest.should.have.property( 'always' );
    });
  });
})( window.chai.should(), window.chai.expect, window.Ajax );
