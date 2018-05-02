window.onload = function(e) {
	document.body.addEventListener('touchstart', preventZoom);

	document.getElementById('start').addEventListener('click', startGame);
	document.getElementById('choice1').addEventListener('click', function() {doChoice(1);});
	document.getElementById('choice2').addEventListener('click', function() {doChoice(2);});
	document.getElementById('choice3').addEventListener('click', function() {doChoice(3);});
	document.getElementById('choice4').addEventListener('click', function() {doChoice(4);});
	document.getElementById('choice5').addEventListener('click', function() {doChoice(5);});
	document.getElementById('choice6').addEventListener('click', function() {doChoice(6);});

	gameScreenDisplay = document.getElementById('gamescreen').style.display = "none";

	setBGColor();
}

function startGame() {
	document.getElementById('score').innerHTML = 0;
	setBGColor();
	toggleScreen();
	setChoices();
}

function setChoices() {
	// difficulty curve: https://www.desmos.com/calculator/cjcyvlvbiv
	var difficultyMultiplier = Math.floor(16000000 * Math.pow(.83, document.getElementById('score').innerHTML)) + 100;
	var bgColorDecimal = parseInt(rgb2hex(document.body.style.backgroundColor), 16); // parseInt(hexString, 16) converts hexidecimal to decimal
	var choiceButtons = document.getElementsByClassName('choice');

	for (var x of choiceButtons) {

		var answerVariation = bgColorDecimal + (getRandomInt(difficultyMultiplier * 2) - difficultyMultiplier);

		if (answerVariation > 16777215)
			answerVariation -= 16777215;
		else if (answerVariation < 0)
			answerVariation += 16777215;

		x.innerHTML = "#" + preserveLeadingZeros(answerVariation.toString(16));
	}

	choiceButtons[getRandomInt(6) - 1].innerHTML = "#" + preserveLeadingZeros(bgColorDecimal.toString(16));
	//console.log(bgColorDecimal.toString(16));
}

function doChoice(choice) {
	var wrongMessage = "Wrong!";
	var choiceButtons = document.getElementsByClassName('choice');
	var choiceMade = choiceButtons[choice - 1];
	var wrongCount = 0;
	var score = document.getElementById('score');

	for (var x of choiceButtons) {
		if (x.innerHTML == wrongMessage)
			wrongCount++;
	}

	if (choiceMade.innerHTML != wrongMessage) {
		if (choiceMade.innerHTML.replace("#", "") == rgb2hex(document.body.style.backgroundColor)) {
			score.innerHTML = parseInt(score.innerHTML) + 3 - wrongCount;
			setBGColor();
			setChoices();
		}
		else {
			if (wrongCount > 1) {
				setHighScore(parseInt(score.innerHTML));
				setBGColor();
				toggleScreen();
			}
			else
				choiceMade.innerHTML = wrongMessage;
		}
	}
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

function setBGColor() {
	var newColor = getRandomHexColor();
	document.body.style.backgroundColor = newColor;
	setTextContrast(colorIsDark(newColor));
}

function setTextContrast(darkBG) {
	var bareTextElementList = document.getElementsByClassName('baretext');
	if (darkBG) {
		for (var x of bareTextElementList) {
			x.style.color = "#fff";
		}
	}
	else {
		for (var x of bareTextElementList) {
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

// https://stackoverflow.com/a/3627747
function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function preserveLeadingZeros(x) {
	while (x.length < 6) {
		x = "0" + x;
	}
	return x;
}
