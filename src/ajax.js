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
    var xhr
    var promise = new Promise(function(resolve, reject) {
      xhr = new XMLHttpRequest()
      xhr.open(type, url, true)
      xhr.withCredentials = options.hasOwnProperty('withCredentials')
      setHeaders(xhr, options.headers)
      xhr.addEventListener('readystatechange', ready(resolve, reject, xhr), false)
      xhr.send(objectToQueryString(data))
    })

    promise.abort = function () {
      return xhr && xhr.abort
    }

    return promise
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

  function ready (resolve, reject, xhr) {
    return function handleReady () {
      if (xhr.readyState === xhr.DONE) {
        xhr.removeEventListener('readystatechange', handleReady, false)

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({xhr: xhr, data: parseResponse(xhr)})
        } else {
          var err = new Error('ajax request failed')
          err.xhr = xhr
          err.data = parseResponse(xhr)
          reject(err)
        }
      }
    }
  }

  function parseResponse (xhr) {
    try {
      return JSON.parse(xhr.responseText)
    } catch (e) {
      return xhr.responseText
    }
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
