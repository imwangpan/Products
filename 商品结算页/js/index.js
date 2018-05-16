window.onload=function(){
	var selectAll=document.getElementById("selectAll");		//全选按钮
	var inputs=document.querySelectorAll(".main input");
	var trs=document.querySelectorAll(".main tr");
	var selected=document.getElementById("selected");		//已选
	var selectedNum=0;		//选中的数量
	
	//全选
	selectAll.onclick=function(){
		for(var i=0;i<inputs.length;i++){
			inputs[i].checked=this.checked;
			trs[i].className=this.checked?'active':'';
			selectedNum=this.checked?inputs.length:0;
			selected.innerHTML='已选（'+selectedNum+'）';
		}
		sum();
	};
	
	//单选功能
	for(var i=0;i<inputs.length;i++){
		inputs[i].index=i;
		inputs[i].onclick=function(){

			trs[this.index].className=this.checked?'active':'';
			//selectedNum=this.checked?selectedNum+=1:selectedNum-=1;
			this.checked?selectedNum++:selectedNum--;
			selected.innerHTML='已选（'+selectedNum+'）';
			
			selectAll.checked=selectedNum==inputs.length?true:false;
			sum();
		};
	}
	
	//颜色功能
	var colorBtns=document.querySelectorAll(".color a");		//颜色按钮
	var colorCons=document.querySelectorAll(".color div");		//弹出层
	var bigImgs=document.querySelectorAll("label img");			//大图
	
	for(var i=0;i<colorBtns.length;i++){
		colorBtns[i].index=i;
		colorBtns[i].onclick=function(){
			changeColorCon(this.index);
		};
	}
	
	function changeColorCon(n){
		var dis=colorCons[n].style.display;
		colorCons[n].style.display=dis=='block'?'none':'block';
		
		var dt=colorCons[n].querySelector('dt');
		var dds=colorCons[n].querySelectorAll('dd');
		var imgs=colorCons[n].querySelectorAll('img');
		var sureBtn=colorCons[n].querySelector('span');
		var curImgSrc=imgs[0].src;
		
		for(var i=0;i<dds.length;i++){
			//小图点击
			dds[i].index=i;
			dds[i].onclick=function(){
				for(var i=0;i<dds.length;i++){
					dds[i].className='';
				}
				this.className='active';
				dt.innerHTML=imgs[this.index].alt;
				curImgSrc=imgs[this.index].src;
			};
		}
		
		//确定点击功能
		sureBtn.onclick=function(){
			colorCons[n].style.display='none';
			colorBtns[n].innerHTML=dt.innerHTML+'+';
			bigImgs[n].src=curImgSrc;
		};
	}
	
	//商品加减功能
	for(var i=0;i<trs.length;i++){
		count(i);
	}
	function count(n){
		var spans=trs[n].querySelectorAll('td:nth-child(4) span');
		var subTotal=trs[n].querySelector('td:nth-child(5)');
		var price=trs[n].querySelector('td:nth-child(3)');
		var strong=trs[n].querySelector('strong');
		
		var num=0;
		//减的功能
		spans[0].onclick=function(){
			num--;
			
			if(num<0){
				num=0;
			}
			
			strong.innerHTML=num;
			console.log(num*parseFloat(price.innerHTML));
			subTotal.innerHTML=num*parseFloat(price.innerHTML)+'.00元';
			
			sum();
		};
		
		//加的功能
		spans[1].onclick=function(){
			num++;
			strong.innerHTML=num;
			//console.log(num*parseFloat(price.innerHTML));
			subTotal.innerHTML=num*parseFloat(price.innerHTML)+'.00元';
			
			sum();
		};
	}
	
	function sum(){
		var expensive=0;
		var total=0;
		var footer=document.querySelector("tfoot td:nth-child(2)");
		
		for(var i=0;i<trs.length;i++){
			var selectNum=trs[i].querySelector('strong').innerHTML;
			var price=trs[i].querySelector('td:nth-child(3)').innerHTML;
			var subTotal=trs[i].querySelector('td:nth-child(5)').innerHTML;
			
			if(selectNum>0&&inputs[i].checked){
				if(parseFloat(price)>expensive){
					expensive=parseFloat(price);
				}
				total+=parseFloat(subTotal);
			}
		}
		footer.innerHTML='<p>应付总额：<strong>'+total+'.00元</strong></p><p>最贵的商品为：'+expensive+'.00元</p>'
	}
};