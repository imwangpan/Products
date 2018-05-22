window.onload=function(){
	var ups=document.querySelectorAll("button.up")
	var downs=document.querySelectorAll("button.down")
	var lis=document.querySelectorAll("li")		//静态获取
	var lisD=document.getElementsByTagName("li")		//静态获取
	var ul=document.querySelector("ul")
	console.log(lisD)
	
	//上移
	for(i=0;i<ups.length;i++){
		//ups[i].index=i
		ups[i].onclick=function(){
			if(this==lisD[0].children[1]){		//第一个 li 的第二个子元素，也就是“上移”按钮
				alert("走不动了")
			}else{
				ul.insertBefore(this.parentNode,this.parentNode.previousElementSibling)
			}
		}
	}
	
	//下移
	for(i=0;i<downs.length;i++){
		downs[i].onclick=function(){
			if(this==lisD[3].children[2]){		//第四个 li 的第三个子元素，也就是“下移”按钮
				alert("走不动了")
			}else{
				ul.insertBefore(this.parentNode.nextElementSibling,this.parentNode)
			}
		}
	}
	
	
}
