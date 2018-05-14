/*
 * 生成小图片既可以通过两个嵌套的 for 循环生成（外循环生成行，内循环生成列，反之也行），也可以通过一个 for 循环生成（取整、取模）
 * 小图片宽、高均为 100px，小图片直接的间隙为 5px，小图片定位值需要计算间隙
 * % 取模（取余数）
 * 字符串拼接在 for 循环里，设置 innerHTML 在 for 循环外，提升性能
 * 小图片的背景图在 CSS 中设置了，这里只需要设置背景图定位值，背景图定位值不需要计算间隙
 * 定位值是负数，X 轴、Y轴定位值直接有个空格
 * 方块放大后，后面方块会遮住放大方块的一部分。解决：提升当前放大方块的层级
 */

window.onload=function(){
	var box=document.getElementById("box");
	var str="";
	for(n=1;n<101;n++){
		str=str+"<li class='img'></li>"
		/*
		 * 这里也可以直接在生成元素时直接通过字符串拼接的方式设置相关样式
		str+='<div style="left:'+i%10*105+'px;top:'+(parseInt(i/10)*105)+'px;background:url(img/1000.jpg) -'+i%10*100+'px -'+(parseInt(i/10)*100)+'px"></div>';
		*/
	}
	box.innerHTML=str;
	var lis=box.querySelectorAll("li.img")
	
	for(var i=0;i<lis.length;i++){
		lis[i].style.top=parseInt(i/10)*105+'px';
		lis[i].style.left=i%10*105+'px';
		lis[i].style.backgroundPosition=-i%10*100+'px -'+parseInt(i/10)*100+'px';
		
		//添加鼠标移入事件
		lis[i].onmouseover=function(){
			this.style.opacity=1;
			this.style.transform='scale(1.5)';
			this.style.zIndex=2;
		}
		//添加鼠标移出事件
		lis[i].onmouseout=function(){
			//this.style.opacity=0.3;
			this.style.transform='scale(1)';
			this.style.zIndex=1;
		}
	}
}