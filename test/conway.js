var expect = require("chai").expect;
var conway = require("../app/conway");

var lifeAtRowCol = [];
for (i = 0; i < 37; i++) {
  lifeAtRowCol[i] = [];
  for (j = 0; j < 60; j++) {
    lifeAtRowCol[i][j] = false;
  }
}


describe("Is On Cell", function() {
  it("determines if mouse coordinates are on a cell and returns row and cell", function() {
    var onCell = conway.isOnCell(235, 8);
    expect(onCell).to.deep.equal([0, 23]);
  });
  it("returns -1, -1 if mouse coordinates are on gridline", function() {
    var offCell = conway.isOnCell(10, 7);
    expect(offCell).to.deep.equal([-1, -1]);
  });
});

describe("Give Cell Life", function() {
  it("switches a cell from dead to alive and fills the cell with green", function() {
    var newState = conway.giveCellLife(lifeAtRowCol, 5, 6);
    expect(newState[5][6]).to.equal(true);
  });
});

describe("Kill Cell", function() {
  it("switches a cell from alive to dead and fills the cell with white", function() {
    var newState = conway.killCell(lifeAtRowCol, 5, 6);
    expect(newState[5][6]).to.equal(false);
  });
});
