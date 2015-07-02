window.KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
}

window.pingpong = {
	scoreA : 0,
 	scoreB : 0 
}

pingpong.pressedKeys = [];
pingpong.ball = {
	speed: 5,
	x: 150,
	y: 100,
	directionX: 1,
	directionY:	1
}

$(
	function(){
		pingpong.timer = setInterval(gameLoop, 	30);
	}	
)

$(document).keydown(function(e){
	pingpong.pressedKeys[e.which] = true;
});

$(document).keyup(function(e){
	pingpong.pressedKeys[e.which] = false;
});

function gameLoop() {
	movePaddles();
	moveBall();
}

function getCssTop(selector) {
	return parseInt($(selector).css("top"));			
}

function movePaddles() {
	var paddleACssTop = getCssTop("#paddleA"),
		paddleBCssTop = getCssTop("#paddleB"),
		$paddleA = $("#paddleA"),
		$paddleB = $("#paddleB");
	
	if (pingpong.pressedKeys[KEY.UP]) {
		$paddleB.css("top",paddleBCssTop-5);
	}
	if (pingpong.pressedKeys[KEY.DOWN]) { 
		$paddleB.css("top",paddleBCssTop+5);
	}
	if (pingpong.pressedKeys[KEY.W]) {
		$paddleA.css("top",paddleACssTop-5);
	}
	if (pingpong.pressedKeys[KEY.S]) {
		$paddleA.css("top",paddleACssTop+5);
		}
} 

function changeLeftAndTopOfBall(left, top){
	 $("#ball").css({
		 "left": left,
		 "top" : top
	});
}

function moveBall(){
	var $playground = $("#playground"),
		$paddleA = $("#paddleA"),
		$paddleB = $("#paddleB"),
		paddleACssTop = getCssTop("#paddleA"),
		paddleBCssTop = getCssTop("#paddleB"),
		playgroundHeight = parseInt($playground.height()),
		playgroundWidth = parseInt($playground.width()),
		ball = pingpong.ball;
		
	var paddleAX = parseInt($paddleA.css("left"))+parseInt($paddleA.css("width")),
		paddleAYBottom = paddleACssTop + parseInt($paddleA.css("height")),
		paddleAYTop = paddleACssTop;
		
	var paddleBX = parseInt($("#paddleB").css("left")),
		paddleBYBottom = paddleBCssTop + parseInt($("#paddleB").css("height")),
		paddleBYTop = paddleBCssTop;

	if (ball.x + ball.speed*ball.directionX < paddleAX)
	{
		 if (ball.y + ball.speed*ball.directionY <= paddleAYBottom &&
			ball.y + ball.speed*ball.directionY >= paddleAYTop)
		 {
		 	ball.directionX = 1;
		 }
	}
	
	if (ball.x + ball.speed*ball.directionX >= paddleBX)
	{
		 if (ball.y + ball.speed*ball.directionY <= paddleBYBottom &&
		 ball.y + ball.speed*ball.directionY >= paddleBYTop)
		 {
		 ball.directionX = -1;
		 }
	}
	 
	if (ball.y + ball.speed*ball.directionY > playgroundHeight)
	{
		ball.directionY = -1;
	}
	
	if (ball.y + ball.speed*ball.directionY < 0)
	{
		ball.directionY = 1;
	}
	
	if (ball.x + ball.speed*ball.directionX > playgroundWidth)
	{
		ball.directionX = -1;
	}
	
	if (ball.x + ball.speed*ball.directionX < 0)
	{
		ball.directionX = 1;
	}
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;
	
	if (ball.x +ball.speed*ball.directionX > playgroundWidth)
	{
		 ball.x = 250;
		 ball.y = 100;
		 changeLeftAndTopOfBall(ball.x, ball.y);
		 ball.directionX = -1;
		 pingpong.scoreA++;
		 $("#scoreA").html(pingpong.scoreA);
	}
	if (ball.x + ball.speed*ball.directionX < 0)
	{
		ball.x = 150;
		ball.y = 100;
		changeLeftAndTopOfBall(ball.x, ball.y);
		ball.directionX = 1;
		pingpong.scoreB++;
		$("#scoreB").html(pingpong.scoreB);
	}
	
	changeLeftAndTopOfBall(ball.x, ball.y);
}