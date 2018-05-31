/*
 * 根据用户输入的内容在数组中查找到相应内容，然后根据匹配到的内容生成新的列表。
 */
var book = ['Head first HTML/CSS','CSS 权威指南','精通 CSS','CSS 世界','JavaScript DOM 编程艺术','JavaScript 高级程序设计', 'JavaScript 权威指南', 'ECMAScript6 入门', 'JavaScript 编程精解', '高性能 JavaScript'];
var input = document.querySelector("input");
var list = document.getElementById("list");
var lis = document.getElementsByTagName('li');		//动态获取 li 标签，也可以在每次用时重新获取一下最新的 li 标签
var last = null;		//上一个选中的元素
var cn = -1;		//当前选中 li 的索引值。初始值设为 -1 是为了让它的值在经过一次累加后刚好为 0（也就是列表里第一项的索引值）。按下箭头会进行一次累加，此时要选中列表第一项，也就是索引值为 0 的 li

//生成元素
createData(book);

//根据数组内容生成列表
function createData(arr) {
	list.innerHTML = '';		//初始时先清空，避免再次创建的内容会累加之前的内容
	for(var i = 0; i < arr.length; i++) {
		var li = document.createElement("li");
		li.index = i;
		li.innerHTML = arr[i];
		li.onclick = listClick;
		list.appendChild(li);
	}
};

//表单事件：oninput、onkeydown、onclick、onkeyup

//输入框点击的时候要显示列表
input.onclick = function(ev) {
	list.style.display = 'block';
	ev.cancelBubble = true;		//阻止事件冒泡
};

//点击其它地方的时候要隐藏列表
document.onclick = function() {
	list.style.display = 'none';
};

//每个 li 标签的点击事件
function listClick() {
	//写法一
	/*if(last && last != this) {		//已经有高亮的 li 且当前点击的不是高亮的 li（上一次点击）
		last.className = '';
	}
	if(this.className == '') {		//当前点击 li 未被高亮
		this.className = 'active';
		input.value = this.innerHTML;
		last = this;
		cn = this.index;		//当前点击 li 的索引值
	} else {		//当前点击 li 已经被高亮
		this.className = '';
		input.value = '';
		cn = -1;		//这里是取消选中，取消选中后也要初始化 cn 的值
	}*/
	//写法二
	this.className = 'active';		//先让当前点击的 li
	input.value = this.innerHTML;
	cn = this.index;
	/*if(last){		//当前已经有高亮的 li
		last.className = '';		//清除已经高亮的 li
		//根据当前点击的 li 是不是已经高亮的 li 执行不同操作
		input.value =this==last?'':this.innerHTML;
		cn=this==last?-1:this.index;
	}else{		//当前没有高亮的 li
		input.value = this.innerHTML;
		cn = this.index;
	}*/
	//上面的简写
	if(last){
		last.className = '';
		if(this==last){
			input.value ='';
			cn=-1;
		}
	}
	last = this;
};

//输入框删除功能
//这里只能用 oninput 事件，不能用 onkeydown 事件。如果用 onkeydown 事件，在 input 里输入内容（按键）时是先发生事件，然后再执行按键功能（如删除等）。
//而我们需要的是先执行按键功能，再发生事件。eg：当用户按下删除键的时候，需要在事件里获取到删除后的内容，而不是删除前的内容。oninput 事件里获取到的是删除后的内容，而 onkeydown 事件里获取到的是删除前的内容。
input.oninput = function() {
	var str = this.value;		//用户删除后剩下的内容
	//console.log(str);
	var newData = [];		//存储匹配到的数据

	//根据用户删除后剩下的内容去 book 里匹配数据，找到后放在一个新的数组中
	for(var i = 0; i < book.length; i++) {
		if(book[i].toLowerCase().indexOf(str.toLowerCase()) != -1) {		//都转为小写后再查找，忽略大小写差异
			//这个条件成立说明在 book 中找到 str
			newData.push(book[i]);
		}
	}
	//console.log(newData);
	createData(newData);		//根据匹配到的内容生成新的列表
	cn = -1;		//根据输入框里的内容重新创建了列表，所以要把 cn 的值也要初始化一下
	list.style.display = 'block';
};

//上下键选择功能
input.onkeydown = function(ev) {
	console.log(ev.keyCode)
	switch(ev.keyCode) {
		case 13:		//回车键
			var dis = getComputedStyle(list).display;
			list.style.display = dis == 'block' ? 'none' : 'block';
			break;
		case 38:		//上箭头
			list.style.display = 'block';		//要先让列表显示出来
			cn--;
			if(cn < 0) {
				cn = lis.length - 1;
			}
			if(last) {
				last.className = '';
			}
			lis[cn].className = 'active';
			last = lis[cn];
			input.value = lis[cn].innerHTML;
			break;

		case 40:		//下箭头
			list.style.display = 'block';
			cn++;
			if(cn == lis.length) {
				cn = 0;
			}
			if(last) {
				last.className = '';
			}
			lis[cn].className = 'active';
			last = lis[cn];
			input.value = lis[cn].innerHTML;
			break;
	}
};