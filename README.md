# Ajax
> Ajax module in Vanilla JS

## Methods

### `get`

```js
var ajax = new Ajax();
ajax.get( '/api/users' );
```

### `post`

### `put`

### `delete`

## Return methods

### `done`

```js
var ajax = new Ajax();
ajax.get( '/api/users' ).done(function( response, xhr ) {
  // Do something
});
```

### `error`

```js
var ajax = new Ajax();
ajax.get( '/api/users' ).error(function( response, xhr ) {
  // Do something
});
```

## License

[MIT](https://github.com/fdaciuk/ajax/blob/master/LICENSE.md) © Fernando Daciuk