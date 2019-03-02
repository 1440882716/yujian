window.onload=function(){
	place();
//	search();
	person();
	local();
	
	//检测首元素
	//var nav1_left = document.querySelector(".nav1_left");
	//var num = nav1_left.children[0];
	//console.log(num);
}
//点击周边游
function local(){
	var local = document.querySelector(".local");
	var classname = document.querySelector(".nav1_left").children[0].classList[0];
	local.onclick = function(){
		//没有登录直接转
		if(classname=='first'){
			window.location.href="/page1/zhouBianYou";
			return;
		}
		//登录了就要把账号弄过去
		window.location.href="/page1/zhouBianYou2";
	}
}

//点击个人中心
function person(){
	var center = document.querySelector(".center");
	var classname = document.querySelector(".nav1_left").children[0].classList[0];
	console.log(classname)
	center.onclick=function(){
		
		//去登录页面
		if(classname=='first'){
			window.location.href="/person/zhanghao";
			return;
		}
		
		//否则去个人中心  post ajax
		window.location.href="/page1/presonal_center";
//		let xhr = new XMLHttpRequest();
//		xhr.open('POST', '/person/presonal_center');
//		//设置请求头
//		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
//		var username1 = document.querySelector(".username1").innerHTML;
//		//发送数据到服务器  ES6里面的字符串模板
//		xhr.send(`username1=${username1}`);
//		// 状态事件监听并接收响应数据
//		xhr.onreadystatechange = function() {
//			if(xhr.readyState == 4 && xhr.status == 200) {
//				let result = xhr.responseText;
//				// 接收的是字符串类型，需要转成对象
//				result = JSON.parse(result);
//				//console.log(result);
//				if(result.r == 'ok') {
//					alert("注册成功！");
//					window.location.href = '/';
//				} else {
//					alert('未知错误，刷新后操作');
//				}
//			}
//		}
		
	}
}


//改变地点事件
function place(){
	let option=document.querySelector(".option");
	let triangle=document.querySelector(".triangle");
	let plist=document.querySelector("#plist");
	let c_text=document.querySelector(".c_text");
	option.onmouseover=function(){
		plist.style.display="block";
		//console.log(triangle);
		triangle.className="glyphicon glyphicon-menu-up triangle"
		let p_ul=plist.firstElementChild;//获取到ul
		let a=p_ul.children;
		//console.log(a);
		for(var i=0;i<a.length;i++){
			a[i].onclick=function (e){
				//console.log(e.target);
				c_text.innerHTML=e.target.innerHTML
			}
		}
	}
	option.onmouseout=function(){
		plist.style.display="none";
		triangle.className="glyphicon glyphicon-menu-down triangle"
	}
}

//下面没有用了，直接submit提交了
////点击首页输入框的按钮发起ajax请求
//function search(){
//	let btn=document.querySelector('.btn');
//	btn.onclick=function(){
//		let place=document.querySelector('input[name="place"]');
//		let pValue=place.value;
//		//用户不输入值，就死默认值：前面框中值  的情况
//		let c_text = document.querySelector(".c_text").innerHTML;
//		if(pValue==''){
//			pValue=c_text;
//			axios.post('/page1/search',{
//				place:pValue
//			})
//			.then(function (response){
//				if(response.data=='ok'){
//					window.location.href = '/search';
//				}
//			})
//			.catch(function (error) {
//				console.log("请求错误")
//			})
//		}
//		//用户输入值的情况
//		else{
//			axios.post('/page1/search',{
//				place:pValue
//			})
//			.then(function (response){
//				if(response.data=='ok'){
//					window.location.href = '/search';
//				}
//			})
//			.catch(function (error) {
//				console.log("请求错误")
//			})
//		}
//	}
//}


//
