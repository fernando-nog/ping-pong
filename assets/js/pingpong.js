var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
}

var pingpong = {}
pingpong.pressedKeys = [];


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
}

function getCssTop(selector) {
	return parseInt($(selector).css("top"));			
}

function movePaddles() {
	if (pingpong.pressedKeys[KEY.UP]) {
		$("#paddleB").css("top",getCssTop("#paddleB")-5);
	}
	if (pingpong.pressedKeys[KEY.DOWN]) { 
		$("#paddleB").css("top",getCssTop("#paddleB")+5);
	}
	if (pingpong.pressedKeys[KEY.W]) {
		$("#paddleA").css("top",getCssTop("#paddleA")-5);
	}
	if (pingpong.pressedKeys[KEY.S]) {
		$("#paddleA").css("top",getCssTop("#paddleA")+5);
	}
} 