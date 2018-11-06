var table;
var internets = [];

var chinainternet = function(n, r, pro, r6, r5) {

  this.number = n;
  this.rank = r;
  this.province = pro;
  this.rate2016 = r6;
  this.rate2015 = r5;

  this.numberX = map(this.number, 0, 8500, 0, 80);
  this.number2016 = map(this.rate2016, 0, 1, 0, 150);
  this.number2015 = map(this.rate2015, 0, 1, 0, 150);

  this.drawNumber = function() {

    noStroke();
    fill(0, 80);

    var numberColor = map(this.number, 0, 8500, 120, 0);
    fill(250, numberColor, 80, 80);

    //circle
    var radius = map(mouseY, -500, 500, 5, 10);
    strokeWeight(0.2);
    stroke(numberColor, 90, 200);
    ellipse(-280, this.rank * 20, 2);
    ellipse(-280, this.rank * 20, this.numberX * radius / 5);
    
    //background line & circle
    strokeWeight(0.2);
    stroke(180);
    line(-380, this.rank * 20, 380, this.rank * 20);

    noFill();
    stroke(numberColor, 90, 200);
    strokeWeight(0.5);
    ellipse(-380, this.rank * 20, 2);
    ellipse(380, this.rank * 20, 2);

    stroke(numberColor, 90, 200, 100);

    //2016
    strokeWeight(radius * 0.7);
    line(60, this.rank * 20, this.number2016 + 60, this.rank * 20);

    //2015
    strokeWeight(radius * 0.7);
    line(-60, this.rank * 20, -1 * this.number2015 - 60, this.rank * 20);

    noStroke();
    textAlign(CENTER);
    textSize(9);
    fill(100, 100, 120, 99);

    text(this.province, 0, this.rank * 20 + 4);
    text(this.rate2016, 220, this.rank * 20 + 4);
    text(this.rate2015, -150, this.rank * 20 + 4);
    text(this.number, -400, this.rank * 20 + 4);
    text(this.rank, 400, this.rank * 20 + 4);
  }

}

function preload() {
  table = loadTable("assets/chinanet.csv", "csv", "header");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  noLoop();

  var rows = table.getRows()
  for (var i = 0; i < rows.length; i++) {
    var province = rows[i].getString("province");
    var number = rows[i].getNum("number");
    var rate2016 = rows[i].getNum("rate2016");
    var rate2015 = rows[i].getNum("rate2015");
    var rank = rows[i].getNum("rank");

    var this_chinanet = new chinainternet(number, rank, province, rate2016, rate2015);
    internets.push(this_chinanet);
  }

}

function draw() {


  fill(122, 122, 122, 50);
  background(200);

  translate(width / 2, height / 2 - 320);
  ellipseMode(CENTER);

  textAlign(CENTER);
  textSize(10);
  fill(140, 120, 160);
  textFont('Alegreya');
  textStyle(ITALIC);
  textStyle(BOLD);

  text('PROVINCE', 0, 660);
  text('INCREASING RATE', 98, 660);
  text('2016', 68, 670);
  text('INCREASING RATE', -98, 660);
  text('2015', -70, 670);
  text('INTERNET CITIZENS', -365, 660);
  text('2017(thousands)', -378, 670);

  textSize(20);

  text('INTERNET DEVELOPMENT IN CHINA ', 0, -20);

  for (var i in internets) {
    internets[i].drawNumber();
  }

}


function mouseMoved() {
  redraw()
  return false
}
