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

    $public.post = function post( url ) {
      return $private.XHRConnection( 'POST', url );
    };

    $public.put = function put() {
      return $private.promises();
    };

    $public.delete = function del() {
      return $private.promises();
    };

    $private.XHRConnection = function XHRConnection( type, url ) {
      var xhr = new XMLHttpRequest();
      xhr.open( type, url || '', true );
      xhr.addEventListener( 'readystatechange', $private.handleReadyStateChange, false );
      xhr.send();
      return $private.promises();
    };

    $private.handleReadyStateChange = function handleReadyStateChange() {
      var xhr = this;
      var DONE = 4;
      if( xhr.readyState === DONE ) {
        if( xhr.status >= 200 && xhr.status < 300 ) {
          return $private.methods.done.call( $private.methods, $private.parseResponse( xhr.responseText ) );
        }
        $private.methods.error.call( $private.methods, $private.parseResponse( xhr.responseText ) );
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