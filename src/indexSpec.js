/*global  */
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
    expect(flowy.getJSON().desc).to.be.equal('Begin');
  });

  it('Should create a block with desc "test"', function() {
    var block = flowy.createBlock('test');
    expect(block.desc()).to.be.equal('test');
  });

  it('.desc should return "test"', function() {
    var block = flowy.createBlock('test');
    expect(block.desc()).to.be.equal('test');
  });
  
  it('.desc should set  desc to "test2"', function() {
    var block = flowy.createBlock('test');
    block.desc('test2');
    expect(block.desc()).to.be.equal('test2');
  });

  
  it('Should create a inner block with desc "test"', function() {
    var block = flowy.createBlock('test');
    flowy.pushBlock(block);
    var innerBlock = flowy.getBlock().tree[0];
    expect(innerBlock.getObject().desc).to.be.equal('test');
  });

  it('Should create a inner block with desc "test"', function() {
    var block = flowy.createBlock('test');
    var innerBlock = flowy.createBlock('test2');
    block.push(innerBlock);
    innerBlock = block.tree()[0];
    expect(innerBlock.desc()).to.be.equal('test2');
  });

  it('Should create a statement block', function(){
    var block = flowy.statement('Initialise x = 0');
    expect(block.tree[0].type()).to.be.equal('Statement');
    expect(block.tree[0].desc()).to.be.equal('Initialise x = 0');
    
  });

});
