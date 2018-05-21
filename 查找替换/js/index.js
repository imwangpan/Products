/*
 * 查找替换的原理：（待完善）
 * 利用字符串方法 split() 进行查找，数组方法进行拼接
 */
var show=document.getElementById("show");
var span=document.querySelector("#buttons span");
var as=span.querySelectorAll('a');
var toolbox=document.getElementById("toolbox");
var spans=document.querySelectorAll("#toolbox span");
var close=document.getElementById("close");
var inputs=document.querySelectorAll("#toolbox input");
var texts=document.querySelector("#wrap #text p");

//右侧点击展开
show.onclick=function(){
	/*show.innerHTML=show.innerHTML=='展开'?'收拢':'展开';
	span.style.display=span.style.display=='block'?'none':'block';*/
	if(span.style.display=='block'){
		show.innerHTML='展开'
		toolbox.style.display=span.style.display='none'
	}else{
		show.innerHTML='收拢'
		span.style.display='block'
	}
};

//查找
as[0].onclick=spans[0].onclick=function(){
	toolbox.style.display='block';
	toolbox.className='search';
	
	removeSpan();
};

//替换
as[1].onclick=spans[1].onclick=function(){
	toolbox.style.display='block';
	toolbox.className='replace';
	
	removeSpan();
};

//关闭
close.onclick=function(){
	show.innerHTML='展开'
	toolbox.style.display=span.style.display='none';
	removeSpan();
};

//下面查找功能
inputs[1].onclick=function(){
	//1、用户没有输入内容，弹窗提示
	var val=inputs[0].value;
	if(!val){
		//这个条件成立，说明用户没有输入内容
		alert('请输入内容');
		return;		//当用户什么都没有输入的时候，我们只需要给他一个提示就行了，下面的功能就不需要再实现了（代码不需要走了）
	}
	
	
	//2、用户有输入内容，但是没找到，依然弹窗提示
	if(texts.innerHTML.indexOf(val)==-1){		//比较时是直接通过 innerHTML 获取到最新的内容，这样文本框中的内容发送变化时，也能正确比较
		alert('你输入的内容没有找到');
		inputs[0].value='';
		return;
	}
	
	//3、用户有输入内容并且找到了，标个黄
	removeSpan();		//把之前标黄的字去掉黄色
	
	var result=texts.innerHTML.split(val);
	//console.log(result);
	texts.innerHTML=result.join('<span>'+val+'</span>');
	inputs[0].value='';
};

//下面替换功能
inputs[4].onclick=function(){
	var val1=inputs[2].value;
	var val2=inputs[3].value;
	//1、第一个框里用户没有输入内容，弹窗提示
	if(!val1){
		alert('请输入要替换的内容');
		return;
	}
	
	//2、第一个框里用户输入了内容，但是找不到。弹窗提示
	if(texts.innerHTML.indexOf(val1)==-1){
		alert('您输入的内容没找到');
		return;
	}
	
	//3、第一个框里用户输入了内容并且找到了，第二个框没有内容。弹窗提示
	if(!val2){
		var result=confirm('你确定要删除内容么？');
		
		if(!result){
			//这个条件成立说明用户点击了取消的按钮，那就什么都不做（下面的代码就不需要走了）
			inputs[2].value='';
			return;
		}
	}
	
	//4、第一个框里用户输入了内容并且找到了，第二个框里有内容，替换功能
	var text=texts.innerHTML.split(val1);
	//console.log(result);
	texts.innerHTML=text.join(val2);
	inputs[2].value=inputs[3].value='';
};

//去除span标签
function removeSpan(){
	//清除input里的内容
	var inputTexts=document.querySelectorAll("#toolbox input[type=text]");
	for(var i=0;i<inputTexts.length;i++){
		inputTexts[i].value='';
	}
	
	
	/*'种直译式<span>脚本语言</span>，是一种动态类型'
	['种直译式','脚本语言</span>，是一种动态类型']
	'种直译式脚本语言</span>，是一种动态类型'
	['种直译式脚本语言','，是一种动态类型']
	'种直译式脚本语言，是一种动态类型'*/
	
	
	//去除span标签
	var strArr=texts.innerHTML.split('<span>');
	strArr=strArr.join('');
	
	strArr=strArr.split('<span/>');
	strArr=strArr.join('');
	
	texts.innerHTML=strArr;
}