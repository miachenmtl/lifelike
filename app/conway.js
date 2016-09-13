var lifeAtRowCol = [];
for (i = 0; i < 37; i++) {
  lifeAtRowCol[i] = [];
  for (j = 0; j < 60; j++) {
    lifeAtRowCol[i][j] = false;
  }
}

exports.isOnCell = function(x, y) { //returns row and column number user clicks on, or -1, -1 if user clicks on gridline
  var rcCoords = [-1, -1] //row and column numbers to be returned
  if (x % 10 == 0 || y % 10 == 0) {
    return (rcCoords);
  }
  else {
    rcCoords[0] = (y - (y % 10))/10;
    rcCoords[1] = (x - (x % 10))/10;
    return (rcCoords);
  }
};

exports.giveCellLife = function(lifeAtRowCol, i, j) {
  var cellX, cellY;
  lifeAtRowCol[i][j] = true;
  cellX = 10 * j + 1;
  cellY = 10 * i + 1;
  /*var canvas = document.getElementById("fieldOfLife");
  var c = canvas.getContext("2d");
  c.fillStyle = "#00FF00";
  c.fillRect(cellX, cellY, 9, 9);*/
  return lifeAtRowCol;
}

exports.killCell = function(lifeAtRowCol, i, j) {
  var cellX, cellY;
  lifeAtRowCol[i][j] = false;
  cellX = 10 * j + 1;
  cellY = 10 * i + 1;
  /*var canvas = document.getElementById("fieldOfLife");
  var c = canvas.getContext("2d");
  c.fillStyle = "#FFFFFF";
  c.fillRect(cellX, cellY, 9, 9);*/
  return lifeAtRowCol;
}
