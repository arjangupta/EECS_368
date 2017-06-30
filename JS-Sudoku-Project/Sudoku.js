/* SUDOKU SOLVER (Final Project)
 * Course: EECS 368
 * File name: Sudoku.js
 * Author: Arjan Gupta
 * KU-ID: 2765670
 * Last Edit: 10/12/2015 
 */

pzzl = function(n){
	/* This function shows:
	* 1. Example puzzles
	* 2. Varying levels of difficulty of these puzzles
	* 3. The web-page source of these functions
	* Note: The web-page source given includes the unique solution
	*		for each of these example puzzles.
	*/
	var arr = []; //declare an array to store these example puzzles
	//Easy puzzle
	//http://www.sudokusnake.com/dailies/Easy_10_17_09.pdf
	arr[0] = [[3,0,1,0,4,7,0,0,5],
			  [0,0,0,3,0,5,0,4,0],
			  [4,0,0,0,0,2,7,0,0],
			  [0,4,0,7,0,9,2,3,8],
			  [8,0,0,0,5,0,0,0,4],
			  [2,1,7,4,0,8,0,5,0],
			  [0,0,8,5,0,0,0,0,2],
			  [0,3,0,9,0,4,0,0,0],
			  [5,0,0,8,2,0,3,0,7]];
	//'Fiendish' puzzle (Challenging for humans)
	//http://www.sudokusnake.com/dailies/Fiendish_10_17_09.pdf
	arr[1] = [[0,0,9,0,0,3,4,0,0],
			  [0,0,0,6,0,0,1,3,0],
			  [3,0,0,0,4,0,0,5,2],
			  [0,2,0,4,0,0,0,0,5],
			  [0,0,5,0,1,0,8,0,0],
			  [1,0,0,0,0,9,0,2,0],
			  [2,7,0,0,6,0,0,0,4],
			  [0,6,4,0,0,5,0,0,0],
			  [0,0,1,8,0,0,2,0,0]];
	//'Serpentine' puzzle (Very challenging or humans)
	//http://www.sudokusnake.com/dailies/Serpentine_10_17_09.pdf
	arr[2] = [[3,0,0,1,0,9,5,0,2],
			  [0,6,0,0,0,0,0,0,0],
			  [2,0,5,0,4,3,0,0,0],
			  [0,0,2,0,0,4,0,0,3],
			  [0,4,0,0,7,0,0,6,0],
			  [6,0,0,2,0,0,8,0,0],
			  [0,0,0,4,9,0,3,0,6],
			  [0,0,0,0,0,0,0,5,0],
			  [4,0,1,3,0,6,0,0,7]];
	//Ludicrous puzzle (Extremely challenging for humans)
	//http://www.sudokusnake.com/dailies/Ludicrous_10_09.pdf
	arr[3] = [[0,0,0,0,3,0,0,9,0],
			  [0,0,7,5,0,4,0,0,2],
			  [5,0,0,0,0,8,1,0,0],
			  [1,0,0,3,0,0,4,0,0],
			  [0,4,0,0,0,0,0,2,0],
			  [0,0,5,0,0,9,0,0,7],
			  [0,0,3,2,0,0,0,0,6],
			  [8,0,0,4,0,6,3,0,0],
			  [0,5,0,0,9,0,0,0,0]];
	//return the chosen puzzle		  
	return arr[n];
} 
 
main = function(){
	var sdku = pzzl(0); //set the input sudoku by changing argument of pzzl
	//print introductions to the screen
	chalk.println("Welcome to Arjan's JS Sudoku Solver.");
	chalk.println("The sudoku to be solved is shown as below:");
	printpuzzle(sdku); //print the puzzle
	chalk.println("Now solving the given sudoku..."); chalk.hr();
	//call the solving function
	solve(sdku);
	//display the solved sudoku
	chalk.println("The solved sudoku is shown below:");
	printpuzzle(sdku); //print the solution
}

solve = function(sdku){
	/*THE USER IS SUGGESTED TO OPEN THE CONSOLE IN THEIR WEB BROWSER
	 *AS THIS FUNCTION RUNS TO SEE THE WORK IT IS PERFORMING. */
	 //call function to populate an array of coordinates for the empty spots
	var zeros = zerospos(sdku); 
	console.log("Length of zeros array is " + zeros.length); //console message
	var visit = [];
	var a = 0; var b = 1;
	while(a < zeros.length){
		console.log("Currently at: " + zeros[a]); //console message
		while(b <= 9){
			if(safe(sdku,zeros[a][0],zeros[a][1],b)){
				sdku[zeros[a][0]][zeros[a][1]] = b;
				visit.push(b);
				console.log("Pushed values are: " + visit); //console message
				b = 0;
				break;
			//BACKTRACKING
			}else if(b==9){
			//keep retracing your steps until you reach a value less than 9
				while(b==9){
					a--;
					sdku[zeros[a][0]][zeros[a][1]]=0;
					b = visit.pop();
				}
				console.log("*Pushed values are: " + visit); //console message
			}
			b++;
		}
		a++;
	}
	console.log("Exited main loop"); //console message
}

safe = function(sdku,i,j,v){
/* This function checks if it is safe to place a given value (v) in
 * the given coordinates (i,j) of the given sudoku (sdku).
 * NOTE: (i,j) correspond to (row,column). */
	var colsafe = function(sdku,j,v){ //check if column is safe
		for(var i=0; i<9; i++){
			if(sdku[i][j] == v){
				return false; //value collision found
			}
		}
		return true; //no collision found
	}
	var rowsafe = function(sdku,i,v){ //check if row is safe
		for(var j=0; j<9; j++){
			if(sdku[i][j] == v){
				return false; //value collision found
			}
		}
		return true; //no collision found
	}
	var quadsafe = function(sdku,i,j,v){ //check if quadrant is safe
		var i1=0; var j1=0;
		if(i<=2){}else if(i>=3&&i<=5){i1=3}else{i1=6} //find start row of quadrant
		if(j<=2){}else if(j>=3&&j<=5){j1=3}else{j1=6} //find start column of quadrant
		for(var x=i1;x<i1+3;x++){
			for(var y=j1;y<j1+3;y++){
				if(sdku[x][y] == v){ 
					return false; //value collision is found
				}
			}
		}
		return true; //no collision found
	}
	//determine if value is safe in all
	return (colsafe(sdku,j,v) && rowsafe(sdku,i,v)
		&& quadsafe(sdku,i,j,v));
}

zerospos = function(sdku){ 
/* This function finds and stores all the coordinates for where all 
 * the 'zeros' are stored. The zeros in our puzzle are just supposed 
 * to be empty spots */
	var zeros = [];
	var k = 0; //to increment the zeros array
	for(var i=0; i < 9; i++){
		for(var j=0; j < 9; j++){
			if(sdku[i][j] == 0){
				zeros[k] = [i,j];
				k++;
			}
		}
	}
	return zeros;
}

printpuzzle = function(sdku){
/* This is a very simple function that just prints a given sudoku
 * puzzle in a readable format */
	chalk.hr();
	for(var i=0; i<9; i++){
		for(var j=0; j<9; j++){
			chalk.print(sdku[i][j] + " ");
			if(j == 2 || j == 5)
				chalk.print("| ");
		}
		chalk.newline();
		if(i == 2 || i == 5){
			chalk.print("----------------------");
			chalk.newline();
		}
	}
	chalk.hr();
}