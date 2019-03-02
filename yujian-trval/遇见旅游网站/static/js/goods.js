//所有span元素如果内容为空，就不显示    没有找到那些span，没有解决
var span = document.querySelector("span");
//console.log('span')
for(var i = 0; i < span.length;i++){
	if(span[i].innerHTML==null){
		console.log("123")
		span[i].style.display="none";
		span[i].style.border="none"
	}
}


