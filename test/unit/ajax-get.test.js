;(function (should, expect, Ajax, ajax) {
  'use strict'

  describe('#AJAX - Test `get` method', function () {
    var request
    beforeEach(function () {
      request = new Ajax()
    })

    it('DEPRECATED - Should return an object (users list)', function (done) {
      request.get('http://127.0.0.1:3000/api/users').done(function (response) {
        response.should.be.an('object')
        done()
      })
    })

    it('Should return an object (users list)', function (done) {
      request.get('http://127.0.0.1:3000/api/users').then(function (response) {
        response.should.be.an('object')
        done()
      })
    })

    it('Should return data about `paulo`', function (done) {
      request.get('http://127.0.0.1:3000/api/user/paulo')
        .done(function (response) {
          response.name.should.be.equal('Paulo Torres')
          done()
        })
    })

    it('DEPRECATED - Should return 404 error', function (done) {
      request.get('http://127.0.0.1:3000/api/something')
        .error(function (response, xhr) {
          xhr.status.should.be.equal(404)
          done()
        })
    })

    it('Should return 404 error', function (done) {
      request.get('http://127.0.0.1:3000/api/something')
        .catch(function (response, xhr) {
          xhr.status.should.be.equal(404)
          done()
        })
    })

    it('Should return 404 error on `always` promise', function (done) {
      request.get('http://127.0.0.1:3000/api/something')
        .always(function (response, xhr) {
          xhr.status.should.be.equal(404)
          done()
        })
    })

    it('Should return the same result on both promises `done` and `always`',
      function (done) {
        function requestResponse (response, xhr) {
          response.should.be.an('object')
          done()
        }
        request.get('http://127.0.0.1:3000/api/users')
          .done(requestResponse)
          .always(requestResponse)
      })

    it('Should accept headers', function (done) {
      var request = ajax({
        headers: { 'content-type': 'application/json' }
      })
      request.get('http://localhost:3000/api/users')
        .then(function (response) {
          response.should.be.an('object')
          done()
        })
    })
  })
})(window.chai.should(), window.chai.expect, window.Ajax, window.ajax)
