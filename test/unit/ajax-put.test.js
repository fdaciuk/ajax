;(function (expect, ajax) {
  'use strict'

  describe('#AJAX - Test `put` method', function () {
    var request = ajax({ baseUrl: 'http://localhost:3000/api' })
    it('Should return an object', function (done) {
      request.put('/complex/object', { driverDocument: { status: 2, array: [1, 2, 3] } })
        .then(function (response) {
          expect(response.driverDocument.status).to.be.equal('2')
          done()
        })
    })
  })
})(window.chai.expect, window.ajax)
