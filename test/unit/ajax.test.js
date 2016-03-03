;(function( should, expect, Ajax ) {
  'use strict';

  describe( '#AJAX - Test module interface', function() {
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
  });
})( window.chai.should(), window.chai.expect, window.Ajax );
