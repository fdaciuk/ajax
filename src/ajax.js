;(function (root, factory) {
  'use strict'
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define('ajax', factory)
  } else if (typeof exports === 'object') {
    exports = module.exports = factory()
  } else {
    root.ajax = factory()
  }
})(this, function () {
  'use strict'

  function ajax (options) {
    var methods = ['get', 'post', 'put', 'delete']
    options = options || {}
    options.baseUrl = options.baseUrl || ''
    if (options.method && options.url) {
      return xhrConnection(
        options.method,
        options.baseUrl + options.url,
        maybeData(options.data),
        options
      )
    }
    return methods.reduce(function (acc, method) {
      acc[method] = function (url, data) {
        return xhrConnection(
          method,
          options.baseUrl + url,
          maybeData(data),
          options
        )
      }
      return acc
    }, {})
  }

  function maybeData (data) {
    return data || null
  }

  function xhrConnection (type, url, data, options) {
    var returnMethods = ['then', 'catch', 'always']
    var promiseMethods = returnMethods.reduce(function (promise, method) {
      promise[method] = function (callback) {
        promise[method] = callback
        return this
      }
      return promise
    }, {})
    var xhr = new XMLHttpRequest()
    xhr.open(type, url, true)
    setHeaders(xhr, options.headers)
    xhr.addEventListener('readystatechange', ready(promiseMethods), false)
    xhr.send(objectToQueryString(data))
    return promiseMethods
  }

  function setHeaders (xhr, headers) {
    headers = headers || {}
    if (!hasContentType(headers)) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    Object.keys(headers).forEach(function (name) {
      (headers[name] && xhr.setRequestHeader(name, headers[name]))
    })
  }

  function hasContentType (headers) {
    return Object.keys(headers).some(function (name) {
      return name.toLowerCase() === 'content-type'
    })
  }

  function ready (promiseMethods) {
    return function () {
      var xhr = this
      if (xhr.readyState === xhr.DONE) {
        xhr.removeEventListener('readystatechange', ready, false)
        promiseMethods.always.apply(promiseMethods, parseResponse(xhr))

        if (xhr.status >= 200 && xhr.status < 300) {
          promiseMethods.then.apply(promiseMethods, parseResponse(xhr))
        } else {
          promiseMethods.catch.apply(promiseMethods, parseResponse(xhr))
        }
      }
    }
  }

  function parseResponse (xhr) {
    var result
    try {
      result = JSON.parse(xhr.responseText)
    } catch (e) {
      result = xhr.responseText
    }
    return [ result, xhr ]
  }

  function objectToQueryString (data) {
    return isObject(data) ? getQueryString(data) : data
  }

  function isObject (data) {
    return Object.prototype.toString.call(data) === '[object Object]'
  }

  function getQueryString (object) {
    return Object.keys(object).reduce(function (acc, item) {
      var prefix = !acc ? '' : acc + '&'
      return prefix + encode(item) + '=' + encode(object[item])
    }, '')
  }

  function encode (value) {
    return encodeURIComponent(value)
  }

  return ajax
})
