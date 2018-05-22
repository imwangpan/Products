var dls=document.querySelectorAll("dl:not(.select)");
var selected=document.querySelector(".select");

for(var i=0;i<dls.length;i++){
	select(i);
}

function select(n){
	var dds=dls[n].querySelectorAll('dd');
	var dd=null;		//存当前点击对应要创建的 dd 标签。放到这里的原因是让每一个 dl 标签都对应自己的方框
	var last=0
	for(var i=0;i<dds.length;i++){
		dds[i].index=i
		dds[i].onclick=function(){
			var ddClass=this.classList
			if(ddClass.contains('active')){
				//这个条件说明，当前点击 dd 已经选中了
				ddClass.remove('active')

				selected.removeChild(dd);
				dd=null;
				console.log(dd)
			}else{
				//代码走这里，说明当前点击的 dd 没有被选中
				dds[last].classList.remove('active')
				ddClass.add('active');
				//这里判断 dd 标签是否为 selected 的子节点也可以。 !selected.contains(dd) 
				if(!dd){		//如果 dd 标签不存在，则需要创建
					dd=document.createElement("dd");
					selected.appendChild(dd);
				}
				//如果 dd 标签存在，则更新它的内容
				dd.innerHTML=this.innerHTML;
				
				last=this.index
				
				//创建关闭按钮
				var This=this;
				var span=document.createElement("span");
				span.innerHTML='X';
				span.onclick=function(){
					selected.removeChild(dd);
					ddClass.remove('active')
					dd=null;
				};
				dd.appendChild(span);
			}
		};
	}
}