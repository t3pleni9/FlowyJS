var expect = require('chai').expect;
require('./index');


describe('flowy', function() {
  beforeEach(function() {
    flowy = new Flowy();
  })
  it('init test', function() {
    expect(true).to.be.true;
  });
  it('Should create Flowy class on .getJSON', function() {
    
    expect(flowy.getJSON().tree).to.be.empty;
    expect(flowy.getJSON().name).to.be.equal('begin');
  });

  it('Should create a block with name "test"', function() {
    var block = flowy.createBlock('test');
    expect(block.name).to.be.equal('test');
  });
});
