function drawGridLines() {
  console.log("I want to draw grid lines");
  var canvas = document.getElementById("fieldOfLife");
  var c = canvas.getContext("2d");
  c.lineWidth = 1;
  c.strokeStyle="#0000FF";
  for (i = 0.5; i < 601; i += 6) {
    c.moveTo(i,0);
    c.lineTo(i,373);
    c.stroke();
  }
  for (j = 0.5; j < 373; j += 6) {
    c.moveTo(0,j);
    c.lineTo(601,j);
    c.stroke();
  }
//  c.moveTo(0,0);
  //c.lineTo(601,0);
  //c.stroke();
}
