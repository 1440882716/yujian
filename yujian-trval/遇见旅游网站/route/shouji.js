//个人主页  手机号登录  服务器
const express = require("express");
const miniApp = express.Router();


//相关路由
//点击账号登录
miniApp.get("/zhanghao",(req,res)=>{
	res.render("zhanghao");
})

//点击获取验证码
miniApp.post('/yanzhengma', (req, res) => {
	console.log("请求开始...");
	var num = 10000+Math.floor(Math.random()*90000);
	var shuju = num;
	//console.log(shuju);
	res.json({
		r: 'ok',
		shuju:shuju
	});
});


miniApp.post('/login', (req, res) => {
	//console.log("请求开始...")
	let data = req.body;
	//console.log("data"+data)
	let sql = 'SELECT * FROM user WHERE u_name = ?';
	mydb.query(sql, [data.username], (err, result) => {
		if(err) {
			//console.log(err);
			return;
		}
		// 判断账号是否存在
		if(!result.length) {
			//console.log("不存在该账号");
			res.json({
				r: 'username_not_exist'
			});
			return;
		}
		//console.log("账号确认成功!");
		req.session.username = data.username;
		res.json({
			r: 'ok'
		});
	});
});


//单击去注册按钮   的服务器响应
miniApp.get('/zhuce', (req, res) => {
	res.render("zhuce")
});


miniApp.get('/shouji', (req, res) => {
	res.render("shouji")
});

//暴露接口
module.exports = miniApp;