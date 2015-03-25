;(function ( root, factory ) {
  'use strict';
  /* istanbul ignore next */
  if ( typeof define === 'function' && define.amd ) {
    define( 'Ajax', factory );
  }
  else if ( typeof exports === 'object' ) {
    exports = module.exports = factory();
  }
  else {
    root.Ajax = factory();
  }
})(this, function() {
  'use strict';

  function Ajax() {
    var $public = {};
    var $private = {};

    $private.methods = {
      done: function() {},
      error: function() {}
    };

    $public.get = function get( url ) {
      return $private.XHRConnection( 'GET', url );
    };

    $public.post = function post( url, data ) {
      return $private.XHRConnection( 'POST', url, data );
    };

    $public.put = function put() {
      return $private.promises();
    };

    $public.delete = function del() {
      return $private.promises();
    };

    $private.XHRConnection = function XHRConnection( type, url, data ) {
      var xhr = new XMLHttpRequest();
      xhr.open( type, url || '', true );
      xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
      xhr.addEventListener( 'readystatechange', $private.handleReadyStateChange, false );
      xhr.send( data );
      return $private.promises();
    };

    $private.handleReadyStateChange = function handleReadyStateChange() {
      var xhr = this;
      var DONE = 4;
      if( xhr.readyState === DONE ) {
        if( xhr.status >= 200 && xhr.status < 300 ) {
          return $private.methods.done( $private.parseResponse( xhr.responseText ) );
        }
        $private.methods.error( $private.parseResponse( xhr.responseText ) );
      }
    };

    $private.parseResponse = function parseResponse( response ) {
      var result;
      try {
        result = JSON.parse( response );
      }
      catch( e ) {
        result = response;
      }
      return result;
    };

    $private.promises = function promises() {
      return {
        done: function done( callback ) {
          $private.methods.done = callback;
          return this;
        },
        error: function error( callback ) {
          $private.methods.error = callback;
          return this;
        }
      };
    };

    return $public;
  }

  return Ajax;
});