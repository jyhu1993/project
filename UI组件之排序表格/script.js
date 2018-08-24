var addRowBtn = document.querySelector('.addRow');
var tbody = document.querySelector('#myTable tbody');

//设置点击button添加数据行按钮；
addRowBtn.onclick = function(){
	var theadTd = document.querySelectorAll('#myTable thead tr td');
	var tr = document.createElement('tr');
	tbody.appendChild(tr);
	var td = document.createElement('td');
	var input = document.createElement('input');
	input.setAttribute('type','text');
	tr.appendChild(td);
	td.appendChild(input);
	for (var i = 0; i < theadTd.length - 1; i++) {
		var td = document.createElement('td');
		var input = document.createElement('input');
		input.setAttribute('type','number');
		tr.appendChild(td);
		td.appendChild(input);
	}
	calculateTotalScore();
};
//排序；
var ascend = document.querySelectorAll('.ascend');
var descend = document.querySelectorAll('.descend');
sort(ascend,'ascend');
sort(descend,'descend');
//排序函数；
function sort(nodeList,method){
	for (var i = 0; i < nodeList.length; i++) {
		nodeList[i].onclick = function(event){
			var target = event.target.parentNode;
			var theadTd = document.querySelectorAll('thead tr td');
			for (var i = 0; i < theadTd.length; i++) {
				if(theadTd[i] === target){
					var index = i;
				}
			}
			var data = getInputData(index);
			var len = data.length;
			//排序；
			for (var j = 0; j < len; j++) {	
				for (var h = 0; h < len - 1; h++) {
					if (method == 'ascend') {
						if (Number(data[h].value) > Number(data[h + 1].value)) {
							tbody.insertBefore(data[h+1].parentNode.parentNode,data[h].parentNode.parentNode);
							//每变更	DOM后需重新获取最新排序的Data；
							data = getInputData(index);
						}
					}else if (method == 'descend') {
						if (Number(data[h].value) < Number(data[h + 1].value)) {
							tbody.insertBefore(data[h+1].parentNode.parentNode,data[h].parentNode.parentNode);
							//每变更	DOM后需重新获取最新排序的Data；
							data = getInputData(index);
						}
					}
				}
			}

		};
	}
}

//获取点击列所对应的input数组；参数为点击表头项的索引值；
function getInputData(index){
	var table = document.querySelector('table');
	var rows = table.rows;
	var data = [];
	for (var k = 1; k < rows.length; k++) {	
		var input = rows[k].cells[index].firstChild;
		data.push(input);	
	}
	return data;
}
//总分自动计算，监听blur事件；
function calculateTotalScore(){
	var input = document.querySelectorAll('input');
	for (var i = 0; i < input.length; i++) {
		input[i].onblur = function(){	
			var table = document.querySelector('table');
			var rows = table.rows;
			for (var j = 1; j < rows.length; j++) {
				var cells = rows[j].cells;
				var totalScore = 0;
				var len = cells.length;
				for (var k = 1; k < len - 1; k++) {
					totalScore = totalScore + Number(cells[k].firstChild.value);
				}
				cells[len-1].firstChild.value = totalScore;	
			} 

		};
	}	
}
calculateTotalScore();

//冻结表头，使其始终在视窗内，除非整个table都看不见；
function freezeThead(){
	document.addEventListener('scroll',function(){
		var thead = document.querySelector('#myTable thead');
		//表头距离页面顶部的高度，为固定值；
		var y = thead.offsetTop;
		//页面滚动的高度，即随滚动条向上隐藏的页面高度；
		var yScroll = document.documentElement.scrollTop;
		var table = document.querySelector('#myTable');
		var tableWidth = table.offsetWidth;
		var tableHeight = table.offsetHeight;
		if (y - yScroll < 0 && yScroll < tableHeight) {	
			var copy = table.cloneNode(true);
			var div = document.createElement('div');
			var body = document.querySelector('body');
			body.appendChild(div);
			div.appendChild(copy);
			div.setAttribute('class','copy');
			div.firstChild.id = '';
			div.style.marginLeft = -tableWidth/2 + 'px';
			
		}else{
			var delDiv = document.querySelectorAll('.copy');
			for (var i = 0; i < delDiv.length; i++) {
				delDiv[i].style.display = 'none';
			}
		}

	},false);
}
freezeThead();




























