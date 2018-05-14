window.onload=function(){
	var plus=document.querySelectorAll("#box li p span");
	var uls=document.querySelectorAll("#box li ul");
	var last=0;
	for(var i=0;i<plus.length;i++){
		plus[i].index=i
		plus[i].onclick=function(){
			if(uls[this.index].style.display=="block"){
			//当条件成立时表示自己是显示的，且点击的是自己
				this.innerHTML="+"
				uls[this.index].style.display="none"
				
			}else{
			//因为页面初始时行间样式为空，所以每个图标第一次点击时代码走这里（上面的条件不成立）。
			//当有了行间样式后代码再次走这里表示点击的不是自己
				uls[last].style.display="none"
				plus[last].innerHTML="+"

				this.innerHTML="×"
				uls[this.index].style.display="block"
				
				last=this.index
			}
		}
	}
}
