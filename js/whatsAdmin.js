$(function(){

	
	
	//跳转至layout
	function layoutTo(layout,force){
		//when target url equals current url
		if(layout==getLayout()&&force!=true)
			return;
		
		var state = {};
		var layoutUrl="#/"+layout+"/";
		var realUrl="./layout/"+layout+".html";
		
		window.history.pushState(state, "Title", layoutUrl);
		$("iframe").attr("src",realUrl);
		
		//跳转后移动端收起导航栏
		if($(this).outerWidth()<768){
			$("#navbar.navbar-show").slideUp(500).removeClass("navbar-show");
		}
	}

	
	//获取当前的layout
	function getLayout(){
		var hash=document.location.hash;
		if(/#\/.+\//.test(document.location.hash)){
			url=document.location.hash.replace(/(^#\/)|(\/$)/g,"");
			return url;
		}
		return "";
	}

	$("a[layout]").click(function(e){
		var layout=e.target.getAttribute("layout")
		if(layout==null||layout=="")
			return;
		layoutTo(layout);
	});

	//TODO:
	window.addEventListener("popstate", function(e) {
		console.log(e);
	});

	
	
	
	
	
	
	
	
	
	
	
	
	
	/***************************主要逻辑*****************************/
		
	//goto layout when page ready
	var currentLayout;
	(currentLayout=getLayout())==""?layoutTo("homepage",true):layoutTo(currentLayout,true);
	
	//展开侧边导航栏按钮
	$("#collapse-btn").click(function(){
		$("#navbar").slideToggle(500).toggleClass("navbar-show");
	});

	//侧边栏根据媒介不同而自动展开（隐藏）
	//因为运行时已经loaded所以自执行(.resize())一次
	$(window).bind("resize",function(){
		if($(this).outerWidth()<768)
		{
			$("#navbar").not(".navbar-show").slideUp(500);
		}else{
			$("#navbar").slideDown(500);
		}
	}).resize();

});
