/*
 * 原理分析：
 * 以键值对的形式将每个图片的定位信息存储在数组中，然后通过数组方法将数组中的数据进行排序。新数组中和原数组相同索引值的数据就是对应图片要运动到的位置信息。
 * 
 * 布局方面可以采用浮动转定位布局，写样式时采用浮动布局（目前的定位布局写得比较麻烦），写 js 时获取到图片距离父级的距离，并将距离设置为相应定位值。
 */

//获取元素
var shunxu=document.querySelector("#title h3:first-of-type")
var luanxu=document.querySelector("#title h3:last-of-type")
var lis=document.querySelectorAll("#img li")


/*var lis=document.querySelectorAll("#img li");
var btns=document.querySelectorAll("#nav a");*/
var order=[];		//顺序
var random=[];		//乱序

for(var i=0;i<lis.length;i++){
	order.push({"left":getComputedStyle(lis[i]).left,"top":getComputedStyle(lis[i]).top});
	//random.push({"left":getComputedStyle(lis[i]).left,"top":getComputedStyle(lis[i]).top});
}
random=order.concat([]);

var n=0;
shunxu.onclick=function(){
	n++;
	this.innerHTML=n%2?'从小到大':'从大到小';
	
	//另一种写法
	//this.innerHTML=this.innerHTML == '从大到小' ? '从小到大' : '从大到小';
	
	order.reverse();		//将数组里的数据倒序排列
	toMove(order);
};

luanxu.onclick=function(){
	random.sort(function(){		//将数组里的数据随机排列
		return 0.5-Math.random();
	});
	
	toMove(random);
};

function toMove(arr){
	for(var i=0;i<arr.length;i++){
		move(lis[i],{left:parseFloat(arr[i].left),top:parseFloat(arr[i].top)},600,'linear');
	}
}