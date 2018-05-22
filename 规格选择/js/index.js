var dls=document.querySelectorAll("dl:not(.select)");
var selected=document.querySelector(".select");

for(var i=0;i<dls.length;i++){
	select(i);
}

function select(n){
	var dds=dls[n].querySelectorAll('dd');
	var dd=null;		//存当前点击对应要创建的dd标签。放到这里的原因是让每一个dl标签都对应自己的方框
	var last=0
	for(var i=0;i<dds.length;i++){
		dds[i].index=i
		dds[i].onclick=function(){
			/*
			 * dd点击后要做的事情
			 * 
			 * 	1、去掉其它兄弟元素身上的颜色，给自己加上颜色
			 * 	2、如果下面没有对应的方框就创建一个，如果有就修改其内容
			 */
			//这里不要用 this.getAttribute('class')=='active'，因为 class 里可能还含有其它类名
			var oldClass=this.getAttribute('class')
			var ddClass=this.classList
			if(ddClass.contains('active')){
				//这个条件说明，当前点击 dd 已经选中了
				ddClass.remove('active')

				selected.removeChild(dd);
				//dd=undefined;
				console.log(dd)
			}else{
				dds[last].classList.remove('active')
				ddClass.add('active');
				if(!selected.contains(dd)){
				//if(!dd||!selected.contains(dd)){
					dd=document.createElement("dd");
					selected.appendChild(dd);
				}
				dd.innerHTML=this.innerHTML;
				
				last=this.index
			}
			
			//2
			/*if(!dd){
				//这个条件成立说明这行对应的方框没有，需要创建
				dd=document.createElement("dd");
				selected.appendChild(dd);
			}
			dd.innerHTML=this.innerHTML;*/
			
			//创建关闭按钮
			var This=this;
			var span=document.createElement("span");
			span.innerHTML='X';
			span.onclick=function(){
				/*
				 * 点击关闭按钮后要做的事情
				 * 	1、把dd移除掉
				 * 	2、把对应的标红的dd身上的class去掉
				 */
				selected.removeChild(dd);
				
				This.removeAttribute('class');
				dd=null;
			};
			dd.appendChild(span);
			
			//parent.mark=true;		//创建了对应的方框后，就不需要再次创建了
		};
	}
}