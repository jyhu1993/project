//通过本地存储，获取保存的问卷；
(function getQuestionnair(){
	var str = window.localStorage.question;
	var questionnairs = JSON.parse(str);
	var eachQuestionnair = document.querySelector('.each-questionnair');
	var ul = document.querySelector('.each-questionnair ul');
	for (var i = 0; i < questionnairs.length; i++) {
		var copyUl = ul.cloneNode(true);
		copyUl.style.display = 'flex';
		var theme =document.createTextNode(questionnairs[i].theme);
		var deadline = questionnairs[i].deadline;
		//确认是否已过截止时间，若已过截止时间，则将问卷状态改为已结束；
		var year = parseInt(deadline);
		var month = parseInt(deadline.slice(5));
		var index = deadline.indexOf('月');
		var day = parseInt(deadline.slice(index+1));
		var deadTime = new Date(year,month-1,day,23,59,59);
		var status;
		if (deadTime < new Date() && questionnairs[i].status == '发布中' ) {
			status = '已结束';
		}else{
			status = questionnairs[i].status;
		}
		copyUl.firstElementChild.appendChild(theme);
		copyUl.firstElementChild.nextElementSibling.innerHTML = deadline;
		copyUl.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = status;
		eachQuestionnair.appendChild(copyUl);
		//问卷状态为发布中时，更改问卷的操作；
		if (status === '发布中' || status === '已结束') {
			copyUl.lastElementChild.previousElementSibling.firstElementChild.innerHTML = '查看数据 ';
			copyUl.lastElementChild.previousElementSibling.lastElementChild.innerHTML = '填写问卷';
		}
	}
})();

//为删除按钮绑定事件；
(function bindEvent(){
	var operations = document.querySelectorAll('.operation');
	for (var i = 0; i < operations.length; i++) {
		//为所有删除绑定事件；
		var aTags = operations[i].children;
		aTags[1].addEventListener('click',function(event){
			deleteQuestionnair(event);	
		},false);
		//为所有编辑绑定事件；
		if (aTags[0].innerHTML == '编辑 ') {
			aTags[0].addEventListener('click',function(event){
				var target = event.target;
				var index = getIndex(event);
				target.href = '新建问卷页.html#editQuestionnair' + '#' + index;	
			},false);
		}
		//为所有填写问卷绑定事件；
		if (aTags[2].innerHTML == '填写问卷' || aTags[2].innerHTML == '查看问卷') {
			aTags[2].addEventListener('click',function(event){
				var target = event.target;
				var index = getIndex(event);	
				if (target.parentNode.previousElementSibling.innerHTML == '已结束') {
					alert('问卷调查已结束，无法填写问卷');
					return;
				}else{
					target.href = '填写问卷页.html' + '#' + index;
				}
			},false);
		}
		//为所有查看数据绑定事件；
		if (aTags[0].innerHTML == '查看数据 ') {
			aTags[0].addEventListener('click',function(event){
				var target = event.target;
				var index = getIndex(event);
				target.href = '查看数据页.html' + '#' + index;	
			},false);
		}

	}
	//删除问卷操作；
	function deleteQuestionnair(event){
		var target = event.target;
		var ul = target.parentNode.parentNode;
		var questionnairs = JSON.parse(window.localStorage.question);
		var allUl= document.querySelectorAll('.each-questionnair ul');
		var index;
		console.log(allUl);
		for (var i = 0; i < allUl.length; i++) {
			if(allUl[i] == ul){
				index = i - 1;
			}
		}
		questionnairs.splice(index,1);
		window.localStorage.question = JSON.stringify(questionnairs);
		ul.parentNode.removeChild(ul);
	}
	//获取被点击问卷的索引值；
	function getIndex(event){
		var target = event.target;
		var ul = target.parentNode.parentNode;
		var questionnairs = JSON.parse(window.localStorage.question);
		var allUl= document.querySelectorAll('.each-questionnair ul');
		var index;
		console.log(allUl);
		for (var i = 0; i < allUl.length; i++) {
			if(allUl[i] == ul){
				index = i - 1;
			}
		}
		return index;
	}
	
})();
























