;(function( should, expect, Ajax ) {
  'use strict';

  describe( '#AJAX - Test `delete` promises interface', function() {
    var ajax = new Ajax();
    var deleteRequest = ajax.delete();

    it( 'Should `delete` method return `done` method', function() {
      deleteRequest.should.have.property( 'done' );
    });

    it( 'Should `delete` method return `error` method', function() {
      deleteRequest.should.have.property( 'error' );
    });

    it( 'Should `delete` method return `always` method', function() {
      deleteRequest.should.have.property( 'always' );
    });
  });
})( window.chai.should(), window.chai.expect, window.Ajax );
