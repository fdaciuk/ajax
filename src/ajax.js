/**!
 * ajax - v0.0.9
 * Ajax module in Vanilla JS
 * https://github.com/fdaciuk/ajax

 * Wed Aug 26 2015 07:30:42 GMT-0300 (BRT)
 * MIT (c) Fernando Daciuk
 */
;
(function(factory) {
  'use strict';

  var root = (typeof window === 'object' && window.window === window && window) || (typeof global === 'object' && global.global === global && global);
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define('Ajax', function(){
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    exports = module.exports = factory(root);
  } else {
    root.Ajax = factory(root);
  }
})(function(r) {
  'use strict';

  function Ajax() {
    var $public = {};
    var $private = {};
    var root = r;

    function getParamUrl(u, p) {
      var t;
      if (u.indexOf(p + "=") !== -1) {
        t = u.substring(u.indexOf(p + "=") + (p.length + 1));
        if (t.indexOf("&") !== -1) {
          t = t.substring(0, t.indexOf("&"));
        }
      }
      return t || null;
    }
    $private.methods = {
      done: function() {},
      error: function() {},
      always: function() {}
    };
    $public.jsonp = function jsonp(url, passedInCallback) {
      var jsonPcallback = function(data) {
        // remove from global scope
        delete root.jsonCallback;
        return passedInCallback(data);
      };
      // Vanilla
      var jsonCallback = function(data) {
        jsonPcallback(data);
      }
      if (/\?/gi.test(url)) {
        url += "&"
      } else if (/\&/gi.test(url)) {
        url += "?"
      }
      url += "callback=jsonCallback";

      // put on global scope temporaralllyyyy
      root.jsonCallback = jsonCallback;

      var scr = root.document.createElement('script');
      scr.src = url;
      root.document.body.appendChild(scr);
    }
    $public.get = function get(url) {
      return $private.XHRConnection('GET', url, null);
    };
    $public.post = function post(url, data) {
      return $private.XHRConnection('POST', url, data);
    };
    $public.put = function put(url, data) {
      return $private.XHRConnection('PUT', url, data);
    };
    $public.delete = function del(url, data) {
      return $private.XHRConnection('DELETE', url, data);
    };
    $private.XHRConnection = function XHRConnection(type, url, data) {
      var xhr = new XMLHttpRequest();
      var contentType = 'application/x-www-form-urlencoded';
      xhr.open(type, url || '', true);
      xhr.setRequestHeader('Content-Type', contentType);
      xhr.addEventListener('readystatechange', $private.ready, false);
      xhr.send($private.objectToQueryString(data));
      return $private.promises();
    };
    $private.ready = function ready() {
      var xhr = this;
      var DONE = 4;
      if (xhr.readyState === DONE) {
        $private.methods.always.apply($private.methods, $private.parseResponse(xhr));
        if (xhr.status >= 200 && xhr.status < 300) {
          return $private.methods.done.apply($private.methods, $private.parseResponse(xhr));
        }
        $private.methods.error.apply($private.methods, $private.parseResponse(xhr));
      }
    };
    $private.parseResponse = function parseResponse(xhr) {
      var result;
      try {
        result = JSON.parse(xhr.responseText);
      } catch (e) {
        result = xhr.responseText;
      }
      return [result, xhr];
    };
    $private.promises = function promises() {
      var allPromises = {};
      Object.keys($private.methods).forEach(function(promise) {
        allPromises[promise] = $private.generatePromise.call(this, promise);
      }, this);
      return allPromises;
    };
    $private.generatePromise = function generatePromise(method) {
      return function(callback) {
        return ($private.methods[method] = callback, this);
      };
    };
    $private.objectToQueryString = function objectToQueryString(data) {
      return $private.isObject(data) ? $private.getQueryString(data) : data;
    };
    $private.getQueryString = function getQueryString(object) {
      return Object.keys(object).map(function(item) {
        return encodeURIComponent(item) + '=' + encodeURIComponent(object[item]);
      }).join('&');
    };
    $private.isObject = function isObject(data) {
      return '[object Object]' === Object.prototype.toString.call(data);
    };
    return $public;
  }
  return Ajax;
});
