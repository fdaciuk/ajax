;(function (should, expect, Ajax) {
  'use strict'

  describe('#AJAX - Test `get` promises interface', function () {
    var ajax = new Ajax()
    var getRequest = ajax.get()

    it('Should `get` method return `then` method', function () {
      getRequest.should.have.property('then')
    })

    it('Should `get` method return `catch` method', function () {
      getRequest.should.have.property('catch')
    })

    it('DEPRECATED - Should `get` method return `done` method', function () {
      getRequest.should.have.property('done')
    })

    it('DEPRECATED - Should `get` method return `error` method', function () {
      getRequest.should.have.property('error')
    })

    it('Should `get` method return `always` method', function () {
      getRequest.should.have.property('always')
    })
  })
})(window.chai.should(), window.chai.expect, window.Ajax)
