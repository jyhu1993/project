var me = true;
var clickData = [];
for (var i = 0; i < 15; i++) {
	clickData[i] = [];
	for (var j = 0; j < 15; j++) {
		clickData[i][j] = 0;
	}
}


var chess = document.getElementById('chess');
var ctx = chess.getContext('2d');
ctx.strokeStyle = '#BFBFBF';

//添加水印；
var logo = new Image();
logo.src = 'images/panda.png';
logo.onload = function(){
	ctx.drawImage(logo, 30, 50, 400, 400);
	drawChessboard();
};
//canvas绘制棋盘；
function drawChessboard(){
	for (var i = 0; i < 15; i++) {
		ctx.moveTo(15 + i * 30,15);
	    ctx.lineTo(15 + i * 30,435);
	    ctx.stroke();
	    ctx.moveTo(15,15 + i * 30);
	    ctx.lineTo(435,15 + i * 30);
	    ctx.stroke();
	}
}
//画棋子；
function drawChesspieces(i,j,me){
	ctx.beginPath();
	ctx.arc(15 + i * 30,15 + j * 30,13, 0, 2 * Math.PI);
	var gradient = ctx.createRadialGradient(15 + i * 30,15 + j * 30,0,15 + i * 30,15 + j * 30,13);
	if (me) {
		gradient.addColorStop(0,'gray');
		gradient.addColorStop(1,'black');
	}else{
		gradient.addColorStop(0,'white');
		gradient.addColorStop(1,'#B0B1B2');
	}
	ctx.fillStyle = gradient;
	ctx.fill();
}
//绑定点击事件；
chess.onclick = function(event){
	var x = event.offsetX;
	var y = event.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if (clickData[i][j] == 0) {
		drawChesspieces(i,j,me);
		me = !me;
		if (me == true) {
			clickData[i][j] = 1;
		}else{
			clickData[i][j] = -1;
		}
	}		
};

	
