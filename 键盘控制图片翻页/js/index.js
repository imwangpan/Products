var box=document.querySelector("#img")
var lis=box.getElementsByTagName('li')
var w=box.offsetWidth
var moving=true

document.onkeydown=function(ev){
	//console.log(ev.keyCode)
	if(!moving){
		return
	}
	moving=false
	switch(ev.keyCode){
		//左箭头：37	上箭头：38	右箭头：39	下箭头：40
		//A：65		W：87		D：68		S：83

		case 37:		//左
		case 65:		//A
		//这里采用的是多 case 单一操作写法，多个 case 条件中只要有任意一个条件成立，都会执行下面的代码，直到遇到 break 停止。
		//注意这里不能写成 case 37||65:（或者 ev.keyCode===37||ev.keyCode===65），貌似都是是或者的意思，但是并不会得到我们想要的结果 。在 switch 语句中，会把 switch 参数的返回值和 case 后跟的表达式的返回值进行全等比较。在这里，会用 ev.keyCode 和 37||65 的返回值进行全等比较，而 37||65 返回的永远都是 37。
		
			box.style.width=w*lis.length+'px';		//先让图片横着排
			move(box,{left:-w},400,'linear',function(){
				box.appendChild(lis[0]);
				this.style.left=0;
				
				moving=true;
			});
			break;
			
		case 38:		//上
		case 87:		//W
			box.style.width=w+'px';		//先让图片竖着排
			move(box,{top:-w},400,'linear',function(){
				box.appendChild(lis[0]);
				this.style.top=0;
				
				moving=true;
			});
			break;
			
		case 39:		//右
		case 68:		//D
			box.style.width=w*lis.length+'px';		//先让图片横着排
			//一上来的时候，需要把最后一张图放到最前面，才能无缝
			box.insertBefore(lis[lis.length-1],lis[0]);
			box.style.left=-w+'px';	//不要让最后一张图一下来就显示出来
			move(box,{left:0},400,'linear',function(){
				moving=true;
			});
			break;
			
		case 40:		//下
		case 83:		//S
			box.style.width=w+'px';		//先让图片横着排
			//一上来的时候，需要把最后一张图放到最前面，才能无缝
			box.insertBefore(lis[lis.length-1],lis[0]);
			box.style.top=-w+'px';	//不要让最后一张图一下来就显示出来
			move(box,{top:0},400,'linear',function(){
				moving=true;
			});
			break;
	}
}
