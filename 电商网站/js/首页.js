//导航栏动画；
$(function navSlide(){
	var $imgNumA = $('.imgnum a');
	$imgNumA.mouseover(function(){
		//目标元素背景颜色变化；
		$(this).siblings('a').removeClass('active');
		$(this).addClass('active');
		var index = $(this).index();
		//对应的图片变化；
		var $li = $(this).parent().prev().find('li');
		var $imgbox = $(this).parent().prev();
		//移动距离；
		var distance = index * $li.width();
		if (!$imgbox.is(':animated')) {
			$imgbox.animate({left:-distance},500);
		}
	});
}
);
//商品分类
$(function navBar(){
	var $li = $('.nav li');
	var $shopClassList = $('.shopClasslist');
	var $shopClassItem = $('.shopClassItem');
	$li.mouseover(function(){
		$(this).addClass('active');
	});
	$li.mouseout(function(){
		$(this).removeClass('active');
	});
	$shopClassItem.mouseover(function(event) {
		$(this).addClass('shopClassItem_active');
		$shopClassList.removeClass('hide');
		$shopClassList.css({
			'z-index': '1000',
			'background-color': 'white'
		});
	});
	$shopClassItem.mouseout(function(event) {
		$(this).removeClass('shopClassItem_active');
		$shopClassList.addClass('hide');
	});
	$shopClassList.mouseover(function(event) {
		$(this).removeClass('hide');
		$shopClassList.css({
			'z-index': '1000',
			'background-color': 'white'
		});
	});
	$shopClassList.mouseout(function(event) {
		$(this).addClass('hide');
	});

}
);


























	



