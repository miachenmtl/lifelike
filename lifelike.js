var lifeAtRowCol = [];
for (i = 0; i < 37; i++) {
  lifeAtRowCol[i] = [];
  for (j = 0; j < 60; j++) {
    lifeAtRowCol[i][j] = false;
  }
}
var intervalID;

function drawGridLines() {
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
  var r, c; //row and column of cell clicked on, canvas xy coords of top left cell
  var rcCoords = isOnCell(xyCoords[0], xyCoords[1]);
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
  //document.getElementById("xy").innerHTML = "Coordinates: " + x + ", " + y;
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

function killEverything(lifeAtRowCol) {
  for (i = 0; i < 37; i++) {
    for (j = 0; j < 60; j++) {
      killCell(lifeAtRowCol, i, j);
    }
  }
}


function countNeighbourhood(lifeAtRowCol, i, j) {
  var count = 0;
  if (i - 1 >= 0 && j - 1 >= 0) {
    if (lifeAtRowCol[i - 1][j - 1]) {
      count++;
    }
  }
  if (i - 1 >= 0) {
    if (lifeAtRowCol[i - 1][j]) {
      count++;
    }
  }
  if (i - 1 >= 0 && j + 1 < 60) {
    if (lifeAtRowCol[i - 1][j + 1]) {
      count++;
    }
  }
  if (j - 1 >= 0) {
    if (lifeAtRowCol[i][j - 1]) {
      count++;
    }
  }
  if (j + 1 < 60) {
    if (lifeAtRowCol[i][j + 1]) {
      count++;
    }
  }
  if (i + 1 < 37 && j - 1 >= 0) {
    if (lifeAtRowCol[i + 1][j - 1]) {
      count++;
    }
  }
  if (i + 1 < 37) {
    if (lifeAtRowCol[i + 1][j]) {
      count++;
    }
  }
  if (i + 1 < 37 && j + 1 < 60) {
    if (lifeAtRowCol[i + 1][j + 1]) {
      count++;
    }
  }
  return count;
}

function populateNextGen(lifeAtRowCol, nextGenState) {
  for (i = 0; i < 37; i++) { //populate next generation
    for (j = 0; j < 60; j++) {
      if (nextGenState[i][j]) {
        giveCellLife(lifeAtRowCol, i, j);
      }
      else {
        killCell(lifeAtRowCol, i, j);
      }
    }
  }
}

function runOrStop(lifeAtRowCol) {
  var text = document.getElementById("runStop").value;
  if (text == "Run") {
    intervalID = window.setInterval(function() {iterateNextGen(lifeAtRowCol);}, 500);
    document.getElementById("runStop").value = "Stop";
    console.log("Run");
  }
  else {
    window.clearInterval(intervalID);
    document.getElementById("runStop").value = "Run";
    console.log("Stop");
  }
}

function iterateNextGen(lifeAtRowCol) {
  var nextGenState = [];
  for (i = 0; i < 37; i++) {
    nextGenState[i] = [];
    for (j = 0; j < 60; j++) {
      nextGenState[i][j] = false;
    }
  }
  var count;
  var birthRuleset = [false, false, false, true, false, false, false, false, false];
  var surviveRuleset = [false, false, true, true, false, false, false, false, false];
  console.log("iterating next generation");
  for (i = 0; i < 37; i++) {
    for (j = 0; j < 60; j++) {
      count = countNeighbourhood(lifeAtRowCol, i, j);
      if (lifeAtRowCol[i][j]) { //implement survive ruleset
        if (surviveRuleset[count]) {
          nextGenState[i][j] = true;
        }
        else {
          nextGenState[i][j] = false;
        }
      }
      else { //implement birth ruleset
        if (birthRuleset[count]) {
          nextGenState[i][j] = true;
        }
        else {
          nextGenState[i][j] = false;
        }
      }
    }
  }
  populateNextGen(lifeAtRowCol, nextGenState);
}
