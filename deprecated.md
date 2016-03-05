# Deprecated

## Usage (used until v0.0.15)

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
