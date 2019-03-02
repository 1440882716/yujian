//手机号登录     前端   个人中心
window.onload = function() {
	zhuCe(); //注册函数，自调用
}

function zhuCe() {
	var shuju = 0;
	//验证码
	var yanzhengma = document.querySelector(".yanzhengma");
	var info = document.querySelector(".info");
	yanzhengma && (yanzhengma.onclick = function() {
		info.value = "";
		var phonenumber = document.querySelector(".phonenumber").value;
		if(phonenumber.length != 11) {
			alert("*请输入正确手机号码");
			return;
		}
		//通过Ajax请求获取验证码
		axios.post('/shouji/yanzhengma', {
				// username:u_val//用不上，是否可以
			})
			.then(function(response) {
				if(response.data.r == "ok") {
					//ok获取验证码成功
					shuju = response.data.shuju;
					info.placeholder = "请手动输入验证码：" + response.data.shuju;
					//shuju是服务器返回的验证码
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	});

	//手机   登录   shoujilogin
	var shoujilogin = document.querySelector(".shoujilogin");
	shoujilogin && (shoujilogin.onclick = function() {
		var phonenumber = document.querySelector(".phonenumber").value;
		if(!phonenumber) {
			alert("*请输入手机号");
			return;
		}

		var flog = 0;

		if(info.value == "") {
			flog++;
			alert("*请输入验证码");
		}

		if(info.value != shuju) {
			flog++;
			alert("*验证码输入错误，请重新输入验证码");
		}
		
		//可以发起ajax请求了
		if(!flog) {
			//点击登录  手机账号
			var username = document.querySelector("input[name='username']").value;
			var pwd = document.querySelector("input[name='pwd']").value;
			//alert("可以发起请求了");
			let xhr = new XMLHttpRequest();
			xhr.open('POST', '/shouji/login');
			//设置请求头
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			//发送数据到服务器  ES6里面的字符串模板
			xhr.send(`username=${username}&pwd=${pwd}`);
			// 状态事件监听并接收响应数据
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					let result = xhr.responseText;
					// 接收的是字符串类型，需要转成对象
					result = JSON.parse(result);
					//console.log(result);
					if(result.r == 'username_not_exist') {
						alert('*账号不存在');
						//input2.focus();
					} else if(result.r == 'ok') {
						window.location.href = '/?a='+"yes";
					} else {
						alert('未知错误，刷新后操作');
					}
				}
			}

		}
	})


	//点击去注册按钮 
	let zhuce = document.querySelector(".btn-zhuce");
	zhuce && (zhuce.onclick = function() {
		//获取手机号输入框的值
		let username = document.querySelector("input[name='username']");
		let u_val = username.value;
		//获取验证码
		let y_val = yanzhengma.innerHTML;
		//获取验证码输入框的值
		let yzm = document.querySelector("input[name='yanzhengma']");
		let yzm_val = yzm.value;
		//获取密码框的值
		let pwd = document.querySelector("input[name='pwd']");
		let pwd_val = pwd.value;
		//获取条例框的勾选状态
		let checkp = document.querySelector("input[name='checkp']");
		let c_val = checkp.checked; //判断单选框是否被选中
		if(u_val == "") {
			alert("请输入手机号码");
			cname.focus();
			return false;
		}
		if(yzm_val == "") {
			alert("请进行验证");
			cname.focus();
			return false;
		}
		if(pwd_val == "") {
			alert("请你的密码");
			cname.focus();
			return false;
		}
		if(c_val == false) {
			alert("请阅读使用条款");
			cname.focus();
			return false;
		}
		//通过ajax传送数据给服务器
		axios.post('/center', {
				username: u_val,
				yzm: yzm_val,
				yanzhengma: y_val,
				pwd: pwd_val,
				checkp: c_val
			})
			.then(function(response) {
				if(response.data == "username_existed") {
					alert("该用户名已经注册，请登录");
				}

				if(response.data == "ok") {
					window.location.href = "/center";
				}

			})
			.catch(function(error) {
				console.log(error);
			});
	})

}