var Circle = function(a,b,r,ad,bd,col) {
    var x = a;
    var y = b;
    var xd = ad;
    var yd = bd;

    this.toString = function() {
	return "Circle { x = " + x + ", y = " + y + ", r = " + r + "}";
    }

    this.draw = function(gc)  {
	gc.beginPath();
	gc.arc(x,y,r, 0, 2 * Math.PI, false);
	gc.fillStyle = col;
	gc.fill();
    }
    this.move = function(sz) {
	x += xd;
	if (x < 0) { x = 0; xd = -xd };
	if (x > sz) { x = sz; xd = -xd };
	y += yd;
	if (y < 0) { y = 0; yd = -yd };
	if (y > sz) { y = sz; yd = -yd };
    }
};

var jayhawks = ["#0022B4","#E8000D","#FFC82D"];

var Things = function(sz,count) {
    var shapes = []; // new Array();
    var that = this;
    for (var k = 0;k < count;k++) {
	shapes[k] = new Circle(Math.random() * sz,
			       Math.random() * sz,10,
			       10 * (Math.random() - 0.5), 
			       10 * (Math.random() - 0.5), 
			       jayhawks[Math.floor(Math.random() * jayhawks.length)]);
    }

    this.step = function(gc) {
		if(count != shapes.length){
			for (var k = 0;k < shapes.length;k++) {
			shapes[k].draw(gc);
			}
		}
	
		for (var k = 0;k < shapes.length;k++) {
			shapes[k].move(sz);
		}
		
		gc.clearRect (0,0,sz,sz);
		
		for (var k = 0;k < shapes.length;k++) {
			shapes[k].draw(gc);
		}
			chalk.delay(20).then(function (){ that.step(gc); });
		}

    this.addThing = function(x,y) {
        shapes.push(new Circle(x,y,10,
		       10 * (Math.random() - 0.5), 
		       10 * (Math.random() - 0.5), 
           jayhawks[Math.floor(Math.random() * jayhawks.length)]));
    }
};

main = function()
{
        chalk.println("X?");
        var pX = chalk.entrybox();
        
        chalk.println("Y?");
        var pY = chalk.entrybox();
        
        var sz = 200;
        var uni = new Things(sz,2);
        var gc = chalk.canvas(sz,sz);
        uni.step(gc);
        
        Promise.all([pX,pY]).then(function (arr) {
                var x = arr[0];
                var y = arr[1];
                uni.addThing(parseInt(x),parseInt(y));
        });

}