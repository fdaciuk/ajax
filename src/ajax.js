;(function (root, factory) {
  'use strict'
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define('ajax', factory)
  } else if (typeof exports === 'object') {
    exports = module.exports = factory()
  } else {
    // @deprecated
    root.Ajax = factory()

    root.ajax = factory()
  }
})(this, function () {
  'use strict'

  function Ajax (options) {
    if (this !== undefined) {
      console.warn([
        'Instance with `new` is deprecated. ',
        'This will be removed in `v2.0.0` version.'
      ].join(''))
    }

    if (this instanceof Ajax) {
      console.warn([
        'Ajax constructor is deprecated. This will be removed in ',
        '`v2.0.0`. Use ajax (lowercase version) without `new` ',
        'keyword instead'
      ].join(''))
    }

    options = options || {}

    var $public = {}
    var $private = {}

    $private.methods = {
      then: function () {},
      catch: function () {},
      always: function () {},

      // @deprecated
      done: function () {},
      // @deprecated
      error: function () {}
    }

    $private.maybeData = function maybeData (data) {
      return data || null
    }

    $private.httpMethods = ['get', 'post', 'put', 'delete']

    $private.httpMethods.forEach(function (method) {
      $public[method] = function (url, data) {
        return $private.xhrConnection(
          method,
          url,
          $private.maybeData(data),
          options
        )
      }
    })

    $private.xhrConnection = function xhrConnection (type, url, data, options) {
      var xhr = new XMLHttpRequest()
      xhr.open(type, url || '', true)
      $private.setHeaders(xhr, options.headers)
      xhr.addEventListener('readystatechange', $private.ready, false)
      xhr.send($private.objectToQueryString(data))
      return $private.promises()
    }

    $private.setHeaders = function setHeaders (xhr, headers) {
      headers = headers || {}

      if (!$private.hasContentType(headers)) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }

      Object.keys(headers).forEach(function (name) {
        if (headers[name]) {
          xhr.setRequestHeader(name, headers[name])
        }
      })
    }

    $private.hasContentType = function hasContentType (headers) {
      return Object.keys(headers).some(function (name) {
        return name.toLowerCase() === 'content-type'
      })
    }

    $private.ready = function ready () {
      var xhr = this
      if (xhr.readyState === xhr.DONE) {
        xhr.removeEventListener('readystatechange', $private.ready, false)
        $private.methods.always
          .apply($private.methods, $private.parseResponse(xhr))
        if (xhr.status >= 200 && xhr.status < 300) {
          $private.methods.then
            .apply($private.methods, $private.parseResponse(xhr))
          // @deprecated
          $private.methods.done
            .apply($private.methods, $private.parseResponse(xhr))
        } else {
          $private.methods.catch
            .apply($private.methods, $private.parseResponse(xhr))
          // @deprecated
          $private.methods.error
            .apply($private.methods, $private.parseResponse(xhr))
        }
      }
    }

    $private.parseResponse = function parseResponse (xhr) {
      var result
      try {
        result = JSON.parse(xhr.responseText)
      } catch (e) {
        result = xhr.responseText
      }
      return [ result, xhr ]
    }

    $private.promises = function promises () {
      var allPromises = {}
      Object.keys($private.methods).forEach(function (method) {
        allPromises[ method ] = $private.generatePromise.call(this, method)
      }, this)
      return allPromises
    }

    $private.generatePromise = function generatePromise (method) {
      return function (callback) {
        $private.generateDeprecatedMessage(method)
        $private.methods[ method ] = callback
        return this
      }
    }

    $private.generateDeprecatedMessage = function generateDeprecatedMessage (method) {
      var deprecatedMessage = '@fdaciuk/ajax: `%s` is deprecated and will be removed in v2.0.0. Use `%s` instead.'
      switch (method) {
        case 'done':
          console.warn(deprecatedMessage, 'done', 'then')
          break
        case 'error':
          console.warn(deprecatedMessage, 'error', 'catch')
      }
    }

    $private.objectToQueryString = function objectToQueryString (data) {
      return $private.isObject(data)
        ? $private.getQueryString(data)
        : data
    }

    $private.getQueryString = function getQueryString (object) {
      return Object.keys(object).map(function (item) {
        return [
          encodeURIComponent(item),
          '=',
          encodeURIComponent(object[ item ])
        ].join('')
      }).join('&')
    }

    $private.isObject = function isObject (data) {
      return Object.prototype.toString.call(data) === '[object Object]'
    }

    if (options.method && options.url) {
      return $private.xhrConnection(
        options.method,
        options.url,
        $private.maybeData(options.data),
        options
      )
    }

    $public.json = function json (url, callback) {
      var tag = document.createElement('script')
      tag.type = 'text/javascript'
      var concat = url.match(/\?/) ? '&' : '?'
      var key = Math.random().toString(36).slice(2).substring(16)
      var callbackName = 'jsonp_callback_' + key
      tag.src = url + concat + 'callback=' + callbackName
      window[callbackName] = function (data) {
        callback.call(window, data)
        document.getElementsByTagName('head')[0].removeChild(tag)
        tag = null
        delete window[callbackName]
      }
      document.getElementsByTagName('head')[0].appendChild(tag)
    }

    return $public
  }

  return Ajax
})
