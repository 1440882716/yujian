//个人中心   前端

//登录按钮
var btn1 = document.querySelector(".btn1");
btn1.onclick = function(){
	var username = document.querySelector("input[name='username']").value;
	var pwd = document.querySelector("input[name='pwd']").value;
	
	var input1 = document.querySelector("input[name='username']");
	var input2 = document.querySelector("input[name='pwd']");
	
	
	if(username == '') {
		alert('*账号不能为空');
		return;
	}
	
	if(pwd == '') {
		alert('*密码不能为空');
		return;
	}
	
	//账号，密码输入后与服务器请求数据
	if(username != '' && pwd != '') {
		// 发起ajax请求
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/person/login');
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
				console.log(result);
				if(result.r == 'username_not_exist') {
					alert('*账号不存在');
					input1.focus();
				} else if(result.r == 'pwd_err') {
					alert("*密码错误");
					input2.focus();
				} else if(result.r == 'ok') {
					window.location.href = '/?a='+"yes";
				} else {
					alert('未知错误，刷新后操作');
				}
			}
		}

	}

}



