//根据hash，index渲染填写问卷页面；同填写问卷页渲染；
(function getData(){
	var index = window.location.hash.slice(1);
	var questionnairs = JSON.parse(window.localStorage.question);
	var theme = questionnairs[index].theme;
	var h1 = document.querySelector('h1 input');
	h1.value = theme;
	//插入问题；
	var questionList = document.querySelector('.question-list');
	var targetHTML = questionnairs[index].question;
	questionList.innerHTML = targetHTML;
	questionList.firstElementChild.style.display = 'none';
	questionList.firstElementChild.nextElementSibling.style.display = 'none';
	//冻结文本框；
	var input = document.querySelectorAll('.question-list input');
	for (var i = 0; i < input.length; i++) {
		if (input[i].type == 'text') {
			input[i].setAttribute('disabled','ture');
			input[i].style.border = 'none';
			input[i].style.color = 'black';
			input[i].style.backgroundColor = 'white';
		}
	}
	drawChart();
})();

//绘图；
function drawChart(){
	var li = document.querySelectorAll('.question-list li');
	var questionArr = [];
	for (let i = 0; i < li.length; i++) {
		if (li[i].style.display != 'none') {
			questionArr.push(li[i]);
		}
	}
	for (var i = 0; i < questionArr.length; i++) {
		var div = document.createElement('div');
		div.setAttribute('class','chart');
		questionArr[i].appendChild(div);
		if (questionArr[i].className == 'each-question') {
			var optheight = questionArr[i].firstElementChild.nextElementSibling.clientHeight;	
			var options = questionArr[i].firstElementChild.nextElementSibling.children;
			var sum = 0;
			for (let j = 0; j < options.length; j++) {
				let number = Number(options[j].firstElementChild.nextElementSibling.getAttribute('count'));
				sum = sum + number;
			}
			//绘制单选题的条状图；
			if (options[0].firstElementChild.type == 'radio') {
				div.innerHTML = '<p>数据占比</p><canvas width = "230" height = ' + optheight + ' class="bar-chart"></canvas>'	;
				for (let j = 0; j < options.length; j++) {
					let number = Number(options[j].firstElementChild.nextElementSibling.getAttribute('count'));
					//选取数组中的最后一个画布为当前画布；
					let canvas = document.querySelectorAll('.bar-chart');
					let len = canvas.length;
					let ctx = canvas[len-1].getContext('2d');
					ctx.fillStyle = '#ee7419';
					ctx.fillRect(0,13*j,number*180/sum,10);
					let str =' ' +  toPercent(number/sum);
					ctx.fillText(str,number*180/sum,13*j + 9);
				}
			//绘制多选题的饼状图；
			}else{
				var pieData = [];
				div.innerHTML = '<p>数据占比</p><canvas width = "230" height = ' + optheight + ' class="pie-chart"></canvas>'	;
				for (let i = 0; i < options.length; i++) {
					let number = Number(options[i].firstElementChild.nextElementSibling.getAttribute('count'));
					let name = options[i].firstElementChild.nextElementSibling.value;
					let obj = {
						count:number,
						name:name
					};
					pieData.push(obj);	
				}
				drawPie(pieData,sum,200-optheight/2,optheight/2,optheight/2);
			}	
			//为文本题画条状图；
		}else if (questionArr[i].className == 'text-area'){
			var textAreaHeight = questionArr[i].firstElementChild.nextElementSibling.clientHeight;	
			div.innerHTML = '<p>有效数据</p><canvas width = "230" height = ' + textAreaHeight + ' class="text-chart"></canvas>';
			let number = Number(questionArr[i].firstElementChild.nextElementSibling.firstElementChild.getAttribute('count'));
			let canvas = document.querySelectorAll('.text-chart');
			let len = canvas.length;
			let ctx = canvas[len-1].getContext('2d');
			ctx.fillStyle = '#ee7419';
			ctx.fillRect(0,0,150,10);
			let text = number + '条';
			ctx.fillText(text,160,10);
						
		}
	}
}
//转化成百分数；
function toPercent(point){
	var str=Number(point*100).toFixed(2);
    str+="%";
    return str;
}
//绘制饼状图函数；
function drawPie(arr,sum,x,y,r){
	var len = arr.length;
	console.log(arr);
	var sAngle = 0;
	for (var i = 0; i < len; i++) {
		let color = randomColor();
		let canvas = document.querySelectorAll('.pie-chart');
		let len = canvas.length;
		let ctx = canvas[len-1].getContext('2d');
		if (i == 0) {
			sAngle = 0;
		}else{
			sAngle = sAngle + (arr[i - 1].count / sum) *2* Math.PI;
		}
		let eAngle = sAngle + (arr[i].count / sum) *2* Math.PI;
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x + r*Math.cos(sAngle),y + r*Math.sin(sAngle));
		ctx.arc(x,y,r,sAngle,eAngle,false);	
		ctx.fillStyle = color;
		ctx.fill();
		//绘制导航；
		let text = arr[i].name + " " + toPercent(arr[i].count / sum);
		ctx.fillRect(0,13*i,10,10);
		ctx.fillText(text,12,13*i + 10);
		
	}
}
//随机生成颜色函数；
function randomColor(){
             var r=Math.floor(Math.random()*256);
             var g=Math.floor(Math.random()*256);
             var b=Math.floor(Math.random()*256);
             return "rgb("+r+','+g+','+b+")";
        }


















