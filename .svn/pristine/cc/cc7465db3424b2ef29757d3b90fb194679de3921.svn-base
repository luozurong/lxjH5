$(document).ready(function() {
	setTitle("商品清单");

	try {
		contact.hideCart();
	} catch(exception) {}

	showView();
});

function showView() {
	if(null) {

	} else {

		setTimeout(function() {
			getData();
		}, 500);
	}
}

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var pageNum = 1;
var url = window.location.search;
var shoppingCartId = GetURLParameter("shoppingCartId");
var token = GetURLParameter("token");
var skuId=GetURLParameter("skuId");
var commodityId=GetURLParameter("commodityId");
var commodityCount=GetURLParameter("commodityCount");
function getData() {
	var time_stamp = Date.parse(new Date());
	if(shoppingCartId != null && shoppingCartId != "" && !(typeof(shoppingCartId) === undefined)) {
		shoppingCartId = shoppingCartId.split(",");
		shoppingCartId = JSON.stringify(shoppingCartId);
		var str = "{\"body\":{\"pageNum\":" + pageNum + ",\"shoppingCatIds\":" + shoppingCartId + ",\"pageSize\":9999,\"buyType\":2},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	} else {
		var str = "{\"body\":{\"pageNum\":" + pageNum + ",\"commodityId\":\"" + commodityId + "\",\"commodityCount\":" + commodityCount + ",\"commoditySkuId\":\"" + skuId + "\",\"pageSize\":9999,\"buyType\":1},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	}

	//appAlert("ss",commodityCount);
	var requestURL = host + "/mms/servlet/getCommodityDetailOrder?str=" + str;
	$.ajax({
		type: "post",
		async: false,
		url: requestURL,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			//appAlert("ee",JSON.stringify(data));
			var product = data.list;
			for(var i = 0; i < product.length; i++) {
				var price = product[i].price;
				price = price.toFixed(2);
				priceintegerT = (price + "").split(".")[0];
				pricescaleT = (price + "").split(".")[1];
				var productBox = _.template($("#productListTemplate").html());
				$("#productList").append(productBox(product[i])); //推进数据
			}
		}
	});
}