/*
 * 滚动条滑块高度
 * 滚动条滑块高度应该随着内容的多少而变化。内容越多，滑块高度越小；内容越少，滑块高度越大。
 * 用内容的高度除以父级文本框的高度，得到一个倍数（multiple）。
 */


var box=document.querySelector("section")
var texts=document.querySelector("#text")
var scrollBar=document.querySelector("#scrollBar")
var slider=document.querySelector("#slider")
var upArrow=document.querySelector("#upArrow")
var downArrow=document.querySelector("#downArrow")
var sliderBox=document.querySelector("#sliderBox")
var scrollMax=scrollBar.clientHeight-downArrow.clientHeight-slider.clientHeight;
var start=upArrow.clientHeight;
var t=upArrow.clientHeight;		//滑块滚动的距离。初始时设置为上箭头的高度，也就是滑块的初始位置。
var timer;

slider.onmousedown=function(ev){
	var disY=ev.clientY-slider.offsetTop
	this.className="active";
	//console.log(scrollBar.clientHeight-upArrow.clientHeight-slider.clientHeight)
	document.onmousemove=function(ev){
	//这里可以给 slider 添加 mousemove 事件，也可以给 document 添加（需注意的是这里给谁添加的下面代码就要给谁清除）。给 document 添加用户体验更好：按住鼠标后即使鼠标从 slider 身上移出也能移动滚动条。
		t=ev.clientY-disY
		scroll()
	}
	document.onmouseup=function(ev){
	//注意：这里如果是给 slider 添加 mouseup 事件会导致一些问题：按住鼠标后从 slider 身上移出，抬起鼠标后下面的代码无法执行，所以要给 document 添加 mouseup 事件
		slider.className="";
		document.onmousemove=null
	}
	ev.cancelBubble=true;
	return false;
}

//滚动条的主体内容
function scroll(){
	if(t<upArrow.clientHeight){		//上箭头的高度
		t=upArrow.clientHeight;
		clearInterval(timer);
		
	}else if(t>scrollMax){
		t=scrollMax	;	//500-26-60=414
		clearInterval(timer);
	}
	slider.style.top=t+"px";
	
	//内容滚动
	var scale=(t-start)/(scrollMax-start)		//这里需要注意的是：slider 的起点是从 26（26 是上箭头的高度）开始的，而 texts 的起点是从 0 开始的，所以这里需要进行一定的转换，把 slider 起点、终点都向上移动 26，也就是都减 26 ，总距离不变。
	texts.style.top=(box.clientHeight-texts.clientHeight)*scale+"px"
	//console.log(texts.style.top)
};

//滚轮事件封装函数，判断向上滚动还是向下滚动
function myScroll(obj,upFn,downFn){
	
	obj.onmousewheel=fn;
	obj.addEventListener('DOMMouseScroll',fn);
	
	//声明一个函数，用来判断鼠标滚轮是向上滚动还是向下滚动
	function fn(ev){
		if(ev.wheelDelta>0 || ev.detail<0){
			//这个条件成立，说明现在鼠标滚轮是往上边滚动
			//upFn();
			upFn.call(obj,ev);		//调用函数的一种方式。在调用的时候会传参数
		}else{
			//走这里说明，说明鼠标滚轮是往下滚动
			//downFn();
			downFn.call(obj,ev);
		}
		
		//清除浏览器的默认行为
		ev.preventDefault();
		return false;
	};
}

//滚轮事件
myScroll(box,function(){
	t-=50;
	scroll();
},function(){
	t+=50;
	scroll();
})

//上箭头
upArrow.onmousedown=function(){
	timer=setInterval(function(){
		t-=10
		scroll();
	},16)
 }

//下箭头
downArrow.onmousedown=function(){
	timer=setInterval(function(){
		t+=10;
		scroll();
	},16)
}

//点击滚动条其它地方
sliderBox.onclick=function(ev){
	t=ev.clientY-scrollBar.getBoundingClientRect().top-slider.clientHeight/2;		//这里不能用 offsetTop，它是返回到最近有定位父级的距离。
	//减去 slider 高度的一半，让鼠标刚好在它中间
	scroll();
	ev.cancelBubble=true;
}
