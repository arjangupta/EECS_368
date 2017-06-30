/* HOMEWORK #2
 * Course: EECS 368
 * Filename: things-class.js
 * Author: Arjan Gupta
 * KU-ID: 2765670
 * Last Edit: 10/14/2015
 */

var Circle = function(a,b,r,ad,bd,col) {
    var x = a; //x axis position
    var y = b; //y axis position
    var xd = ad; //x direction speed
    var yd = bd; //y direction speed
	var dissipate = 0.8; //energy dissipation factor
	
	//shows Circle properties
    this.toString = function() {
		return "Circle { x = " + x + ", y = " + y + ", r = " + r + "}";
    }
	//handles drawing the balls
    this.draw = function(gc){
		gc.beginPath();
		gc.arc(x,y,r, 0, 2 * Math.PI, false);
		gc.fillStyle = col;
		gc.fill();
    }
	//handles moving the balls
    this.move = function(sz, g){
		//X COORDINATE
		x += xd;
		if (x < 10){ 
			x = 10; 
			xd = -(xd*0.1); 
		}
		if (x > sz+200-10){ 
			x = sz+200-10; 
			xd = -(xd*0.1); 
		}
		//Y COORDINATE
		y += yd; //change in position
		yd += g; //change in speed i.e. acceleration due to gravity
		if (y <= 10) { 
			y = 10;
			if(yd < 0){ //only reverse the speed if it is upward
				yd = -(yd*dissipate);
				dissipate *= dissipate;
			}
		}
		if (y >= sz-10) { 
			y = sz-10; 
			yd = -(yd*dissipate); //energy lost during bouncing
			dissipate *= dissipate;
		}
    }
};

var jayhawks = ["#0022B4","#E8000D","#FFC82D"];

var Things = function(sz,count,g) {
    var shapes = []; // new Array();
	var shapesYSpd = [];
    var that = this;
	var timeDelay = 50; //the time after which the screen will be updated
    for (var k = 0;k < count;k++) {
		shapes[k] = new Circle(Math.random() * (sz+200-10),
			       Math.random() * (sz-10),10,
			       10 * (Math.random() - 0.5), 
			       10 * (Math.random() - 0.5), 
			       jayhawks[Math.floor(Math.random() * jayhawks.length)]);		
    }
	
    this.step = function(gc) {
		//move the balls
		for (var k = 0;k < shapes.length;k++) {
			shapes[k].move(sz, g);
		}
		//clear the screen on the page.
		gc.clearRect(0,0,sz+200,sz);
		//re-draw the balls
		for (var k = 0;k < shapes.length;k++) {
			shapes[k].draw(gc);
		}
		//wait for timeDelay ms and call step again to repeat the steps
		chalk.delay(timeDelay).then(function (){ that.step(gc); });
    }

	//adds a Thing
    this.addThing = function(x,y) {
        shapes.push(new Circle(x,y,10,
		       10 * (Math.random() - 0.5), 
		       10 * (Math.random() - 0.5), 
           jayhawks[Math.floor(Math.random() * jayhawks.length)]));
    }
};

main = function(){
	//USER INTERACTIONS
	chalk.println("How many balls would you like?");
	var p1 = chalk.entrybox(); //promise 1
	chalk.println("Set a size (n) for the window of the balls: (n x n window, keep n > 100)");
	var p2 = chalk.entrybox(); //promise 2
	chalk.println("Please set the value of acceleration due to gravity:");
	var p3 = chalk.entrybox(); //promise 3
	//IF ALL PROMISES FULFILLED
	Promise.all([p1,p2,p3]).then(function (arr) {
			var x = arr[0]; //number of balls
			var y = arr[1]; //size of screen
			var z = arr[2]; //gravity
			var sz = parseInt(y); //turn string to number
			var uni = new Things(sz,parseInt(x),parseInt(z)); //send information to Things function
			var gc = chalk.canvas(sz+200,sz); //draw the space for the Things
			uni.step(gc); //Start the action!
	});
}