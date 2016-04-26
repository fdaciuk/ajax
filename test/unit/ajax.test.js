;(function (expect, ajax) {
  'use strict'

  describe('#AJAX - Test module interface', function () {
    it('Should have `get` method', function () {
      expect(ajax()).to.have.property('get')
    })

    it('Should have `post` method', function () {
      expect(ajax()).to.have.property('post')
    })

    it('Should have `put` method', function () {
      expect(ajax()).to.have.property('put')
    })

    it('Should have `delete` method', function () {
      expect(ajax()).to.have.property('delete')
    })
  })
})(window.chai.expect, window.ajax)
