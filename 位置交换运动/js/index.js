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
		 * 1、结构里的顺序没有变
		 * 2、相对定位造成位置不对
		 */
		move(cur,{top:-h},200,'linear',end);
		move(prev,{top:h},200,'linear',end);
		
		function end(){
			ul.insertBefore(cur,prev);
			cur.style.top=prev.style.top=0;
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
