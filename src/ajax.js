;(function( root, factory ) {
  'use strict';
  /* istanbul ignore next */
  if( typeof define === 'function' && define.amd ) {
    define( 'Ajax', factory );
  }
  else if( typeof exports === 'object' ) {
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
      then: function() {},
      catch: function() {},
      always: function() {},

      // @deprecated
      done: function() {},
      error: function() {}
    };

    $public.get = function get( url ) {
      return $private.XHRConnection( 'GET', url, null );
    };

    $public.post = function post( url, data ) {
      return $private.XHRConnection( 'POST', url, data );
    };

    $public.put = function put( url, data ) {
      return $private.XHRConnection( 'PUT', url, data );
    };

    $public.delete = function del( url, data ) {
      return $private.XHRConnection( 'DELETE', url, data );
    };

    $private.XHRConnection = function XHRConnection( type, url, data ) {
      var xhr = new XMLHttpRequest();
      var contentType = 'application/x-www-form-urlencoded';
      xhr.open( type, url || '', true );
      xhr.setRequestHeader( 'Content-Type', contentType );
      xhr.addEventListener( 'readystatechange', $private.ready, false );
      xhr.send( $private.objectToQueryString( data ) );
      return $private.promises();
    };

    $private.ready = function ready() {
      var xhr = this;
      if( xhr.readyState === xhr.DONE ) {
        xhr.removeEventListener( 'readystatechange', $private.ready, false );
        $private.methods.always
          .apply( $private.methods, $private.parseResponse( xhr ) );
        if( xhr.status >= 200 && xhr.status < 300 ) {
          $private.methods.then
            .apply( $private.methods, $private.parseResponse( xhr ) );
          // @deprecated
          $private.methods.done
            .apply( $private.methods, $private.parseResponse( xhr ) );
        } else {
          $private.methods.catch
            .apply( $private.methods, $private.parseResponse( xhr ) );
          // @deprecated
          $private.methods.error
            .apply( $private.methods, $private.parseResponse( xhr ) );
        }
      }
    };

    $private.parseResponse = function parseResponse( xhr ) {
      var result;
      try { result = JSON.parse( xhr.responseText ); }
      catch( e ) { result = xhr.responseText; }
      return [ result, xhr ];
    };

    $private.promises = function promises() {
      var allPromises = {};
      Object.keys( $private.methods ).forEach(function( method ) {
        allPromises[ method ] = $private.generatePromise.call( this, method );
      }, this );
      return allPromises;
    };

    $private.generatePromise = function generatePromise( method ) {
      return function( callback ) {
        $private.generateDeprecatedMessage(method);
        $private.methods[ method ] = callback;
        return this;
      };
    };

    $private.generateDeprecatedMessage = function generateDeprecatedMessage(method) {
      var deprecatedMessage = '@fdaciuk/ajax: `%s` is deprecated and will be removed in v2.0.0. Use `%s` instead.';
      switch (method) {
        case 'done':
          console.warn(deprecatedMessage, 'done', 'then');
          break;
        case 'error':
          console.warn(deprecatedMessage, 'error', 'catch');
      }
    };

    $private.objectToQueryString = function objectToQueryString( data ) {
      return $private.isObject( data )
        ? $private.getQueryString( data )
        : data;
    };

    $private.getQueryString = function getQueryString( object ) {
      return Object.keys( object ).map( function( item ) {
        return encodeURIComponent( item )
          + '=' + encodeURIComponent( object[ item ] );
      }).join( '&' );
    };

    $private.isObject = function isObject( data ) {
      return '[object Object]' === Object.prototype.toString.call( data );
    };

    return $public;
  }

  return Ajax;
});
