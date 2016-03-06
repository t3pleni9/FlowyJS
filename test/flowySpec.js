/*global  */
var expect = require('chai').expect;
require('../src/Flowy');


describe('flowy', function() {
  beforeEach(function() {
    flowy = new Flowy();
  })
  
  it('Should return Top block on .getJSON', function() {
    expect(flowy.getJSON().tree).to.be.empty;
    expect(flowy.getJSON().desc).to.be.equal('Begin');
    expect(flowy.getJSON().type).to.be.equal('Algorithm');
  });

  it('Should create a block with desc "test"', function() {
    var block = flowy.createBlock('test');
    expect(block.desc).to.be.equal('test');
  });

  it('Should set the default block with desc "test"', function() {
    var block = flowy.createBlock('test');
    flowy.setBlock(block)
    expect(flowy.desc()).to.be.equal('test');
  })

  it('.desc should return "test"', function() {
    var block = flowy.createBlock('test');
    expect(block.desc).to.be.equal('test');
  });
  
  it('.desc should set  desc to "test2"', function() {
    var block = flowy.createBlock('test');
    block.desc = 'test2';
    expect(block.desc).to.be.equal('test2');
  });

  it('.desc() should return desc as "Begin"', function() {
    expect(flowy.desc()).to.be.equal('Begin');
  });

  it('.desc("test") should set desc as "test"', function() {
    flowy.desc('test');
    expect(flowy.desc()).to.be.equal('test');
  });

  it('.type() should return type as "Algorithm"', function() {
    expect(flowy.type()).to.be.equal('Algorithm');
  });

  it('.type("test") should set type as "test"', function() {
    flowy.type('test');
    expect(flowy.type()).to.be.equal('test');
  });

  

  
  it('Should create a inner block with desc "test"', function() {
    var block = flowy.createBlock('test');
    flowy.pushBlock(block);
    var innerBlock = flowy.getBlock().tree[0];
    expect(innerBlock.desc).to.be.equal('test');
  });

  it('Should create a inner block with desc "test"', function() {
    var block = flowy.createBlock('test');
    var innerBlock = flowy.createBlock('test2');
    block.tree.push(innerBlock);
    innerBlock = block.tree[0];
    expect(innerBlock.desc).to.be.equal('test2');
  });

  it('Should create a statement block', function(){
    var block = flowy.statement('Initialise x = 0');
    expect(block.tree[0].type).to.be.equal('Statement');
    expect(block.tree[0].desc).to.be.equal('Initialise x = 0');
    
  });

  it('Should create a block and set it as current block', function(){
    var block = flowy.createBlock('block2');
    flowy.pushBlock(block, true);
    expect(flowy.getBlock().desc).to.be.equal('block2'); 
  });

  it('Should set top block as the current block', function(){
    var block = flowy.createBlock('block2');
    flowy.pushBlock(block, true);
    flowy.end();
    expect(flowy.getBlock().desc).to.be.equal('Begin'); 
  });

  describe('Create simple if then do block', function() {
    it('Should create a If block and set top to current block', function(){
      flowy.if('x > 2');
      expect(flowy.getBlock().type).to.be.equal('If');
      expect(flowy.getBlock().desc).to.be.equal('x > 2');
    });

    it('Should create a If block and add steps in then block', function(){
      flowy.if('x > 2').then('x = x + 1');
      expect(flowy.tree[0].type).to.be.equal('Statement');
      expect(flowy.tree[0].desc).to.be.equal('x = x + 1');
    });

    it('Should create a If block and add steps in then block with empty block', function(){
      flowy.if('x > 2').then().do('x = x + 1');
      expect(flowy.tree[0].type).to.be.equal('Empty');
    });

    it('Should create a If block and add steps in then block with Statement block', function(){
      flowy.if('x > 2').then().do('x = x + 1');
      expect(flowy.tree[1].type).to.be.equal('Statement');
      expect(flowy.tree[1].desc).to.be.equal('x = x + 1');
    });

    it('Should set top block to current block', function(){
      flowy.if('x > 2').then().do('x = x + 1').end();
      expect(flowy.getBlock().desc).to.be.equal('Begin');
      expect(flowy.tree[0].type).to.be.equal('If'); 
    });

    it('Top block should be ElseIf block', function(){
      flowy.if('x > 2').then('x = x + 1').elseif('x = x + 2');
      expect(flowy.getBlock().type).to.be.equal('ElseIf');
      expect(flowy.getBlock().desc).to.be.equal('x = x + 2');
    });

    it('Should create a ElseIf block and add steps in then block with Statement block', function(){
      flowy.if('x > 10').then().do('x = x + 1').elseif('x < 3').then('x = x - 1');
      
      expect(flowy.tree[0].type).to.be.equal('Statement');
      expect(flowy.tree[0].desc).to.be.equal('x = x - 1');
    });

    it('Should set top block to current block', function(){
      flowy.if('x > 2').then().do('x = x + 1').else('x = x + 2').end();
      expect(flowy.getBlock().desc).to.be.equal('Begin');
      expect(flowy.tree[0].type).to.be.equal('If');
      expect(flowy.tree[1].type).to.be.equal('Else'); 
    })

    it('Top block should be Else block', function(){
      flowy.if('x > 2').then('x = x + 1').else('x = x + 2');
      expect(flowy.getBlock().type).to.be.equal('Else');
      expect(flowy.getBlock().desc).to.be.equal('x = x + 2');
    });

    it('Should throw an exception', function(){ 
      var flag = 0;
      try{
        flowy.else('x = x+2')
      } catch(err) {
        expect(err).to.be.eql('Else without an If');
        flag |= 1;
      }

      try{
        flowy.elseif('x = x+2')
      } catch(err) {
        expect(err).to.be.eql('Else without an If');
        flag |= 2;
      }

      try{
        flowy.if().else().else('x = x+2')
      } catch(err) {
        expect(err).to.be.eql('Else without an If');
        flag |= 4;
      }

      expect(flag).to.be.equal(7);
    });

    it('Should not throw an exception', function(){ 
      flowy.if().else();
      flowy.if().elseif().elseif();
      flowy.if().elseif().else();
      flowy.if().elseif().then().elseif().do().else();
    });

    it('getJSON should print the entire block', function(){
      flowy.if('x == 2').then('x = x + 1').elseif('x > 2').do('x = x + 2').else('x = x - 1');
      expect(flowy.getJSON()).to.be.eql(
        { tree:
          [ { tree:
              [ {desc: "x = x + 1", tree: [], type: "Statement"}],
              desc: 'x == 2',
              type: 'If'
            },
            { tree:
              [{desc: "x = x + 2",tree: [],type: "Statement"}],
              desc: 'x > 2',
              type: 'ElseIf'
            },
            { tree: [], desc: 'x = x - 1', type: 'Else' } ],
          desc: 'Begin',
          type: 'Algorithm'
        });
    });
  });
});
