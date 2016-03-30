console.log("Hi!");

var droidSearch = {};

// These are the droids I'm looking for!
// Array of possible values
droidSearch.droidsAll = {
	1: 	{ 	name: "BB-8",
		 	url: "img/bb8.png"
		},
	2: 	{	name: "R2D2",
		 	url: "img/r2d2.png"
		}, 
	3: 	{	name: "C3P0",
		 	url: "img/c3p0.png"
		},
	4: 	{	name: "Wall-E",
		 	url: "img/wall-e.png"
		},
	5: 	{	name: "Rosie",
		 	url: "https://carsonspeight.files.wordpress.com/2011/08/the_jetsons_by_jaimemolina.png"
		},
	6: 	{	name: "EVE",
		 	url: "http://vignette2.wikia.nocookie.net/pixar/images/c/ca/Eve_wall%E2%80%A2e_clipped_rev_1.png"
		},
	7: 	{	name: "Baymax",
		 	url: "http://vignette2.wikia.nocookie.net/smashbroslawlorigins/images/f/f8/Baymax.png"
		},		
	8: 	{	name: "Android",
		 	url: "https://thecustomizewindows.com/wp-content/uploads/2011/11/Nicest-Android-Live-Wallpapers.png"
		},	
	}

droidSearch.droidDragKey;	// This holds the "key" of the droid being dragged to a peg element
droidSearch.codeLength;		// Length of code to be broken
droidSearch.numRounds;		// Number of numRounds  
droidSearch.numDroids;		// Number of selectable droids
droidSearch.selectableDroids = {};
droidSearch.answer = [];
droidSearch.playerGuess = [];


// ***PARSE DIFFICULTY MODE***
droidSearch.parseDifficulty = function(difficulty){
	switch(difficulty){
		case 0: 
			this.codeLength = 4;
			this.numDroids = 4;
			this.numRounds = 4;
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
		j=Math.floor(Math.random()*(droidsInit.length));
		this.selectableDroids.push(droidsInit[j]);
		droidsInit.splice(j,1);

	};
	this.setAnswerCode();
};

// Set random combination of droids for FINAL ANSWER CODE for player to decode, based on selectable droids.
droidSearch.setAnswerCode = function(){
	this.answer = [];
	var droidsInit = this.selectableDroids.slice(0);
	var i = this.codeLength;
	var j;
	while (i--) {
		j=Math.floor(Math.random()*(droidsInit.length));
		this.answer.push(droidsInit[j]);
		droidsInit.splice(j,1);
	};
};

//
droidSearch.validateGuess = function(playerGuess){
	// Reset Round Result Summary (For now... [Correct, Nearly Correct, Wrong])
	
	var roundResult = [0,0,0]; 
	// console.log("Player guess is: " + playerGuess);
	// console.log("Answer is: "+ this.answer);

	// Check for droid presence && correct droid placement
	for (i = 0; i < playerGuess.length; i++){		
		if (playerGuess[i] == this.answer[i]){
			roundResult[0]++;
		} else {
			// Check for droid presence
			for (j = 0; j < this.answer.length; j++) {
				if (playerGuess[i] == this.answer[j]){
				roundResult[1]++;}
			};
		};
	};
	// Determine number of wrong guesses (No droids that we are looking for...)
	roundResult[2] = this.numDroids - (roundResult[0] + roundResult[1]);
	return roundResult;
};




// ***RENDER GAME BOARD BASED ON DIFFICULTY***
droidSearch.renderGameBoard = function(){
	var $playArea = $('<div id="play-area">');
	for (var i = 0; i < this.numRounds; i++){
		var $code = $('<li class="code hidden">');
		$code.val(i+1); // Attach Round number as a value of the code list item
		var $round = $('<div class="round">');
		$round.text(i+1);
		$code.append($round);
		for (var j = 0; j < this.codeLength; j++){
			var $el = $('<li class="element">');
			$code.append($el);
		};
		var $result = $('<li class="result">');
		$result.val(i+1); // Attach Round number as a value of the result list item
		$result.append("<button id='submit-guess' type='submit'>Confirm Guess");
		$code.append($result);
		$playArea.append($code);
	};
	$('#landing').append($playArea);
};


// ***RENDER SELECTABLE DROIDS AREA***
droidSearch.renderSelectableDroids = function(){
	var $droidHome = $('<div id="droid-home">');
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
		$droidHome.append($droid);		
	};
	$('#landing').append($droidHome);
};


// ***RENDER SUBMISSION RESULT***
// Render result display for each player 
droidSearch.printGuessResult = function(round,roundResult){
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

// GET PLAYER GUESS
// Store player choice into an array based on the current rounds
droidSearch.getPlayerGuess = function(round){
	var $elements = $('.code[value='+round+'] li.element');
	var $playerGuess = [];
	for (var i = 0; i < $elements.length; i++) {
		$playerGuess.push($elements[i].value);
	}
	console.log(this.answer);
	return $playerGuess;
};


droidSearch.displayNextRound = function(round){
	if (round == this.numRounds){
		console.log("This is the last round already!");
	} else {
	var $currentRound = $('.code[value='+round+']');
	var $nextRound = $('.code[value='+(round+1)+']');
	$currentRound.toggleClass('active');
	$nextRound.fadeIn().css('display','flex');
	$nextRound.toggleClass('hidden').toggleClass('active');

	};
	this.setDropHandler();
};

// *** CHECK & DISPLAY WIN ***
// Check for a win condition and display the appropriate status
droidSearch.checkDisplayWinStatus = function(roundResult){
	if(roundResult[0] == this.codeLength) {
		$('.message').toggleClass('overlay');
		$('h2').text('YOU WIN!');
		return true;
	};
};


// *** CHECK & DISPLAY LOSS ***
// Check for a lose condition and display the appropriate status
droidSearch.checkDisplayLoseStatus = function(round, roundResult){
	if((round == this.numRounds) && !(roundResult[0] == this.codeLength)) {
		$('.message').toggleClass('overlay');
		$('h2').text("Yikes :( These are NOT the droids I'm looking for...");
		return true;
	};
};




// ***** HANDLERS HANDLERS HANDLERS! ******
// These functions handle the gnarly stuff!
// ****************************************

// DRAG Handler
// Listens for mousedown events on a SELECTABLE DROID, and stores the key value of that droid as the global variable droidDragKey
droidSearch.setDragHandler = function() {
var scope = this;
$('.droid').on('mousedown', function(evt){
	scope.droidDragKey = evt.currentTarget.value;
	});
	
};

// DROP Handler
// Listens for drop events on a CODE ELEMENT, and updates the element bg image corresponding to the droidDragKey
droidSearch.setDropHandler = function(){
	var scope = this;

	$('.code.active li.element').on('drop', function(e){
		e.preventDefault();
        e.stopPropagation();
        $(this).css({
			"background"		: "url(" + scope.droidsAll[scope.droidDragKey].url + ")",
			"background-size" 	: "cover"
		});
		$(this).val(scope.droidDragKey);
    });
	
	$('.code.active li.element').on('dragover',function(e){
    	e.preventDefault();
        e.stopPropagation();
	});		
};

// SUBMIT Handler
// Listents for submit events for each code submission
droidSearch.setSumbitGuessHandler = function(){
	var scope = this;
	$('button#submit-guess').on('click', function(e){
		$(this).toggleClass('hidden');
		var $round = $(this).parent().val();
		var roundResult = scope.validateGuess(scope.getPlayerGuess($round));
		scope.printGuessResult($round, roundResult);
		scope.checkDisplayLoseStatus($round, roundResult);
		if(($round != scope.numRounds) && !(scope.checkDisplayWinStatus(roundResult))) {
			scope.displayNextRound($round);
		};
	});
};


// Initialize the game.
droidSearch.init = function(){
	$('#landing').empty();
	this.selectableDroids = [];
	this.answer = [];
	this.parseDifficulty(0);
	this.setSelectableDroids();
	this.renderGameBoard();
	$('li.code[value=1]').toggleClass('hidden').toggleClass('active'); // Display the first round!!
	this.renderSelectableDroids();
	this.setDragHandler();
	this.setDropHandler();
	this.setSumbitGuessHandler();
}


// START NEW GAME Handler
droidSearch.startGameHandler = function(){
	var scope = this;
	$(document).on('click', '.message button', (function(){
		scope.init();
		$('.message').toggleClass('overlay');
	})
	);
}



$(function(){
	droidSearch.init();
	droidSearch.startGameHandler();
	


});