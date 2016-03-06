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
    expect(flowy.getJSON().name).to.be.empty;
  });

  xit('Should return 1 for flowy.if', function() {
    expect(flowy.getObject().if).to.be.equal(1);
  });
});
