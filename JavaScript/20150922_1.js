function Speed(i){
	this.mph = i;
	var cost = i*i;
	
	this.inc = function(delta){
		this.mph += delta;
		cost = this.mph * this.mph;
	}
	
	//	this.toString() = function() {...}
	
	return this; //automatically included
}

function Slowness(i){
	
}

main = function(){
	var o = new Speed(7345);
	console.log(o);
	o.inc(99);
	console.log(o);
}