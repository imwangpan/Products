/*
 * 因为需要让图片上下翻页和左右翻页，所以可以通过设置图片父级的宽度来让图片列表横排或者竖排。
 * 图片的首尾衔接无缝滚动是通过 DOM 方法改变元素结构位置实现的。注意：元素位置改变后，需要重新获取到最新的元素列表，可以用 getElementsByTagName 动态获取，也可以在每次使用时重新获取一下元素列表。
 * case 中的“或”可以用多 case 单一操作写法，多个 case 条件中只要有任意一个条件成立，都会执行下面的代码，直到遇到 break 停止。
 * 避免连续按键导致的错误可以通过设置一个控制参数，它的值为 true 时表示可以进行下次点击，为 false 时表示不可以进行下次点击。
 */

var box=document.querySelector("#img")
var lis=box.getElementsByTagName('li')		//动态获取，当文档中结构发生变化时，就会重新获取到最新的列表
var w=box.offsetWidth
var moving=true		//true 表示可以进行下次点击，false 表示不可以进行下次点击

document.onkeydown=function(ev){
	//console.log(ev.keyCode)
	if(!moving){		//当 moving 的值为 false 时表示不可以进行下次点击，直接 return
		return
	}
	moving=false		//按键后首先将值改为 false，表示不可进行下次点击。当运动完成后才能进行下次点击。
	switch(ev.keyCode){
		//左箭头：37	上箭头：38	右箭头：39	下箭头：40
		//A：65		W：87		D：68		S：83

		case 37:		//左
		case 65:		//A
		//这里采用的是多 case 单一操作写法，多个 case 条件中只要有任意一个条件成立，都会执行下面的代码，直到遇到 break 停止。
		//注意这里不能写成 case 37||65:（或者 ev.keyCode===37||ev.keyCode===65），貌似都是是或者的意思，但是并不会得到我们想要的结果 。在 switch 语句中，会把 switch 参数的返回值和 case 后跟的表达式的返回值进行全等比较。在这里，会用 ev.keyCode 和 37||65 的返回值进行全等比较，而 37||65 返回的永远都是 37。
		
			box.style.width=w*lis.length+'px';		//先让图片横着排
			move(box,{left:-w},400,'linear',function(){
				box.appendChild(lis[0]);		//在每一次运动完成后都让第一张图片移动到最后面。此时图片结构发生变化，但是由于采用的动态获取，所以会马上更新为最新的列表
				this.style.left=0;		//当前显示的图片在新的结构里是第一张，所以修正它的定位置为 0
				moving=true;		//运动完成后，将参数值改为 true，表示可以进行下一次点击
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
			//初始的时候，需要把最后一张图放到列表最前面，这样才能无缝向右运动
			box.insertBefore(lis[lis.length-1],lis[0]);
			box.style.left=-w+'px';		//图片结构发生变化后（最后一张图片变为第一张图片，原来的第一张图片变为第二张图片），修正定位值，使父级显示正确的图片（原第一张图片，现在的第二张图片）。
			move(box,{left:0},400,'linear',function(){
				moving=true;
			});
			break;
			
		case 40:		//下
		case 83:		//S
			box.style.width=w+'px';		//先让图片横着排
			box.insertBefore(lis[lis.length-1],lis[0]);
			box.style.top=-w+'px';
			move(box,{top:0},400,'linear',function(){
				moving=true;
			});
			break;
	}
}
