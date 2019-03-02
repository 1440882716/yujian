const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const session = require("express-session");
global.svgCaptcha = require('svg-captcha');//验证码模块



//post 数据接收
app.use(bodyParser.urlencoded({extended: true}));

// 连接到数据库
global.mydb = mysql.createConnection({
	user: 'root',
	password: '123',
	host: 'localhost',
	database: 'yujian'
});
mydb.connect();

//模板引擎设置
app.engine('html', ejs.renderFile); //自定义模板引擎html
app.set('views', 'myviews'); //模板文件所在的路径
app.set('view engine', 'html');

//启用cookie
let select = "moc.01815h.www";   //这个的作用是签名 cookie中使用的  而session又依赖cookie同时其必须使用签名，所以有这行
app.use(cookieParser(select));

//启用session
app.use(session({
  secret: select,
  name:"yujian",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge:24*3600000}
}))



//首页的子路由
app.use('/page1', require('./route/page1.js'));
//个人主页的子路由
app.use('/person', require('./route/person.js'));
//周边游的子路由
app.use('/local', require('./route/local.js'));
//手机登录的子路由
app.use('/shouji', require('./route/shouji.js'));
//注册界面自路由
app.use('/zhuce', require('./route/zhuce.js'));
//搜索城市进去后的界面的界面子路由    每个城市景点的子路由
app.use('/goods', require('./route/search.js'));

//到首页  只能用于那两种登录方式
app.get("/",(req,res)=>{
	//热门目的地
	let sql = "select * from place where class=? or class=?"
	mydb.query(sql,[1,3],function(err,results){
		if(err){
			console.log("数据库请求错误");
			return;
		}
		//console.log(results);
		//console.log(result);
		req.session.flog = 0;
		var result1 = [];
		var result2 = [];
		var result0 = "";
		var data = req.query.a;
		
		if(data=="yes"){
			result0="ok";
			req.session.flog = req.session.username;
		}
		req.session.flog3 = "none"
		var flog = req.session.flog3;
		
		var result3 = req.session.flog;
		//console.log(result3);
		for(var i = 0; i < results.length;i++){
			if(results[i].class==1){
				result1.push(results[i]);
			}else{
				result2.push(results[i])
			}
		}
		res.render("shouye",{
			flog:flog,
			result:"none",
			result1:result1,
			result2:result2,
			result0:result0,          //是否登录  “”  或者    “ok”
			result3:result3          //用户名
		})
	})
})

app.get("/first",function(req,res){
	var name = req.session.username;
	console.log(name)
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
		res.render("shouye",{
			result:name,
			result1:result1,         //热门
			result2:result2,		//小众
			result0:result0         //是否登录  “none”  或者    “get”
		})
	})
	
})
//静态资源托管
app.use(express.static(__dirname + '/static'));
//端口监听
app.listen(8080, function() {
	console.log("服务器启动成功...")
})