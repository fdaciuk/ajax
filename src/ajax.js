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
      error: function() {},
      always: function() {}
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
      xhr.open( type, url || '', true );
      xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
      xhr.addEventListener( 'readystatechange', $private.handleReadyStateChange, false );
      xhr.send( $private.convertObjectToQueryString( data ) );
      return $private.promises();
    };

    $private.handleReadyStateChange = function handleReadyStateChange() {
      var xhr = this;
      var DONE = 4;
      if( xhr.readyState === DONE ) {
        $private.methods.always.apply( $private.methods, $private.parseResponse( xhr ) );
        if( xhr.status >= 200 && xhr.status < 300 ) {
          return $private.methods.done.apply( $private.methods, $private.parseResponse( xhr ) );
        }
        $private.methods.error.apply( $private.methods, $private.parseResponse( xhr ) );
      }
    };

    $private.parseResponse = function parseResponse( xhr ) {
      var result;
      try {
        result = JSON.parse( xhr.responseText );
      }
      catch( e ) {
        result = xhr.responseText;
      }
      return [ result, xhr ];
    };

    $private.promises = function promises() {
      return {
        done: $private.generatePromise.call( this, 'done' ),
        error: $private.generatePromise.call( this, 'error' ),
        always: $private.generatePromise.call( this, 'always' )
      };
    };

    $private.generatePromise = function generatePromise( method ) {
      return function( callback ) {
        return ( $private.methods[ method ] = callback, this );
      };
    };

    $private.convertObjectToQueryString = function convertObjectToQueryString( data ) {
      var convertedData = [];
      if( ! $private.isObject( data ) )
        return data;
      Object.keys( data ).forEach(function( key ) {
        convertedData.push( key + '=' + data[ key ] );
      });
      return convertedData.join( '&' );
    };

    $private.isObject = function isObject( data ) {
      return '[object Object]' === Object.prototype.toString.call( data );
    };

    return $public;
  }

  return Ajax;
});