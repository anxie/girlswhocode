/*This is your javascript file where you'll
	a. keep your gameboard as a 2D-array
	b. render the 2D-array in the browser (using JS to edit the html - we will group code this!)
	c. re-write the arrowPressed() function to update your 2D array gameboard when the player hits an arrow key
	d. write your own 'helper' functions that break 2048 into smaller problems.
*/

/*CONSTANTS: These match keyCode values to arrow directions. do not edit, and do no assign values!*/
var LEFT = 37;
var RIGHT = 39;
var UP =  38;
var DOWN = 40;




//board as a 2D array with dummy values. This 2D array is the MODEL that remembers
//what are gameboard (grid) contains. In the end it will start with all zeros.
var board = [["","","",""], ["","","",""], ["","","",""], ["","","",""]];


/*Sample testboard: this has numbers hard-coded to test whether the UP arrow can handle 2s:
var testTwosUpBoard = [[0,0,2,0],
			[0,0,2,0],
			[2,0,0,0],
			[2,0,0,0]];*/

//runGame() will call functions you write to solve the subProblems of 2048 the game.
var start = function(){
	var l = Math.floor(Math.random()*4);
	var m = Math.floor(Math.random()*4);
	var n = Math.floor(Math.random()*4);
	var o = Math.floor(Math.random()*4);
	board[l][m]= 2;
	board[n][o]= 2;
}

var end = function(){
	var endGame = 0;
	for(i=0; i<4; i++){
		for(j=0; j<4; j++){
			if(board[i][j]!==""){
				endGame = endGame+1;
			}
		}
	}
	if(endGame===16){
		console.log("Try again?");
	}
}

var win = function(){
	for(i=0; i<4; i++){
		for(j=0; j<4; j++){
			if(board[i][j]===2048){
				console.log("WINNER!");
			}
		}
	}
}

var add2 = function(){
	var x = false;
	while(x === false){
		var a = Math.floor(Math.random()*4);
		var b = Math.floor(Math.random()*4);
		if(board[a][b]=== ""){
			board[a][b]=2;
			x = true;
		}
	}
}

function showBoard(){
	start();
	colorBoard();
	renderBoard();

}

var left = function() {
	add2();
	for(var i=0; i<4;i++){
		for(var j=0; j<board.length; j++){
			if(board[i][j-1]===""){
				board[i][j-1] = board[i][j];
				board[i][j] = "";
			}
			if(board[i][j]===board[i][j-1]){
				board[i][j-1] = board[i][j] + board[i][j-1];
				board[i][j] = "";
			}
		}
	}
	renderBoard();
}

var right = function(){
	add2();
	for(var i=0; i<4; i++){
		for(var j=2;j>-1;j--){
			if(board[i][j+1]===""){
				board[i][j+1]=board[i][j];
				board[i][j]="";
			}
			if(board[i][j]===board[i][j+1]){
				board[i][j+1]=board[i][j] + board[i][j+1];
				board[i][j]="";
			}
		}
	}
	renderBoard();
}

var up = function(){
	add2();
	for(var i=1; i<4;i++){
		for(var j=0; j<4; j++){
			if(board[i-1][j]===""){
				board[i-1][j]=board[i][j];
				board[i][j]="";
			}
			if(board[i][j]===board[i-1][j]){
				board[i-1][j]= board[i][j]+board[i-1][j];
				board[i][j]="";
			}
		}
	}
	renderBoard();
}

var down = function() {
	add2();
	for(var i=2; i>-1; i--){
		for(var j=0; j<4; j++){
			if(board[i+1][j]===""){
				board[i+1][j]=  board[i][j];
				board[i][j] = "";
			}
			if(board[i][j]=== board[i+1][j]){
				board[i+1][j] = board[i][j] + board[i+1][j];
				board[i][j]="";
			}
		}
	}
	renderBoard();
}

//arrowPress receives the arrow key pressed by the user. Right now all it does is print out the key they pressed.
//Starting with "UP," edit this code so that your game responds appropriately to the arrow keys.
function arrowPress(e){
	if(e.keyCode == UP){
		console.log("UP");
		up();
	}else if(e.keyCode ==DOWN){
		console.log("DOWN");
		down();
	}else if (e.keyCode == LEFT){
		console.log("LEFT");
		left();
	}else if (e.keyCode == RIGHT){
		console.log("RIGHT");
		right();
	}else{
		console.log("invalid key pressed. Press arrow key");
	}
	colorBoard();
	win();
	end();
}

/*Eventually renderBoard will move all the elements from your Javascript 2D array 'board' into html using the 'renderSquare(r,c)' function
*/
function renderBoard(){
	for(var i = 0; i < board.length; i++){ //rows
		for(var j = 0; j < board[0].length; j++){
			renderSquare(i,j);
		}
	}
}

/*You do not need to edit this function. It takes 2 parameters: the rowIndex and the colIndex. It
uses Javascript to update the html cell at rowIndex,colIndex with the element at board[rowIndex][colIndex]*/
function renderSquare(rowIndex, colIndex){
	var boardID = "r"+rowIndex+"c"+colIndex;
	document.getElementById(boardID).innerHTML = board[rowIndex][colIndex];
}

/*colorBoard() loops over our 2D array to color the squares. It will eventually assign each cell a color depending on the number the cell holds.
	Here you can see how javascript accesses pieces of HTML and edits their style (CSS) with new colors.
	You do not need to edit this code until after your game works and you
	want to mix up the colors., but it is a reference for how to do a double-for loop over the 2D-array.
	*/
function colorBoard(){
	for(var i = 0; i < 4; i++){ //outer loop over rows
		for(var j = 0; j < 4; j++){ //inner loop over columns
			if(board[i][j]===""){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#C0C0C0";
			}
			if(board[i][j]===2){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#eee4da";
			}
			if(board[i][j]===4){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#FF0000";
			}
			if(board[i][j]===8){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#f59563";
			}
			if(board[i][j]===16){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#3399ff";
			}
			if(board[i][j]===32){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#ffa333";
			}
			if(board[i][j]===64){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#cef030";
			}
			if(board[i][j]===128){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#800080";
			}
			if(board[i][j]===256){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#990303";
			}
			if(board[i][j]===512){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#6ba5de";
			}
			if(board[i][j]===1024){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#dcad60";
			}
			if(board[i][j]===2048){
				var boardID = "r"+i+"c"+j; //build the ID string
				document.getElementById(boardID).style.background = "#b60022";
			}
		}
	}
}
