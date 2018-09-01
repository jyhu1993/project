//解决新建编辑页面以及重新编辑已保存的问卷问题；
(function(){
	var createQuestionnair = document.querySelector('.create-questionnair');
	var editQuestionnair = document.querySelector('.edit-questionnair');
	//若hash为editQuestionnair，则直接跳转到编辑问题页面；
	if (window.location.hash.slice(0, 17) == '#editQuestionnair') {
		createQuestionnair.style.display = 'none';
		editQuestionnair.style.display = 'block';
		var index = window.location.hash.slice(18);
		editOldQuestionnair(index);
	}
	//点击新建问卷，隐藏新建问卷div,显示编辑问题页面；
	createQuestionnair.addEventListener('click',function(event){
		var target = event.target;
		if (target.nodeName == 'A') {
			createQuestionnair.style.display = 'none';
			editQuestionnair.style.display = 'block';
			window.location.hash = '#editQuestionnair';
			event.preventDefault();
		}

	},false);
})();

//点击添加问题，出现问题种类选项；
var addQuestion = document.querySelector('.add-question');
var questionKinds = document.querySelector('.question-kinds');
addQuestion.addEventListener('click',function(event){
	var target = event.target;
	if (target.nodeName == 'P') {
		questionKinds.style.display = 'block';
	}
},false);

//点击选项种类，添加问题框；
import {editQuestion,addOption,deleteQuestion,calendar,getSelectedDate,saveQuestionnair,editOldQuestionnair} from './editQuestionnair.js';
questionKinds.addEventListener('click',function(event){
	var target = event.target;
	if (target.innerText == '单选') {
		editQuestion('单选');
	}else if(target.innerText === '多选'){
		editQuestion('多选');
	}else if(target.innerText === '文本框'){
		editQuestion('文本框');
	}
	//为每个li中的删除，增加选项，删除选项按钮添加方法；	
	var addBtn = document.querySelectorAll('.add-option');
	var deleteBtn = document.querySelectorAll('.delete-question');
	for (let i = 0; i < addBtn.length; i++) {
		addBtn[i].addEventListener('click',addOption,false);	
	}
	for (let i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].addEventListener('click',deleteQuestion,false);
	}
},false);

//问卷截止时间；绑定input框的点击事件；
var deadline = document.querySelector('.deadline');
//刷新时，清空截止事件框的value值；
deadline.value = '';
var cal = document.querySelector('.calendar');
deadline.addEventListener('click',function(){
	cal.style.display = 'block';
	calendar();
	//为每一天绑定点击事件；
	var date = document.querySelectorAll('.dateday');
	for (var i = 0; i < date.length; i++) {
		date[i].addEventListener('click',function(event){
			var deadTime = getSelectedDate(event);
			var deadline = document.querySelector('.deadline');
			deadline.value = deadTime;
			cal.style.display = 'none';
		},false);
	}
},false);

//为保存，和发布问卷按钮绑定事件；
var saveBtn = document.getElementsByName('保存问卷')[0];
var releaseBtn = document.getElementsByName('发布问卷')[0];
(function(){
	var questionnairs;
	if (!window.localStorage.getItem('question')) {
		questionnairs = [];
	}else{
		//questionnairs = [];
		questionnairs = JSON.parse(window.localStorage.question);
	}
	saveBtn.addEventListener('click',function(){
		var questionnair = saveQuestionnair('未发布');
		questionnairs.push(questionnair);
		var str = JSON.stringify(questionnairs);
		window.localStorage.question = str;
	},false);
	releaseBtn.addEventListener('click',function(){
		var questionnair = saveQuestionnair('发布中');
		questionnairs.push(questionnair);
		var str = JSON.stringify(questionnairs);
		window.localStorage.question = str;
	},false);
})();
























