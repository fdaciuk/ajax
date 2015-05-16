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

  describe( '#AJAX - Test `post` method', function() {
    it( 'Should return an object', function( done ) {
      var ajax = new Ajax();
      ajax.post( 'http://127.0.0.1:3000/api/user/joao' ).done(function( response ) {
        response.should.be.an( 'object' );
        done();
      });
    });

    it( 'Should return data about `joao`', function( done ) {
      var ajax = new Ajax();
      ajax.post( 'http://127.0.0.1:3000/api/user', { slug: 'joao' }).done(function( response ) {
        response.name.should.be.equal( 'João da Silva' );
        done();
      });
    });
  });
});