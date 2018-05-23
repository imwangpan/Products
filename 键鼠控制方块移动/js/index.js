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
document.onkeydown=function(ev){
	key[ev.keyCode]=true;		//在发送键盘按键按下事件时，将这个按键的 keyCode 作为属性，true 作为属性值添加到对象 key 中（如果相应属性已经存在就是更新属性值）。
	//console.log(key);
};
document.onkeyup=function(ev){
	key[ev.keyCode]=false;		//在发送键盘按键抬起事件时，更新这个按键的 keyCode 对应的属性值为 false。
	//console.log(key);
};

setInterval(function(){
	if(key[37]||key[65]){		//当对象中 37（或 65）对应的属性值为 true 时，表示按下了左箭头（A 键）
		box.style.left=box.offsetLeft-5+'px';
	}
	
	if(key[38]||key[87]){
		box.style.top=box.offsetTop-5+'px';
	}
	
	if(key[39]||key[68]){
		box.style.left=box.offsetLeft+5+'px';
	}
	
	if(key[40]||key[83]){
		box.style.top=box.offsetTop+5+'px';
	}
},16);