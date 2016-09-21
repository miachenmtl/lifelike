var i;
var j;
var lifeAtRowCol = [];
for (i = 0; i < 37; i++) {
  lifeAtRowCol[i] = [];
  for (j = 0; j < 60; j++) {
    lifeAtRowCol[i][j] = false;
  }
}

var logic = {
  /** Counts number of cells alive in Moore neighborhood of ith/jth cell
  * @param {array} lifeAtRowCol The field of cells
  * @param {int} i The row number
  * @param {int} j The column number
  * @return {int} count The number of neighboring live cells
  */
  countNeighborhood: function(lifeAtRowCol, i, j) {
    var count = 0;
    var m;
    var n;
    for (m = -1; m <= 1; m++) {
      for (n = -1; n <= 1; n++) {
        if (this.isValidNeighbor(i, j, i + m, j + n) && lifeAtRowCol[i + m][j + n]) {
          count++;
        }
      }
    }
    return count;
  },
  /** Checks if the adjacent cell in question is in the field or not, or if it's the same as the cell
    * @param {int} i The row number of the cell
    * @param {int} j The column number of the cell
    * @param {int} k The row number of the neighbour cell
    * @param {int} l The cell number of the neighbout cell
    * @return {boolean} result True if valid, false if invalid
    */
  isValidNeighbor: function(i, j, k, l) {
    if (k < 0 || k >= 37) { // is the row valid?
      return false;
    } else if (l < 0 || l >= 60) { // is the column valid?
      return false;
    } else if (i === k && j === l) { // is it the cell itself?
      return false;
    }
    return true;
  },
  /** Replaces current array of booleans with next generation's array
    * Also calls functions to update the UI
    * @param {array} lifeAtRowCol The current array of booleans
    * @param {array} nextGenState The next generation
    */
  populateNextGen: function(lifeAtRowCol, nextGenState) {
    for (i = 0; i < 37; i++) { // populate next generation
      for (j = 0; j < 60; j++) {
        if (nextGenState[i][j]) {
          lifeAtRowCol[i][j] = true;
          giveCellLife(i, j);
        } else {
          lifeAtRowCol[i][j] = false;
          killCell(i, j);
        }
      }
    }
  }
};

// So that the file can be tested and run in the browser
if ((typeof module !== "undefined") && (typeof module.exports !== "undefined")) {
  module.exports = logic;
}
