## Hot to do - pt-BR

Irei explicar alguns conceitos de como foi criada essa lib a partir do código em JavaScript puro, vamos iniciar por uma requisição `GET` em Vanilla, estou me baseando nessa explicação [Largue o jQuery AGORA!](http://nomadev.com.br/largue-o-jquery-agora/):

```js
var request = new XMLHttpRequest();  
request.open('GET', '/my/url', true);

request.onload = function() {  
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
  } else {
    // We reached our target server, but it returned an error
  }
};
```

Logo percebemos que o início de tudo se dá em:

```js
var request = new XMLHttpRequest();  
```

Nesse pedaço de código iniciamos o objeto [`XMLHttpRequest`](https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHttpRequest), por isso se chama [AJAX](https://developer.mozilla.org/pt-BR/docs/AJAX/Getting_Started) (Asynchronous JavaScript e XML), porém sabemos que usamos muito mais o JSON do que o XML, né?

Depois de criarmos esse objeto iremos executar o método `open()`, onde passamos como parâmetros:

- método do HTTP: GET, POST, PUT, DELETE, etc
- url a ser requisitada
- se é async ou não: padrão é true

```js

request.open('GET', '/my/url', true);
```

Então se nossa requisiçao é **assíncrona** precisamos gerenciar suas ações via **eventos**, os que utilizaremos são:

- `onload`
- `onerror`

Perceba que possuímos o prefixo `on` antes de cada erro, pois o padrão utilizado para escutar eventos é com o método `on`, por exemplo:

- `on('load')`
- `on('error')

**Logo qualquer método que você ver que inicia com `on` é porque está executando/escutando 1 evento!**



```js

request.onload = function() {  
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
  } else {
    // We reached our target server, but it returned an error

  }
}
request.onerror = function() {  
  // There was a connection error of some sort
};
```

Após a definição de cada funçõ para cada evento precisamos executar essa requisição, dessa forma:

```js
request.send(); 
```

Porém perceba que devemos definir as funções dos eventos anteriormente para que após a execução do método `send()` esses eventos possam ser executados da forma correta.

```js
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
```
