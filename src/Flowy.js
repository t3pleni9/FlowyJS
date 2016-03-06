Flowy = function() {
  var block = new Block('begin');
  this.getBlock = function() {
    return block.getObject();
  };

  this.setBlock = function(blockObject) {
    block = blockObject;
  }

  this.createBlock = function(name) {
    var block = new Block();
    block.setName(name);
    return block.getObject();
  } 
};

Flowy.prototype.getJSON = function() {
  return this.getBlock();
};



var Block = function(blockName) {
  var blockObject = {
    tree: [],
    name: blockName
  };

  this.getObject = function() {
    return blockObject;
  };

  this.setName = function(name) {
    blockObject.name = name;
  }

  this.addBlock = function(block) {
    blockObject.tree.push(block);
  }
}

  