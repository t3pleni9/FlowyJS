Flowy = function() {
  var chart = {
    block: new Block('Begin', 'Begin')
  }; 
  
  
  this.getBlock = function() {
    return chart.block.getObject();
  };

  this.setBlock = function(blockObject) {
    chart.block = blockObject;
  };

  this.tree = chart.block.tree();
  
  this.pushBlock = function(block) {
    chart.block.push(block);
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
}



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
  
  this.tree = function(){
    return  blockObject.tree;  
  };
  
  this.push = function(block) {
    blockObject.tree.push(block);
  };
};

  