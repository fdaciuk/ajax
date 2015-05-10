# Ajax
> Ajax module in Vanilla JS

## Methods

### `get(url)`

> Get data as a JSON object.

```js
var ajax = new Ajax();
ajax.get( '/api/users' );
```

### `post(url, [ data ])`

> Save a new register.

```js
var ajax = new Ajax();
ajax.post( '/api/users', { data: 'value' });
```

### `put(url, [ data ])`

> Upgrade part of a register.

```js
var ajax = new Ajax();
ajax.put( '/api/users', { slug: 'john' });
```

### `delete(url, [ data ])`

> Delete a register.

```js
var ajax = new Ajax();
ajax.delete( '/api/users', { id: 1 });
```

## Return methods

### `done(response, xhrObject)`

> Promise that returns if the request was successful.

```js
var ajax = new Ajax();
ajax.get( '/api/users' ).done(function( response, xhr ) {
  // Do something
});
```

### `error(response, xhrObject)`

> Promise that returns if the request has an error.

```js
var ajax = new Ajax();
ajax.post( '/api/users', { slug: 'john' }).error(function( response, xhr ) {
  // Do something
});
```

### `always(response, xhrObject)`

> That promise always returns, independent if the status is `done` or `error`.

```js
var ajax = new Ajax();
ajax.post( '/api/users', { slug: 'john' }).always(function( response, xhr ) {
  // Do something
});
```

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](https://github.com/fdaciuk/ajax/blob/master/LICENSE.md) © Fernando Daciuk
