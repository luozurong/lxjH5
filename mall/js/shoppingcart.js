initializeSession();
//获取时间戳
var time_stamp = getTimeStamp();
var checkedsellerId = "";
var sellerproduct = "";

//var token="149792739844856a1365f54b44e78f02";
//var host="http://118.190.8.134:8090";
//var areaCode = "4400100001";
//返回更新购物车数据
function refreshData() {
	setTimeout(function() {
		loadShoppingCartData(1, 1000, 1);
	}, 0);

	return 1;
}

function getAllCheckCommodityTotalPrice() {
	var totalprice = 0;
	$("#shoppingcart .checkedproduct").each(function(i) {
		if($(this).hasClass("select")) {
			var productpriceDiv = $(this).parent().find(".productprice");
			var subtotal = parseFloat(productpriceDiv.attr("subtotal"));
			totalprice = totalprice + subtotal;
		}
	});
	return(Math.round(totalprice * 10000) / 10000).toFixed(2);
}

function getAllCheckShoppingcartId() {
	var ids = new Array();
	$("#shoppingcart .checkedproduct").each(function(i) {
		if($(this).hasClass("select")) {
			var id = $(this).parent().parent().attr("id");
			ids.push(id);
		}
	});
	return ids;
}
//获取所有勾选商品的购物车id 字符串类型
function getAllCheckShoppingcartIdStr() {
	var ids = new Array();
	$("#shoppingcart .checkedproduct").each(function(i) {
		if($(this).hasClass("select")) {
			var id = $(this).parent().parent().attr("id");
			ids.push(id);
		}
	});
	return ids.join(",");
}

function removeAllCheckShoppingcartRecord() {
	$("#shoppingcart .checkedproduct").each(function(i) {
		if($(this).hasClass("select")) {
			$(this).parent().parent().remove();
		}
	});

	$(".seller").each(function(i) {
		if($(this).find(".shoppingcart").length == 0) {
			$(this).remove();
		}
	});

}

function getAllDisabledShoppingcartId() {
	var ids = new Array();
	$("#shoppinglose .shoppinglose").each(function(i) {
		var id = $(this).attr("id");
		ids.push(id);
	});
	return ids;
}

function getAllCheckCommodityId() {
	var ids = new Array();
	$("#shoppingcart .checkedproduct").each(function(i) {
		if($(this).hasClass("select")) {
			var id = $(this).parent().parent().attr("commodityId");
			ids.push(id);
		}
	});
	return ids;
}
//修改购物车中商品数量,并对商品数量做校验
function editShoppingCartCommodityNumAndValidateNum(obj, shoppingCartId, count) {
	if(count == null || count == "") {
		count = 1;
	}
	count = parseInt(count);
	if(count < 1) {
		count = 1;
	}
	var shoppingnumDiv = $(obj).parent();
	//库存
	var stockQuantity = parseInt(shoppingnumDiv.attr("stockQuantity"));
	if(stockQuantity > 100) {
		if(count > 100) {
			toast("亲，商品购买数量已达上限了");
			count = 100;
		}
	} else {
		if(count > stockQuantity) {
			count = stockQuantity;
			toast("亲，老板没那么多存货呢!");
		}
	}

	if(count > 1) {
		$(obj).parent().find(".btn_reduce").removeClass("disabled");
	}
	if(count == 1) {
		$(obj).parent().find(".btn_reduce").addClass("disabled");
	}

	if(stockQuantity == count || count == 100) {
		$(obj).parent().find(".btn_add").addClass("disabled");
	}

	if(stockQuantity > count && count < 100) {
		$(obj).parent().find(".btn_add").removeClass("disabled");
	}
	$(obj).val(count);
	editShoppingCartCommodityCount(shoppingCartId, count);
}
//选择购物车商品时应付款价格的变化
function calculateShoppingcartPrice() {
	var ids = getAllCheckShoppingcartIdStr();
	var params = {};
	var time_stamp = getTimeStamp();
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		areaOrgSeq: areaCode,
		shoppingCartIds: ids
	};
	var param = JSON.stringify(params);
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/calculateShoppingcartPrice?str=" + param,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			//应付款
			var realTotalPrice = data.realTotalPrice;
			//满减金额
			var totalReducePrice = data.totalReducePrice;
			//总价
			var totalPrice = data.totalPrice;
			realTotalPrice = splitNum(realTotalPrice);
			//	totalReducePrice = splitNum(totalReducePrice);
			//	totalPrice = splitNum(totalPrice);
			$("#statement .realTotalPrice").html("<span class='fuhao'>¥</span>" + "<span class='integerT'>" + realTotalPrice[0] + "</span>." + "<span class='fuhao'>" + realTotalPrice[1] + "</span>");
			//$("#statement .totalPrice").html("<span class='fuhao'>¥</span>" + "<span style='font-size:0.1rem;'>" + totalPrice + "</span>");
			$("#statement .totalReducePrice").html("已优惠：<span class='fuhao'>¥</span>" + "<span style='font-size:0.1rem;'>" + totalReducePrice + "</span>");
			if(totalReducePrice <= 0) {
				$("#acount-1").addClass('acount-1T');
				    $("#acount-1").removeClass('acount-2N');
				$("#statement .totalReducePrice").hide();
				$(".totalMeg").hide();
			} else {
				$("#statement .totalReducePrice").show();
				$("#acount-1").removeClass('acount-1T');
				    $("#acount-1").addClass('acount-2N');
				$(".totalMeg").show();
			}
		}
	});
}
//修改购物车中商品数量总价的更改
function editShoppingCartCommodityCount(shoppingCartId, count) {
	var ids = getAllCheckShoppingcartIdStr();
	var params = {};
	var time_stamp = getTimeStamp();
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		id: shoppingCartId,
		count: count,
		shoppingCartIds: ids,
		areaOrgSeq: areaCode
	};
	var param = JSON.stringify(params);
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/editShoppingcartCount?str=" + param,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(data == null || data == "") {
				return;
			}
			//判断请求是否成功
			if(data.result == "0") {
				var subtotal = data.subtotal;
				var price = data.price;
				var productpriceDiv = $("#" + shoppingCartId).find(".productprice");
				productpriceDiv.attr("subtotal", subtotal);
				productpriceDiv.html("¥" + price);
				modifyPriceStyle();
				//应付款
				var realTotalPrice = data.realTotalPrice;
				realTotalPrice = splitNum(realTotalPrice);
				//满减金额
				var totalReducePrice = data.totalReducePrice;
				//	totalReducePrice = splitNum(totalReducePrice);
				//总价
				var totalPrice = data.totalPrice;
				//	totalPrice = splitNum(totalPrice);
				$("#statement .realTotalPrice").html("<span class='fuhao'>¥</span>" + "<span class='integerT'>" + realTotalPrice[0] + "</span>." + "<span class='fuhao'>" + realTotalPrice[1] + "</span>");
				//$("#statement .totalPrice").html("<span class='fuhao'>¥</span>" + "<span style='font-size:0.1rem;'>" + totalPrice + "</span>");
				$("#statement .totalReducePrice").html("已优惠：<span class='fuhao'>¥</span>" + "<span style='font-size:0.1rem;'>" + totalReducePrice + "</span>");
				if(totalReducePrice <= 0) {
					$("#acount-1").addClass('acount-1T');
				    $("#acount-1").removeClass('acount-2N');
					$("#statement .totalReducePrice").hide();
					$(".totalMeg").hide();
				} else {
					$("#statement .totalReducePrice").show();
					$("#acount-1").removeClass('acount-1T');
				    $("#acount-1").addClass('acount-2N');
					$(".totalMeg").show();
				}
			}
		}
	});
}

function loadShoppingCartData(pageNum, pageSize, type) {
	var time_stamp = getTimeStamp();
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		pageNum: pageNum,
		pageSize: pageSize,
		areaOrgSeq: areaCode,
		type: type
	};
	var param = JSON.stringify(params);
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/findShoppingcartList?str=" + param,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(data);
			if(data == null || data == "") {
				return;
			}
			//判断请求是否成功
			if(data.result == "0") {
				var list = data.sellerList;
				var invalidList = data.invalidList;
				if(list.length == 0 && invalidList.length == 0) {
					$(".Noshopping").show();
					$("html,body").css("background-color", "#fff");
					$(".statement").hide();
				} else {
					$(".Noshopping").hide();
					$("html,body").css("background-color", "#f0f0f0");
					$(".statement").show();
				}

				/**显示购物车中有效商品列表**/
				//设置模板id
				$("#shoppingcart").setTemplateElement("template");
				//将返回的数据填充到模板中,并显示到id为shoppingcart的div上
				$("#shoppingcart").processTemplate(data.sellerList);

				/**显示购物车中失效商品列表**/
				//设置模板id
				$("#shoppinglose").setTemplateElement("template2");
				//将返回的数据填充到模板中,并显示到id为shoppinglose的div上
				$("#shoppinglose").processTemplate(data.invalidList);

				if($("#shoppinglose .shoppinglose").length > 0) {
					$("#shoppinglose").show();
				}

				/**显示底部金额**/
				//设置模板id
				$("#statement").setTemplateElement("template3");
				$("#statement").processTemplate(data.sellerList);
				modifyPriceStyle();
				//应付款
				var realTotalPrice = data.realTotalPrice;
				realTotalPrice = splitNum(realTotalPrice);
				//满减金额
				var totalReducePrice = data.totalReducePrice;
				//	totalReducePrice = splitNum(totalReducePrice);

				//总价
				var totalPrice = data.totalPrice;
				//	totalPrice = splitNum(totalPrice);
				$("#statement .realTotalPrice").html("<span class='fuhao'>¥</span>" + "<span class='integerT'>" + realTotalPrice[0] + "</span>." + "<span class='fuhao'>" + realTotalPrice[1] + "</span>");
				//$("#statement .totalPrice").html("<span class='fuhao'>¥</span>" + "<span style='font-size:0.1rem;'>" + totalPrice + "</span>");
				$("#statement .totalReducePrice").html("已优惠：<span class='fuhao'>¥</span>" + "<span style='font-size:0.1rem;'>" + totalReducePrice + "</span>");
				if(totalReducePrice <= 0) {
					$("#acount-1").addClass('acount-1T');
				    $("#acount-1").removeClass('acount-2N');
					$("#statement .totalReducePrice").hide();
					$(".totalMeg").hide();
				} else {
					$("#statement .totalReducePrice").show();
					$("#acount-1").removeClass('acount-1T');
				    $("#acount-1").addClass('acount-2N');
					$(".totalMeg").show();
				}
				$(".cancel_order_cover").on("click", function() {
					closeDialog();
				});

				$("#shoppingcart .btn_add").each(function() {
					var shoppingnumDiv = $(this).parent();
					//商品数量文本框
					var count = parseInt(shoppingnumDiv.find("input").val());
					//库存
					var stockQuantity = parseInt(shoppingnumDiv.attr("stockQuantity"));
					if(count >= stockQuantity || count >= 100) {
						$(this).addClass("disabled");
					}
				});

				$("#shoppingcart .btn_reduce").each(function() {
					var shoppingnumDiv = $(this).parent();
					//商品数量文本框
					var count = parseInt(shoppingnumDiv.find("input").val());
					if(count <= 1) {
						$(this).addClass("disabled");
					}
				});
				//加减符号的处理
				var btn_reduce = $("#shoppingcart .btn_reduce");
				var btn_add = $("#shoppingcart .btn_add");
				btn_add.on("click", function() {
					var shoppingnumDiv = $(this).parent();
					//购物车id
					var shoppingCartId = shoppingnumDiv.attr("shoppingCartId");
					console.log(shoppingCartId);
					//库存
					var stockQuantity = parseInt(shoppingnumDiv.attr("stockQuantity"));
					//商品数量文本框
					var commodityCount = shoppingnumDiv.find("input");
					var count = parseInt(commodityCount.val()) + 1;
					if(stockQuantity > 100) {
						if(count > 100) {
							// count=100;
							toast("亲，商品购买数量已达上限了!");
							return;
						}
					} else {
						if(count > stockQuantity) {
							//count=stockQuantity;
							toast("亲，老板没那么多存货呢!");
							return;
						}
					}
					commodityCount.val(count);
					if(count > 1) {
						$(this).parent().find(".btn_reduce").removeClass("disabled");
					}
					if(count >= stockQuantity || count == 100) {
						$(this).addClass("disabled");
					}

					editShoppingCartCommodityCount(shoppingCartId, commodityCount.val());
				});
				btn_reduce.on("click", function() {
					if($(this).hasClass("disabled")) {
						return;
					}
					var shoppingnumDiv = $(this).parent();
					//购物车id
					var shoppingCartId = shoppingnumDiv.attr("shoppingCartId");
					//库存
					var stockQuantity = parseInt(shoppingnumDiv.attr("stockQuantity"));
					//商品数量
					var commodityCount = shoppingnumDiv.find("input");
					var count = parseInt(commodityCount.val()) - 1;
					if(stockQuantity > 100) {
						if(count > 100) {
							count = 100;
						}
					} else {
						if(count > stockQuantity) {
							count = stockQuantity;
						}
					}
					commodityCount.val(count);
					if(count < stockQuantity && count < 100) {
						$(this).parent().find(".btn_add").removeClass("disabled");
					}
					if((+(commodityCount.val())) <= 1) {
						$(this).addClass("disabled");
					}
					editShoppingCartCommodityCount(shoppingCartId, commodityCount.val());
				});
				//单选框多选框的处理
				var checkall = $(".checkall");
				var checkedproduct = $("#shoppingcart .checkedproduct");
				var shoppingcart = $("#shoppingcart .shoppingcart");
				var checkedseller = $("#shoppingcart .checkedseller");
				checkall.addClass("select");
				checkedproduct.addClass("select");
				checkedseller.addClass("select");
				if($('.shoppingcart .select').length!=0){
					$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
				}else{
					$("#gopay span").html("");
				}
				//控制全选按钮
				checkall.on("click", function() {
					checkedseller = $("#shoppingcart .checkedseller");
					if(checkall.hasClass("select")) {
						checkall.removeClass("select");
						checkedseller.removeClass("select");
						checkedproduct.removeClass("select");
							$("#gopay span").html();
						//$(".showPrice").html("0元");
					} else {
						checkall.addClass("select");
						checkedproduct.addClass("select");
						checkedseller.addClass("select");
						if($('.shoppingcart .select').length!=0){
							$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
						}else{
							$("#gopay span").html("");
						}
					}
					//showpricestyle();
					calculateShoppingcartPrice();
					if($('.shoppingcart .select').length!=0){
						$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
					}else{
						$("#gopay span").html("");
					}
				});
				//控制店铺下商品全选按钮
				checkedseller.on("click", function() {
					checkedsellerId = $(this).attr("name");
					//该店铺下的所有商品
					sellerproduct = $("#shoppingcart #" + checkedsellerId + " .checkedproduct");
					checkedseller = $("#shoppingcart #" + checkedsellerId + " .sellerName .checkedseller");
					if(checkedseller.hasClass("select")) {
						checkall.removeClass("select");
						sellerproduct.removeClass("select");
						$(this).removeClass("select");
						$(".showPrice").html("0元");
						if($('.shoppingcart .select').length!=0){
							$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
						}else{
							$("#gopay span").html("");
						}
					} else {
						// checkall.addClass("select");
						sellerproduct.addClass("select");
						$(this).addClass("select");
						if($('.shoppingcart .select').length!=0){
							$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
						}else{
							$("#gopay span").html("");
						}
					}
					addAll();
					//showpricestyle();
					calculateShoppingcartPrice();
					if($('.shoppingcart .select').length!=0){
						$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
					}else{
						$("#gopay span").html("");
					}
				});
				//控制单选选中单个产品按钮
				var list = new Array;
				shoppingcart.on("click", '.checkedproduct', function() {
					checkedsellerId = $(this).parents(".seller").attr("id");
					list = [];
					if($(this).hasClass("select")) {
						if(checkall.hasClass("select") || checkedproduct.hasClass(".select")) {
							checkall.removeClass("select");
							$(this).removeClass("select");
						}
						$(this).removeClass("select");
						if($('.shoppingcart .select').length!=0){
							$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
						}else{
							$("#gopay span").html("");
						}

					} else {
						$(this).addClass("select");
						if($('.shoppingcart .select').length!=0){
							$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
						}else{
							$("#gopay span").html("");
						}

					}
					addOnly();
					addAll();
					if($('.shoppingcart .select').length!=0){
						$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
					}else{
						$("#gopay span").html("");
					}
					//showpricestyle();
					calculateShoppingcartPrice();
				});
				gopay();
				if($('.shoppingcart .select').length!=0){
					$("#gopay span").html("("+($('.shoppingcart .select').length)+")");
				}else{
					$("#gopay span").html("");
				}

			} else {
				$(".Noshopping").show();
			}
		}
	});

}

function addAll() {
	var checkedproduct = $("#shoppingcart .checkedproduct");
	var checkedseller = $("#shoppingcart .checkedseller");
	var checkall = $(".checkall");
	var list = new Array;
	list = [];
	for(var i = 0; i < checkedseller.length; i++) {
		if(checkedseller.eq(i).hasClass('select')) {
			list.push(i);
			if(checkedseller.length == list.length) {
				checkall.addClass("select");
				$("#gopay span").html("("+$(".shoppingcart .select").lenght+")");
			}
		}
	}
}

function addOnly() {
	sellerproduct = $("#shoppingcart #" + checkedsellerId + " .checkedproduct");
	checkedseller = $("#shoppingcart #" + checkedsellerId + " .sellerName .checkedseller");
	var list = new Array;
	list = [];
	for(var i = 0; i < sellerproduct.length; i++) {
		if(sellerproduct.eq(i).hasClass('select')) {
			list.push(i);
			if(sellerproduct.length == list.length) {
				checkedseller.addClass("select");
				$("#gopay span").html("("+$(".shoppingcart .select").lenght+")");
			}
		} else {
			checkedseller.removeClass("select");
			$("#gopay span").html("("+$(".shoppingcart .select").lenght+")");
		}
	}
}
//toast弹出框
function toast(message) {
	layer.msg(message);
}

function isExistDisabledCommodity() {
	var result = false;
	var time_stamp = getTimeStamp();
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		pageNum: 1,
		pageSize: 1000,
		areaOrgSeq: areaCode
	};
	var param = JSON.stringify(params);
	//		 var requestURL="/mms/servlet/findShoppingcartList?str="+param;
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/findShoppingcartList?str=" + param,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {

			if(data != null && data.status == "0") {
				result = true;
			}
		}
	});

	return result;
}

function gopay() {
	//页面马上支付
	$("#gopay").on("click", function() {
		var ids = getAllCheckCommodityId();
		if(ids.length <= 0) {
			var message = "请选择要购买的商品";
			toast(message);
			return;
		}
		var shoppingCartId = getAllCheckShoppingcartId();
		var showprice = getAllCheckCommodityTotalPrice();

		sessionStorage.setItem("shoppingCartId", shoppingCartId);

		var shoppingCartId = sessionStorage.getItem("shoppingCartId");
		console.log(shoppingCartId);
		var buyType = "2";
		showActivity(host + "/mms/html5/mall/confirmOrderNew.htm?shoppingCartId=" + shoppingCartId + "&showprice=" + showprice + "&buyType=" + buyType, "确认订单");
	});
}
//执行编辑操作
function setEditOperate() {
	closeDialog();
	$("#deleted").show();
	$("#showMoney").hide();
	$(".shoppingnum").hide();
}

function setFinishOperate() {
	clearHistory();
	refreshData();
	//window.location.reload();
}

function confirmDelete() {
	var ids = getAllCheckShoppingcartId();
	if(ids == null || ids.length <= 0) {
		var message = "请选择要删除的商品";
		toast(message);
		return;
	}
	showDialog("confirmDelete");
}

function deleteShoppingcartCommodity() {
	var ids = getAllCheckShoppingcartId();
	var params = {};
	var time_stamp = getTimeStamp();
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		ids: ids
	};
	var param = JSON.stringify(params);
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/deleteShoppingcart?str=" + param,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(data == null || data == "") {
				return;
			}
			//判断请求是否成功
			if(data.result == "0") {
				closeDialog();
				removeAllCheckShoppingcartRecord();
			}
		}
	});

}

function closeDialog() {
	$(".cancel_order_cover").css("display", "none");
	$(".confir").css("display", "none");

}

function showDialog(id) {
	$("#" + id + " .cancel_order_cover").css("display", "block");
	$("#" + id + " .confir").css("display", "block");
}
//编辑购物车
function clearDisabledCommodity() {
	var ids = getAllDisabledShoppingcartId();
	if(ids == null || ids.length <= 0) {
		return;
	}
	var params = {};
	var time_stamp = getTimeStamp();
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		ids: ids
	};
	var param = JSON.stringify(params);
	//		 var requestURL="/mms/servlet/deleteShoppingcart?str="+param;
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/deleteShoppingcart?str=" + param,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(data == null || data == "") {
				return;
			}
			//判断请求是否成功
			if(data.result == "0") {
				$("#shoppinglose").html("");
				var message = "成功清除失效商品";
				toast(message);
				window.loaded();
			}
		}
	});

}

/**
 * 修改购物车上价格样式
 */
function modifyPriceStyle() {
	//有效商品的价格显示
	$("#shoppingcart .productprice").each(function(i) {
		var price = doubleValue($(this).attr("price"));
		var prices = splitNum(price);
		$(this).html("<span class='fuhao' style='padding-right: 4px;'>¥</span>" + "<span class='integerT'>" + prices[0] + "</span>." + "<span class='fuhao'>" + prices[1] + "</span>");
	});
	//失效商品的价格显示
	$("#shoppinglose .productprice").each(function(i) {
		var price = doubleValue($(this).attr("price"));
		var prices = splitNum(price);
		$(this).html("<span class='fuhao' style='padding-right: 4px;'>¥</span>" + "<span class='integerT'>" + prices[0] + "</span>." + "<span class='fuhao'>" + prices[1] + "</span>");
	});

}

function doubleValue(price) {
	return(Math.round(price * 10000) / 10000).toFixed(2);
}

function splitNum(numberN) {
	var Num = numberN;
	var Nums = new Array();
	Nums = (Num + "").split(".");
	return Nums;
}
$(document).ready(function() {
	localStorage.removeItem("remark");
	setRefreshOnResume();
	clearHistory();
	setTitle("购物车");
	var jsonData = {
		eventId: "click31",
		eventName: "购物车页面浏览次数"
	};
	jsonData = JSON.stringify(jsonData);
	//调用APP接口，添加百度统计
	nativeMethod("baiduStatistics", jsonData);
	loadShoppingCartData(1, 1000, 1);
});