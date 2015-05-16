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
    it( 'Should return an object (users list)', function( done ) {
      var ajax = new Ajax();
      ajax.get( 'http://127.0.0.1:3000/api/users' ).done(function( response ) {
        response.should.be.an( 'object' );
        done();
      });
    });
  });
});