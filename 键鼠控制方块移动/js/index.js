/*
 问题描述：用 js 的键盘事件控制一个 div 移动，当按下一个方向键不放，div 会先停顿一下，然后才开始持续移动。（原因：系统要区分用户是否连续输入，第一个到第二个之间有一个停顿时间）
同时按下两个方向的按键时无法正确移动，也就是 div 无法斜着移动。（键盘按键事件只能当个触发）
解决方法：定时器，onkeyup 和 onkeydown 事件，keyCode 对应布尔值。
重点在于 onkeyup 和 onkeydown 事件中并不直接让 div 运动，而是改变 keyCode 对应的布尔值，然后在通过判断布尔值真假来让 div 运动。
所以需要声明一个对象用来存放键盘上按键的键码 keyCode 以及其对应的布尔值。初始时这个对象里可以不放数据。
onkeydown 事件发生时，将这个按键的 keyCode 作为属性，true 作为属性值添加到对象中（如果相应属性已经存在就是更新属性值）。
onkeydown 事件发生时，更新这个按键的 keyCode 对应的属性值为 false。
这样就能通过按键 keyCode 对应的属性值来判断按键是处于按下状态还是抬起状态，然后再让 div 运动，就能解决长按停顿的问题。
同时这种方法还能解决无法同时按下两个方向按键的问题。
最后通过定时器每隔一段时间（16ms）触发一次运动，可以让方块平衡、流畅的运动。
 * */

var box=document.getElementById("box");

//声明一个对象用来存放键盘上按键的键码 keyCode 以及其对应的布尔值。初始时这个对象里可以不放数据
var key={
	//上下左右箭头
	38:false,
	40:false,
	37:false,
	39:false,
	//WASD，上左下右
	87:false,
	65:false,
	83:false,
	68:false
};
var maxHeight=window.innerHeight-box.offsetHeight;
var maxWidth=window.innerWidth-box.offsetWidth;
var L=0,T=0;

window.onresize=function(){
	//窗口大小变化后，重新获取一下值
	maxHeight=window.innerHeight-box.offsetHeight;
	maxWidth=window.innerWidth-box.offsetWidth;
	//console.log(maxHeight,maxWidth)
}

document.onkeydown=function(ev){
	key[ev.keyCode]=true;		//在发送键盘按键按下事件时，将这个按键的 keyCode 作为属性，true 作为属性值添加到对象 key 中（如果相应属性已经存在就是更新属性值）。
	//console.log(key);
};
document.onkeyup=function(ev){
	key[ev.keyCode]=false;		//在发送键盘按键抬起事件时，更新这个按键的 keyCode 对应的属性值为 false。
	//console.log(key);
};

//键盘控制移动
//通过定时器每隔一段时间调用一次，使方块平滑移动
setInterval(function(){
	if(key[37]||key[65]){		//当对象中 37（或 65）对应的属性值为 true 时，表示按下了左箭头（A 键）
		//直接通过条件语句控制范围
		/*L=box.offsetLeft-5
		if(L<0){
			L=0
		}*/
		//三目运算符
		//L=box.offsetLeft-5<0?0:box.offsetLeft-5
		
		//通过函数控制范围
		L=limits(box.offsetLeft-5,'left')
		box.style.left=L+'px';
	}
	
	if(key[38]||key[87]){
		//定时器每隔一段时间触发，代码每次走到这里时，都是先获取到最新值，然后减 5，再限制值的范围，最后将其设置为方块的定位值。
		T=box.offsetTop-5<0?0:box.offsetTop-5
		box.style.top=T+'px';
	}
	
	if(key[39]||key[68]){
		L=box.offsetLeft+5>maxWidth?maxWidth:box.offsetLeft+5
		box.style.left=L+'px';
	}
	
	if(key[40]||key[83]){
		//T=box.offsetTop+5>maxHeight?maxHeight:box.offsetTop+5
		T=limits(box.offsetTop+5,'top')
		box.style.top=T+'px';
	}
},16);

//鼠标拖拽
box.onmousedown=function(event){
	var X=event.pageX-box.offsetLeft
	var Y=event.pageY-box.offsetTop
	//这里把鼠标移动事件添加到 document 身上，可以避免鼠标快速移动时，鼠标从方块身上移出时引发的异常
	document.onmousemove=function(event){
		L=limits(event.pageX-X,'left')
		T=limits(event.pageY-Y,'top')
		box.style.left=L+'px'
		box.style.top=T+'px'
	}
}
box.onmouseup=function(){
	document.onmousemove=null;
}

//双击变色
box.ondblclick=function(){
	box.style.background=box.style.background=='deepskyblue'?'#DDDDDD':'deepskyblue'
}

//限制移动范围
function limits(n,str){
	switch (str){
		case 'left':
			if(n<0){
				n=0
			}else if(n>maxWidth){
				n=maxWidth
			}
			return n
			/*break*/		//因为已经有 return 了，所以此处 break 可以省略，不影响结果
		case 'top':
			if(n<0){
				n=0
			}else if(n>maxHeight){
				n=maxHeight
			}
			return n
			/*break*/
	}
}
