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
});