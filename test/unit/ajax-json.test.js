;(function (should, expect, Ajax, ajax) {
  'use strict'

  describe('#AJAX - Test `json` method', function () {
    var request
    beforeEach(function () {
      request = new Ajax()
    })
    it('Should return data about `posts`', function (done) {
      request.get('http://jsonplaceholder.typicode.com/posts/1')
        .done(function (response) {
          response.userId.should.be.equal(1)
          response.title.should.be.equal('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
          done()
        })
    })
  })
})(window.chai.should(), window.chai.expect, window.Ajax, window.ajax)
