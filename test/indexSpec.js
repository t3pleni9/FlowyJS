var expect = require('chai').expect;
var flowyjs = require('../src/index');

describe('index', function() {
  it('Should Create a flowy object', function() {
    expect(flowyjs.flowy).to.be.an.instanceOf(Flowy);
  });
});
