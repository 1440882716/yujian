//商品点击服务器
//req.session.classnum   class   用于数据库查询条件，主键和外键，goods表和search表
const express = require("express");
const miniApp = express.Router();

miniApp.get("/goods",function(req,res){
	var number = req.query.number;//城市景点的序号
	var classnum = req.session.classnum;//城市序号
	let sql = 'SELECT * FROM goods WHERE class = ? and goods = ?';
	mydb.query(sql, [classnum,number], (err, result) => {
		if(err) {
			console.log(err);
			return;
		}
		//console.log(number);//城市景点的序号
		//console.log(classnum);//城市序号
		//console.log(result);//数据库查询结果
		res.render("goods",{
			result:result
		})
	});
})


//暴露接口
module.exports = miniApp;

