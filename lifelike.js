var lifeAtRowCol = [];
for (i = 0; i < 37; i++) {
  lifeAtRowCol[i] = [];
  for (j = 0; j < 60; j++) {
    lifeAtRowCol[i][j] = false;
  }
}

function drawGridLines() {
  console.log("I want to draw grid lines");
  var canvas = document.getElementById("fieldOfLife");
  var c = canvas.getContext("2d");
  c.lineWidth = 1;
  c.strokeStyle = "#8888FF";
  for (i = 0.5; i < 601; i += 10) { //Add .5 to avoid antialiasing
    c.moveTo(i,0);
    c.lineTo(i,371);
    c.stroke();
  }
  for (j = 0.5; j < 373; j += 10) { //Add .5 to avoid antialiasing
    c.moveTo(0,j);
    c.lineTo(601,j);
    c.stroke();
  }
};

function processClickOnCanvas(lifeAtRowCol, event) {
  var xyCoords = getCanvasCoordinates(event); //converts coords relative to window to coords rel to canvas
  var r, c, cellX, cellY; //row and column of cell clicked on, canvas xy coords of top left cell
  var rcCoords = isOnCell(xyCoords);
  console.log("The user clicked on " + xyCoords[0] + ", " + xyCoords[1]);
  console.log("Row and column are: " + rcCoords);
  if (rcCoords[0] == -1 && rcCoords[1] == -1) { //JS does not like to compare arrays!
    console.log("User clicked on gridline.")
    return;
  }
  else {
    var r = rcCoords[0];
    var c = rcCoords[1];
    if (lifeAtRowCol[r][c]) {
      killCell(lifeAtRowCol, r, c);
    }
    else {
      giveCellLife(lifeAtRowCol, r, c);
    }
  }
};

function isOnCell(x, y) { //returns row and column number user clicks on, or [-1, -1] if user clicks on gridline
  var rcCoords = [0, 0] //row and column numbers to be returned
  if (x % 10 == 0 || y % 10 == 0) {
    rcCoords = [-1, -1];
    return (rcCoords);
  }
  else {
    rcCoords[0] = (y - (y % 10))/10;
    rcCoords[1] = (x - (x % 10))/10;
    return (rcCoords);
  }
};

function getCanvasCoordinates(event) { //converts window xy coords to canvas xy coords
  canvas = document.getElementById("fieldOfLife");
  rect = canvas.getBoundingClientRect();
  var x = parseInt(event.clientX - rect.left) - 2;
  var y = parseInt(event.clientY - rect.top) - 2;
  document.getElementById("xy").innerHTML = "Coordinates: " + x + ", " + y;
  return [x, y];
}

function giveCellLife(lifeAtRowCol, i, j) {
  var cellX, cellY;
  lifeAtRowCol[i][j] = true;
  cellX = 10 * j + 1;
  cellY = 10 * i + 1;
  var canvas = document.getElementById("fieldOfLife");
  var c = canvas.getContext("2d");
  c.fillStyle = "#00FF00";
  c.fillRect(cellX, cellY, 9, 9);
  return lifeAtRowCol;
}

function killCell(lifeAtRowCol, i, j) {
  var cellX, cellY;
  lifeAtRowCol[i][j] = false;
  cellX = 10 * j + 1;
  cellY = 10 * i + 1;
  var canvas = document.getElementById("fieldOfLife");
  var c = canvas.getContext("2d");
  c.fillStyle = "#FFFFFF";
  c.fillRect(cellX, cellY, 9, 9);
  return lifeAtRowCol;
}
