;(function (expect, ajax) {
  'use strict'

  describe('#AJAX - Test `put` promises interface', function () {
    var putRequest = ajax().put()

    it('Should `put` method return `then` method', function () {
      expect(putRequest).to.have.property('then')
    })

    it('Should `put` method return `catch` method', function () {
      expect(putRequest).to.have.property('catch')
    })

    it('Should `put` method return `always` method', function () {
      expect(putRequest).to.have.property('always')
    })
  })
})(window.chai.expect, window.ajax)
