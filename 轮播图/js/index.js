window.onload=function(){
	var texts=["别说没告诉你：返校季，包，治百病。快给我来一打！","自古套路得人心，换季时节的万能穿搭套路你会了吗？","娘 Man 平衡小西装，柔美、帅气在此刻合二为一。","一年四季都好搭的小皮鞋，所有人的鞋柜都必不可少。","秋季当然少不了牛仔外套。听说枫叶和牛仔更搭哦！"];
	var pics=["p1.jpg","p2.jpg","p3.jpg","p4.jpg","p5.jpg"];

	var dots=document.querySelectorAll("#lzt ul li a")
	var left=document.querySelector("#lzt #left")
	var right=document.querySelector("#lzt #right")
	var pictures=document.querySelector("#lzt #lztPic")
	var btns=document.querySelectorAll("#lzt input")
	var text=document.querySelector("#lzt p")
	var numbers=document.querySelector("#lzt h3 span")
	var lztLeft=document.querySelector('#lztLeft')
	var n=0		//当前显示图片索引值
	var last=0		//上一次显示图片索引值
	var play=true;		//这个变量用来存储切换模式，true 为顺序切换，false 为循环切换
	var auto=false;		//这个变量用来存储是否为自动播放
	var trend=true;		//这个变量用来存储顺序切换自动轮播时的播放方向，true 为正序播放，false 为倒序播放
	var timer=null;		//定时器
	
	//默认显示第一张图片
	pictures.src="img/"+pics[0]
	text.innerHTML=texts[0]
	numbers.innerHTML=n+1+"/5"
	
	//圆点点击
	for(i=0;i<dots.length;i++){
		dots[i].index=i
		dots[i].onclick=function(){
			if(last!=this.index){
				pictures.src="img/"+pics[this.index]
				text.innerHTML=texts[this.index]
				numbers.innerHTML=(this.index+1)+"/5"
				
				this.className='active'
				dots[last].className=''

				last=n=this.index
			}
		}
	}
	
	//功能按钮
	btns[0].onclick=function(){
		play=true
		this.className='active'
		btns[1].className=''
	}
	btns[1].onclick=function(){
		play=false
		trend=true		//循环播放后切换顺序播放为正序播放
		this.className='active'
		btns[0].className=''
	}
	btns[2].onclick=function(){
		if(this.value=='自动轮播'){
			timer=setInterval(autoPlay,1000)
			this.className='active'
			this.value='停止轮播'
		}else{
			this.className=''
			this.value='自动轮播'
			clearInterval(timer)
		}
	}
	
	//右按钮点击功能
	right.onclick=function(){
		n++
		if(play==true&&n==pics.length){		//顺序切换且右边到头
			n=pics.length-1
			//动画效果
			btns[0].style.animation='0.3s twinkle';
			btns[0].addEventListener('animationend',function(){
				btns[0].style.animation='';
			});
			
		}else if(play==false&&n==pics.length){		//循环切换且右边到头
			n=0
		}
		pictures.src="img/"+pics[n]
		text.innerHTML=texts[n]
		numbers.innerHTML=(n+1)+"/5"
		dots[last].className=''
		dots[n].className='active'
		last=n
	}
	
	//左按钮点击功能
	left.onclick=function(){
		n--
		if(play==true&&n<0){		//顺序切换且左边到头
			n=0
			//动画效果
			btns[0].style.animation='0.3s twinkle';
			btns[0].addEventListener('animationend',function(){
				btns[0].style.animation='';		//动画完成后清除 animation，这样连续点击按钮的时候都会有动画效果
			});
			
		}else if(play==false&&n<0){		//循环切换且左边到头
			n=pics.length-1
		}
		pictures.src="img/"+pics[n]
		text.innerHTML=texts[n]
		numbers.innerHTML=(n+1)+"/5"
		dots[last].className=''
		dots[n].className='active'
		last=n
	}
	//自动轮播功能（包括鼠标移入、移出事件）
	function autoPlay(){
		if(play==true){
			if(n==pics.length-1){
				trend=false;
			}else if(n==0){
				trend=true;
			}
			if(trend){
				n++
			}else{
				n--
			}
		}else if(play==false){
			n++
			if(n==pics.length){
				n=0
			}
		}
		pictures.src="img/"+pics[n]
		text.innerHTML=texts[n]
		numbers.innerHTML=(n+1)+"/5"
		dots[last].className=''
		dots[n].className='active'
		last=n
	}
	//鼠标移入、移出事件
	lztLeft.onmouseover=function(){
		if(btns[2].value=='停止轮播'){
			clearInterval(timer)
		}
	}
	lztLeft.onmouseout=function(){
		if(btns[2].value=='停止轮播'){
			timer=setInterval(autoPlay,1000)
		}
	}
}

