var WhacSomePixels = (function () {

	function init() {

		// Draw the canvas
		canvas.draw(0, 0, 'white', 'black');

		// Creates a random px
		drawPixel();

	}

	var canvas = canvas || {};

	canvas.element = document.getElementById('canvas');
	canvas.context = canvas.element.getContext('2d');
	canvas.width = canvas.element.getAttribute('width');
	canvas.height = canvas.element.getAttribute('height');
	canvas.elemLeft = canvas.element.offsetLeft,
    canvas.elemTop = canvas.element.offsetTop,
	canvas.values = {
		fill: 'white',
		stroke: 'black',
		size: 1,
		pixelSize: 100
	};

	canvas.draw = function(x, y, fillColour, strokeColour, height, width) {

		var x = x || 0;
		var y = y || 0;
		var fillColour = fillColour || 'black';
		var strokeColour = strokeColour || 'white';
		var height = height || this.height;
		var width = width || this.width;

		this.context.fillStyle = fillColour;
		this.context.fillRect(x * canvas.values.size, y * canvas.values.size, width, height);

		this.context.strokeStyle = strokeColour;
		this.context.strokeRect(x * canvas.values.size, y * canvas.values.size, width, height);

	}


	// Define this in global scope
	var pixel;

	function drawPixel() {

		pixel = {
			x: Math.round(Math.random() * (canvas.width - canvas.values.size) / canvas.values.size),
			y: Math.round(Math.random() * (canvas.height - canvas.values.size) / canvas.values.size)
		};

		// Draws the initial random pixel to the canvas
		canvas.draw(pixel.x, pixel.y, 'red', 'white', canvas.values.pixelSize, canvas.values.pixelSize);

	}

	canvas.element.addEventListener('click', function(event) {

		console.log(pixel.x, pixel.y);

		var x = event.pageX - canvas.elemLeft;
        var y = event.pageY - canvas.elemTop;

        if (x >+ pixel.x && x <= pixel.x + canvas.values.pixelSize || y >= pixel.y && y <= pixel.y + canvas.values.pixelSize) {

        	drawPixel();

        }

        console.log(x, y);

	}, false);

	init();

})();