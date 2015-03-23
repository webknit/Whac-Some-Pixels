var WhacSomePixels = (function () {

	var score = 0;

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
		pixelSize: 10
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

		// redraw the canvas
		canvas.draw(0, 0, 'white', 'black');

		// Draws the initial random pixel to the canvas
		canvas.draw(pixel.x, pixel.y, 'red', 'white', canvas.values.pixelSize, canvas.values.pixelSize);

	}

	var timer = timer || {};

	timer.count = 10;
	timer.masterCount = 60;
	timer.speed = 10;

	timer.countDown = function() {
	
		timer.count = timer.count - 1;
		
		if (timer.count < 1) {
			
			game.reset();
        	
        }

	}
	
	timer.gameCount = function() {
	
		timer.masterCount = timer.masterCount - 1;

		document.getElementById('countdown').innerHTML = timer.masterCount + " seconds";
		
		if (timer.masterCount < 1) {
			
			alert('Your score is ' + score);
			
			game.masterReset();
        	
        }

	}


	var game = game || {};

	game.start = function() {

		drawPixel();
		
		document.getElementById('score').innerHTML = "Your score is " + score;
		
		if(typeof game_loop != "undefined") {
		
			clearInterval(game_loop);
			
		}
    	
    	game_loop = setInterval(timer.countDown, timer.speed);
    	
    	game_count = setInterval(timer.gameCount, 1000);

	}
	
	game.reset = function() {
	
		// Score
		document.getElementById('score').innerHTML = "Your score is " + score;
	
		clearInterval(game_loop);
    	
    	timer.count = 10;
    	
    	console.log(timer.speed);
    	
    	game_loop = setInterval(timer.countDown, timer.speed);

    	drawPixel();
		
	}
	
	game.masterReset = function() {
	
		clearInterval(game_loop);
		clearInterval(game_count);
		
		timer.masterCount = 60;
		timer.speed = 500;
		score = 0;
	
		game.start();
	
	}

	canvas.element.addEventListener('click', function(event) {

		console.log(pixel.x, pixel.y);

		var x = event.pageX - canvas.elemLeft;
        var y = event.pageY - canvas.elemTop;

        if (x >+ pixel.x && x <= pixel.x + canvas.values.pixelSize || y >= pixel.y && y <= pixel.y + canvas.values.pixelSize && timer.count > 0) {
        
        	score += 1;
        	
        	if (timer.speed > 100) {
        	
        		timer.speed -= 10;
        	
        	}
        
        	game.reset();

        }

        console.log(x, y);

	}, false);

	game.start();

})();