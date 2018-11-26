// 封装函数

var getEle = function(cls){
	return document.querySelector(cls);
}

var  getEles = function(cls){
	return document.querySelectorAll(cls);
}

var getCls = function(element){
	return element.getAttribute('class');
}

var setCls = function(element , cls){
	return element.setAttribute('class',cls);
}

var addCls = function(element , cls){
	var basCls = getCls(element);
	if(basCls.indexOf(cls)===-1){
		setCls(element,basCls+' '+cls);
	}
}


var delCls = function(element , cls){
	var basCls = getCls(element);
	if(basCls.indexOf(cls) != -1){
		setCls(element,basCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
	return ;
}



var screenAnimateElement = {
	".section1Wrap" : [
		".section1Wrap-title",
		".section1Wrap-pic",
		".section1Wrap-shadow",
	],
	".section2" : [
		".section2-title",
		".section2-text",
		".section2-phone",
		".section2-phone-right",
		".section2-phone-left",
		".section2-phone-leftOther",
	],
	".section3" :[
		".section3Wrap-title",
		".section3Wrap-text",
		".section3Wrap-phone",
		".section3Wrap-show"
	],
	".section4" :[
		".section4-title",
		".section4-text",
		".section4-phone-item-1",
		".section4-phone-item-2",
		".section4-phone-item-3",
		".section4-phone-item-4"
	],
	".section5" :[
		".section5-title",
		".section5-text",
		".section5-phone"
	]
}

var setAnimateElements = function(sectionCls){
	var animateElement = screenAnimateElement[sectionCls];
	for(var i=0;i<animateElement.length;i++){
		var element = document.querySelector(animateElement[i]);
		var basCls = element.getAttribute('class');
		element.setAttribute('class',basCls+' '+animateElement[i].substr(1)+'-animate-init');
	}
}

window.onload = function(){
	for(k in screenAnimateElement){
		if(k == ".section1Wrap"){
			continue;
		}
		setAnimateElements(k);
	}
}

setTimeout("setAnimateInit('.section1Wrap')",100)

window.onscroll = function(){
	var top = document.body.scrollTop;
	if(top>=0){
		setAnimateInit('.section1Wrap');
		switchCls(0);
		setScrollSlid(0);
	}
	if(top>750){
		setAnimateInit('.section2');
		switchCls(1);
		setScrollSlid(1);
	}
	if(top>1550){
		setAnimateInit('.section3');
		switchCls(2);
		setScrollSlid(2);
	}
	if(top>2350){
		setAnimateInit('.section4');
		switchCls(3);
		setScrollSlid(3);
	}
	if(top>3150){
		setAnimateInit('.section5');
		switchCls(4);
		setScrollSlid(4);
	}

	if(top>20){
		addCls(getEle('.header'),'header-animate-init');
	}else{
		delCls(getEle('.header'),'header-animate-init')
	}

	if(top>200){
		addCls(getEle('.sideBar'),'sideBar-animate-done');
	}else{
		delCls(getEle('.sideBar'),'sideBar-animate-done');
	}
}


var setAnimateInit = function(sectionCls){
	var animateElement = screenAnimateElement[sectionCls];
	for(var i=0;i<animateElement.length;i++){
		var element = document.querySelector(animateElement[i]);
		var basCls = element.getAttribute('class');
		element.setAttribute('class',basCls.replace('-animate-init','-animate-done'));
	}
}

// 跳转页
var hCls = getEles(".headerWrap-nav-item");
var sCls = getEles(".sideBar-item");

var setFocus = function(i,cls){
	cls.onclick = function(){
			document.body.scrollTop=i*800-40;
			addCls(hCls[i],'headerWrap-nav-item-active')

	}
}

for(var i=0;i<hCls.length;i++){
	setFocus(i,hCls[i]);
}

for(var i=0;i<sCls.length;i++){
	setFocus(i,sCls[i]);
}

var switchCls = function( idx ){
	for(var i = 0;i<hCls.length;i++){
		delCls(hCls[i],'headerWrap-nav-item-active');
		delCls(sCls[i],'sideBar-item-active');
	}
	addCls(hCls[idx],'headerWrap-nav-item-active');	
	addCls(sCls[idx],'sideBar-item-active');
	return indexSwitch = idx;
}

// 滑动条
var slide = getEle(".slide");

var setSlide = function(i,cls){
	cls.onmouseover = function(){
		slide.style.left = i*53 + 'px';
	}
	cls.onmouseout = function(){
		slide.style.left = indexSwitch*53 + 'px';
	}
}

for(var i=0;i<hCls.length;i++){
	setSlide(i,hCls[i]);
}
for(var i=0;i<sCls.length;i++){
	setSlide(i,sCls[i]);
}


//滚动屏幕滑动条移动
var setScrollSlid = function(i){
	slide.style.left = i*53 + 'px';
}