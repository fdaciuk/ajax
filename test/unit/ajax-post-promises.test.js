;(function (expect, ajax) {
  'use strict'

  describe('#AJAX - Test `post` promises interface', function () {
    var postRequest = ajax().post()

    it('Should `post` method return `then` method', function () {
      expect(postRequest).to.have.property('then')
    })

    it('Should `post` method return `catch` method', function () {
      expect(postRequest).to.have.property('catch')
    })

    it('Should `post` method return `always` method', function () {
      expect(postRequest).to.have.property('always')
    })
  })
})(window.chai.expect, window.ajax)
