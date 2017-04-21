## Hot to do - pt-BR

Irei explicar alguns conceitos de como foi criada essa lib a partir do código em JavaScript puro, vamos iniciar por uma requisição `GET` em Vanilla, que irá retornar um `JSON` baeando-se na função `$.getJSON` do jQuery:

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

*ps: estou me baseando nessa explicação [Largue o jQuery AGORA!](http://nomadev.com.br/largue-o-jquery-agora/)*

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
- `on('error')`

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

Após a definição de cada função para cada evento precisamos executar essa requisição, dessa forma:

```js
request.send(); 
```

Porém perceba que devemos definir as funções dos eventos anteriormente para que após a execução do método `send()` esses eventos possam ser executados da forma correta.

Até aí tudo muito fácil, agora vamos ver como fazer 1 requisição `POST`, emulando a seguinte função do jQuery:

```js
$.ajax({
  type: 'POST',
  url: '/my/url',
  data: data
});
```

Nesse caso é ainda mais fácil em Vanilla:

```js
var request = new XMLHttpRequest();  
request.open('POST', '/my/url', true);  
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');  
request.send(data); 
```

Sabendo disso podemos facilmente perceber alguns dados que podemos separar para que sejam enviados para a lib:

- method
- baseURL
- options
  - baseURL e method faz parte desse objeto   

Para que a lib possa executar o seguinte código:

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

Então analise essa parte do código:

```js
if (options.method && options.url) {
  return xhrConnection(
    options.method,
    options.baseUrl + options.url,
    maybeData(options.data),
    options
  )
}
```

Ela nos diz que se você enviar o `method`  **E** a `url` iremos retornar a **execução** da função `xhrConnection`, que é a seguinte:

```js
 function xhrConnection (type, url, data, options) {
    var returnMethods = ['then', 'catch', 'always']
    var promiseMethods = returnMethods.reduce(function (promise, method) {
      promise[method] = function (callback) {
        promise[method] = callback
        return promise
      }
      return promise
    }, {})
    var xhr = new XMLHttpRequest()
    xhr.open(type, url, true)
    xhr.withCredentials = options.hasOwnProperty('withCredentials')
    setHeaders(xhr, options.headers)
    xhr.addEventListener('readystatechange', ready(promiseMethods, xhr), false)
    xhr.send(objectToQueryString(data))
    promiseMethods.abort = function () {
      return xhr.abort()
    }
    return promiseMethods
}
```

É nessa função que ela faz toda a mágica e lhe retorna uma Promise, como esse assunto não é muito explorado por aí vamos entender um pouco melhor como as coisas estão funcionando aqui:

```js
var returnMethods = ['then', 'catch', 'always']
var promiseMethods = returnMethods.reduce(function (promise, method) {
  promise[method] = function (callback) {
    promise[method] = callback
    return promise
  }
  return promise
}, {})
var xhr 
```

Primeiramente os métodos que a *Promise* pode executar são colocados no *Array*:

```js
var returnMethods = ['then', 'catch', 'always']
```

Isso é feito para que possamos utilizar o método [`reduce`](http://mdn.io/reduce): 

```js
var promiseMethods = returnMethods.reduce(function (promise, method) {
  promise[method] = function (callback) {
    promise[method] = callback
    return promise
  }
  return promise
}, {})
```

A função do `reduce` **SEMPRE** recebe 2 parâmetros que são:

- posição **ANTERIOR** no *Array*
- posição **ATUAL** no *Array*

Porém **SÓ PODE RETORNAR 1 VALOR** que será utilizado pela próxima iteração do `reduce`, por exemplo:

```js
[1, 2, 3].reduce((anterior, atual) => { console.log('anterior, atual', anterior, atual); return anterior+atual })
anterior, atual 1 2
anterior, atual 3 3
6
```

> Você achou estranho eu ter falado que o primeiro parâmetro é o anterior e o segundo é o atual, mas viu que o anterior era o primeiro elemento e o atual era o segundo elemento né?

Bom isso acontece porque 1 *Array* não possui 1 elemento anterior ao primeiro, **NUNCA**, ou seja se você tem uma função que recebe 2 posições de 1 *Array* e só retorna 1 valor, você **SEMPRE iniciará da segunda posição** pois para que o `redcuce` aconteça você precisa de 2 posições, logo a primeira posição é **SEMPRE obrigatória** não necessitando que ela seja a atual, por isso o `reduce` coloca a posição atual como sendo a segunda, pois o retorno dele **SEMPRE** será algum processamento entre 2 posições do *Array*.

No nosso exemplo, `returnMethods.reduce(function (promise, method)`, o *Array* é `returnMethods` e cada posição é passada para os seguintes parâmetros:

- promise
- method

Vamos analisar as passagens dessa função no *Array*:

- Primeira passagem:

```js
promise = {}
method = 'then'

// Logo o reduce retorna

return {
  'then': function (callback) {
    promise[method] = callback
    return promise
  }
}
```

Então teremos o método `then` que para ser usado precisará de 1 função de callback para que seja executado, podemos ver isso mais facilmente com o exemplo de uso dessa lib:

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

Ou

```js
ajax().get('/api/users').then(function (response, xhr) {
  // Do something
})
```

![EPAAAAA](https://s-media-cache-ak0.pinimg.com/564x/fb/e2/53/fbe253bb518e4d749c40dbec5c6506dc.jpg)

> De onde `promise` recebe `{}`?

**Simples meu caro gafanhoto!**

Se você leu a documentação do `reduce` sabe que ele possui mais 1 parâmetro opcional que é o **valor INICIAL**, vamos modificar nosso exemplo anterior para iniciar o somatório em `10`:

```js
[1, 2, 3].reduce((anterior, atual) => { console.log('anterior, atual', ant, atual); return anterior+atual}, 10)
anterior, atual 10 1
anterior, atual 11 2
anterior, atual 13 3
16
```

É por isso que inicia o `reduce` com `{}`, para que todo o processamento possa ser adicionado nesse objeto novo que será retornado ao final do processamento.


- Segunda passagem:

```js
promise = {
  'then': callback,
  'catch': callback
}
method = 'catch'
```

Uso:

```js
ajax().post('/api/users', { slug: 'john' }).catch(function (response, xhr) {
  // Do something
})
```

- Terceira passagem:

```js
promise = {
  'then': callback,
  'catch': callback,
  'always': callback
}
method = 'always'
```

Uso:

```js
ajax().post('/api/users', { slug: 'john' }).always(function (response, xhr) {
  // Do something
})
```

Você deve se perguntar:

> Mas como ele irá executar essa função **sempre** que a requisição finalizar?

E eu lhe mostro, aqui ó:

```js
function ready (promiseMethods, xhr) {
  return function handleReady () {
    if (xhr.readyState === xhr.DONE) {
      xhr.removeEventListener('readystatechange', handleReady, false)
      promiseMethods.always.apply(promiseMethods, parseResponse(xhr))

      if (xhr.status >= 200 && xhr.status < 300) {
        promiseMethods.then.apply(promiseMethods, parseResponse(xhr))
      } else {
        promiseMethods.catch.apply(promiseMethods, parseResponse(xhr))
      }
    }
  }
}
```

Bem nessa linha aqui:

```js
promiseMethods.always.apply(promiseMethods, parseResponse(xhr))
```

## Mágica da *Promise*

Agora vou lhe mostrar onde fica o coração dessa *Promise*!

```js
if (xhr.status >= 200 && xhr.status < 300) {
  promiseMethods.then.apply(promiseMethods, parseResponse(xhr))
} else {
  promiseMethods.catch.apply(promiseMethods, parseResponse(xhr))
}
```

É exatamente aqui onde ele definiu quando será executada a função de `then` e `catch`!

Agora eu lhe pergunto:

> Você percebeu o porquê e quando a função de `then` e `catch` são executadas?

