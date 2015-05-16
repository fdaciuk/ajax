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
});