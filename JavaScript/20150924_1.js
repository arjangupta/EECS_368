main = function () {
	chalk.println("Hello");
	chalk.println("=> " + (bar)(bar(add1)) (91));
};

function add1(a){return a+1;}

function foo(f,a){
	console.log(f);
	return f(a);
}

function bar(f){
	return function(a){
		return f(a);
	}
}

function fac(n,k){
	if(n == 0){
		return k(1);
	}
	return fac(n-1, function(r) {return k(r*n); })
}