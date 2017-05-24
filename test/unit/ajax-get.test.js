;(function (expect, ajax) {
  'use strict'

  describe('#AJAX - Test `get` method', function () {
    var request = ajax({ baseUrl: 'http://127.0.0.1:3000/api' })

    it('Should return an object (users list)', function (done) {
      request.get('/users').then(function (response) {
        expect(response.data).to.be.an('object')
        done()
      })
      .catch(function (err){ console.log(err)})
    })

    it('Should return data about `paulo`', function (done) {
      request.get('/user/paulo')
        .then(function (response) {
          expect(response.data.name).to.be.equal('Paulo Torres')
          done()
        })
    })

    it('Should return 404 error', function (done) {
      request.get('/something')
        .catch(function (response) {
          expect(response.xhr.status).to.be.equal(404)
          done()
        })
    })

    it('Should accept headers', function (done) {
      var request = ajax({
        headers: { 'content-type': 'application/json' }
      })
      request.get('http://localhost:3000/api/users')
        .then(function (response) {
          expect(response.data).to.be.an('object')
          done()
        })
    })

    it('Should pass method on ajax function', function (done) {
      var request = ajax({
        method: 'get',
        url: 'http://localhost:3000/api/users'
      })

      request.then(function (response) {
        expect(response.data).to.be.an('object')
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
  })
})(window.chai.expect, window.ajax)
