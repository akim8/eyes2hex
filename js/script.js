window.onload = function(e) {
	document.body.addEventListener('touchstart', preventZoom);
	document.getElementById('newcolor').addEventListener('click', newBGColor);
}

function newBGColor() {
	var newColor = getRandomHexColor();
	document.body.style.backgroundColor = newColor;
	if (colorIsDark(newColor)) {
		document.getElementById('testtext').style.color = "#fff";
	}
	else {
		document.getElementById('testtext').style.color = "#000";
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
