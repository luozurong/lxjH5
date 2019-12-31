//原生传的url分割
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var token = GetURLParameter("token");
if(token == null)
	token = "14678769135774972731a8ea41efa2d6";
var orderNo = GetURLParameter("orderNo");

//--------------------------------ready开始--------------
$(function() {
	setTitle("团购券详情");
	getData();
})

function getData() {
	var time_stamp = Date.parse(new Date());
	var status = "1";
	var data = "{\"body\":{\"orderNo\":\"" + orderNo + "\",\"orderStatus\":'-1'},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	//console.log("----data---" + data);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getOrderInfoByOrderNo?str=" + data,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(data.result == 0) {
				var foodpic = _.template($("#specialty_list").html());
				$("#specialty_list_order").append(foodpic(data));

				//团购商品ID和状态
				var foodpic = _.template($("#specialty_status").html());
				$("#bt_buttom").append(foodpic(data));

				var picwidth = $("#specialty_pic img").width();
				$("#specialty_pic img").height(picwidth);

				//跳转详情页面
				$("#bt_buttom .bt_details").click(function() {
					var shopId = this.id;
					//带商品ID跳转
					showActivity(host + "/mms/html5/specialty/specialtydetails.htm?commodityId=" + shopId, "团购详情");
					//				showActivity(host+"/mms/html5/personal/specialtydetails.htm?commodityId="+shopId,"团购详情");
				});
				var statusid = $(".bt_refund").attr('id');
				if(statusid == "1") {
					$("#1").text("申请退款");
					$("#bt_buttom .bt_refund").click(function() {
						layer.confirm('申请退款后您将无法再使用该团购券，款项将在1~7个工作日内退还到您支付的账号', {
							title: '',
							closeBtn: '0',
							skin: 'demo_two'
						}, function(index) {
							refundApply(orderNo);
							layer.close(index);
						});
					});
				}
				if(statusid == "2") {
					$("#2").text("已使用");
				}
				if(statusid == "3") {
					$("#3").text("退款中");
				}
				if(statusid == "4") {
					$("#4").text("已退款");
				}
				if(statusid == "5") {
					$("#5").text("已过期退款中");
				}
				if(statusid == "6") {
					$("#6").text("已过期已退款");
				}
			}
		}
	});
}

//退款申请
function refundApply(orderNo) {
	var time_stamp = Date.parse(new Date());
	var flag = "3"; //申请退款(取消订单)
	var str = "{\"body\":" +
		"{\"orderNo\":" +
		"\"" + orderNo + "\"," +
		"\"flag\":" + flag + "}," +
		"\"header\":{" +
		"\"token\":\"" + token + "\"," +
		"\"time_stamp\":\"" + time_stamp + "\"}" +
		"}";
	appAlert("S", str);
	var requestURL = host + "/mms/servlet/operateOrders?str=" + str;
	$.ajax({
		type: "get",
		async: false,
		url: requestURL,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(json) {
			window.location.reload();
		}
	})
}