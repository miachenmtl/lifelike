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

describe("Count Neighbourhood", function() {
  var count = [];
  lifeAtRowCol[0][0] = true; // This looks like:
  lifeAtRowCol[0][2] = true; // O-O--
  lifeAtRowCol[1][3] = true; // ---O-
  lifeAtRowCol[2][1] = true; // -OO--
  lifeAtRowCol[2][2] = true; // ----O
  lifeAtRowCol[3][4] = true; // ---OO
  lifeAtRowCol[4][3] = true;
  lifeAtRowCol[4][4] = true;
  it ("counts the number of cells alive in the Moore neighbourhood of top left corner", function() {
    count[0] = conway.countNeighbourhood(lifeAtRowCol, 0, 0);
    expect(count[0]).to.equal(0);
  });
  it ("counts the number of cells alive in the Moore neighbourhood along top edge", function() {
    count[0] = conway.countNeighbourhood(lifeAtRowCol, 0, 1);
    count[1] = conway.countNeighbourhood(lifeAtRowCol, 0, 2);
    count[2] = conway.countNeighbourhood(lifeAtRowCol, 0, 3);
    count[3] = conway.countNeighbourhood(lifeAtRowCol, 0, 4);
    expect(count[0]).to.equal(2);
    expect(count[1]).to.equal(1);
    expect(count[2]).to.equal(2);
    expect(count[3]).to.equal(1);
  });
  it ("counts the number of cells alive in the Moore neighbourhood along left edge", function() {
    count[0] = conway.countNeighbourhood(lifeAtRowCol, 1, 0);
    count[1] = conway.countNeighbourhood(lifeAtRowCol, 2, 0);
    count[2] = conway.countNeighbourhood(lifeAtRowCol, 3, 0);
    count[3] = conway.countNeighbourhood(lifeAtRowCol, 4, 0);
    expect(count[0]).to.equal(2);
    expect(count[1]).to.equal(1);
    expect(count[2]).to.equal(1);
    expect(count[3]).to.equal(0);
  });
  it ("counts the number of cells alive in the Moore neighbourhood in the middle", function() {
    count[0] = conway.countNeighbourhood(lifeAtRowCol, 1, 1);
    count[1] = conway.countNeighbourhood(lifeAtRowCol, 1, 2);
    count[2] = conway.countNeighbourhood(lifeAtRowCol, 1, 3);
    count[3] = conway.countNeighbourhood(lifeAtRowCol, 1, 4);
    count[4] = conway.countNeighbourhood(lifeAtRowCol, 2, 3);
    count[5] = conway.countNeighbourhood(lifeAtRowCol, 3, 4);
    count[6] = conway.countNeighbourhood(lifeAtRowCol, 4, 4);
    expect(count[0]).to.equal(4);
    expect(count[1]).to.equal(4);
    expect(count[2]).to.equal(2);
    expect(count[3]).to.equal(1);
    expect(count[4]).to.equal(3);
    expect(count[5]).to.equal(2);
    expect(count[6]).to.equal(2);
  });
});

describe("Count Neighbourhood dblchk", function() {
  it("counts the number of cells alive in the Moore neighbourhood", function() {
    var count = [];
    lifeAtRowCol[0][0] = false;
    lifeAtRowCol[0][2] = false;
    lifeAtRowCol[3][4] = false;
    lifeAtRowCol[4][3] = false;
    lifeAtRowCol[4][4] = false;
    lifeAtRowCol[1][1] = true; // This looks like:
    lifeAtRowCol[1][2] = true; // -----
    lifeAtRowCol[1][3] = true; // -OOO-
    lifeAtRowCol[2][1] = true; // -OOO-
    lifeAtRowCol[2][2] = true; // -OOO-
    lifeAtRowCol[2][3] = true; // -----
    lifeAtRowCol[3][1] = true;
    lifeAtRowCol[3][2] = true;
    lifeAtRowCol[3][3] = true;
    count[0] = conway.countNeighbourhood(lifeAtRowCol, 0, 0);
    count[1] = conway.countNeighbourhood(lifeAtRowCol, 0, 1);
    count[2] = conway.countNeighbourhood(lifeAtRowCol, 0, 2);
    count[3] = conway.countNeighbourhood(lifeAtRowCol, 0, 3);
    count[4] = conway.countNeighbourhood(lifeAtRowCol, 0, 4);
    count[5] = conway.countNeighbourhood(lifeAtRowCol, 1, 0);
    count[6] = conway.countNeighbourhood(lifeAtRowCol, 1, 1);
    count[7] = conway.countNeighbourhood(lifeAtRowCol, 1, 2);
    count[8] = conway.countNeighbourhood(lifeAtRowCol, 1, 3);
    count[9] = conway.countNeighbourhood(lifeAtRowCol, 1, 4);
    count[10] = conway.countNeighbourhood(lifeAtRowCol, 2, 0);
    count[11] = conway.countNeighbourhood(lifeAtRowCol, 2, 1);
    count[12] = conway.countNeighbourhood(lifeAtRowCol, 2, 2);
    count[13] = conway.countNeighbourhood(lifeAtRowCol, 2, 3);
    count[14] = conway.countNeighbourhood(lifeAtRowCol, 2, 4);
    count[15] = conway.countNeighbourhood(lifeAtRowCol, 3, 0);
    count[16] = conway.countNeighbourhood(lifeAtRowCol, 3, 1);
    expect(count[0]).to.equal(1);
    expect(count[1]).to.equal(2);
    expect(count[2]).to.equal(3);
    expect(count[3]).to.equal(2);
    expect(count[4]).to.equal(1);
    expect(count[5]).to.equal(2);
    expect(count[6]).to.equal(3);
    expect(count[7]).to.equal(5);
    expect(count[8]).to.equal(3);
    expect(count[9]).to.equal(2);
    expect(count[10]).to.equal(3);
    expect(count[11]).to.equal(5);
    expect(count[12]).to.equal(8);
    expect(count[13]).to.equal(5);
    expect(count[14]).to.equal(3);
    expect(count[15]).to.equal(2);
    expect(count[16]).to.equal(3);
  });
});
