window.onload = function(e) {
	document.body.addEventListener('touchstart', preventZoom);

	document.getElementById('start').addEventListener('click', startGame);
	document.getElementById('choice1').addEventListener('click', function() {makeChoice(1);});
	document.getElementById('choice2').addEventListener('click', function() {makeChoice(2);});
	document.getElementById('choice3').addEventListener('click', function() {makeChoice(3);});
	document.getElementById('choice4').addEventListener('click', function() {makeChoice(4);});
	document.getElementById('choice5').addEventListener('click', function() {makeChoice(5);});
	document.getElementById('choice6').addEventListener('click', function() {makeChoice(6);});

	gameScreenDisplay = document.getElementById('gamescreen').style.display = "none";

	newBGColor();
}

function startGame() {
	document.getElementById('score').innerHTML = "0";
	newBGColor();
	toggleScreen();
	createChoice();
}

function createChoice() {
	// TODO:
	var correctChoice = getRandomInt(6);
	var choice1 = document.getElementById('choice1');
	var choice2 = document.getElementById('choice2');
	var choice3 = document.getElementById('choice3');
	var choice4 = document.getElementById('choice4');
	var choice5 = document.getElementById('choice5');
	var choice6 = document.getElementById('choice6');
}

function makeChoice(choice) {
	// TODO: 
	console.log(choice);
}

function setHighScore(score) {
	var highscore = document.getElementById('highscore');
	if (highscore.innerHTML < score) {
		highscore.innerHTML = score;
	}
}

function toggleScreen() {
	var titleScreen = document.getElementById('titlescreen');
	var gameScreen = document.getElementById('gamescreen');
	if (gameScreen.style.display == "none") {
		titleScreen.style.display = "none";
		gameScreen.style.display = "";
	}
	else {
		titleScreen.style.display = "";
		gameScreen.style.display = "none";
	}
}

function makeChoice(choice) {
	console.log(choice);
}

function newBGColor() {
	var newColor = getRandomHexColor();
	document.body.style.backgroundColor = newColor;
	fixTextContrast(colorIsDark(newColor));
}

function fixTextContrast(darkBG) {
	var bareTextElementList = document.getElementsByClassName('baretext');
	if (darkBG) {
		for (x of bareTextElementList) {
			x.style.color = "#fff";
		}
	}
	else {
		for (x of bareTextElementList) {
			x.style.color = "#000";
		}
	}
}

function getRandomInt(max) { // Returns number between 1 and max
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function getRandomHexColor() {
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += (getRandomInt(16) - 1).toString(16); // toString(16) converts decimal to hexidecimal
	}
	return color;
}

function colorIsDark(color) {
	// Convert rgb values to percentages
	// parseInt(hexidecimal, 16) converts hexidecimal to decimal
	var r = Math.floor(parseInt(color.slice(1, 3), 16) / 255 * 100);
	var g = Math.floor(parseInt(color.slice(3, 5), 16) / 255 * 100);
	var b = Math.floor(parseInt(color.slice(5, 7), 16) / 255 * 100);
	return (r + g + b < 150);

	// Food for thought: https://stackoverflow.com/a/12043228
}

function preventZoom(e) { // Prevent double-tap zoom on iOS Safari
	var t2 = e.timeStamp;
	var t1 = e.currentTarget.dataset.lastTouch || t2;
	var dt = t2 - t1;
	var fingers = e.touches.length;
	e.currentTarget.dataset.lastTouch = t2;
	if (!dt || dt > 500 || fingers > 1) return; // not double-tap
	e.preventDefault();
	e.target.click();
}
