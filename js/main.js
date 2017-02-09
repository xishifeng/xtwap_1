//商品评价里的点击查看大图，swiper效果。因为pingjia-more页面懒加载的原因。click事件写在标签里
//因为调用了swipe方法。jquery.touchSwipe.min.js需要比main.js先加载
//如果连续滑动多次，速度太快会出BUG
function sppj_zhankai(obj) {
	$(obj).parent().next().show();
	var imgList = $(obj).parent().next().children(".img-list");
	imgList.html($(obj).parent().html());

	index = $(obj).index();
	count = imgList.children().length;
	if(imgList.next().children().length == 0) {
		for(var i = 0; i < count; i++) {
			imgList.next().append("<li></li>");
		}
	}

	imgList.next().css("margin-left", "-" + 0.2 * count + "rem");
	imgList.next().children().removeClass("tip-list-active").eq(index).addClass("tip-list-active");
	imgList.css("left", "-" + 9.6 * index + "rem");

	//Enable swiping...
	imgList.children("div").swipe({
		//Generic swipe handler for all directions
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if(direction == "left" && index < count - 1) {
				index = $(this).index() + 1;
				$(this).parent().animate({
					left: "-=9.6rem"
				}, 200);
				$(this).parent().next().children().removeClass("tip-list-active");
				$(this).parent().next().children().eq(index).addClass("tip-list-active");
			}
			if(direction == "right" && index > 0) {
				index = $(this).index() - 1;
				$(this).parent().animate({
					left: "+=9.6rem"
				}, 200);
				$(this).parent().next().children().removeClass("tip-list-active");
				$(this).parent().next().children().eq(index).addClass("tip-list-active");
			}
			if(direction == "up") {
				event.preventDefault();
				console.log(distance);
				$("body").animate({
					scrollTop: "+=" + distance * 1.2
				}, 200);
			}
			if(direction == "down") {
				event.preventDefault();
				console.log(distance);
				$("body").animate({
					scrollTop: "-=" + distance * 1.2
				}, 200);
			}

		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold: 0
	});

}


//滑动加载更多函数,公共方法
function slideLoad(newEle, par) {
	$(window).scroll(function() {
		
//		var scrollTop = $(this).scrollTop();
//		var scrollHeight = $(document).height();
//		var windowHeight = $(this).height();
		var scrollTop = $(document.body).scrollTop();　　
        var scrollHeight = $('body').height();　　
        var windowHeight = window.innerHeight;
		var scrollWhole = Math.max(scrollHeight - scrollTop - windowHeight);
		if(scrollWhole<300){
			par.append(newEle + newEle + newEle + newEle);
		}
	});
}

//URL参数抓取
function GetArgsFromHref(sHref, sArgName) {
	var args = sHref.split("?");
	var retval = "";

	if(args[0] == sHref) /*参数为空*/ {
		return retval; /*无需做任何处理*/
	}
	var str = args[1];
	args = str.split("&");
	for(var i = 0; i < args.length; i++) {
		str = args[i];
		var arg = str.split("=");
		if(arg.length <= 1) {
			continue;
		}
		if(arg[0] == sArgName) {
			retval = arg[1];
		}
	}
	return retval;
}

//主体部分

$(document).ready(function() {
	//设置页面body的最小高度，和屏幕可视区域高度相等
	$("body").css({
		"min-height": $(window).height()
	});

	//header里返回图标的点击事件
	$("span.header-back").click(function() {
		history.back();
	});

	//底部链接的点击效果
	$("footer>a").click(function() {
		$("footer>a").removeClass("footer-a-active");
		$(this).addClass("footer-a-active");
	});
	
	//首页back-top图标的show与hide，暂未启用
	
	var flag =1;
	$(document).scroll(function() {
		var aa = $(this).scrollTop();
		if(flag == 1){
			if($(this).scrollTop() >= 600) {
				$("body").append('<a id="back-top" href="#top"></a>');
				$("a#back-top").fadeIn("fast");
				flag = 0;
			}
		}else{
			if($(this).scrollTop() < 600){
				$("a#back-top").fadeOut().remove();
				flag = 1;
			}
		}
		
	});

	//首页二维码点击大图部分
	$("#erweima-show").click(function() {
		$(".shouye-bottom-erweima-lg").fadeIn();
	});
	$(".shouye-bottom-erweima-lg").click(function() {
		$(this).fadeOut();
	});

	
	
	//搜索页面
	$("button.dianji-sousuo-btn").click(function() {
		if($(this).prev().val() != '') {
			location.href = "sousuo.html?shuru=" + $(this).prev().val();
		}
	});

	$("div.sousuo-ci>a").click(function() {
		location.href = "sousuo.html?shuru=" + $(this).text();
	});

	//我的订单-待支付页面里，跳转去支付页面的链接添加
//	$("span.dingdan-quxiao").click(function(){
//		if($(this).text()!=="已取消"){
//			$(this).fadeOut("fast").fadeIn("slow").text("已取消");
//		}
//	})
	
	//优质商家里的tab切换
	$(".youzhishangjia-tab>span").click(function() {
		$(this).siblings().removeClass("youzhishangjia-tab-span-active");
		$(this).addClass("youzhishangjia-tab-span-active");
		var eq = parseInt($(this).attr("data-eq"));
		//		console.log(eq);
		$(".youzhishangjia-content-box").children().eq(eq).show().siblings().hide();
	});
	
	//优质商家-作品欣赏tab切换部分
	$(".youzhishangjia-content-zpxs-title>span").click(function() {
		$(this).siblings().removeClass("youzhishangjia-zpxs-span-active");
		$(this).addClass("youzhishangjia-zpxs-span-active");
		var eq = parseInt($(this).attr("data-eq"));
		$(this).parent().siblings().eq(eq).show().siblings().not(".youzhishangjia-content-zpxs-title").hide();
	});
	
	//优质商家-作品欣赏-查看更多，收起的滑动效果
	$(".section-ckgd").click(function() {
		$(this).next().slideDown();
		$(this).nextAll(".section-sq").slideDown();
		$(this).slideUp();
	});
	$(".section-sq").click(function() {
		$(this).prev().slideUp();
		$(this).prevAll(".section-ckgd").slideDown();
		$(this).slideUp();
		var scroll_offset = $(this).prevAll(".section-ckgd").offset(); 
		$("body,html").animate({
			scrollTop: scroll_offset.top - 400
		}, 200);
	});
	
	
	//商品信息里的收藏icon
	$("span.header-shoucang").click(function() {
		$(this).toggleClass("header-shoucang-active");
	});
	//商品信息里的展开收起事件
//	$("div.shangpinxinxi-jieshao>div>span").click(function(){
//		if($("div.shangpinxinxi-jieshao>p").hasClass("spxx-p-shouqi")){
//			$("div.shangpinxinxi-jieshao>p").removeClass("spxx-p-shouqi");
//			$(this).removeClass().addClass("span-shouqi");
//		}else{
//			$("div.shangpinxinxi-jieshao>p").addClass("spxx-p-shouqi");
//			$(this).removeClass().addClass("span-zhankai");
//		}
//	});

	//三亚页面导航条部分
	$("section.select-bar>div").click(function() {
		var eq = parseInt($(this).attr("data-eq"));
		$(".select-bar-list").children().eq(eq).show().siblings().hide();
		//注意eq的值，是从0开始的
		$(".select-bar>div").removeClass("bar-active");
		$(this).addClass("bar-active");
		$(".select-bar-mask").show();
	});
	$(".select-bar-mask").click(function() {
		$(this).hide();
		$(".select-bar>div").removeClass("bar-active");
		$(".select-bar-list>ul, .select-bar-list>div").hide();
	});

	//忘记密码的隐藏与显示部分
	$("#xianshi-pwd").click(function() {
		if($("#input-pwd").attr("type") == "password") {
			$("#input-pwd").attr("type", "text");
			$(this).text("隐藏密码");
		} else {
			$("#input-pwd").attr("type", "password");
			$(this).text("显示密码");
		}
	});

	//我的收藏tab切换
	$(".wode-wodeshoucang-tab>span").click(function() {
		$(this).siblings().removeClass("wode-wodeshoucang-tab-span-active");
		$(this).addClass("wode-wodeshoucang-tab-span-active");
		$("#wode-wodeshoucang-bar-spxx-span").text($(this).text() + "信息");

		if($(this).text() == "商品") {
			$(".wode-wodeshoucang-sjxx-content").hide();
			$(".wode-wodeshoucang-spxx-content").show();
		} else {
			$(".wode-wodeshoucang-spxx-content").hide();
			$(".wode-wodeshoucang-sjxx-content").show();
		}
	});
	//我的收藏-取消收藏
	$("span.wodeshoucang-qxsc").click(function() {
		$(this).parent().hide("slow");
	});

	//我的订单tab切换部分
	$(".wode-wodedingdan-tab>span").click(function() {

		$(this).siblings().removeClass("wode-wodedingdan-tab-span-active");
		$(this).addClass("wode-wodedingdan-tab-span-active");
		var eq = parseInt($(this).attr("data-eq"));
		$("div.wode-wodedingdan-content>div").eq(eq).show().siblings().hide();
	});

	//我的点评tab切换,此页面暂未启用
	$(".wode-wodedianping-tab>span").click(function() {
		$(this).siblings().removeClass("wode-wodedianping-tab-span-active");
		$(this).addClass("wode-wodedianping-tab-span-active");
		var eq = parseInt($(this).attr("data-eq"));
		$("div.wode-wodedianping-content>div").eq(eq).show().siblings().hide();
		if($("div.wode-wodedianping-tab>span[data-eq='1']").hasClass("wode-wodedianping-tab-span-active")) {
			$("section.xingqing-small-title").show();
		} else {
			$("section.xingqing-small-title").hide();
		}
	});

	//提交订单部分  数量count增减
	$("#tijiaodingdan-count-jia").click(function() {
		var count = $("#tijiaodingdan-count-num").text();
		if(count < 10) {
			count++;
			$("#tijiaodingdan-count-num").text(count);
			$("#shuliang").val(count);
		}
	});
	$("#tijiaodingdan-count-jian").click(function() {
		var count = $("#tijiaodingdan-count-num").text();
		if(count > 1) {
			count--;
			$("#tijiaodingdan-count-num").text(count);
			$("#shuliang").val(count);
		}
	});

	//付款方式里上下滑动部分
	$("section#fukuanfangshi-ckgd").click(function() {
		$(this).next().slideDown();
		$(this).slideUp();
	});
	$("section#fukuanfangshi-sq").click(function() {
		$(this).parent().prev().slideDown();
		$(this).parent().slideUp();
	});

	//付款方式里的active事件
	$("section.fukuanfangshi-list").not('[id="fukuanfangshi-ckgd"],[id="fukuanfangshi-sq"]').click(function() {
		$("section.fukuanfangshi-list").removeClass("fukuanfangshi-list-active");
		$(this).addClass("fukuanfangshi-list-active");
	});

	//商品评价里的星星icon点击事件,此页面暂未启用
	$("section.pingjia-zongfen>span").click(function() {
		$(this).parents().children().addClass("pingjia-zongfen-span-active");
		$(this).nextAll().removeClass("pingjia-zongfen-span-active");
	});

	$("div.pingjia-content-yuju>textarea").focus(function() {
		if($(this).text() === "消费体验过后，赶紧发表您的评价吧！") {
			$(this).text("");
			$(this).removeClass("pingjia-textarea-chushi");
		}
	});
	$("div.pingjia-content-yuju>textarea").blur(function() {
		if($(this).text() === "") {
			$(this).text("消费体验过后，赶紧发表您的评价吧！");
			$(this).addClass("pingjia-textarea-chushi");
		}
	});

	//修改密码里的一些事件
	$(".bangding-quxiao").click(function() {
		$(this).parent().parent().hide();
		$("div.bangding").hide();
	});

	//绑定手机号和修改手机号
	$(".shoujihao-bd-btn").click(function() {
		$("div.bangding").show();
		if($(this).text() == "立即绑定") {
			$(".bangding-shouji").fadeIn().siblings().hide();
		} else {
			$(".bangding-xiugaishouji").fadeIn().siblings().hide();
		}
	});
	$('input[type="submit"][form="bangding-shouji"]').click(function(event) {
		event.preventDefault();
		if($(".shoujihao-bd-btn").text() == "立即绑定") {
			$(".shoujihao-bd-btn").text("修改");
			$(".shoujihao-bd-btn").prev().text("已绑定").css("color", "#505050");
		}
		$("div.bangding").children().hide();
		$("div.bangding").hide();
		$(".bangding-yiwancheng").fadeIn("fast");
		$(".bangding-yiwancheng").fadeOut(2000);

	});
	$('input[type="submit"][form="bangding-xiugaishouji"]').click(function(event) {
		event.preventDefault();
		$("div.bangding").children().hide();
		$("div.bangding").hide();
		$(".bangding-yiwancheng").fadeIn("fast");
		$(".bangding-yiwancheng").fadeOut(2000);
	});


	//用户名的修改
	$(".yonghuming-xiugai-btn").click(function() {
		$("div.bangding").show();
		$(".bangding-xiugaiyonghuming").fadeIn().siblings().hide();
	});
	$('input[type="submit"][form="bangding-xiugaiyonghuming"]').click(function(event) {
		event.preventDefault();
		var aa = $("input[name='new-yonghuming']").val();
		if(aa != "") {
			$(".yonghuming-xiugai-btn").prev().text(aa);
		}

		$("div.bangding").children().hide();
		$("div.bangding").hide();
		$(".bangding-yiwancheng").fadeIn("fast");
		$(".bangding-yiwancheng").fadeOut(2000);
	});

	//设置密码和修改密码
	$(".mima-shezhi-btn").click(function() {
		$("div.bangding").show();
		if($(this).text() == "立即设置") {
			$(".bangding-shezhimima").fadeIn().siblings().hide();
		} else {
			$(".bangding-xiugaimima").fadeIn().siblings().hide();
		}
	});
	$('input[type="submit"][form="bangding-shezhimima"]').click(function(event) {
		event.preventDefault();
		if($(".mima-shezhi-btn").text() == "立即设置") {
			$(".mima-shezhi-btn").text("修改");
			$(".mima-shezhi-btn").prev().text("已设置").css("color", "#505050");
		}
		$("div.bangding").children().hide();
		$("div.bangding").hide();
		$(".bangding-yiwancheng").fadeIn("fast");
		$(".bangding-yiwancheng").fadeOut(2000);
	});
	$('input[type="submit"][form="bangding-xiugaimima"]').click(function(event) {
		event.preventDefault();
		$("div.bangding").children().hide();
		$("div.bangding").hide();
		$(".bangding-yiwancheng").fadeIn("fast");
		$(".bangding-yiwancheng").fadeOut(2000);
	});


	//获取验证码的弹框事件
	$("span.hqyzm").click(function() {
		if($("input[placeholder='请输入手机号']").val()!=""){
			$("div.yanzhengma-mask").fadeIn();
		}else{
			$("#alert-tips").text("请输入完整信息").show("fast");
			$("#alert-tips").fadeOut(1800);
		}
	});
	$(".yanzhengma-queding").click(function() {
		$("div.yanzhengma-mask").fadeOut();
	});
	$("span.yanzhengma-guanbi").click(function(){
		$(this).parents(".yanzhengma-mask").hide();
	});
	

	//寻址链接部分,放到最后，保证data-url添加完毕后再执行
	$("[data-url]").click(function(event) {
		event.stopPropagation();
		location.href = $(this).attr("data-url");
	});
});