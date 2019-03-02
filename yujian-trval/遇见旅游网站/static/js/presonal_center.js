window.onload = function() {
	center(); //注册函数，自调用
}

function center(){
	//头像的数据
	let touxiang = document.querySelector(".touxiang img");
	let username=document.querySelector(".username");//获取呢称的节点
	let guanzhu=document.querySelector(".guanzhu");//获取关注的节点
	let fensi=document.querySelector(".fensi");//获取粉丝的节点
	let shequ=document.querySelector(".shequ");//获取社区的节点
	let huiyuan=document.querySelector(".huiyuan");//获取等级的节点
	
	//整个页面的Ajax请求？
// 	axios.post('/presonal_center', {
// 				// 没有数据需要发送给服务器
// 			})
// 			.then(function(response) {
// 				if(response.touxiang){
// 					touxiang.src=response.touxiang;//touxiang是用户的头像,如果没有就默认原始的图片
// 				}
// 				username=response.touxiang;
// 				guanzhu=response.guanzhu;
// 				fensi=response.fensi;
// 				shequ=response.shequ;
// 				huiyuan=response.huiyuan;
// 				
// 				
// 			})
// 			.catch(function(error) {
// 				console.log(error);
// 			});
// 	
// 	
// 	
	
	
	//日志栏输入框特效
	let xinqing=document.querySelector(".xinqing");
	let wenming=document.querySelector(".wenming");
	xinqing.onfocus=function(){
		wenming.style.display="block";
	}
	xinqing.onblur=function(){
		wenming.style.display="none";
	}
	
	//发表按钮的特效
	let fabiao=document.querySelector(".fabiao");
	fabiao.onmouseenter=function (){
		fabiao.style.backgroundColor="#89a";
	}
	fabiao.onmouseleave=function (){
		fabiao.style.backgroundColor="#7b8c9e";
	}
	//发表的数据传输？
	let xqT=xinqing.innerHTML;
	fabiao.onclick=function(){
// 		axios.post('/fabiao', {
// 					xinqing:xqT
// 				})
// 				.then(function(response) {
// 					if(response.data=="ok"){
// 						window.location.href="/presonal_center";//刷新本页面
// 					}
// 				})
// 				.catch(function(error) {
// 					console.log(error);
// 				});
 	}
	
	//刷新动态栏的固定效果
	let dtstart = document.querySelector(".dt-up").offsetTop;
	
	//获取动态栏距离浏览器顶部的距离
	document.onscroll = function(e) {
		if(pageYOffset>= dtstart) {
		document.querySelector(".dt-up").classList.add("guding");
		}else {
			document.querySelector(".dt-up").classList.remove("guding");
		}	//pageYOffset滚动条滑上去隐藏的距离
			
	}
	
	
	//刷新按钮的点击事件
	let update=document.querySelector(".update");
	update.onclick=function(){
		window.location.href="/presonal_center";//模块引擎
		//刷新整个页面，因为数据要重新获取一遍达到刷新的效果 //？
	}
	
	
	//评论点赞区的特效
	let pl=document.querySelectorAll(".pl li");
	for(let i=0;i<pl.length;i++){
		pl[i].onclick=function(e){
			if(e.target.style.color!="coral"){
				e.target.style.color="coral";
			}else {
				e.target.style.color="#333";
			}
			
			
		}
	}
	
	
	
	
	
	
	
	
	
	
	
}