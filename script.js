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
			x: Math.round(Math.random() * (canvas.width - canvas.values.pixelSize) / canvas.values.size),
			y: Math.round(Math.random() * (canvas.height - canvas.values.pixelSize) / canvas.values.size)
		};
		
		// redraw the canvas
		canvas.draw(0, 0, 'white', 'black');

		// Draws the initial random pixel to the canvas
		canvas.draw(pixel.x, pixel.y, 'green', 'white', canvas.values.pixelSize, canvas.values.pixelSize);
		

	}

	var timer = timer || {};

	timer.count = 10;
	timer.masterCount = 60;
	timer.speed = 500;

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
			
			submitInfo(score);
			
			game.masterReset();
        	
        }

	}


	var game = game || {};

	game.start = function() {
	
		getHighScore();

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

		var x = event.pageX - canvas.elemLeft;
        var y = event.pageY - canvas.elemTop;

        if (x >= pixel.x && x <= pixel.x + canvas.values.pixelSize && y >= pixel.y && y <= pixel.y + canvas.values.pixelSize && timer.count > 0) {
        
        	score += 1;
        	
        	if (timer.speed > 100) {
        	
        		timer.speed -= 10;
        	
        	}
        
        	game.reset();

        }

	}, false);
	
	function submitInfo(playerScore) {
	
		
		// this works no problem
		$.ajax({
			type: "POST",
			url: "write.php",
			// Passign data in object, works in jQuery
			data: {Info:playerScore, Name:PHPplayer},
			success: function(result) {
				getHighScore();
			}
		});
	
		/*
		// NOT WORKING
		var request = new XMLHttpRequest();
		request.open('POST', 'write.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		// Think my error is how this data is being passed? Different syntax to jQuery?
		request.send({Info:playerScore, Name:PHPplayer});
		*/	
			
	}

	function getHighScore() {
	
		var request = new XMLHttpRequest();
		request.open('GET', 'leaders.txt', true);
		
		request.onload = function() {
		
		  if (request.status >= 200 && request.status < 400) {
		  
		    var data = request.responseText;
		    document.getElementById('highscore').innerHTML = 'Highest score: ' + data;
		    
		  }
		  
		};
		
		request.send();
		
	}
	
	person = prompt('Please enter your name, the game will start after you click enter');
	
	if (person != null && person != '') {
	
		document.getElementById('player').innerHTML = person;
		
		var PHPplayer = "-" + person;

		game.start();
		
	}

})();