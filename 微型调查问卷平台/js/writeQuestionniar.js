//根据hash，index渲染填写问卷页面；同查看数据页渲染；
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
})();
//记录问卷测试结果；
(function(){
	//提交按钮绑定事件；
	var btn = document.querySelector('.btn button');
	btn.addEventListener('click',function(event){
		var index = window.location.hash.slice(1);
		var questionnairs = JSON.parse(window.localStorage.question);
		var status = questionnairs[index].status;
		if (status == '未发布' || status == '已结束') {
			alert('问卷尚未发布，无法填写问卷，请填写已发布问卷');
		}else if(status == '发布中'){
			saveWriteData(index);
			 var target = event.target;
			 target.parentNode.href = '问卷列表页.html';
		}
	},false);
	function saveWriteData(index){
		var li = document.querySelectorAll('li');
		var input = document.querySelectorAll('.options input');
		var textArea = document.querySelectorAll('textarea');
		var questionArr = [];
		//被选中的选项设置属性count；已有属性count则该属性的值自加1；
		for (let i = 0; i < input.length; i++) {
			if (input[i].checked == true) {
				if (isNaN(input[i].nextElementSibling.getAttribute('count'))) {
					input[i].nextElementSibling.setAttribute('count',1);	
				}else{
					console.log(2);
					let a = Number(input[i].nextElementSibling.getAttribute('count'));
					input[i].nextElementSibling.setAttribute('count', a + 1);
				}	
			}
		}
		for (let i = 0; i < textArea.length; i++) {
			if (textArea[i].value != '' ) {
				if (isNaN(textArea[i].getAttribute('count'))) {
					textArea[i].setAttribute('count',1);
				}else{
					let a = Number(textArea[i].getAttribute('count'));
					textArea[i].setAttribute('count',a+1);
				}	
			}
		}
		//重新存储问卷；
		var questionnairs = JSON.parse(window.localStorage.question);
		var questionList = document.querySelector('.question-list');
		var cloneQuestionList = questionList.cloneNode(true);
		questionnairs[index].question = cloneQuestionList.innerHTML;
		window.localStorage.question = JSON.stringify(questionnairs);
	}
})();





































