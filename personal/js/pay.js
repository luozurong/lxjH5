var orderNo = "";
var orderPrice = 0.0; //总金额
var totalPrice = 0.0; //应付金额
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
var clientType;

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
$(document).ready(function() {
	setRefreshOnResume();
	setTitle("支付");
	//百度统计
	var jsonData = {
		eventId: "click35",
		eventName: "订单支付页面浏览次数"
	};
	jsonData = JSON.stringify(jsonData);
	nativeMethod("baiduStatistics", jsonData);
	//时间创建
	// var myDate = new Date();
	// var Ptime = myDate.toLocaleDateString();
	// var CHour = myDate.getHours();
	// var Cminutes = myDate.getMinutes();
	// if (Cminutes < 10) Cminutes = 0 + Cminutes.toString();
	// document.getElementById("time").innerHTML = "创建时间：" + Ptime + " " + CHour + ":" + Cminutes;
	//
	var url = window.location.search;
	if(url.indexOf("?") != -1) {
		var str = url.substring(1);
		var strs = str.split("&");
		var key = [];
		for(var i = 0; i < strs.length; i++) {
			key[strs[i].split("=")[0]] = strs[i].split("=")[1];
		}
		orderNo = key['orderNo'];
		clientType = key['clientType'];
		token = key['token'];
		time_stamp = Date.parse(new Date());
	}
	var data = "{" +
		"\"body\":{\"orderNo\":\"" + orderNo + "\",\"orderStatus\":'-1'}," +
		"\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}" + "}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getOrderInfoByOrderNo?str=" + data,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			if(odata.result == 0) {
				var order = odata.order;
				orderPrice = order.orderPrice; //订单总价
				couponPrice = order.couponDenomination; //优惠金额
				totalPrice = order.totalPrice; //支付金额（折后）
				// $("#orderNo").html(orderNo);
				// $("#originalPrice").html("¥&nbsp;" +doubleValue(orderPrice));
				// $("#commitPrice").html("¥&nbsp;" +doubleValue(totalPrice));
				// $("#couponPrice").html("¥&nbsp;" +doubleValue(couponPrice));
				$("#payPrice").html("¥&nbsp;" + doubleValue(totalPrice));
			}
		}
	});

	$(".type").click(function() {
		$(".type").removeClass("background-img");
		$(this).addClass("background-img");
		payType = $(this).attr("id");
		if($("#getPay").hasClass("bk")) {
			$("#getPay").removeClass("bk");
		}
	});
	wd = $(".img img").css("width");
	$(".img").height(wd);
	$(".info").height(wd);
	var successUrl = host + "/mms/html5/common/pay/successfulappointment.htm?orderNo=" + orderNo + "&clientType=" + clientType + "&token=" + token; //成功页面URL
	var failUrl = host + "/mms/html5/common/pay/failappointment.htm?orderNo=" + orderNo; //失败页面URL
	var clicktag = 0;
	$("#getPay").click(function() {
		if(!verifyOrder()) {
			return false;
		}
		showProgressDialog();
		if(clicktag == 0) {
			clicktag = 1;
			if(payType == 1) { //微信支付
				var pay_method = "2";
				var appid = "wxe4219b2fbba0dd40"; //联享家
				//    			var appid="wxce429e955a2ac0c6";//绿岛明珠
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
							//调用接口调起微信支付
							var i = pay(1, payData, host + "/mms/servlet/getWxPayOrderStatus?orderNo=" + orderNo +
								"&pay_method=" + pay_method + "&channel_flag=" + channel_flag + "&appid=" + appid, successUrl, failUrl, "");
							if(i == 0) {
								goBack();
							} else {
								clicktag = 0;
								if($("#getPay").hasClass("bk")) {
									$("#getPay").removeClass("bk");
								}
							}
							setTimeout(function() {
								clicktag = 0
							}, 10000);
						} else {
							clicktag = 0;
							lxjTip.confirm(odata.reason, {
								skin: 'demo3',
								yes: function(index) {
									lxjTip.close(); //如果设定了yes回调，需进行手工关闭
								}
							});

						}
					},
					error: function() {
						clicktag = 0;
					}
				});
			} else if(payType == 2) {
				var pay_method = "1";
				var appid = "2016050401363591"; //联享家
				//    				var appid="2016090701865682";//绿岛明珠
				var channel_flag = "3";
				var time_stamp = Date.parse(new Date());
				var data = "{\"body\": {\"pay_method\": \"" + pay_method + "\",\"orderNo\": \"" + orderNo + "\",\"appid\": \"" + appid +
					"\",\"channel_flag\": \"" + channel_flag + "\"},\"header\": {\"token\": \"" + token + "\",\"time_stamp\": \"" + time_stamp + "\"}}";
				$.ajax({
					type: "get",
					url: host + "/mms/servlet/getAlipayAppPrepayOrderRequest?str=" + data,
					async: true,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback",
					success: function(odata) {
						if(odata.result == 0) {
							$("#getPay").addClass("bk");
							var payData = odata.obj.payInfo;
							goBack();
							pay(2, payData, host + "/mms/servlet/getAliPayOrderStatus?orderNo=" + orderNo +
								"&pay_method=" + pay_method + "&channel_flag=" + channel_flag + "&appid=" + appid, successUrl, failUrl, "");
							setTimeout(function() {
								clicktag = 0
							}, 10000);
						} else {
							clicktag = 0;
							lxjTip.confirm(odata.reason, {
								skin: 'demo3',
								yes: function(index) {
									lxjTip.close(); //如果设定了yes回调，需进行手工关闭
								}
							});
						}
					},
					error: function() {
						clicktag = 0;
					}
				});
			}
		}
	});
});

function verifyOrder() {
	var flag = false;
	var params = {};
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	params.body = {
		orderNo: orderNo,
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
								showActivitySpecial(host + "/mms/html5/supermarket/productClassify.htm?backHomePage=1", "商品超市",4, null);
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
			clicktag = 0;
		}
	});
	return flag;
}

function getChangedOrderInfo() {
	var params = {};
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	params.body = {
		orderNo: orderNo,
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
					// $("#originalPrice").html("¥" +doubleValue(data.orderTotalPrice));
					// $("#commitPrice").html("¥" +doubleValue(data.payPrice));
					// $("#couponPrice").html("¥" +doubleValue(data.couponPrice));
					$("#payPrice").html("¥" + doubleValue(data.payPrice));
				} else { //订单价格有误 关闭订单
					lxjTip.confirm('订单信息已更改，订单即将关闭，请重新购买！', {
						skin: 'demo3',
						yes: function(index) {
							lxjTip.close(); //如果设定了yes回调，需进行手工关闭
						}
					});
					cancelOrder();
					clicktag = 1;
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
		orderNo: orderNo,
		flag: 3
	};
	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/operateOrders?str=" + paramData;

	$.ajax({
		type: "get", //jquey是不支持post方式跨域的
		async: false,
		url: reqUrl, //跨域请求的URL
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function() {

		}
	});
}