var Block = function(desc, type) {
  return {
    tree:[],
    desc: desc,
    type: type
  };
}

Flowy = function() {

  var chart = {
    block: new Block("Begin", "Algorithm")
  }

  var topBlock = [];
  
  this.desc = function(desc){
    return desc ? chart.block.desc = desc : chart.block.desc;
  };

  this.type = function(type){
    return type ? chart.block.type = type : chart.block.type;
  }
  
  this.push = function(block) {
    this.tree.push(block);
  }
  
  this.getBlock = function() {
    return chart.block;
  };

  this.setBlock = function(blockObject) {
    chart.block = blockObject;
  };

  this.tree = chart.block.tree;
  
  this.pushBlock = function(block, updateTop) {
    this.push(block);
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
    }(): null;
  };

  this.elseif = function(desc, elseType) {
    elseType = (elseType || 'ElseIf');
    if(['If','ElseIf'].indexOf(chart.block.type) != -1 ) {  
      var block = this.createBlock(desc, elseType);
      this.end();
      this.pushBlock(block, true);
      return this;
    } else {
      throw 'Else without an If';
    }  
  };

  this.getJSON = function() {
    var getObjectRec = function(block) {
      
      if(block.tree)
      block.tree = block.tree.map(function(_) {
                     return getObjectRec(_); 
                   });
      return block;
    };

    while(this.end() != null);
    var block = getObjectRec(this.getBlock());
    return block;
  };
};

Flowy.prototype.createBlock = function(desc, type) {
  var block = new Block(desc, type);
  return block;
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

Flowy.prototype.else = function(desc) {
  return this.elseif(desc, 'Else');
}; 