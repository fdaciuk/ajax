;(function (expect, ajax) {
  'use strict'

  describe('#AJAX - Test `post` method', function () {
    var request = ajax({ baseUrl: 'http://localhost:3000/api' })

    it('Should return an object', function (done) {
      request.post('/user/joao')
        .then(function (response) {
          expect(response).to.be.an('object')
          done()
        })
    })

    it('Should return data about `joao`', function (done) {
      request.post('/user', { slug: 'joao' })
        .then(function (response) {
          expect(response.name).to.be.equal('João da Silva')
          done()
        })
    })

    it('Should return data about `joao` (sending more than one param)', function (done) {
      var data = { slug: 'joao', lastname: 'other' }
      request.post('/user', data)
        .then(function (response) {
          expect(response.name).to.be.equal('João da Silva')
          done()
        })
    })

    it("Should return error 404 when user doesn't exist", function (done) {
      request.post('/user', { slug: 'alberto' })
        .catch(function (response, xhr) {
          expect(xhr.status).to.be.equal(404)
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
          expect(response.header).to.match(/^multipart\/form-data/)
          done()
        })
    })
  })
})(window.chai.expect, window.ajax)
