/**
 * Created by dell on 2017/2/13.
 */
function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var orderNo = GetURLParameter("orderNo");
var token = GetURLParameter("token");
//orderNo="201703281510001073743";
//token="14943822777871d5ab31c58d4e608bca";
//host = "http://118.190.8.134:8090";
$(document).ready(function() {

})

function refreshData() {

	setTimeout(function() {
		getData();
	}, 0);
	return 1;
}

function getData() {
	var time_stamp = Date.parse(new Date());
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		orderNo: orderNo,
	};
	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/getOrderCommodities?str=" + paramData;

	$.ajax({
		type: "get",
		url: reqUrl,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {

			if(data.result == 0 && data.commodityList.length > 0 && isCondition(data.commodityList)) {
				var commodityList = data.commodityList;
				$(".shoplist_box").remove();
				for(var i = 0; i < commodityList.length; i++) {
					var commodity = commodityList[i];
					if(commodity.comment == 0) {
						var productBox = _.template($("#shopproduct_li").html());
						$("body").append(productBox(commodity));
					} else {
						var productBox = _.template($("#shopproduct_li2").html());
						$("body").append(productBox(commodity));
					}
				}
			} else {
				layer.msg(JSON.stringify(data), {
					time: 10000
				});
			}
		}
	});
}
//进入书写评论页面
function goEvaluate(commodityId) {
	var gourl = "writeproductEvaluate.htm?commodityId=" + commodityId + "&orderNo=" + orderNo;
	showActivity(host + "/mms/html5/personal/" + decodeURI(gourl), "商品评价");
}