window.onload=function(){
	var imgX=document.querySelector("#imgX")
	var imgY=document.querySelector("#imgY")
	var L=-300
	var T=-300
	document.onkeydown=function(ev){
		switch(ev.keyCode){
			//左箭头：37		上箭头：38		右箭头：39		下箭头：40
			case 37:
				moveto("left")
				break;
			case 38:
				moveto("top")
				break;
			case 39:
				moveto("right")
				break;
			case 40:
				moveto("bottom")
				break;
		}
	}
	
	//运动
	function moveto(direction){
		if(direction=="top"){
			T-=300
			move(imgX,{top:-300},500,"linear")
			move(imgY,{top:T},500,"linear",function(){
				imgX.style.top=0
				imgX.style.zIndex=1
				imgY.style["z-index"]=2		//两种写法
				//console.log(T)
				if(T==-2100){
					imgY.style.top=-600+"px"
					T=-600
				}
			})
		}else if(direction=="right"){
			L+=300
			move(imgY,{left:300},500,"linear")
			move(imgX,{left:L},500,"linear",function(){
				imgY.style.left=0
				imgX.style["z-index"]=2
				imgY.style["z-index"]=1
				if(L==0){
					imgX.style.left=-1500+"px"
					L=-1500
				}
			})
		}else if(direction=="bottom"){
			T+=300
			move(imgX,{top:300},500,"linear")
			move(imgY,{top:T},500,"linear",function(){
				imgX.style.top=0
				imgX.style.zIndex=1
				imgY.style["z-index"]=2
				//console.log(T)
				if(T==0){
					imgY.style.top=-1800+"px"
					T=-1800
				}
			})
		}else if(direction=="left"){
			L-=300
			move(imgY,{left:-300},500,"linear")
			move(imgX,{left:L},500,"linear",function(){
				imgY.style.left=0
				imgX.style["z-index"]=2
				imgY.style["z-index"]=1
				if(L==-1800){
					imgX.style.left=-300+"px"
					L=-300
				}
			})
		}
	}
}
