var box=document.getElementById("box");
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
	key[ev.keyCode]=true;
	//console.log(key);
};
document.onkeyup=function(ev){
	key[ev.keyCode]=false;
	//console.log(key);
};

setInterval(function(){
	if(key[37]||key[65]){
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