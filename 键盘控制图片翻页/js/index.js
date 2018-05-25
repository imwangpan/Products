var box=document.querySelector("#img")
var lis=box.getElementsByTagName('li')
var w=box.offsetWidth
var moving=true

document.onkeydown=function(ev){
	if(!moving){
		return
	}
	moving=false
	switch(ev.keyCode){
		//左箭头：37	上箭头：38	右箭头：39	下箭头：40
		//A：65		W：87		D：68		S：65
		case 37||65:	//左
		console.log(box,w)
			box.style.width=w*lis.length+'px';		//先让图片横着排
			move(box,{left:-w},400,'linear',function(){
				box.appendChild(lis[0]);
				this.style.left=0;
				
				moving=true;
			});
			break;
			
		case 38||87:	//上
			box.style.width=w+'px';		//先让图片竖着排
			move(box,{top:-w},400,'linear',function(){
				box.appendChild(lis[0]);
				this.style.top=0;
				
				moving=true;
			});
			break;
			
		case 39||68:	//右
			box.style.width=w*lis.length+'px';		//先让图片横着排
			//一上来的时候，需要把最后一张图放到最前面，才能无缝
			box.insertBefore(lis[lis.length-1],lis[0]);
			box.style.left=-w+'px';	//不要让最后一张图一下来就显示出来
			move(box,{left:0},400,'linear',function(){
				moving=true;
			});
			break;
			
		case 40||65:	//下
			box.style.width=w+'px';		//先让图片横着排
			//一上来的时候，需要把最后一张图放到最前面，才能无缝
			box.insertBefore(lis[lis.length-1],lis[0]);
			box.style.top=-w+'px';	//不要让最后一张图一下来就显示出来
			move(box,{top:0},400,'linear',function(){
				moving=true;
			});
	}
}
