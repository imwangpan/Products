var time1=document.querySelector(".time1");
var time2=document.querySelector(".time2");
var number=document.querySelector(".number");
var strong=document.querySelector(".time3 strong");
var btns=document.querySelectorAll(".time3 span");

//即时时间
time();
setInterval(time,1000);
function time(){
	var d=new Date();
	
	time1.innerHTML=format(d.getHours())+':'+format(d.getMinutes())+':'+format(d.getSeconds());
};

//补0
function format(v){
	return v<10?'0'+v:v;
}
function formatWeek(v){
	return ['日','一','二','三','四','五','六'][v];
}

//时间日期分开设置，时间每隔一秒需要设置一次，而日期不需要
//即时日期
data();
function data(){
	var d=new Date();
	
	time2.innerHTML=d.getFullYear()+'年'+format(d.getMonth()+1)+'月'+format(d.getDate())+'日,星期'+formatWeek(d.getDay());
};


//日历内容
/*
 * 1、需要知道这个月的最后一天是几号，也就是这个月有多少天
 * 2、需要知道这个月的第一天是周几
 * 3、需要知道上个月的最后一天是几号
 */

//某个月有多少天
function getEndDay(year,month){
	/*
	 * getMonth 取到的是月份，但是它比实际月份对应的数字要小 1
	 * 例如 5 月对应的值是 4
	 * 而我们获取某月天数的方法是通过将日期设置为下个月的 0 号，这样会自动回滚到这个月的最后一天
	 * 所以用户在调用这个函数时，传的月份是几，返回的就是该月的天数
	 */
	return new Date(year,month,0).getDate();
}

//某个月的第一天是周几
function getFirstWeek(year,month){
	//通过对月份数字进行减 1 处理，使这个函数根据用户传的是几月份，返回的就是该月第一天是周几
	return new Date(year,month-1,1).getDay();
}

//设置日历的内容
var d=new Date();
setCalendar(d);
function setCalendar(d){
	//d.getMonth() 取到的值是比实际月份小 1 ，所以取上个月就不用再减 1 了
	var lastEndDay=getEndDay(d.getFullYear(),d.getMonth());		//取上个月最后一天
	var curEndDay=getEndDay(d.getFullYear(),d.getMonth()+1);	//取这个月最后一天
	var week=getFirstWeek(d.getFullYear(),d.getMonth()+1);		//取这个月第一天的星期
	
	var nextDay=1;			//下个月的起始天数
	var str='';				//用来存所有的 span 标签
	var endNum=week-1;		//上个月占了几个格子
	var curDay=1;			//这个月的起始天数
	
	//如果这个月的第一天是周一的话，就没有上个月的日期了，我们给他补一行
	if(endNum==0){
		endNum=7;
	}
	
	//JS 中星期从 0 开始，周日为第一天。中文使用习惯是周日为最后一天，也就是要将周日的 0 修正为 7
	//如果这个月的第一天是周日时，week 值为 0，endNum 的值为 -1，这样无法生成上个月的日期，所以需要对 endNum 值进行修正
	if(endNum<0){
		endNum=6;
	}
	
	//日历上总共有 42 个日期
	for(var i=1;i<43;i++){
		if(i<=endNum){
			//这个条件成立了，说明这里面生成的是上个月的日期
			str='<span class="color">'+lastEndDay--+'</span>'+str;
			/*
			 * 等价于：
			 * str='<span class="color">'+lastEndDay+'</span>'+str;
			 * lastEndDay--
			 */
			/*
			 * n--，n++ 与其它值作比较、运算时，实际参与计算的值是未被累加、累减的 n，之后才会对 n 的值进行改变。
			 * 后置递增和递减操作是在包含它们的语句被求值之后才执行的。
			 * 执行前置递增和递减操作时，变量的值都是在语句被求值以前改变的。
			 */
			
			//console.log(str);
		}else if(i>endNum+curEndDay){
			//这个条件成立了，说明这里面生成的是下个月的日期
			str+='<span class="color">'+nextDay+++'</span>';
		}else{
			//上面两个条件都不成立，代码走这里了，说明这里面生成的是这个月的日期
			
			//当日历上的日期是今年、今月、今天时（三个条件缺一不可），给“今天”添加 active
			if(new Date().getDate()==curDay && new Date().getMonth()==d.getMonth() && new Date().getFullYear()==d.getFullYear()){
				str+='<span class="active">'+curDay+++'</span>';
			}else{
				str+='<span>'+curDay+++'</span>';
			}
		}
	}
	number.innerHTML=str;
	strong.innerHTML=d.getFullYear()+'年'+(d.getMonth()+1)+'月';
};

//上个月点击
btns[0].onclick=function(){
	//先获取到日期对象 d 的月份，减 1 后再将其作为月份设置给日期对象 d
	d.setMonth(d.getMonth()-1);
	setCalendar(d);
};

//下个月点击
btns[1].onclick=function(){
	d.setMonth(d.getMonth()+1);
	setCalendar(d);
};

//跳转到当前日期
time2.onclick=function(){
	//用一个新的日期对象作为参数
	setCalendar(new Date());
}
