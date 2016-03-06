var expect = require('chai').expect;
var lib = require('../src/index');

describe('index', function() {
  it('Should Create a flowy object', function() {
    expect(lib.flowy).to.be.an.instanceOf(Flowy);
  });
});
