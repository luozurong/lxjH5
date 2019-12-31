function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
var $windowWidth = $(window).width();
if($windowWidth > 640) {
	$windowWidth = 640; //限定最大宽度为640
}
$("html").css("font-size", (100 / 320) * $windowWidth + "px");

$(window).resize(function() {
		$windowWidth = $(window).width();
	if($windowWidth > 640) {
		$windowWidth = 640;
	}
	$("html").css("font-size", (100 / 320) * $windowWidth + "px");
});

//先从URL提取信息
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
//分割小数点
function splitNum(numberN) {
	var Num=numberN;
	var Nums= new Array(); 
	Nums = (Num  + "").split(".");
	return Nums;
}
//token必须要
var token = GetURLParameter("token");
if (!isCondition(token)) {
	location.href=host+"/mms/html5/common/loading/downloadWarn.htm";
}
//手机类型
var clientType = GetURLParameter("clientType");
//住户编号 
var householdSerial = GetURLParameter("householdSerial");
//小区机构编号
var areaCode = GetURLParameter("organizationSeq");
var commodityId=GetURLParameter("commodityId");
$(document).ready(function() {
	setTitle("服务介绍");
	//根据商品id获取商品详情接口
	if (commodityId != "" && commodityId != undefined) {
		var time_stamp = Date.parse(new Date());
		var moduleName="housekeeping";
		var data = "{\"body\":{\"commodityId\":\"" + commodityId + "\",\"moduleName\":\"" + moduleName + "\",\"areaSeq\":\"" + areaCode + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
		$.ajax({
			type: "get",
			url: "/mms/servlet/getCommodityInfo?str=" + data,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(odata) {
				if (odata.result == 0) {
					var obj = odata.list[0];
					$("#pic_img").append(obj.details);
					$("#pic_img img").css("width","100%");
					$("#prices").html(obj.currentPrice+"元/小时");
				}
			}
		});
	}
	
	$("#open").click(function(){
		showActivity(host+"/mms/html5/housekeep/index.htm?commodityId="+commodityId,"预约家政");
	});
})
