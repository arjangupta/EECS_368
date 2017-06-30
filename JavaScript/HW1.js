/*
 * Author: Arjan Gupta
 * KU-ID: 2765670
 * Course: EECS 368
 * Homework #1
 */

stars = function(n){
	//chalk.print("Input a size: ");
	//return {entrybox: function(str)
		//{
			//n = parseInt(str);
	if(n < 4){
		chalk.hr();
		chalk.println("Please enter a number larger than or equal to 4");
		chalk.hr();
		return main(n);
	} else if (n > 20){
		chalk.println("Please enter a number smaller than or equal to 20");
		return main(n);
	} else {
		chalk.hr();
		chalk.println("Printing stars!");
		chalk.newline();
		for(i = 0; i < n; i++){
			for( j = 0; j < n; j++){
				chalk.print("* ");
				if(j == n-1){
					chalk.newline();
				}
			}
		}
		chalk.hr()
		return main(n)
	}
}

main = function(m){
	chalk.print("Input a size: ");
	var p1 = chalk.entrybox();
	p1.then(function(str){ 
		m = parseInt(str); 
		stars(m);
	});
}