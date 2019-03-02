//首页   服务器
const express = require("express");
const miniApp = express.Router();

//相关路由
//点击首页登录
miniApp.get("/login",(req,res)=>{
	res.render("zhanghao");
})
//点击首页注册按钮
miniApp.get("/regist",(req,res)=>{
	res.render("zhuce");
})
//点击logo后转到首页
miniApp.get("/shouye",(req,res)=>{
	res.render("shouye");
})

//点击个人中心  已经登录时
miniApp.get("/presonal_center",(req,res)=>{
	var name = req.session.username;
	console.log(name)
	res.render("presonal_center",{
		result:name
	});
})



//点击最美时光第一张图片
miniApp.get("/yujianni",(req,res)=>{
	res.render("yujianni");
})

//搜索框的路由
miniApp.get("/search",(req,res)=>{
	let data = req.query.place;
	//console.log(data)
	let sql = "select * from search where city like '%"+data+"%'"
	mydb.query(sql,function(err,result){
		if(err){
			console.log("数据库请求失败")
			return;
		}
		var name = req.session.username;
		console.log(name)
		var result0 = "";
		if(name){
			console.log("ok")
			result0 = "get";
		}
		req.session.classnum = result[0].class;   //把当前城市的那个class保存起来，下次在该转跳界面
		//请求数据的时候都把该req.session.classnum作为数据库查询条件，相当于主键和外键的连接
		//console.log(req.session.classnum)
		//console.log(result)    //查询到的信息
		res.render("search",{
			results:result,
			result:name,
			result0:result0
		});
	})
	
})



//点击周边游后转到周边游页面   未登录
miniApp.get("/zhouBianYou",(req,res)=>{
	var name = req.session.username;
	//console.log(name)
	var flog = req.session.flog;
	let sql2 = "select * from place where class=? or class=?"
	mydb.query(sql2,[1,3],function(err,results){
		if(err){
			console.log("数据库请求错误");
			return;
		}  
		var result1 = [];     //存热门的
		var result2 = [];	 //存小众的
		var result0 = "";
		if(name){
			result0 = "get";
		}
		
		//console.log(result3);
		for(var i = 0; i < results.length;i++){
			if(results[i].class==1){
				result1.push(results[i]);
			}else{
				result2.push(results[i])
			}
		}
		res.render("zhoubianyou",{
			result:name,
			result1:result1,         //热门
			result2:result2,		//小众
			result0:result0         //是否登录  “none”  或者    “get”
		})
	})
})
//点击周边游后转到周边游页面   已经登录
miniApp.get("/zhouBianYou2",(req,res)=>{
	var username = req.session.username;
	//热门目的地
	let sql = "select * from place where class=? or class=?"
	mydb.query(sql,[1,3],function(err,results){
		if(err){
			console.log("数据库请求错误");
			return;
		}
		//console.log(results);
		//console.log(result);
		var result1 = [];
		var result2 = [];
		for(var i = 0; i < results.length;i++){
			if(results[i].class==1){
				result1.push(results[i]);
			}else{
				result2.push(results[i])
			}
		}
		res.render("zhouBianYou",{
			result1:result1,
			result2:result2,
			result3:username
		})
	})
})


//点击轮播图转到固定页面
miniApp.get("/lunbo",(req,res)=>{
	var sql = "select * from img_qinjin where class = ?"
	mydb.query(sql,[1],function(err,result){
//		console.log("666666666666")
		//console.log(result);
		if(err){
			console.log("数据库请求失败");
			return;
		}
		res.render("qinjin",{
			result:result
		});
	})
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
		console.log("账号确认!");
		res.json({
			r: 'ok'
		});
	});
});



//暴露接口
module.exports = miniApp;
