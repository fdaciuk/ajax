# Ajax

> Ajax module in Vanilla JS

<p align="center">
  <img src="ajax-logo.png" alt="Ajax" />
</p>

[![Build Status][travis-image]][travis-url]
[![Coveralls Coverage Status][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![CONTRIBUTING][contributing-image]][contributing-url]

You can use this module with _AMD_, _CommonJS_ or just like a method of `window` object!

## Installation

### Bower

You can install via bower:

```console
bower install ajax
```

### Manual installation

Just download `dist/ajax.min.js` file, and add `dist/ajax.min.js` on your HTML file:

```html
<script src="js/ajax.min.js"></script>
```

### NPM

```console
npm i --save @fdaciuk/ajax
```

### CDN

You may use a CDN to get the latest version.

**CDNJS:**

```console
https://cdnjs.com/libraries/fdaciuk-ajax
```

**GitHub:**

Or you may just add the following line to your HTML file:

```html
<script src="//cdn.rawgit.com/fdaciuk/ajax/v2.3.0/dist/ajax.min.js"></script>
```

## Usage

### AMD

```js
define(['ajax'], function (ajax) {
  ajax().get(...)
  ...
})
```

### CommonJS

```js
var ajax = require('@fdaciuk/ajax')
ajax().post(...)
...
```

### ES6 / ES2015 module

```js
import ajax from 'ajax'
ajax().put(...)
```

### Method of `window` object

```js
window.ajax().get(...)
```

or just

```js
ajax().get(...)
```

## Signature

```js
ajax([options])
```

## Options

Optional object with request options. See all accepted options below.

**HTTP Methods**

You may pass any HTTP method as you want, using `method` property:

```js
var request = ajax({
  method: 'options',
  url: '/api/users',
  data: {
    user: 'john'
  }
})

request.then(function (response) {...})
```

For using this kind of request, you must pass `url` property.

The property `data` is optional, but may used to pass any data via `body` on request.

**headers**

An object when `key` is a header name, and `value` is a header value.

```js
ajax({
  headers: {
    'content-type': 'application/json',
    'x-access-token': '123@abc'
  }
})
```

If `content-type` is not passed, `application/x-www-form-urlencoded` will be used.

**Note about uploads:**

If you need to upload some file, with `FormData`, use `content-type: null`.

**baseUrl**

You can pass a `baseUrl` param to improve calls. Example:

```js
const request = ajax({ baseUrl: 'http://example.com/api/v2' })
request.get('/users') // get `http://example.com/api/v2/users` url
```

## Methods

You may use any of this methods, instead the above approach:

### `get(url, [data])`

> Get data as a JSON object.

```js
ajax().get('/api/users')
```

You can pass `data` on `get` method, that will be added on URL as query string:

```js
ajax().get('/api/users', { id: 1 })
```

It will request on `/api/users?id=1`.

### `post(url, [data])`

> Save a new register or update part of this one.

```js
// Without headers
ajax().post('/api/users', { slug: 'john' })

// With headers
var request = ajax({
  headers: {
    'x-access-token': '123@abc'
  }
})

request.post('/login', { username: 'user', password: 'b4d45$' })
```

### `put(url, [data])`

> Update an entire register.

```js
ajax().put('/api/users', { slug: 'john', age: 37 })
```

### `delete(url, [data])`

> Delete a register.

```js
ajax().delete('/api/users', { id: 1 })
```

## Return methods

### `then(response, xhrObject)`

> Promise that returns if the request was successful.

```js
ajax().get('/api/users').then(function (response, xhr) {
  // Do something
})
```

### `catch(responseError, xhrObject)`

> Promise that returns if the request has an error.

```js
ajax().post('/api/users', { slug: 'john' }).catch(function (response, xhr) {
  // Do something
})
```

### `always(response, xhrObject)`

> That promise always returns, independent if the status is `done` or `error`.

```js
ajax().post('/api/users', { slug: 'john' }).always(function (response, xhr) {
  // Do something
})
```

## Abort request

If a request is very slow, you can abort it using `abort()` method:

```js
const getLazyUser = ajax().get('/api/users/lazy')

const timer = setTimeout(function () {
  getLazyUser.abort()
}, 3000)

getLazyUser.then(function (response) {
  clearTimeout(timer)
  console.log(response)
})
```

In the above example, if request is slowest than 3 seconds, it will be aborted.

## Deprecated methods

You may see the deprecated methods [here][deprecated]

## Contributing

Check [CONTRIBUTING.md][contributing-url]

## Code coverage and Statistics

<https://github.com/reportz/ajax>

## Browser compatibility

| ![Chrome][chrome-logo] | ![Firefox][firefox-logo] | ![IE][ie-logo] | ![Edge][edge-logo] | ![Opera][opera-logo] | ![Safari][safari-logo] |
| ---------------------- | ------------------------ | -------------- | ------------------ | -------------------- | ---------------------- |
| Latest ✔               | Latest ✔                 | 9+ ✔           | Latest ✔           | Latest ✔             | 3.2+ ✔                 |

## License

[MIT][license-url] © Fernando Daciuk

[travis-image]: https://img.shields.io/travis/fdaciuk/ajax.svg?style=flat-square
[travis-url]: https://travis-ci.org/fdaciuk/ajax
[coverage-image]: https://img.shields.io/coveralls/fdaciuk/ajax/master.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/fdaciuk/ajax?branch=master
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/fdaciuk/licenses/blob/master/MIT-LICENSE.md
[contributing-image]: https://img.shields.io/badge/fdaciuk%2Fajax-CONTRIBUTE-orange.svg?style=flat-square
[contributing-url]: CONTRIBUTING.md
[deprecated]: deprecated.md
[chrome-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.2.1/chrome/chrome_48x48.png
[firefox-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.2.1/firefox/firefox_48x48.png
[ie-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.2.1/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png
[edge-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.2.1/edge/edge_48x48.png
[opera-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.2.1/opera/opera_48x48.png
[safari-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.2.1/safari/safari_48x48.png
