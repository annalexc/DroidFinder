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
	3: 	{	name: "Wall-E",
		 	url: "https://cdn2.iconfinder.com/data/icons/walle/256/my_computer.png"
		},
	4: 	{	name: "TARS",
		 	url: ""
		},
	5: 	{	name: "EVE",
		 	url: "http://vignette2.wikia.nocookie.net/pixar/images/c/ca/Eve_wall%E2%80%A2e_clipped_rev_1.png"
		},
	6: 	{	name: "Baymax",
		 	url: ""
		},		
	7: 	{	name: "Iron-Giant",
		 	url: ""
		},	
	}

droidSearch.dragKey;
droidSearch.codeLength;	// Length of code to be broken
droidSearch.numRounds;	// Number of numRounds  
droidSearch.numDroids;	// Number of selectable droids
droidSearch.selectableDroids = {};
droidSearch.answer = [];
droidSearch.playerGuess = [];


// ***PARSE DIFFICULTY MODE***
droidSearch.parseDifficulty = function(difficulty){
	switch(difficulty){
		case 0: 
			this.codeLength = 4;
			this.numDroids = 4;
			this.numRounds = 8;
			break;
		case 1: 
			this.codeLength = 4;
			this.numDroids = 6;
			this.numRounds = 10;
			break;
		case 2: 
			this.codeLength = 5;
			this.numDroids = 8;
			this.numRounds = 12;
			break;
		};
};
// Set random combination of SELECTABLE droids for player to use while decoding.
// THIS IS BASED ON DIFFICULTY
droidSearch.setSelectableDroids = function(){
	this.selectableDroids = [];
	var droidsInit = Object.keys(this.droidsAll);
	var i = this.numDroids;
	var j;
	while (i--) {
		j=Math.floor(Math.random()*i);
		this.selectableDroids.push(droidsInit[j]);
		droidsInit.splice(j,1);
	};
};

// Set random combination of droids for FINAL ANSWER CODE for player to decode, based on selectable droids.
droidSearch.setAnswerCode = function(){
	this.answer = [];
	var droidsInit = Object.keys(this.selectableDroids);
	var i = this.codeLength;
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



// ***RENDER GAME BOARD BASED ON DIFFICULTY***
droidSearch.renderGameBoard = function(){
	var $playArea = $('<div id="play-area">');
	for (var i = 0; i < this.numRounds; i++){
		var $code = $('<div class="code hidden">');
		var $round = $('<div class="round">');
		$round.text(i+1);
		$code.append($round);
		for (var j = 0; j < this.codeLength; j++){
			var $el = $('<li class="element">');
			$code.append($el);
		};
		var $result = $('<li class="result">');
		$result.val(i+1); // Attach Round number as a value of the result list item
		$code.append($result);
		$playArea.append($code);
	};
	$('#landing').append($playArea);
};


// ***RENDER SELECTABLE DROIDS AREA***
droidSearch.renderSelectableDroids = function(){
	var $footer = $('<footer>');
	for (var i = 0; i < this.selectableDroids.length; i++){ 
		var $droid = $('<li class=droid draggable="true">');
		var key = this.droidsAll[this.selectableDroids[i]];
		$droid.val(this.selectableDroids[i]);
		$droid.css({
			"background" 		: "url(" + key.url + ")",
			"background-size" 	: "cover"
		});
		if (this.numDroids === 8){ $droid.css("height","80.42%");
		} else if (this.numDroids === 6){ $droid.css("height","91.98%");
		} else if (this.numDroids === 4){ $droid.css("height","92.9%");
		};
		$footer.append($droid);		
	};
	$('#landing').append($footer);
};



// ***RENDER CODE SUBMISSION AREA***


// ***RENDER SUBMISSION RESULT***
// Render result display for each player 
droidSearch.printSubmissionResult = function(round,roundResult){
	var $result = $('.result[value='+round+']');
	var $html = $result.html();
	var correct = roundResult[0]; // Black pegs represent droids that are present && in the correct position
	var reposition = roundResult[1]; // White pegs represent presence of correct droid that must be re-positioned
	for (var i = 0; i < correct; i++){
		$result.html($html+"&#9899; ");
		$html = $result.html();
	};
	for (var i = 0; i < reposition; i++){
		$result.html($html+"&#9898; ");
		$html = $result.html();
	};
};


droidSearch.setDragHandler = function() {
var scope = this;
$('.droid').on('mousedown', function(evt) {
	scope.dragKey = evt.currentTarget.value;
	});
	
};


droidSearch.setDropHandler = function() {
	var scope = this;

	$('.element').on('drop', function(e) {
		e.preventDefault();
        e.stopPropagation();
        $(this).css({
			"background" : "url(" + scope.droidsAll[scope.dragKey].url + ")",
			"background-size" 	: "cover"	
		});
		$(this).val(scope.dragKey);
    });
	
	$('.element').on('dragover',function(e){
    	e.preventDefault();
        e.stopPropagation();
	});

		

};




// ***START GAME HANDLER***
// Listen for "Start Game" player selection


// ***PLAYER SELECTION HANDLER***
// Listen for player peg selection


// ***PLAYER SUBMISSION HANDLER***
// Listen for player peg placement and guess submission


// Initialize the game.








$(function(){
	droidSearch.parseDifficulty(0);
	droidSearch.setSelectableDroids();
	droidSearch.setAnswerCode();
	droidSearch.renderGameBoard();
	droidSearch.renderSelectableDroids();
	droidSearch.setDragHandler();
	droidSearch.setDropHandler();
	
	




});