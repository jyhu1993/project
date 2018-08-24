var register = document.getElementsByTagName('h1')[0];
var pop = document.getElementById('pop-style');
var body= document.getElementsByTagName('body')[0];
var shadeDiv = document.getElementsByClassName('shade')[0];
var cancelBtn = document.getElementById('cancel');

//点击显示浮出层；
register.onclick = function(){
	shadeDiv.style.display = 'block';
	pop.style.display = 'block';
};
//点击浮出层外部撤销浮出层；
function cancel(){
	shadeDiv.style.display = 'none';
	pop.style.display = 'none';
}
//在取消按钮和遮罩层上绑定点击取消浮出层事件；
cancelBtn.addEventListener('click',function(event){
	event.preventDefault();
	cancel();
},false);
shadeDiv.addEventListener('click',cancel,false);

//设置拖放；
//dataTransfer只能在dragstart事件中存储数据；
pop.addEventListener('dragstart',function(event){
	var x = event.offsetX;
	var y = event.offsetY;
	var offset =JSON.stringify([x, y]);
	//存放数据；
	var dt = event.dataTransfer;
	dt.setData('text/plain',offset);
	
},false);

//dataTransfer只能在drop事件中读取数据；
body.addEventListener('drop',function(event){	
	var x = event.clientX;
	var y = event.clientY;
	//取数据；
	var dt = event.dataTransfer;
	var offset = JSON.parse(dt.getData('text/plain'));
	pop.style.left = x + 'px';
	pop.style.top = y + 'px'; 
	var x2 = -offset[0];
	var y2 = -offset[1];
	pop.style.marginLeft = x2 + 'px';
	pop.style.marginTop = y2 + 'px';
	
},false);
//要实现拖放过程，必须设置整个页面不执行默认处理（拒绝拖放）;
document.ondragover = function(ev){ev.preventDefault();};

//为边框绑定处理函数，实现边框的放大和缩小;
var resizeR = document.getElementsByClassName('resizeR')[0];
var resizeB = document.getElementsByClassName('resizeB')[0];

//下边框设置缩放；
resizeB.onmousedown = function move(event){
	event.preventDefault();
	var y1 = event.clientY;
	document.addEventListener('mousemove',borderBMove,false);
	document.addEventListener('mouseup',stopTMove,false);


	//移动下边框
	function borderBMove(ev){
			var y = ev.clientY;
			var popY = parseInt(pop.style.top) + parseInt(pop.style.marginTop);
			
			if (isNaN(popY)) {
				pop.style.height =y  - (y1- 200) + 'px';
			}else{
				pop.style.height = y - popY + 'px';
			}
			
			
		}	
	//停止边框移动；
	function stopTMove(ev){
		document.removeEventListener('mousemove',borderBMove,false);
	}
		
};

//右边框设置缩放；
resizeR.onmousedown = function(event){
	event.preventDefault();
	var x1 = event.clientX;
	document.addEventListener('mousemove',borderRMove,false);
	document.addEventListener('mouseup',stopRMove,false);

	//移动右边框；
	function borderRMove(ev){
			var x = ev.clientX;
			var popX = parseInt(pop.style.left) + parseInt(pop.style.marginLeft);
			
			if (isNaN(popX)) {
				pop.style.width =x  - (x1- 500) + 'px';
			}else{
				pop.style.width = x - popX + 'px';
			}
			
			
		}	
	//停止边框移动；
	function stopRMove(ev){
		document.removeEventListener('mousemove',borderRMove,false);
	}

};

































