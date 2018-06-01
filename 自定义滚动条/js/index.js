window.onload=function(){
	var box=document.querySelector("section")
	var texts=document.querySelector("#text")
	var scrollBar=document.querySelector("#scrollBar")
	var slider=document.querySelector("#slider")
	var upArrow=document.querySelector("#upArrow")
	var downArrow=document.querySelector("#downArrow")
	//console.log(getComputedStyle(texts).top)
	console.log(texts.clientHeight,
	box.clientHeight-texts.clientHeight
	)
	slider.onmousedown=function(ev){
		var disY=ev.clientY-slider.offsetTop
		//console.log(scrollBar.clientHeight-upArrow.clientHeight-slider.clientHeight)
		document.onmousemove=function(ev){
		//这里可以给 slider 添加 mousemove 事件，也可以给 document 添加（需注意的是这里给谁添加的下面代码就要给谁清除）。给 document 添加用户体验更好：按住鼠标后即使鼠标从 slider 身上移出也能移动滚动条。
			
			//滚动条滚动
			var t=ev.clientY-disY
			var s=scrollBar.clientHeight-downArrow.clientHeight-slider.clientHeight
			if(t<26){		//26 是上箭头的高度
				t=26
			}else if(t>s){		//s=scrollBar.clientHeight-upArrow.clientHeight-slider.clientHeight
				t=s		//500-26-60=414
			}
			slider.style.top=t+"px"
			
			//内容滚动
			var scale=(t-26)/(s-26)		//这里需要注意的是：slider 的起点是从 26 开始的，而 texts 的起点是从 0 开始的，所以这里需要进行一定的转换，把 slider 起点、终点都向上移动 26，也就是都减 26 ，总距离不变。
			texts.style.top=(box.clientHeight-texts.clientHeight)*scale+"px"
			//console.log(texts.style.top)
		}
		document.onmouseup=function(ev){
		//注意：这里如果是给 slider 添加 mouseup 事件会导致一些问题：按住鼠标后从 slider 身上移出，抬起鼠标后下面的代码无法执行，所以要给 document 添加 mouseup 事件
			
			document.onmousemove=null
		}
		return false;
	}
	
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
		//这里不能用 texts.style.top，因为初始时没有设置行间样式
		var t1=parseFloat(getComputedStyle(texts).top)
		var t2=parseFloat(getComputedStyle(slider).top)
		t1+=50		//50 是自行设置的，滚轮每滚动一次，内容移动 50
		if(t1>0){
			t1=0
		}
		t2-=15		//15 是根据比例算出来的，388*50/1264=15(近似)，388 是滚动条移动的总距离（414-26），970 是内容移动的总距离。滚轮每滚动一次，内容移动 50，滚动条对应移动 20。
		if(t2<26){
			t2=26
		}
		texts.style.top=t1+'px'
		slider.style.top=t2+'px'
	},function(){
		var t1=parseFloat(getComputedStyle(texts).top)
		var t2=parseFloat(getComputedStyle(slider).top)
		var s=scrollBar.clientHeight-downArrow.clientHeight-slider.clientHeight
		t1-=50
		if(t1<box.clientHeight-texts.clientHeight){		//值为-1264
			t1=box.clientHeight-texts.clientHeight
		}
		t2+=15
		if(t2>s){
			t2=s
		}
		texts.style.top=t1+'px'
		slider.style.top=t2+'px'
	})
	
	//上箭头
	upArrow.onclick=function(){
		var t1=parseFloat(getComputedStyle(texts).top)
		var t2=parseFloat(getComputedStyle(slider).top)
		var timer=setInterval(function(){
			t1+=50
			t2-=15
			if(t2<26&&t1>0){
				t2=26
				t1=0
				clearInterval(timer)
			}
			texts.style.top=t1+'px'
			slider.style.top=t2+'px'
		},16)
	}
	
	//下箭头
	downArrow.onclick=function(){
		var t1=parseFloat(getComputedStyle(texts).top)
		var t2=parseFloat(getComputedStyle(slider).top)
		var timer=setInterval(function(){
			t1-=50
			t2+=15
			if(t2>414&&t1<-970){
				t2=414
				t1=-970
				clearInterval(timer)
			}
			texts.style.top=t1+'px'
			slider.style.top=t2+'px'
		},16)
	}
	
	//点击滚动条其它地方
	scrollBar.onclick=function(ev){
		var disY=ev.clientY-scrollBar.getBoundingClientRect().top		//这里不能用 offsetTop，它是返回到最近有定位父级的距离。
		if(disY-30<26){
			disY=56
		}else if(disY-30>414){
			disY=444
		}
		slider.style.top=disY-30+'px'		//减去 slider 高度的一半，让鼠标刚好在 scrollBar 中间
		texts.style.top=(box.clientHeight-texts.clientHeight)*(disY-30-26)/(414-26)+'px'
		//这里 disY-30 就是 slider 的 top 值，然后根据比例算出内容的定位值
	}
}
