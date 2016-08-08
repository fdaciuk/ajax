;(function (expect, ajax) {
  'use strict'

  describe('#AJAX - Test `delete` promises interface', function () {
    var deleteRequest = ajax().delete()

    it('Should `delete` method return `then` method', function () {
      expect(deleteRequest).to.have.property('then')
    })

    it('Should `delete` method return `catch` method', function () {
      expect(deleteRequest).to.have.property('catch')
    })
  })
})(window.chai.expect, window.ajax)
