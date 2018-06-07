var slide = document.querySelector(".slide");
var slideWrap = slide.offsetParent;
var text = document.getElementById("text");
var textCon = text.children[0];
var box = document.getElementById("box");
var btns = document.querySelectorAll("#bar span");
var bar = document.getElementById("bar");
var timer;

//设置滚动条的高度
//让文本框显示更多内容，先复制一些内容
/*var str = '';
for(var i = 0; i < 10; i++) {
	str += textCon.innerHTML;
};
textCon.innerHTML = str;*/

//让滚动条的高度随着内容的高度而变化
/*
 * 用文字的内容高度除以父级的高度，得出的结果为超出的倍数
 * 倍数越大，说明内容越多，滑块的高度应该越小
 * 倍数越小，说明内容越泸，滑块的高度应该越大
 * 
 */
//倍数
var beishu = textCon.offsetHeight / text.offsetHeight;
//beishu=1.01;
if(beishu <= 1) {
	//这个条件成立，说明内容的高度不够不父级的高度，就不给出滚动条了
	bar.style.display = 'none';
}

//设定一个最大值
if(beishu > 20) {
	beishu = 20;
}
slide.style.height = text.offsetHeight / beishu + 'px';
/*
100		10		10
100		20		5
100		40		2.5*/

//滑块拖拽
var scrollTop = 0; //滚动条走的距离
var maxHeight = slideWrap.offsetHeight - slide.offsetHeight; //滑块能够走的最大距离

slide.onmousedown = function(ev) {
	this.className = 'slide active';
	var disY = ev.clientY - slide.offsetTop;

	document.onmousemove = function(ev) {
		scrollTop = ev.clientY - disY;
		scroll();
	};
	document.onmouseup = function() {
		slide.className = 'slide';
		this.onmousemove = null;
	};

	ev.cancelBubble = true;
	return false;
};

//滚轮滚动
myScroll(box, function() {
	scrollTop -= 10;
	scroll();

	clearInterval(timer); //滚动滚动的时候要清除一下定时器，避免按箭头的同时再滚轮就会发生抢的效果
}, function() {
	scrollTop += 10;
	scroll();

	clearInterval(timer);
});

//上下箭头功能
for(var i = 0; i < btns.length; i++) {
	btns[i].index = i;
	btns[i].onmousedown = function() {
		this.className = 'active';
		var n = this.index;
		timer = setInterval(function() {
			scrollTop = n ? scrollTop + 5 : scrollTop - 5;
			scroll();
		}, 16);
	};
	btns[i].onmouseup = function() {
		this.className = '';
		clearInterval(timer);
	};
}

//滑块区域点击功能
slideWrap.onmousedown = function(ev) {
	timer = setInterval(function() {
		var sldeTop = slide.getBoundingClientRect().top + slide.offsetHeight / 2; //滑块中心点离上边的距离

		if(ev.clientY < sldeTop) {
			//这个条件成立说明鼠标在滑块的上面，滚动条要往上走
			scrollTop -= 5;
		} else {
			scrollTop += 5;
		}

		//解决抖动的问题，如果鼠标点与滑块中心点之间的距离在5px以内，我们就认为它到了目标点，那就把定时器清除掉
		if(Math.abs(ev.clientY - sldeTop) <= 5) {
			clearInterval(timer);
		}
		scroll();
	}, 16);
};
slideWrap.onmouseup = function() {
	clearInterval(timer);
};

//滚动条的主体内容
function scroll() {
	if(scrollTop < 0) {
		scrollTop = 0;
	} else if(scrollTop > maxHeight) {
		scrollTop = maxHeight;
	}

	var scaleY = scrollTop / maxHeight;
	slide.style.top = scrollTop + 'px';
	textCon.style.top = (text.offsetHeight - textCon.offsetHeight) * scaleY + 'px';
};

//滚轮事件
function myScroll(obj, fnUp, fnDown) {
	obj.onmousewheel = fn;
	obj.addEventListener('DOMMouseScroll', fn);

	function fn(ev) {
		if(ev.wheelDelta > 0 || ev.detail < 0) {
			fnUp.call(obj);
		} else {
			fnDown.call(obj);
		}

		ev.preventDefault();
		return false;
	}
}