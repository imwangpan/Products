/*
 * 弹窗的配置参数，这些都给用户写的
 * 	id:0,
 *	width:400,
 *	height:200,
 *	pos:'center',
 *	title:'陈学辉',
 *	content:'海棠学院',
 *	mask:true,
 *	sureBtn:true,
 *	sureBtnText:'确定'
 */

window.onload = function() {
	var inputs = document.querySelectorAll("input");

	inputs[0].onclick = function() {
		var dialog = new Dialog();
		dialog.init({
			id: 0,
			title: '陈学辉'
		});
	};

	inputs[1].onclick = function() {
		var dialog = new Dialog();
		dialog.init({
			id: 1,
			width: 300,
			height: 300,
			title: 'kaivon',
			content: 'kaivon正在学习中',
			pos: 'leftTop',
			mask: false,
			sureBtnText: '提交'
		});
	};

	inputs[2].onclick = function() {
		var dialog = new Dialog();
		dialog.init({
			id: 2,
			width: 200,
			height: 300,
			title: '陈学辉',
			content: '陈学辉正在学习中',
			pos: 'rightBottom',
			mask: false,
			sureBtn: false
		});
	};
};

;
(function(window, undefined) {
	var Dialog = function() {
		this.settings = {
			id: 0,
			width: 400,
			height: 200,
			pos: 'center',
			title: '陈学辉',
			content: '海棠学院',
			mask: true,
			sureBtn: true,
			sureBtnText: '确定'
		}
	};

	Dialog.prototype = {
		constructor: Dialog,
		dialogId: {
			/*0:true,
			1:false*/
		},
		init: function(opt) {
			var opt = opt || this.settings;

			for(var attr in opt) {
				this.settings[attr] = opt[attr];
			}

			/*
			 * 防止连续点击都会有弹窗
			 * 	1、给每个弹窗的id都设置一个对应的布尔值
			 * 		true		说明没点击，可以弹窗
			 * 		false		说明已经点击，不能弹窗
			 * 	2、只有当对应的布尔值为true的时候才可以创建，创建完成以后要把对应的布尔值改成false
			 * 	3、在点击关闭以后，要让对应的布尔值变为true,可以再次弹窗
			 * 	
			 */

			//如果这个条件满足的话，说明对象里没有这个属性，代表首次点击
			if(this.dialogId[this.settings.id] == undefined) {
				//如果没有这个key，就创建一个，让他的布尔值为true
				this.dialogId[this.settings.id] = true;
			}

			//在创建DOM的时候要去看一下对应的id的布尔值，是否为true
			if(this.dialogId[this.settings.id]) {
				this.create();

				this.dialogId[this.settings.id] = false;
			}

		},
		create: function() {
			var This = this;

			//这个方法是用来创建DOM
			this.dialog = document.createElement("div"); //弹窗的父级
			this.dialog.className = 'dialogWrap';
			this.dialog.innerHTML = '<div class="dialogHeader"><h3>' + this.settings.title + '</h3><span>x</span></div><div class="dialogMain">' + this.settings.content + '</div>';

			document.body.appendChild(this.dialog);

			//用户的参数里mask为true,调用这个方法
			if(this.settings.mask) {
				this.createMask();
			}

			//用户的参数里sureBtn为true,调用这个方法
			if(this.settings.sureBtn) {
				this.createSureBtn();
			}

			//当创建完成DOM以后就去调用一下这个方法
			this.setPos();

			//给"X"添加点击事件
			var closeBtn = this.dialog.querySelector('span');

			closeBtn.addEventListener('click', function() {
				This.close();
			});
		},
		createMask: function() {
			var This = this;
			this.mask = document.createElement("div");
			this.mask.className = 'dialogMask';
			this.mask.style.Height = window.innerHeight + window.pageYOffset + 'px';

			this.mask.addEventListener('click', function() {
				This.close();
			});

			document.body.appendChild(this.mask);
		},
		createSureBtn: function() {
			var This = this;
			var dialogFooter = document.createElement("div");
			dialogFooter.className = 'dialogFooter';

			var sureBtn = document.createElement("button");
			sureBtn.innerHTML = this.settings.sureBtnText;

			sureBtn.addEventListener('click', function() {
				This.close();
			});

			dialogFooter.appendChild(sureBtn);
			this.dialog.appendChild(dialogFooter);
		},
		setPos: function() {
			this.dialog.style.width = this.settings.width + 'px';
			this.dialog.style.height = this.settings.height + 'px';

			switch(this.settings.pos) {
				case 'center':
					this.dialog.style.left = (window.innerWidth - this.settings.width) / 2 + 'px';
					this.dialog.style.top = (window.innerHeight - this.settings.height) / 2 + 'px';
					break;

				case 'leftTop':
					this.dialog.style.left = 0;
					this.dialog.style.top = 0;
					break;

				case 'rightBottom':
					this.dialog.style.right = 0;
					this.dialog.style.bottom = 0;
					break;
			}
		},
		close: function() {
			document.body.removeChild(this.dialog);

			if(this.settings.mask) {
				document.body.removeChild(this.mask);
			}

			//关掉后要把对应的布尔值改成true,可以再次弹窗
			this.dialogId[this.settings.id] = true;
		}

	};

	window.Dialog = Dialog;
})(window, undefined);