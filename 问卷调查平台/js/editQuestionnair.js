//单选，多选，文本框按钮对应事件处理函数；
function editQuestion(opt){	
	var questionList = document.querySelector('.question-list');
	var eachQuestion = document.querySelector('.each-question');
	var questionNum = questionList.children.length;
	var textArea = document.querySelector('.text-area');
	var li = eachQuestion.cloneNode(true);
	var textAreaLi = textArea.cloneNode(true);
	var number = li.firstElementChild.firstElementChild;
	var textAreaNumber = textAreaLi.firstElementChild.firstElementChild;
	if (opt === '单选') {
		li.style.display = 'block';
		number.innerHTML = questionNum - 1;
		var options = li.firstElementChild.nextElementSibling.children;
		for (var i = 0; i < options.length; i++) {
			options[i].firstElementChild.name = questionNum - 1;
		}
		questionList.appendChild(li);
	}else if(opt === '多选'){	
		li.style.display = 'block';
		number.innerHTML = questionNum -1;
		let input = li.firstElementChild.lastElementChild;
		input.value = '多选题';
		questionList.appendChild(li);
		let options = li.firstElementChild.nextElementSibling.children;
		for (let i = 0; i < options.length; i++) {
			options[i].firstElementChild.type = 'checkbox';
			options[i].firstElementChild.name = questionNum - 1;
		}
	}else if (opt === '文本框') {
		textAreaLi.style.display = 'block';
		textAreaNumber.innerHTML = questionNum -1;
		questionList.appendChild(textAreaLi);
	}

}
//增加选项按钮对应事件处理函数；
function addOption(event){
	var target = event.target;
	var options = target.parentNode.previousElementSibling;
	var option = options.firstElementChild;
	var copyOption = option.cloneNode(true);
	options.appendChild(copyOption);
	//为新增的选项绑定删除按钮；
	var deleteOpt = document.querySelectorAll('.delete');
	for (let i = 0; i < deleteOpt.length; i++) {
		deleteOpt[i].addEventListener('click',deleteOption,false);
	}
}
//对应删除按钮事件处理函数；
function deleteQuestion(event){
	var target = event.target;
	var li = target.parentNode.parentNode;
	li.parentNode.removeChild(li);
	var number = document.querySelectorAll('.number');
	var len = number.length;
	for (var i = 0; i < len; i++) {
		number[i].innerHTML = i - 1;
		var options = number[i].parentNode.nextElementSibling.children;
		console.log(options);
		for (let j = 0; j < options.length; j++) {
			if (options[0].nodeName == 'TEXTAREA') {
			}else{
				options[j].firstElementChild.name = number[i].innerHTML;
			}	
		}	
	}
}
//选项后的删除按钮对应事件处理函数；
function deleteOption(event){
	var target = event.target;
	var option = target.parentNode;
	if (option.previousElementSibling === null && option.nextElementSibling === null) {
		return false;
	}else{
		option.parentNode.removeChild(option);
	}
}

//日历组件；
function calendar(){
	var month = document.querySelector('.month');
	var year = document.querySelector('.year');
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth();
	for (let i = 1; i <= 12; i++) {
		let option = document.createElement('option');
		let text = document.createTextNode(i);
		option.appendChild(text);
		month.appendChild(option);
		if(i == nowMonth + 1){
			option.setAttribute('selected','selected');
		}

	}
	for (let i = 0; i < 10; i++) {
		let option = document.createElement('option');
		let text = document.createTextNode(nowYear + i);
		option.appendChild(text);
		year.appendChild(option);	
	}
	//打开页面时默认执行一次；
	setWeekAndDate();
	//绑定select的onchange事件；
	month.addEventListener('change',function(){
		setWeekAndDate();
		//为每一天绑定点击事件；
		var date = document.querySelectorAll('.dateday');
		for (var i = 0; i < date.length; i++) {
			date[i].addEventListener('click',function(event){
				var deadTime = getSelectedDate(event);
				var deadline = document.querySelector('.deadline');
				deadline.value = deadTime;
				var cal = document.querySelector('.calendar');
				cal.style.display = 'none';
			},false);
		}
	},false);
	year.addEventListener('change',function(){
		setWeekAndDate();
		//为每一天绑定点击事件；
		var date = document.querySelectorAll('.dateday');
		for (var i = 0; i < date.length; i++) {
			date[i].addEventListener('click',function(event){
				var deadTime = getSelectedDate(event);
				var deadline = document.querySelector('.deadline');
				deadline.value = deadTime;
				var cal = document.querySelector('.calendar');
				cal.style.display = 'none';
			},false);
		}
	},false);
}
//根据选中的年月，显示对应的日和星期；
function setWeekAndDate(){
	var month = document.querySelector('.month');
	var monthSelected = month.options[month.selectedIndex].value;
	var year = document.querySelector('.year');
	var yearSelected = year.options[year.selectedIndex].value;
	var week = document.querySelector('.week');
	var date = document.querySelector('.date');
	//清除原来的week和date，重新渲染；
	while(week.hasChildNodes()){
		week.removeChild(week.firstChild);
	}
	while(date.hasChildNodes()){
		date.removeChild(date.firstChild);
	}
	
	//设置week;
	for (let i = 0; i < 7; i++) {
		let weekday;
		let span = document.createElement('span');
		switch(i){
			case 0:weekday ='日';
			break;
			case 1:weekday = '一';
			break;
			case 2:weekday = '二';
			break;
			case 3:weekday = '三';
			break;
			case 4:weekday = '四';
			break;
			case 5: weekday = '五';
			break;
			case 6:weekday = '六';
			break;
		}
		let text = document.createTextNode(weekday);
		span.appendChild(text);
		span.setAttribute('class','weekday');
		week.appendChild(span);	
	}
	//设置data;
	var selectDate = monthSelected + ' ' + 1 + ',' + yearSelected;
	var someDate = new Date(selectDate);
	var firstWeekDay = someDate.getDay();
	var firstDate = someDate.getDate();
	var nowDate = new Date();
	var maxDay;
	//设置大小月天数；
	if (monthSelected == 1 || monthSelected == 3 || monthSelected == 5 || monthSelected == 7 || 
		monthSelected == 8 || monthSelected == 10 || monthSelected == 12) {
		maxDay = 31;
	}else if (monthSelected != 2) {
		maxDay = 30;
	}else{
		//计算闰、平年2月份天数；
		if (yearSelected % 400 == 0 || (yearSelected % 4 == 0 && yearSelected % 100 != 0)) {
			maxDay = 29;
		}else{
			maxDay = 28;
		}
	}
	
	for (let i = 0; i < 42; i++) {	
		let span = document.createElement('span');
		if (i >= firstWeekDay && i <= maxDay + firstWeekDay -1) {
			let text = document.createTextNode(i - firstWeekDay + 1);
			span.appendChild(text);
			if (yearSelected == nowDate.getFullYear() && monthSelected == nowDate.getMonth() + 1 && 
				(i - firstWeekDay + 1) == nowDate.getDate()) {
				span.style.backgroundColor = '#1E90FF';
				span.style.color = 'white';
			}
			
		}
		span.setAttribute('class','dateday');
		date.appendChild(span);
	}
}

function getSelectedDate(event){
	var target = event.target; 
	var month = document.querySelector('.month');
	var monthSelected = month.options[month.selectedIndex].value;
	var year = document.querySelector('.year');
	var yearSelected = year.options[year.selectedIndex].value;
	var dateSelected = target.innerHTML;
	var deadline = yearSelected + '年' + monthSelected + '月' + dateSelected + '日';
	var selectedDate = new Date(yearSelected,monthSelected-1,dateSelected);
	var nowDate = new Date();
	if (selectedDate < nowDate) {
		alert('无法选择早于问卷创建的时间，请重新选择');
		return '';
	}else{
		return deadline;
	}
}
//保存问卷内容；
function saveQuestionnair(btn){
	//获取文章标题；
	var theme = document.querySelector('h1 input').value;
	//根据已输入的值更新问题列表中所有input框中的value值；
	var input = document.querySelectorAll('.question-list input');
	for (var i = 0; i < input.length; i++) {
		input[i].setAttribute('value',input[i].value);
	}
	//获取问题列表并克隆；
	var questionList = document.querySelector('.question-list');
	var cloneQuestionList = questionList.cloneNode(true);
	//获取截止时间；
	var deadline = document.querySelector('.deadline').value;
	if (deadline == '') {
		alert('请选择截止日期');
	}else{
		var questionnair = {
			theme:theme,
			status:btn,
			deadline:deadline,
			question:cloneQuestionList.innerHTML	
		};
		switch(btn){
			case '未发布': alert('保存成功');
			break;
			case '发布中': alert('发布成功');
		}
	}
	return questionnair;
}
//编辑已保存的页面内容；
function editOldQuestionnair(index){
	//index为需重新编辑的页面在存储的问卷数组中的索引位置；
	var questionnairs = JSON.parse(window.localStorage.question);
	var targetHTML = questionnairs[index].question;
	var theme = questionnairs[index].theme;
	//将字符串转化为DOM对象；
	var targetQuestionnair = document.createElement('ul');
	targetQuestionnair.setAttribute('class','question-list');
	targetQuestionnair.innerHTML = targetHTML;
	var questionList = document.querySelector('.question-list');
	questionList.parentNode.replaceChild(targetQuestionnair,questionList);
	//添加标题；
	var h1 = document.querySelector('h1 input');
	h1.value = theme;
}

export {editQuestion,addOption,deleteQuestion,calendar,getSelectedDate,saveQuestionnair,editOldQuestionnair};





















