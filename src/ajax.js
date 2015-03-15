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
      var xhr = new XMLHttpRequest();
      xhr.open( 'GET', url || '', true );
      xhr.addEventListener( 'readystatechange', $private.handleReadyStateChange, false );
      xhr.send();
      return $private.promises();
    };

    $public.post = function post() {
      return $private.promises();
    };

    $public.put = function put() {
      return $private.promises();
    };

    $public.delete = function del() {
      return $private.promises();
    };

    $private.handleReadyStateChange = function handleReadyStateChange() {
      var xhr = this;
      var DONE = 4;
      if( xhr.readyState === DONE ) {
        if( xhr.status >= 200 && xhr.status < 300 ) {
          return $private.methods.done.call( $private.methods, JSON.parse( xhr.responseText ) );
        }
        $private.methods.error.call( $private.methods, JSON.parse( xhr.responseText ) );
      }
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