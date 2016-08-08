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
  })
})(window.chai.expect, window.ajax)
