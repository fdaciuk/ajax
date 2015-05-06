# Ajax
> Ajax module in Vanilla JS

## Methods

### `get`

> Get data as a JSON object.

```js
var ajax = new Ajax();
ajax.get( '/api/users' );
```

### `post`

> Save a new register.

```js
var ajax = new Ajax();
ajax.get( '/api/users', { data: 'value' });
```

### `put`

> Upgrade part of a register.

```js
var ajax = new Ajax();
ajax.get( '/api/users', { slug: 'john' });
```

### `delete`

> Delete a register.

```js
var ajax = new Ajax();
ajax.get( '/api/users', { id: 1 });
```

## Return methods

### `done`

> Promise that returns if the request was successful.

```js
var ajax = new Ajax();
ajax.get( '/api/users' ).done(function( response, xhr ) {
  // Do something
});
```

### `error`

> Promise that returns if the request has an error.

```js
var ajax = new Ajax();
ajax.get( '/api/users' ).error(function( response, xhr ) {
  // Do something
});
```

## License

[MIT](https://github.com/fdaciuk/ajax/blob/master/LICENSE.md) © Fernando Daciuk