var lis=document.querySelectorAll("li")		//静态获取
var ul=document.querySelector("ul")
var h=lis[0].offsetHeight+parseFloat(getComputedStyle(lis[0]).marginTop)		//要运动的距离，包括 li 的高和 margin-top 值
console.log(lis)

for(var i=0;i<lis.length;i++){
	var up=lis[i].querySelector("button.up")
	var down=lis[i].querySelector("button.down")
	console.log(up,down)
	//上移功能
	up.onclick=function(){
		//在这里需要找到当前所在的 li 与上一个 li
		var cur=this.parentNode;		//当前点击按钮的父级，也就是当前点击按钮所在的 li
		var prev=cur.previousElementSibling;		//当前所在 li 的上一个 li
		console.log(cur,prev)
		
		if(!prev){		//如果当前所在 li 的上一个 li 不存在，说明已经到头了
			alert('到头了');
			return;
		}
		
		/*
		 * li 采用的是相对定位，初始定位置（top）为 0，这里的运动只是动画效果，实际上位置的改变是通过 DOM 方法改变了结构中的标签顺序。
		 * 例如：蓝色上移，是把蓝色 li 标签插入到红色 li 标签的前面，这里改变蓝色 li 和红色 li 的定位值只是为了运动的动画效果，当运动完成后，由于它们位置的改变是由于结构中标签位置发生了变化（并不是定位置的改变），所以需要将它们的定位置都修正为初始值 0。
		 */
		move(cur,{top:-h},200,'linear',end);
		move(prev,{top:h},200,'linear',end);		//这里的位置改变只是为了运动的动画效果
		
		function end(){
			ul.insertBefore(cur,prev);		//将当前所在 li 插入到上一个 li 的前面。这才是位置改变的真正原因
			cur.style.top=prev.style.top=0;		//修正它们的定位置
		}
	};
	
	//下移功能
	down.onclick=function(){
		//在这里需要找到当前所在的 li 与下一个 li
		var cur=this.parentNode;		//当前点击按钮的父级，也就是当前点击按钮所在的 li
		var next=cur.nextElementSibling;		//当前所在 li 的下一个 li
		
		if(!next){		//如果当前所在 li 的下一个 li 不存在，说明已经到头了
			alert('到头了');
			return;
		}
		
		/*
		 * 1、结构里的顺序没有变
		 * 2、相对定位造成位置不对
		 */
		move(cur,{top:h},200,'linear',end);
		move(next,{top:-h},200,'linear',end);
		
		function end(){
			ul.insertBefore(next,cur);
			cur.style.top=next.style.top=0;
		}
	};
}
