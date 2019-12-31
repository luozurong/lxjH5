var $windowWidth = $(window).width();
	$windowWidth = $(window).width();
	if($windowWidth > 640) {
		$windowWidth = 640;
	}
	$("html").css("font-size", (100 / 320) * $windowWidth + "px");
$(window).resize(function() {
	$windowWidth = $(window).width();
	if($windowWidth > 640) {
		$windowWidth = 640;
	}
	$("html").css("font-size", (100 / 320) * $windowWidth + "px");

});
//获取时间戳
function getTimestamp() {
	var currentDate = new Date();
	var yyyy = currentDate.getFullYear().toString(); //获取当前年份(2位)
	var MM = (currentDate.getMonth() + 1).toString(); //获取当前月份(0-11,0代表1月)
	if(MM.length == 1)
		MM = "0" + MM;
	var DD = currentDate.getDate().toString(); //获取当前日(1-31)
	if(DD.length == 1)
		DD = "0" + DD;
	var HH = currentDate.getHours().toString(); //获取当前小时数(0-23)
	if(HH.length == 1)
		HH = "0" + HH;
	var mm = currentDate.getMinutes().toString(); //获取当前分钟数(0-59)
	if(mm.length == 1)
		mm = "0" + mm;
	var ss = currentDate.getSeconds().toString(); //获取当前秒数(0-59)
	if(ss.length == 1)
		ss = "0" + ss;
	var time_stamp = yyyy + MM + DD + HH + mm + ss;
	return time_stamp;
}
//判断空值
function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}