console.log("Hi!");

var droidSearch = {};

// These are the droids I'm looking for!
// Array of possible values
droidSearch.droidsAll = {
	0: 	{ 	name: "BB-8",
		 	url: "https://hectorelarquitecto.files.wordpress.com/2015/11/bb8-droid.png"
		},
	1: 	{	name: "R2D2",
		 	url: "http://files.softicons.com/download/tv-movie-icons/star-wars-characters-icons-by-jonathan-rey/png/256x256/R2D2%20-%2001.png"
		}, 
	2: 	{	name: "C3P0",
		 	url: "http://iconbug.com/data/e4/256/99b54f94821fa8a154943524a6e45f38.png"
		},
	3: 	{	name: "BB-8",
		 	url: ""
		},
	4: 	{	name: "BB-8",
		 	url: ""
		},
	5: 	{	name: "BB-8",
		 	url: ""
		}	
	}

droidSearch.answer = [];
droidSearch.numDroids = 5;
droidSearch.playerGuess = [];
droidSearch.round = 1;

// Set random combination of droids for user to decode
droidSearch.setDroidCombo = function(){
	this.answer = [];
	var droidsInit = Object.keys(this.droidsAll);
	var i = this.numDroids;
	var j;
	while (i--) {
		j=Math.floor(Math.random()*i);
		this.answer.push(droidsInit[j]);
		droidsInit.splice(j,1);
	};
};

//
droidSearch.validateGuess = function(guess){
	// Reset Round Result Summary (For now... [Correct, Nearly Correct, Wrong])
	var roundResult = [0,0,0]; 
	
	// Check for droid presence && correct droid placement
	for (i = 0; i < guess.length; i++){
		if (guess[i] === this.answer[i]){
			roundResult[0]++;
		} else {
			// Check for droid presence
			for (j = 0; j < this.answer.length; j++) {
				if (guess[i] === this.answer[j]){
				roundResult[1]++;}
			};
		};
	};
	// Determine number of wrong guesses (No droids that we are looking for...)
	roundResult[2] = this.numDroids - (roundResult[0] + roundResult[1]);
	return roundResult;
};


// Store player choice into an array. 


// ***RENDER SELECTABLE DROIDS AREA***
droidSearch.renderSelectableDroids = function($droids){
	for (var i = 0; i < $droids.length; i++){
		$($droids[i]).css({
			"background" : "url(" + this.droidsAll[i].url + ")",
			"background-size" : "cover"
		})	
	};
};

// ***RENDER CODE SUBMISSION AREA***


// ***RENDER SUBMISSION RESULT***
// Render result display for each player submission


// ***START GAME HANDLER***
// Listen for "Start Game" player selection


// ***PLAYER SELECTION HANDLER***
// Listen for player peg selection


// ***PLAYER SUBMISSION HANDLER***
// Listen for player peg placement and guess submission


// Initialize the game.





$(function(){
	var $droids = $('.droid');
	droidSearch.renderSelectableDroids($droids);

});