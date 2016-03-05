;(function (should, expect, Ajax) {
  'use strict'

  describe('#AJAX - Test `delete` promises interface', function () {
    var ajax = new Ajax()
    var deleteRequest = ajax.delete()

    it('Should `delete` method return `then` method', function () {
      deleteRequest.should.have.property('then')
    })

    it('Should `delete` method return `catch` method', function () {
      deleteRequest.should.have.property('catch')
    })

    it('DEPRECATED - Should `delete` method return `done` method', function () {
      deleteRequest.should.have.property('done')
    })

    it('DEPRECATED - Should `delete` method return `error` method', function () {
      deleteRequest.should.have.property('error')
    })

    it('Should `delete` method return `always` method', function () {
      deleteRequest.should.have.property('always')
    })
  })
})(window.chai.should(), window.chai.expect, window.Ajax)
