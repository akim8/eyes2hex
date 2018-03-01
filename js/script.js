window.onload = function(e) {
	document.getElementById('newcolor').addEventListener('click', newBGColor);
}

function newBGColor() {
	var newColor = "#";
	for (var i = 0; i < 6; i++) {
		newColor += getRandomInt(16).toString(16); // .toString(16) converts decimal to hexidecimal
	}
	console.log(newColor);
	document.body.style.backgroundColor = newColor;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/*

if all rgb values of a color are less than half of the total amount, then the color is dark.

*/
