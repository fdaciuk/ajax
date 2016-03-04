# Ajax

> Ajax module in Vanilla JS

<p align="center">
  <img src="ajax-logo.png" alt="Ajax" />
</p>

[![Build Status][travis-image]][travis-url]
[![Coveralls Coverage Status][coverage-image]][coverage-url]
[![Code Climate Coverage][codeclimate-coverage-image]][codeclimate-coverage-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![License][license-image]][license-url]
[![CONTRIBUTING][contributing-image]][contributing-url]

You can use this module with _AMD_, _CommonJS_ or just like a method of `window` object!

## Installation

### Bower

You can install via bower:

```sh
bower install ajax
```

### Manual installation

Just download `dist/ajax.min.js` file, and add `dist/ajax.min.js` on your HTML file:

```html
<script src="js/ajax.min.js"></script>
```

### CommonJS (via NPM)

```sh
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
<script src="//cdn.rawgit.com/fdaciuk/ajax/v0.2.0/dist/ajax.min.js"></script>
```

## Usage

### AMD

```js
define([ 'Ajax' ], function( Ajax ) {
  var ajax = new Ajax();
  ...
});
```

### CommonJS

```js
var Ajax = require( '@fdaciuk/ajax' );
var ajax = new Ajax();
...
```

#### Method of `window` object

```js
var ajax = new window.Ajax();
```

or

```js
var ajax = new Ajax();
```

### Note

`Ajax` constructor is deprecated and will be removed in `v2.0.0`. Use `ajax()` function (lowecase version) without `new` keyword instead.

Enjoy ;)

## Signature

```js
ajax([options])
```

## Options

Optional object with request options. See all options below.

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

## Methods

### `get(url)`

> Get data as a JSON object.

```js
ajax().get( '/api/users' );
ajax().get( '/api/users/john' );
```

### `post(url, [ data ])`

> Save a new register or update part of this one.

```js
// Without headers
ajax().post( '/api/users', { slug: 'john' });

// With headers
var request = ajax({
  headers: {
    'x-access-token': '123@abc',
    'username': 'user',
    'password': 'b4d45$'
  }
});
request.post('/login');
```

### `put(url, [ data ])`

> Update an entire register.

```js
ajax().put( '/api/users', { slug: 'john', age: 37 });
```

### `delete(url, [ data ])`

> Delete a register.

```js
ajax().delete( '/api/users', { id: 1 });
```

## Return methods

### `then(response, xhrObject)`

> Promise that returns if the request was successful.

```js
ajax().get( '/api/users' ).then(function( response, xhr ) {
  // Do something
});
```

### `catch(response, xhrObject)`

> Promise that returns if the request has an error.

```js
ajax().post( '/api/users', { slug: 'john' }).catch(function( response, xhr ) {
  // Do something
});
```

### `always(response, xhrObject)`

> That promise always returns, independent if the status is `done` or `error`.

```js
ajax().post( '/api/users', { slug: 'john' }).always(function( response, xhr ) {
  // Do something
});
```

## Deprecated return methods

### `done(response, xhrObject)`

> Promise that returns if the request was successful.

_`done` is deprecated. Use `then` instead._

```js
ajax().get( '/api/users' ).done(function( response, xhr ) {
  // Do something
});
```

### `error(response, xhrObject)`

> Promise that returns if the request has an error.

_`error` is deprecated. Use `catch` instead._

```js
ajax().post( '/api/users', { slug: 'john' }).error(function( response, xhr ) {
  // Do something
});
```

## Contributing

Check [CONTRIBUTING.md][contributing-url]

## Code coverage and Statistics

<https://github.com/reportz/ajax>

## License

[MIT][license-url] © Fernando Daciuk

[travis-image]: https://img.shields.io/travis/fdaciuk/ajax.svg?style=flat-square
[travis-url]: https://travis-ci.org/fdaciuk/ajax
[coverage-image]: https://img.shields.io/coveralls/fdaciuk/ajax/master.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/fdaciuk/ajax?branch=master
[codeclimate-coverage-image]: https://img.shields.io/codeclimate/coverage/github/fdaciuk/ajax.svg?style=flat-square
[codeclimate-coverage-url]: https://codeclimate.com/github/fdaciuk/ajax
[codeclimate-image]: https://img.shields.io/codeclimate/github/fdaciuk/ajax.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/fdaciuk/ajax
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/fdaciuk/licenses/blob/master/MIT-LICENSE.md
[contributing-image]: https://img.shields.io/badge/fdaciuk%2Fajax-CONTRIBUTE-orange.svg?style=flat-square
[contributing-url]: CONTRIBUTING.md
