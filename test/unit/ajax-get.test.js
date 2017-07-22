;(function (expect, ajax) {
  'use strict'

  describe('#AJAX - Test `get` method', function () {
    var request = ajax({ baseUrl: 'http://127.0.0.1:3000/api' })

    it('Should return an object (users list)', function (done) {
      request.get('/users').then(function (response) {
        expect(response).to.be.an('object')
        done()
      })
    })

    it('Should return data about `paulo`', function (done) {
      request.get('/user/paulo')
        .then(function (response) {
          expect(response.name).to.be.equal('Paulo Torres')
          done()
        })
    })

    it('Should return 404 error', function (done) {
      request.get('/something')
        .catch(function (response, xhr) {
          expect(xhr.status).to.be.equal(404)
          done()
        })
    })

    it('Should return 404 error on `always` promise', function (done) {
      request.get('/something')
        .always(function (response, xhr) {
          expect(xhr.status).to.be.equal(404)
          done()
        })
    })

    it('Should return the same result on both promises `done` and `always`',
      function (done) {
        function requestResponse (response, xhr) {
          expect(response).to.be.an('object')
          done()
        }
        ajax().get('http://127.0.0.1:3000/api/users')
          .then(requestResponse)
          .always(requestResponse)
      })

    it('Should accept headers', function (done) {
      var request = ajax({
        headers: { 'content-type': 'application/json' }
      })
      request.get('http://localhost:3000/api/users')
        .then(function (response) {
          expect(response).to.be.an('object')
          done()
        })
    })

    it('Should pass method on ajax function', function (done) {
      var request = ajax({
        method: 'get',
        url: 'http://localhost:3000/api/users'
      })

      request.then(function (response) {
        expect(response).to.be.an('object')
        done()
      })
    })

    it('Should abort a lazy request', function (done) {
      var request = ajax().get('http://localhost:3000/api/users/lazy')
      var timer = setTimeout(function () {
        request.abort()
        expect(true).to.be.ok
        done()
      }, 1000)
      request.then(function (response) {
        clearTimeout(timer)
        expect(false).to.be.ok
        done()
      })
    })

    it('Should send back get data',function (done){
      var request = ajax().get('http://localhost:3000/api/getdata',{data:'data'})
      request.then(function (response) {
        expect(response.data).to.be.equal('data')
        done()
      })
    })
  })
})(window.chai.expect, window.ajax)
