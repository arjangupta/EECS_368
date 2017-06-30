var Circle = function(a,b,r,ad,bd,col) {
    var x = a;
    var y = b;
    var xd = ad;
    var yd = bd;
	var g = 1;
	var dissipate = 0.8;

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
	//yd += g;
	if (y < 0) { y = 0; yd = -yd};
	if (y > sz) { y = sz; yd = -yd; }; //dissipate *= dissipate };
    }
};

var jayhawks = ["#0022B4","#E8000D","#FFC82D"];

var Things = function(sz,count) {
		var shapes = []; // new Array();
		var that = this;
		for (var k = 0;k < count;k++) {
			shapes[k] = new Circle(Math.random() * sz,
					   Math.random() * sz,10,
					   40 * (Math.random() - 0.5), 
					   40 * (Math.random() - 0.5), 
					   jayhawks[Math.floor(Math.random() * jayhawks.length)]);
		}

		this.step = function(gc) {
		for (var k = 0;k < count;k++) {
			shapes[k].move(sz);
		}
		gc.clearRect (0,0,sz,sz);
		for (var k = 0;k < count;k++) {
			shapes[k].draw(gc);
		}
		return { refresh: function() { return that.step(gc); } }
		}
};

main = function ()
{
    var sz = 500;
    var uni = new Things(sz,10);
    var gc = chalk.canvas(sz,sz);
    return uni.step(gc);
}