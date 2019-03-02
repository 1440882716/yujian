//个人主页  服务器
const express = require("express");
const miniApp = express.Router();


//相关路由

//点击logo后转到首页
miniApp.get("/shouye",(req,res)=>{
	res.render("shouye");
})

//点击手机快捷登录
miniApp.get("/shouji",(req,res)=>{
	res.render("shouji");
})

//点击账号登录
miniApp.get("/zhanghao",(req,res)=>{
	res.render("zhanghao");
})

//点击去注册 
miniApp.get("/zhuce",(req,res)=>{
	res.render("zhuce");
})


//点击登录进行响应
miniApp.post('/login', (req, res) => {
	//console.log("请求开始...")
	let data = req.body;
	//console.log("data"+data)
	let sql = 'SELECT * FROM user WHERE u_name = ?';
	mydb.query(sql, [data.username], (err, result) => {
		if(err) {
			console.log(err);
			res.send('err');
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
		// 判断密码是否正确
		if(result[0].u_pwd != data.pwd) {
			//console.log("密码错误");
			res.json({
				r: 'pwd_err'
			});
			return;
		}
		req.session.username = data.username;  //设置req.session.username 保存用户名
		req.session.flog2 = 1;
		console.log("账号确认!");
		res.json({
			r: 'ok'
		});
	});
});





//暴露接口
module.exports = miniApp;