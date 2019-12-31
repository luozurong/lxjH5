function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
};
var token = GetURLParameter("token");
var clientType = GetURLParameter("clientType");
var label = GetURLParameter("label");
var countFlag = "";
var couponType = "";
var status = "";
var oList = "";
switch(label) {
	case "favoured":
		countFlag = 0;
		couponType = 0;
		status = 1;
		var templateId = $("#favouredTemplate");
		setTitle("优惠券");
		var nomoreId=$(".nomore_favoured");
		break;
	case "group":
		countFlag = 0;
		couponType = 1;
		status = 1;
		setTitle("团购券");
		var templateId = $("#groupTemplate");
		var nomoreId=$(".nomore_group");
		$(".no_order img").attr("src","images/tuangouquan.png");
		break;
	case "exchange":
		countFlag = 0;
		couponType = 2;
		status = 1;
		setTitle("兑奖券");
		var templateId = $("#exchangeTemplate");
		var nomoreId=$(".nomore_exchange");
		$(".no_order img").attr("src","images/duihuanquan.png");
		break;
	case "favoured_expired":
		countFlag = 0;
		couponType = 0;
		status = 0;
		setTitle("优惠券");
		var templateId = $("#favouredTemplate_expired");
		var nomoreId=$(".nomore_favoured");
		$(".check").remove();
		break;
	case "group_expired":
		countFlag = 0;
		couponType = 1;
		status = 0;
		setTitle("团购券");
		var templateId = $("#groupTemplate_expired");
		var nomoreId=$(".nomore_group");
		$(".check").remove();
		$(".no_order img").attr("src","images/tuangouquan.png");
		break;
	case "exchange_expired":
		countFlag = 0;
		couponType = 2;
		status = 0;
		setTitle("兑奖券");
		var templateId = $("#exchangedTemplate_expired");
		var nomoreId=$(".nomore_exchange");
		$(".check").remove();
		$(".no_order img").attr("src","images/duihuanquan.png");
		break;
	default:
}
var pageSize = 99999;
var pageNum = 1;
var time_stamp = Date.parse(new Date());
var data = "{\"body\":{" +
	"\"countFlag\":" + countFlag + "," +
	"\"pageSize\":" + pageSize + "," +
	"\"pageNum\":" + pageNum + "," +
	"\"status\":\"" + status + "\"," +
	"\"couponType\":" + couponType + "}," +
	"\"header\":{" +
	"\"token\":\"" + token + "\"," +
	"\"time_stamp\":\"" + time_stamp + "\"" +
	"}" +
	"}";
var requestURL = host + "/mms/servlet/getAllCoupons?str=" + data;
$.ajax({
	type: "get",
	url: requestURL,
	async: true,
	dataType: "jsonp",
	jsonp: "jsoncallback",
	jsonpCallback: "success_jsonpCallback",
	success: function(data) {
		if(data.result == 0) {
			switch(label) {
				case "favoured":
					oList = data.couponList;
					getCoupons(templateId, oList,nomoreId);
					break;
				case "favoured_expired":
					oList = data.couponList;
					getCoupons(templateId, oList,nomoreId);
					break;
				case "group":
					oList = data.groupCouponList;
					getCoupons(templateId, oList,nomoreId);
					break;
				case "group_expired":
					oList = data.groupCouponList;
					getCoupons(templateId, oList,nomoreId);
					break;
				case "exchange":
					oList = data.exchangeAwardList;
					getCoupons(templateId, oList,nomoreId);
					$(".list").each(function(){
						if($(this).attr("date")=="2"){
							$(this).find(".way").html("请致电400-8822-252进行兑奖");
						}
					})
					break;
				case "exchange_expired":
					oList = data.exchangeAwardList;
					getCoupons(templateId, oList,nomoreId);
					$(".list").each(function(){
						if($(this).attr("date")=="2"){
							$(this).find(".way").html("请致电400-8822-252进行兑奖");
						}
						if($(this).attr("id")=="2"){
							$(this).css("background-image","url(images/yiguoqi.png)");
						}
					})
					break;
				default:
			}
		}
	}
});

function getCoupons(tId, list,$nomoreId) {
	var listLength = list.length;
	var oHtml = "";
	if(list.length == 0) {
		$(".no_order").show();
		$nomoreId.find("span").css("display","block");
		$nomoreId.show();
	} else {
		for(var i = 0; i < listLength; i++) {
			var fTemplate = _.template(tId.html());
			oHtml += fTemplate(list[i]);
		}
		$(".listBox").append(oHtml);
		$nomoreId.show();
	}
	
}

function favoured() {
	showActivity(host + "/mms/html5/personal/sales_coupons.htm?label=favoured_expired", "优惠券");
}

function group() {
	showActivity(host + "/mms/html5/personal/sales_coupons.htm?label=group_expired", "团购券");
}

function exchange() {
	showActivity(host + "/mms/html5/personal/sales_coupons.htm?label=exchange_expired", "兑奖券");
}

function detail(ele){
	var orderNo=$(ele).attr("id");
	showActivity(host+"/mms/html5/personal/specialty_order_detail.htm?orderNo="+orderNo,"团购券详情");
}
