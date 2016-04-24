;(function (expect, ajax) {
  'use strict'

  describe('#AJAX - Test `get` promises interface', function () {
    var getRequest = ajax().get()

    it('Should `get` method return `then` method', function () {
      expect(getRequest).to.have.property('then')
    })

    it('Should `get` method return `catch` method', function () {
      expect(getRequest).to.have.property('catch')
    })

    it('Should `get` method return `always` method', function () {
      expect(getRequest).to.have.property('always')
    })
  })
})(window.chai.expect, window.ajax)
