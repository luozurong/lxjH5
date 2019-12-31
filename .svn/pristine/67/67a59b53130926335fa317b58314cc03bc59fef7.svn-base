function doubleValue(price) {
	return(Math.round(price * 10000) / 10000).toFixed(2);
}

function Opentip(tip) {
	//	layer.open({
	//		closeBtn: '0',
	//		title: '',
	//		skin: 'demo-class',
	//		content: tip,
	//	});
}

var orderNo = "";
var consumePrice = 0.0; //消费金额
var commitPrice = 0.0; //应付金额
var couponPrice = 0.0; //优惠金额
var token = "";
var appid = "";
var prepayid = ""; //预支付id
var partnerid = "";
var package = "";
var noncestr = "";
var timestamp = "";
var sign = ""; //签名
var payType = 1;
var successUrl = "";
var failUrl = "";
var cancleCallBackUrl = ""; //取消支付回调url
var giftbagId = GetURLParameter("giftbagId");
if(!isCondition(giftbagId)) {
	giftbagId = '';
}

function isCondition(param) { // (!typeof(a) === undefined)
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
$(document).ready(function() {
	sessionStorage.removeItem("couponStr");
	sessionStorage.removeItem("couponPrice");
	sessionStorage.removeItem("couponStatus");
	setRefreshOnResume();
	var host = sessionStorage.getItem("host");
	//时间创建
	// var myDate = new Date();
	// var Ptime = myDate.toLocaleDateString();
	// var CHour = myDate.getHours();
	// var Cminutes = myDate.getMinutes();
	// if (Cminutes < 10) Cminutes = 0 + Cminutes.toString();
	// document.getElementById("time").innerHTML = "创建时间：" + Ptime + " " + CHour + ":" + Cminutes;
	//
	var backStatus = sessionStorage.getItem("backStatus");
	if(backStatus == null || backStatus == "" || backStatus == undefined) {
		backStatus = GetURLParameter('backStatus');
	}
	if(backStatus == "1") {
		clearHistory();
	}
	var url = window.location.search;
	setTitle("提交订单");
	if(url.indexOf("?") != -1) {
		var strs = url.substring(1).split("&");
		var key = [];
		for(var i = 0; i < strs.length; i++) {
			key[strs[i].split("=")[0]] = strs[i].split("=")[1];
		}
		orderNo = key['orderNo'];
		consumePrice = key['consumePrice'];
		commitPrice = key['commitPrice'];
		couponPrice = key['couponPrice'];
		token = sessionStorage.getItem("token");
		if(token == null || token == "" || token == undefined) {
			token = GetURLParameter('token');
		}
		// $("#orderNo").html(orderNo);
		// $("#originalPrice").html("¥&nbsp;" +consumePrice);
		// $("#commitPrice").html("¥&nbsp;" +commitPrice);
		// $("#couponPrice").html("¥&nbsp;" +couponPrice);
		$("#payPrice").html("¥&nbsp;" + commitPrice);
	}
	$(".type").click(function() {
		$("#getPay").attr("onclick", "getPay()");
		$(".type").removeClass("background-img");
		$(this).addClass("background-img");
		payType = $(this).attr("id");
		if($("#getPay").hasClass("bk")) {
			$("#getPay").removeClass("bk");
		}
	});
	var cancleOrderType = sessionStorage.getItem("cancleOrderType"); //成功页面
	if(cancleOrderType == null || cancleOrderType == "" || cancleOrderType == undefined) {
		cancleOrderType = GetURLParameter('cancleOrderType');
	}
	if(cancleOrderType == "1") { //商品订单
		cancleCallBackUrl = host + "/mms/html5/personal/my_order.htm?token=" + token + "&orderStatus=0" + "&backHomePage=1";
	} else if(cancleOrderType == "7") { //团购订单

	} else { //服务订单
		cancleCallBackUrl = host + "/mms/html5/personal/order_details.htm?orderNo=" + orderNo + "&token=" + token + "&backHomePage=1";
	}
	/*if (cancleOrderType=="7") {//团购订单
//		var cId=sessionStorage.getItem("cancleOrderParam");
//		cancleCallBackUrl=host + "/mms/html5/personal/order_details.htm"+"&commodityId="
	}*/
	var successPage = sessionStorage.getItem("successPage");
	if(successPage == null || successPage == "" || successPage == undefined) {
		successPage = GetURLParameter('successPage');
	}
	successUrl = host + "/mms/html5/common/pay/" + successPage + "?orderNo=" + orderNo + "&clientType=" + clientType + "&token=" + token; //成功页面URL
	failUrl = host + "/mms/html5/common/pay/failappointment.htm?orderNo=" + orderNo + "&clientType=" + clientType + "&token=" + token; //失败页面URL
	/*var clicktag = 0;
	$("#getPay").click(function(){
		
	});*/
});

function getPay() {
	var host = sessionStorage.getItem("host");
	$("#getPay").removeAttr("onclick");
	$("#getPay").addClass("bk");
	if(verifyOrder()) {
		
		showProgressDialog();
		if(payType == 1) { //微信支付
			var pay_method = "2";
			var appid = "wxe4219b2fbba0dd40"; //联享家
			//			var appid="wxce429e955a2ac0c6";//绿岛明珠
			var channel_flag = "3";
			var time_stamp = Date.parse(new Date());
			var data = "{\"body\": {\"pay_method\": \"" + pay_method + "\",\"orderNo\": \"" + orderNo + "\",\"appid\": \"" + appid +
				"\",\"channel_flag\": \"" + channel_flag + "\"},\"header\": {\"token\": \"" + token + "\",\"time_stamp\": \"" + time_stamp + "\"}}";
			$.ajax({
				type: "get",
				url: host + "/mms/servlet/getWxPrepayidRequest?str=" + data,
				async: false,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback",
				success: function(odata) {
					if(odata.result == 0) {
						//$("#getPay").css("background-color","#CCCCCC");
						$("#getPay").addClass("bk");
						sign = odata.obj.sign;
						appid = odata.obj.appid;
						partnerid = odata.obj.partnerid;
						package = odata.obj.package;
						noncestr = odata.obj.noncestr;
						prepayid = odata.obj.prepayid;
						time_stamp = odata.obj.timestamp;
						var payData = "{\"appid\": \"" + appid + "\",\"partnerid\": \"" + partnerid + "\",\"package\": \"" + package +
							"\",\"noncestr\": \"" + noncestr + "\",\"timestamp\": \"" + time_stamp + "\",\"prepayid\": \"" + prepayid + "\",\"sign\": \"" + sign + "\"}";
						var i = pay(1, payData, host + "/mms/servlet/getWxPayOrderStatus?orderNo=" + orderNo +
							"&pay_method=" + pay_method + "&channel_flag=" + channel_flag + "&appid=" + appid, successUrl, failUrl, cancleCallBackUrl);

						if(i != 0) {
							$("#getPay").attr("onclick", "getPay()");
							if($("#getPay").hasClass("bk")) {
								$("#getPay").removeClass("bk");
							}
						}
						//调用接口调起微信支付
						setTimeout(
							function() {
								$("#getPay").attr("onclick", "getPay()");
								if($("#getPay").hasClass("bk")) {
									$("#getPay").removeClass("bk");
								}
							}, 10000);
					} else {
						$("#getPay").attr("onclick", "getPay()");

						if(sessionStorage.getItem("lxjversionsName") >= 5000) {
							closeProgressDialog();
						}
						lxjTip.confirm(odata.reason, {
							skin: 'demo3',
							yes: function(index) {
								lxjTip.close(); //如果设定了yes回调，需进行手工关闭
							}
						});
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					$("#getPay").attr("onclick", "getPay()");
				},
				complete: function(odata) {
					//$("#getPay").attr("onclick", "getPay()");
				}
			});
		} else if(payType == 2) {
			//判断是否安装支付宝客户端
			var pay_method = "1";
			//				var appid="2016090701865682";//绿岛明珠
			var appid = "2016050401363591"; //联享家
			var channel_flag = "3";
			var time_stamp = Date.parse(new Date());
			var data = "{\"body\": {\"pay_method\": \"" + pay_method + "\",\"orderNo\": \"" + orderNo + "\",\"appid\": \"" + appid +
				"\",\"channel_flag\": \"" + channel_flag + "\"},\"header\": {\"token\": \"" + token + "\",\"time_stamp\": \"" + time_stamp + "\"}}";
			$.ajax({
				type: "get",
				url: host + "/mms/servlet/getAlipayAppPrepayOrderRequest?str=" + data,
				async: false,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback",
				success: function(odata) {
					if(odata.result == 0) {
						//$("#getPay").css("background-color","#CCCCCC");
						$("#getPay").addClass("bk");
						var payData = odata.obj.payInfo;
						//调用接口调起支付宝
						pay(2, payData, host + "/mms/servlet/getAliPayOrderStatus?orderNo=" + orderNo +
							"&pay_method=" + pay_method + "&channel_flag=" + channel_flag + "&appid=" + appid, successUrl, failUrl, cancleCallBackUrl);
					} else {
						setTimeout(
							function() {
								$("#getPay").attr("onclick", "getPay()");
								if($("#getPay").hasClass("bk")) {
									$("#getPay").removeClass("bk");
								}
							}, 10000);
						lxjTip.confirm(odata.reason, {
							skin: 'demo3',
							yes: function(index) {
								lxjTip.close(); //如果设定了yes回调，需进行手工关闭
							}
						});
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					$("#getPay").attr("onclick", "getPay()");
				},
				complete: function(odata) {
					//$("#getPay").attr("onclick", "getPay()");
				}
			});
		}
	}
}

function verifyOrder() {
	var flag = false;
	var params = {};
	var timestamp = new Date().getTime();
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	params.body = {
		orderNo: orderNo,
		giftbagId: giftbagId
	};
	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/verifyCommodityOrder?str=" + paramData;

	$.ajax({
		type: "post", //jquey是不支持post方式跨域的
		async: false,
		url: reqUrl, //跨域请求的URL
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(data.result == 0) {
				if(data.statusFlag == 1 && data.priceFlag == 1 && data.giftBagLimitFlag == 1) {
					flag = true;
				} else {
					if(data.statusFlag == 0) { //没有此商品,关闭订单
						lxjTip.confirm(data.reason, {
							skin: 'demo3',
							yes: function(index) {
								lxjTip.close(); //如果设定了yes回调，需进行手工关闭
							}
						});
						cancelOrder();
					} else if(data.giftBagLimitFlag == 0) {
						lxjTip.confirm('抱歉！您已参与过该优惠活动了，别太贪心哦！更多精美商品尽在联享家商品超市，欢迎选购', {
							skin: 'demo3',
							btn: ['逛一逛', '取消'],
							yes: function(index) {
								showActivitySpecial(host + "/mms/html5/supermarket/productClassify.htm?backHomePage=1", "商品超市", 4, null);
								lxjTip.close(); //如果设定了yes回调，需进行手工关闭
							}
						});
					} else {
						if(data.priceFlag == 0) { //订单价格信息有变动
							getChangedOrderInfo();
						}
					}
					flag = false;
				}

			}
		},
		error: function() {
			$("#getPay").attr("onclick", "getPay()");
		}
	});
	return flag;
}

function getChangedOrderInfo() {
	var params = {};
	var timestamp = new Date().getTime();
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	params.body = {
		totalOrderNo: orderNo,
		giftbagId: giftbagId
	};
	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/getChangeOrderInfo?str=" + paramData;
	$.ajax({
		type: "post", //jquey是不支持post方式跨域的
		async: false,
		url: reqUrl, //跨域请求的URL
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(data.result == 0) {
				if(data.breakOrderStatus != 1) {
					lxjTip.confirm('订单信息已更改，请重新确认!', {
						skin: 'demo3',
						yes: function(index) {
							lxjTip.close(); //如果设定了yes回调，需进行手工关闭
						}
					});
					$("#getPay").attr("onclick", "getPay()");
					// $("#originalPrice").html("¥" +doubleValue(data.orderTotalPrice));
					// $("#commitPrice").html("¥" +doubleValue(data.payPrice));
					// $("#couponPrice").html("¥" +doubleValue(data.couponPrice));
					$("#payPrice").html("¥" + doubleValue(data.payPrice));
				} else {
					lxjTip.confirm('订单信息已更改，订单即将关闭，请重新购买！', {
						skin: 'demo3',
						yes: function(index) {
							lxjTip.close(); //如果设定了yes回调，需进行手工关闭
						}
					});
					cancelOrder();
				}
			}
		}
	});
}

function cancelOrder() {
	var params = {};
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	params.body = {
		totalOrderNo: orderNo,
	};
	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/cancelNotPayOrder?str=" + paramData;
	$.ajax({
		type: "post", //jquey是不支持post方式跨域的
		async: false,
		url: reqUrl, //跨域请求的URL
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(data.result == 0) {

			}
		}
	});
}
//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}