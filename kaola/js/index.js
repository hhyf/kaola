var flag = true;
//点击top回到顶部
$('.last').click(function(){
	$('body,html').animate({scrollTop : 0},1000);
	$(this).parent().parent().parent().css("display","none")
})

var $list = $('.list li:not(.shopcar)');
var $oDiv = $('.lout');
$list.hover(function(){
	$(this).css("background",'#ab0f29')
},function(){
	$(this).css("background",'#e31436')
})
$list.click(function(){
	var $index = $(this).index() - 1;
	var $t = $oDiv.eq( $index ).offset().top;
	$('body,html').animate({"scrollTop" : $t},1000);
})


//滚动条事件
$(window).scroll(function(){
	var sTop = $('html,body').scrollTop();
	var height = $('#nav').height()	+ $('#header').height() + $('#toplink').height() + $('#banner').height();
	if(sTop >= height){
		$('.m-sidebar').css("display","block");
	}else{
		$('.m-sidebar').css("display","none");
	}
	$floor = $oDiv.filter(function(index){
		return Math.abs($(this).offset().top - sTop ) < $(this).height() / 2;
	})
	var $index = $floor.index();
	for(var i = 0;i < $list.size() - 1;i ++){
		if($index != -1 && $index == i){
			$list.eq($index - 1).css("background",'#ab0f29');
		}else{
			$list.eq(i).css("background",'#e31436');
		}
	}
})

//鼠标移入手机考拉的效果
$('.nav_code').hover(function(){
	$('.img1').css("display","block");
},function(){
	$('.img1').css("display","none");
})

//鼠标移入导航栏效果
$('.enter_li').mouseenter()

//下拉菜单
$('.enter_li').hover(function(){
	$(this).css("background",'#fff');
	$(this).find('.enter_li_list').css("display","block");
	$(this).find('.li_a').css('color','red');
	$(this).find('i').removeClass('angle').addClass('redangle');
},function(){
	$(this).css("background",'#000');
	$(this).find('.enter_li_list').css("display","none");
	$(this).find('.li_a').css('color','#999');
	$(this).find('i').removeClass('redangle').addClass('angle');
})

//轮播图
//获取所有轮播的div
/*
	1. 获取所有的大图
	2. 求大图的数量
	3. ol li (小圆点)   左按钮   右按钮   文字信息的div
	4. 设置轮播   当前下标
	5. 添加事件
	6. 自动轮播
	
*/
$.extend({
	init : function(id){
		this.list = $(id).find('.pic');
		this.num = this.list.size();
		this.oli = $(id).find('ol li');
		this.createEle();
		this.ltBtn = $('#ltBtn');
		this.rtBtn = $('#rtBtn');
		this.indexA = 0;
		this.timer = null;
		this.slider();
		this.addEvent();
		this.autoPlay();
		return this;
	},
	createEle : function(){
		//左按钮
		var ltBtn = $("<span id='ltBtn'></span>");
		ltBtn.html('&lt;');
		$('.btn').append(ltBtn);
		//右按钮
		var rtBtn = $("<span id='rtBtn'></span>");
		rtBtn.html("&gt;");
		$('.btn').append(rtBtn);
	},
	slider : function(){
		for(var i = 0;i < this.num;i ++){
			this.list.eq(i).css("display","none");
			this.oli.eq(i).css("background","#fff");
		}
		this.list.eq(this.indexA).css("display","block");
		this.oli.eq(this.indexA).css("background","#FF2337");
	},
	addEvent : function(){
		var that = this;
		$('#banner').mouseenter(function(){
//			that.createEle();
		})
		$('#banner').mouseleave(function(){
//			$('#ltBtn').remove();
//			$('#rtBtn').remove();
		})
		this.ltBtn.click(function(){
			clearInterval(that.timer);
			that.indexA --;
			if(that.indexA == -1){
				that.indexA = that.num - 1;
			}
			that.slider();
			that.autoPlay();
		})
		this.rtBtn.click(function(){
			clearInterval(that.timer);
			that.indexA ++;
			if(that.indexA == that.num){
				that.indexA = 0;
			}
			that.slider();
			that.autoPlay();
		})
		this.oli.click(function(){
			clearInterval(that.timer);
			that.indexA = $(this).index();
			that.slider();
			that.autoPlay();
		})
	},
	autoPlay : function(){
		var that = this;
		this.timer = setInterval(function(){
			that.indexA ++;
			if(that.indexA == that.num){
				that.indexA = 0;
			}
			that.slider();
		},4000)
	}
})
$.init('#banner');