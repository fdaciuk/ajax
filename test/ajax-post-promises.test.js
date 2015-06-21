;(function( should, expect, Ajax ) {
  'use strict';

  describe( '#AJAX - Test `post` promises interface', function() {
    var ajax = new Ajax();
    var postRequest = ajax.post();

    it( 'Should `post` method return `done` method', function() {
      postRequest.should.have.property( 'done' );
    });

    it( 'Should `post` method return `error` method', function() {
      postRequest.should.have.property( 'error' );
    });

    it( 'Should `post` method return `always` method', function() {
      postRequest.should.have.property( 'always' );
    });
  });
})( window.chai.should(), window.chai.expect, window.Ajax );
