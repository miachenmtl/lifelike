var intervalID;
var i;
var j;
var lifeAtRowCol = [];
for (i = 0; i < 37; i++) {
  lifeAtRowCol[i] = [];
  for (j = 0; j < 60; j++) {
    lifeAtRowCol[i][j] = false;
  }
}

/**
  * When user loads the page, it draws grid lines on the canvaw
  */
function drawGridLines() {
  var canvas = document.getElementById("fieldOfLife");
  var c = canvas.getContext("2d");
  c.lineWidth = 1;
  c.strokeStyle = "#8888FF";
  for (i = 0.5; i < 601; i += 10) { // Add .5 to avoid antialiasing
    c.moveTo(i, 0);
    c.lineTo(i, 371);
    c.stroke();
  }
  for (j = 0.5; j < 373; j += 10) { // Add .5 to avoid antialiasing
    c.moveTo(0, j);
    c.lineTo(601, j);
    c.stroke();
  }
}

/** Figures out whether to toggle a cell or do nothing when user clicks on canvas.
  * @param {object} lifeAtRowCol The array of booleans indicating life.
  * @param {object} event The Mouse Event
  */
function processClickOnCanvas(lifeAtRowCol, event) {
  var xyCoords = getCanvasCoordinates(event); // converts coords relative to window to coords rel to canvas
  var r;
  var c; // row and column of cell clicked on, canvas xy coords of top left cell
  var rcCoords = isOnCell(xyCoords[0], xyCoords[1]);
  console.log("The user clicked on " + xyCoords[0] + ", " + xyCoords[1]);
  console.log("Row and column are: " + rcCoords);
  if (rcCoords[0] === -1 && rcCoords[1] === -1) { // JS does not like to compare arrays!
    console.log("User clicked on gridline.");
    return;
  }
  r = rcCoords[0];
  c = rcCoords[1];
  if (lifeAtRowCol[r][c]) {
    lifeAtRowCol[r][c] = false;
    killCell(lifeAtRowCol, r, c);
  } else {
    lifeAtRowCol[r][c] = true;
    giveCellLife(r, c);
  }
}

/** Determines whether click is on a cell or not
  * @param {int} x x coordinate of click relative to canvas
  * @param {int} y y coordinate of click relative to canvas
  * @return {array} row and column number
  */
function isOnCell(x, y) { // returns row and column number user clicks on, or [-1, -1] if user clicks on gridline
  var rcCoords = [0, 0]; // row and column numbers to be returned
  if (x % 10 === 0 || y % 10 === 0) {
    rcCoords = [-1, -1];
    return (rcCoords);
  }
  rcCoords[0] = (y - (y % 10)) / 10;
  rcCoords[1] = (x - (x % 10)) / 10;
  return (rcCoords);
}

/** Takes coordinates relative to window,returns coordinates relative to canvas
  * @param {object} event The Mouse Event object
  * @return {array} x and y coordinates relative to canvas
  */
function getCanvasCoordinates(event) { // converts window xy coords to canvas xy coords
  var canvas = document.getElementById("fieldOfLife");
  var rect = canvas.getBoundingClientRect();
  var x = parseInt(event.clientX - rect.left, 10) - 2;
  var y = parseInt(event.clientY - rect.top, 10) - 2;
  return [x, y];
}

/**
  * Makes a cell alive in the UI
  * @param {int} i The row number
  * @param {int} j The column number
  */
function giveCellLife(i, j) {
  var cellX;
  var cellY;
  cellX = 10 * j + 1;
  cellY = 10 * i + 1;
  var canvas = document.getElementById("fieldOfLife");
  var c = canvas.getContext("2d");
  c.fillStyle = "#00FF00";
  c.fillRect(cellX, cellY, 9, 9);
}

/**
  * Makes a cell dead in the UI
  * @param {int} i The row number
  * @param {int} j The column number
  */
function killCell(i, j) {
  var cellX;
  var cellY;
  cellX = 10 * j + 1;
  cellY = 10 * i + 1;
  var canvas = document.getElementById("fieldOfLife");
  var c = canvas.getContext("2d");
  c.fillStyle = "#FFFFFF";
  c.fillRect(cellX, cellY, 9, 9);
}

/** Triggered by Reset, clears all cells
  * @param {array} lifeAtRowCol The field of cells
  */
function killEverything(lifeAtRowCol) {
  for (i = 0; i < 37; i++) {
    for (j = 0; j < 60; j++) {
      lifeAtRowCol[i][j] = false;
      killCell(i, j);
    }
  }
}


function runOrStop(lifeAtRowCol) {
  var text = document.getElementById("runStop").value;
  if (text === "Run") {
    intervalID = window.setInterval(function() {
      iterateNextGen(lifeAtRowCol);
    }, 500);
    document.getElementById("runStop").value = "Stop";
    console.log("Run");
  } else {
    window.clearInterval(intervalID);
    document.getElementById("runStop").value = "Run";
    console.log("Stop");
  }
}

function getBirthRuleset() {
  var birthRuleset = [];
  birthRuleset[0] = document.getElementById("B0").checked;
  birthRuleset[1] = document.getElementById("B1").checked;
  birthRuleset[2] = document.getElementById("B2").checked;
  birthRuleset[3] = document.getElementById("B3").checked;
  birthRuleset[4] = document.getElementById("B4").checked;
  birthRuleset[5] = document.getElementById("B5").checked;
  birthRuleset[6] = document.getElementById("B6").checked;
  birthRuleset[7] = document.getElementById("B7").checked;
  birthRuleset[8] = document.getElementById("B8").checked;
  return birthRuleset;
}

function getSurviveRuleset() {
  var surviveRuleset = [];
  surviveRuleset[0] = document.getElementById("S0").checked;
  surviveRuleset[1] = document.getElementById("S1").checked;
  surviveRuleset[2] = document.getElementById("S2").checked;
  surviveRuleset[3] = document.getElementById("S3").checked;
  surviveRuleset[4] = document.getElementById("S4").checked;
  surviveRuleset[5] = document.getElementById("S5").checked;
  surviveRuleset[6] = document.getElementById("S6").checked;
  surviveRuleset[7] = document.getElementById("S7").checked;
  surviveRuleset[8] = document.getElementById("S8").checked;
  return surviveRuleset;
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
  var birthRuleset = getBirthRuleset();
  var surviveRuleset = getSurviveRuleset();
  console.log("iterating next generation");
  for (i = 0; i < 37; i++) {
    for (j = 0; j < 60; j++) {
      count = logic.countNeighborhood(lifeAtRowCol, i, j);
      if (lifeAtRowCol[i][j] && surviveRuleset[count]) { // cell is alive, check survive ruleset
        nextGenState[i][j] = true;
      } else if (lifeAtRowCol[i][j] === false && birthRuleset[count]) { // cell is dead, check birth ruleset
        nextGenState[i][j] = true;
      } else {
        nextGenState[i][j] = false;
      }
    }
  }
  logic.populateNextGen(lifeAtRowCol, nextGenState);
}
