//注册界面  服务器
const express = require("express");
const miniApp = express.Router();


//相关路由

//点击账号登录
miniApp.get("/zhanghao",(req,res)=>{
	res.render("zhanghao");
})

//点击验证码图标
miniApp.get('/coder', function (req, res) {
	var captcha = svgCaptcha.create();
//	console.log(coder.data)
	req.session.coder = captcha.text;
	res.type('svg');
	res.status(200).send(captcha.data);
});

miniApp.post("/yanzheng",function(req,res){
	let data = req.body;
	req.session.username = data.username;
	//console.log(req.session.username)
	//console.log(data)
	let sql = 'SELECT * FROM user WHERE u_name = ?';
	mydb.query(sql, [data.username], (err, result) => {
		//console.log(result)
		if(err) {
			console.log(err);
			res.send('err');
			return;
		}
		//判断账号之前先判断验证码，防止暴力破解 data.yanzhengma
		//console.log(req.session.coder);
		//console.log(data.y_val);
		if(req.session.coder.toLowerCase() != data.y_val.toLowerCase()){
			console.log("验证码错误");
			res.json({
				r: 'y_value_is_err'
			});
			return;
		}
		
		// 判断账号是否存在
		if(result.length) {
			console.log("账号已存在")
			res.json({
				r: 'username_exist'
			});
			return;
		}
		//其他情况就是可以注册了,把注册信息保存到数据库
		let sql2 = 'insert into user(u_name,u_pwd) values(?,?)';
		mydb.query(sql2, [data.username,data.pwd],function(err,result){
			if(err){
				console.log("数据库操作错误...")
				return;
			}
			//console.log(result);
		})
		res.json({
			r: 'ok',
			username:req.session.username
		});
	});
})


//暴露接口
module.exports = miniApp;