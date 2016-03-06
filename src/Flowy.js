Flowy = function() {
  var block = new Block();
  this.getBlock = function() {
    return block.getObject();
  };

  this.setBlock = function(blockObject) {
    block = blockObject;
  }
    
};

Flowy.prototype.getJSON = function() {
  return this.getBlock();
};

var Block = function() {
  var blockObject = {
    tree: [],
    name: ""
  };

  this.getObject = function() {
    return blockObject;
  };

  this.setObject = function(name) {
    blockObject.name = name;
  }

  this.addToObject = function(block) {
    blockObject.tree.push(block);
  }
}

  