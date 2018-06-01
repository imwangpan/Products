var box=document.querySelector("#box");
console.log(box)
//右边框
box.onmousemove=function(ev){
	var xx=box.getBoundingClientRect()
	//console.log(1)
	if(xx.right-ev.clientX>=0&&xx.right-ev.clientX<=5){
		//右边框
		
		box.style.cursor="ew-resize"
		
		box.onmousedown=function(ev){
			var disX=ev.clientX;
			var w=box.clientWidth;
			document.onmousemove=function(ev){
				var newWidth=ev.clientX-disX+w
				if(newWidth<200){
					newWidth=200
				}
				box.style.width=newWidth+'px'
			}
			document.onmouseup=function(ev){
				document.onmousemove=null
				//ev.cancelBubble=true
			}
		}
	}else if(ev.clientX-xx.left>=0&&ev.clientX-xx.left<=5){
		//左边框
		
		box.style.cursor="ew-resize"
		
		box.onmousedown=function(ev){
			var disX=ev.clientX;
			var w=box.clientWidth;
			var l=box.offsetLeft
			document.onmousemove=function(ev){
				if(disX-ev.clientX>0){
					var newWidth=disX-ev.clientX+w
					var lNew=l-(disX-ev.clientX)
				}else{
					var newWidth=w-(ev.clientX-disX)
					var lNew=l+(ev.clientX-disX)
				}
				if(newWidth<200){
					newWidth=200
				}
				if(lNew>600){
					lNew=600
				}
				box.style.width=newWidth+'px'
				box.style.left=lNew+'px'
			}
			document.onmouseup=function(ev){
				document.onmousemove=null
				//ev.cancelBubble=true
			}
		}
	}else if(xx.bottom-ev.clientY>=0&&xx.bottom-ev.clientY<=5){
		//下边框
		box.style.cursor="ns-resize"
		
		box.onmousedown=function(ev){
			var disY=ev.clientY;
			var h=box.clientHeight;
			document.onmousemove=function(ev){
				var newHeight=ev.clientY-disY+h
				if(newHeight<200){
					newHeight=200
				}
				box.style.height=newHeight+'px'
			}
			document.onmouseup=function(ev){
				document.onmousemove=null
				//ev.cancelBubble=true
			}
		}
	}else if(ev.clientY-xx.top>=0&&ev.clientY-xx.top<=5){
		//上边框
		box.style.cursor="ns-resize"
		
		box.onmousedown=function(ev){
			var disY=ev.clientY;
			var h=box.clientHeight;
			var t=box.offsetTop
			document.onmousemove=function(ev){
				if(disY-ev.clientY>0){
					var newHeight=disY-ev.clientY+h
					var tNew=t-(disY-ev.clientY)
				}else{
					var newHeight=h-(ev.clientY-disY)
					var tNew=t+(ev.clientY-disY)
				}
				if(newHeight<200){
					newHeight=200
				}
				if(tNew>300){
					tNew=300
				}
				box.style.height=newHeight+'px'
				box.style.top=tNew+'px'
			}
			document.onmouseup=function(ev){
				document.onmousemove=null
				//ev.cancelBubble=true
			}
		}
	}else if(xx.right-ev.clientX>=0&&xx.right-ev.clientX<=15&&xx.bottom-ev.clientY>=0&&xx.bottom-ev.clientY<=15){
		//右下角
		box.style.cursor="se-resize"
		
		box.onmousedown=function(ev){
			var disX=ev.clientX;
			var w=box.clientWidth;
			var disY=ev.clientY;
			var h=box.clientHeight;
			document.onmousemove=function(ev){
				var newWidth=ev.clientX-disX+w
				var newHeight=ev.clientY-disY+h
				if(newWidth<200){
					newWidth=200
				}
				if(newHeight<200){
						newHeight=200
				}
				box.style.height=newHeight+'px'
				box.style.width=newWidth+'px'
			}
			document.onmouseup=function(ev){
				document.onmousemove=null
				//ev.cancelBubble=true
			}
		}
		
	}else if(xx.right-ev.clientX>=0&&xx.right-ev.clientX<=15&&ev.clientY-xx.top>=0&&ev.clientY-xx.top<=15){
		//右上角
		box.style.cursor="ne-resize"
		
		box.onmousedown=function(ev){
			var disX=ev.clientX;
			var w=box.clientWidth;
			var disY=ev.clientY;
			var h=box.clientHeight;
			var t=box.offsetTop
			document.onmousemove=function(ev){
				var newWidth=ev.clientX-disX+w
				if(newWidth<200){
					newWidth=200
				}
				if(disY-ev.clientY>0){
					var newHeight=disY-ev.clientY+h
					var tNew=t-(disY-ev.clientY)
				}else{
					var newHeight=h-(ev.clientY-disY)
					var tNew=t+(ev.clientY-disY)
				}
				if(newHeight<200){
					newHeight=200
				}
				if(tNew>300){
					tNew=300
				}
				box.style.height=newHeight+'px'
				box.style.top=tNew+'px'
				box.style.width=newWidth+'px'
			}
			document.onmouseup=function(ev){
				document.onmousemove=null
				//ev.cancelBubble=true
			}
		}
	}else if(ev.clientX-xx.left>=0&&ev.clientX-xx.left<=15&&xx.bottom-ev.clientY>=0&&xx.bottom-ev.clientY<=15){
		//左下角
		box.style.cursor="sw-resize"
		
		box.onmousedown=function(ev){
			var disX=ev.clientX;
			var w=box.clientWidth;
			var l=box.offsetLeft
			var disY=ev.clientY;
			var h=box.clientHeight;
			document.onmousemove=function(ev){
				if(disX-ev.clientX>0){
					var newWidth=disX-ev.clientX+w
					var lNew=l-(disX-ev.clientX)
				}else{
					var newWidth=w-(ev.clientX-disX)
					var lNew=l+(ev.clientX-disX)
				}
				if(newWidth<200){
					newWidth=200
				}
				if(lNew>600){
					lNew=600
				}
				var newHeight=ev.clientY-disY+h
				if(newHeight<200){
					newHeight=200
				}
				box.style.height=newHeight+'px'
				box.style.width=newWidth+'px'
				box.style.left=lNew+'px'
			}
			document.onmouseup=function(ev){
				document.onmousemove=null
				//ev.cancelBubble=true
			}
		}
	}else if(ev.clientX-xx.left>=0&&ev.clientX-xx.left<=15&&ev.clientY-xx.top>=0&&ev.clientY-xx.top<=15){
		//左上角
		box.style.cursor="nw-resize"
		
		box.onmousedown=function(ev){
			var disX=ev.clientX;
			var w=box.clientWidth;
			var l=box.offsetLeft
			var disY=ev.clientY;
			var h=box.clientHeight;
			var t=box.offsetTop
			document.onmousemove=function(ev){
				if(disX-ev.clientX>0){
					var newWidth=disX-ev.clientX+w
					var lNew=l-(disX-ev.clientX)
				}else{
					var newWidth=w-(ev.clientX-disX)
					var lNew=l+(ev.clientX-disX)
				}
				if(newWidth<200){
					newWidth=200
				}
				if(lNew>600){
					lNew=600
				}
				if(disY-ev.clientY>0){
					var newHeight=disY-ev.clientY+h
					var tNew=t-(disY-ev.clientY)
				}else{
					var newHeight=h-(ev.clientY-disY)
					var tNew=t+(ev.clientY-disY)
				}
				if(newHeight<200){
					newHeight=200
				}
				if(tNew>300){
					tNew=300
				}
				box.style.height=newHeight+'px'
				box.style.top=tNew+'px'
				box.style.width=newWidth+'px'
				box.style.left=lNew+'px'
			}
			document.onmouseup=function(ev){
				document.onmousemove=null
				//ev.cancelBubble=true
			}
		}
	}else{
		box.style.cursor="default"
	}
}