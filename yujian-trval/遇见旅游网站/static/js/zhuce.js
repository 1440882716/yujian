window.onload = function() {
	zhuCe(); //注册函数，自调用
}

function zhuCe() {
	var zhuceyanzhengimg = document.querySelector(".zhuceyanzhengimg");
	//点击验证码图片
	zhuceyanzhengimg.onclick=function(){
		zhuceyanzhengimg.src="/zhuce/coder?a="+new Date();
	}
	
	//点击注册按钮
	let zhuce = document.querySelector(".btn-zhuce");
	zhuce && (zhuce.onclick = function() {
		var flog = 0;
		//获取手机号输入框的值
		let username =document.querySelector("input[name='username']");
		let u_val=username.value;
		//获取验证码
		let yanzhengma = document.querySelector(".info");
		let y_val=yanzhengma.value;
		//获取密码框的值
		let pwd =document.querySelector("input[name='pwd']");
		let pwd_val=pwd.value;
		//获取条例框的勾选状态
		let checkp =document.querySelector("input[name='checkp']");
		if (u_val == "") {
			alert("*请输入您的手机号码");
			username.focus();
			flog++;
			return false;
		}
		if (u_val.length != 11) {
			alert("*您输入的手机号码格式错误");
			username.focus();
			flog++;
			return false;
		}
		if (y_val == "") {
			alert("*请输入验证码");
			yanzhengma.focus();
			flog++;
			return false;
		}
		if (pwd_val == "") {
			alert("*请输入您的密码");
			pwd.focus();
			flog++;
			return false;
		}
		if (pwd_val.length < 6 || pwd_val.length > 20) {
			alert("*请输入6~20位密码");
			pwd.focus();
			flog++;
			return false;
		}
		if(checkp.checked != true){
			alert("*您需要勾选：我已经浏览并接受 《使用条款》 才能注册 \n 是否确认勾选")
			checkp.checked = "checked"
			flog++;
			return;
		}
		
		if(!flog){
			//可以发起ajax请求了
			//console.log("请求开始...")
			let xhr = new XMLHttpRequest();
			xhr.open('POST', '/zhuce/yanzheng');
			//设置请求头
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			//发送数据到服务器  ES6里面的字符串模板
			xhr.send(`username=${u_val}&pwd=${pwd_val}&y_val=${y_val}`);
			// 状态事件监听并接收响应数据
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					let result = xhr.responseText;
					// 接收的是字符串类型，需要转成对象
					result = JSON.parse(result);
					//console.log(result);
					if(result.r == 'y_value_is_err'){
						alert("验证码错误");
						return;
					}
					
					if(result.r == 'username_exist') {
						alert('*账号已存在,请注册其他账号');
						//input2.focus();
					} else if(result.r == 'ok') {
						alert("注册成功！");
						window.location.href = '/zhuce/zhanghao';
					} else {
						alert('未知错误，刷新后操作');
					}
				}
			}
				
		}
		
		
		




	})
}


