
var $windowWidth = $(window).width();
setTimeout(function() {
	$windowWidth = $(window).width();
	if($windowWidth < 414) {
		$windowWidth = 414; //限定最大宽度为640
	}
	$("html").css("font-size", "129.375px");
}, 100);

$(window).resize(function() {
	$windowWidth = $(window).width();
	if($windowWidth < 414) {
		$windowWidth = 414; //限定最大宽度为640
	}
	$("html").css("font-size", "129.375px");
});

//先从URL提取信息
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

var commodityId=GetURLParameter("commodityId");

$(document).ready(function() {
	
	//根据商品id获取商品详情接口
	if (commodityId != "" && commodityId != undefined) {
		var time_stamp = Date.parse(new Date());
		var token="";
		var data = "{\"body\":{\"commodityId\":\"" + commodityId + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
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
	
})
