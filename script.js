var canvas = canvas || {};

canvas.element = document.getElementById('canvas');
canvas.context = canvas.element.getContext('2d');
canvas.width = canvas.element.getAttribute('width');
canvas.height = canvas.element.getAttribute('height');
canvas.values = {
	fill: 'white',
	stroke: 'black',
	size: 10
};

canvas.draw = function(x, y, fillColour, strokeColour) {

	var x = x || 0;
	var y = y || 0;
	var fillColour = fillColour || 'black';
	var strokeColour = strokeColour || 'white';

	this.context.fillStyle = fillColour;
	this.context.fillRect(x * canvas.values.size, y * canvas.values.size, this.width, this.height);

	this.context.strokeStyle = strokeColour;
	this.context.strokeRect(x * canvas.values.size, y * canvas.values.size, this.width, this.height);

}

// Draw the canvas
canvas.draw(0, 0, 'white', 'black');

// Define this in global scope
var pixel;

function drawPixel() {

	pixel = {
		x: Math.round(Math.random()*(canvas.width - canvas.values.size) / canvas.values.size),
		y: Math.round(Math.random()*(canvas.height - canvas.values.size) / canvas.values.size)
	};

}

drawPixel();
canvas.draw(pixel.x, pixel.y, 'red', 'white');