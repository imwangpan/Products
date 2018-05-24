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
console.log(maxHeight,maxWidth)
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
