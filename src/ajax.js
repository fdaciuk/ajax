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

    $public.get = function get() {
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

    $private.promises = function promises() {
      return {
        done: function done() {},
        error: function error() {}
      };
    };

    return $public;
  }

  return Ajax;
});