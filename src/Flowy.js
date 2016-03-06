Flowy = function() {
  var chart = {
    block: new Block('Begin', 'Algorithm')
  };

  var topBlock = [];
  
  
  this.getBlock = function() {
    return chart.block;
  };

  this.setBlock = function(blockObject) {
    chart.block = blockObject;
  };

  this.tree = chart.block.tree;
  
  this.pushBlock = function(block, updateTop) {
    chart.block.push(block);
    updateTop ? this.tree = function()
    {
      topBlock.push(chart.block);
      chart.block = block;
      return chart.block.tree;
    }() : null;
  };

  this.end = function() { 
    topBlock.length > 0 ? this.tree = function()
    {
      chart.block =  topBlock.pop()
      return chart.block.tree;
    }()  : null;
  };
  
  this.else = function(desc) {
    var type = chart.block.type();
    if(['If','ElseIf'].indexOf(type) != -1 ) {  
      var block = this.createBlock(desc, 'Else');
      this.end();
      this.pushBlock(block, true);
      return this;
    } else {
      throw "Else without an If";
    }
  };

  this.elseif = function(desc) {
    var type = chart.block.type();
    if(['If','ElseIf'].indexOf(type) != -1 ) {
      var block = this.createBlock(desc, 'ElseIf');
      this.end();
      this.pushBlock(block, true);
      return this;
    } else {
      throw new Error('Else without an If')
    }  
  };
};

Flowy.prototype.createBlock = function(desc, type) {
  var block = new Block(desc, type);
  return block;
}

Flowy.prototype.getJSON = function() {
  return this.getBlock();
};

Flowy.prototype.statement = function(desc){
  var block = this.createBlock(desc, 'Statement');
  this.pushBlock(block);
  return this;
};

Flowy.prototype.if = function(desc) {
  var block = this.createBlock(desc, 'If');
  this.pushBlock(block, true);
  return this;
};

Flowy.prototype.then = function(desc) { 
  var block = this.createBlock(desc, desc?'Statement':'Empty');
  this.pushBlock(block);
  return this;
};

Flowy.prototype.do = function(desc) { 
  return this.then(desc);
};





var Block = function(blockDesc, blockType) {
  var blockObject = {
    tree: [],
    desc: blockDesc,
    type: blockType
  };

  this.getObject = function() {
    return blockObject;
  };
  
  this.desc = function(desc){
    return desc ? blockObject.desc = desc : blockObject.desc;
  };

  this.type = function(type){
    return type ? blockObject.type = type : blockObject.type;
  }
  
  this.tree =  blockObject.tree;
  
  this.push = function(block) {
    blockObject.tree.push(block);
  };
};

  