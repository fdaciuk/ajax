;(function (should, expect, Ajax, ajax) {
  'use strict'

  describe('#AJAX - Test `post` method', function () {
    var request = new Ajax()

    it('DEPRECATED - Should return an object', function (done) {
      request.post('http://127.0.0.1:3000/api/user/joao')
        .done(function (response) {
          response.should.be.an('object')
          done()
        })
    })

    it('Should return an object', function (done) {
      request.post('http://127.0.0.1:3000/api/user/joao')
        .then(function (response) {
          response.should.be.an('object')
          done()
        })
    })

    it('DEPRECATED - Should return data about `joao`', function (done) {
      request.post('http://127.0.0.1:3000/api/user', { slug: 'joao' })
        .done(function (response) {
          response.name.should.be.equal('João da Silva')
          done()
        })
    })

    it('Should return data about `joao`', function (done) {
      request.post('http://127.0.0.1:3000/api/user', { slug: 'joao' })
        .then(function (response) {
          response.name.should.be.equal('João da Silva')
          done()
        })
    })

    it("DEPRECATED - Should return error 404 when user doesn't exist", function (done) {
      request.post('http://127.0.0.1:3000/api/user', { slug: 'alberto' })
        .error(function (response, xhr) {
          xhr.status.should.be.equal(404)
          done()
        })
    })

    it("Should return error 404 when user doesn't exist", function (done) {
      request.post('http://127.0.0.1:3000/api/user', { slug: 'alberto' })
        .catch(function (response, xhr) {
          xhr.status.should.be.equal(404)
          done()
        })
    })

    it('Should not send some header if it is null', function (done) {
      var file = new window.FormData()
      file.append('file', 'test')
      var request = ajax({
        headers: { 'content-type': null }
      })
      request.post('http://localhost:3000/api/getheader', file)
        .then(function (response, xhr) {
          response.header.should.match(/^multipart\/form-data/)
          done()
        })
    })
  })
})(window.chai.should(), window.chai.expect, window.Ajax, window.ajax)
