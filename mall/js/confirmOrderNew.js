var time_stamp = getTimeStamp();
//localStorage.removeItem("receiverInfoId");
setRefreshOnResume(); //刷新页面(防止返回之后，没有重新请求)
//获取小区信息
var areaCode = GetURLParameter("organizationSeq");
var token = GetURLParameter("token");
var householdSerial = GetURLParameter("householdSerial");
var shoppingCartId = GetURLParameter("shoppingCartId");
var clientType = GetURLParameter("clientType");
var giftbagId = GetURLParameter("giftbagId");
var lxjversionsNameC=GetURLParameter("lxjversionsName");
if(!isCondition(giftbagId)) {
	giftbagId = '';
}
//立即购买的商品规格
var commoditySkuId = GetURLParameter("commoditySkuAttrIds");
var commodityId = GetURLParameter("commodityId");
var commoditySkuId;
if(commoditySkuId != null && commoditySkuId != "" && !(typeof(commoditySkuId) === undefined)) {
	commoditySkuId = commoditySkuId.replace(/"/g, "");
}
var commoditySkuIdsave = "";
//立即购买商品id

//立即购买规格数量
var commodityCount = 1;
if(isCondition(sessionStorage.getItem("commodityCounts"))) {
	commodityCount = sessionStorage.getItem("commodityCounts");
} else {
	commodityCount = GetURLParameter("commodityCount");
}
//小区机构编号
var sellerReducedFeeList; //店铺满减
var sellerFreightSave;
var shoppingCartCount;
var totalPrice; //总订单总价
var maxNum = 100;
if(isCondition(giftbagId)) {
	maxNum = 1;
}

//var areaCode = "4400100001";
//var commodityId = "147096950730a069907400e54c0f9565";//立即购买的商品规格
//var commoditySkuId = "";
//var commodityCount = 1;
//var token = "1497515533463e392331c3414cc18906";
//var host = "http://118.190.8.134:8090";
//var shoppingCartId = "1495009060354799cc81616a45d6930b,1495009117093574581e567c4e2fa500,1497512185464e43bdfe51b949f6a92b,149500916351461354902ca14291afee,149500917810e9ba588f28924cf3afea";
//var areaCode = "4400100001";
/*var areaCode = "4400100001";
var commodityId = "147122988701ff9bc1eca8424bdeb398"; //立即购买的商品规格
var host = "http://118.190.8.133:8090";
var token = "1504677019558859e3457c9a4666bfc2";
var commodityCount = 1;*/
var remarkCount;
if(localStorage.getItem("receiveraddressNone") === 'true') {
	sessionStorage.removeItem("receiverInfoId");
	localStorage.removeItem("receiverInfoId");
}
getReceiver();
var ajaxState = true;
var ajaxStatechange;//异步请求数据点击处理
$(document).ready(function() {
	setTitle("确认订单")
	$(document).ajaxSend(function(e, xhr, opt) {
		ajaxState = false;
		clearTimeout(ajaxStatechange);
		//console.log("ajax请求" +ajaxState);
	});
	$(document).ajaxComplete(function(event, request, settings) {
		ajaxStatechange = setTimeout("ajaxState=true",1000);
	});
})

function refreshData() {
	//localStorage.getItem("receiverInfoId");
	setTimeout(function() {
		//		if(!isCondition(localStorage.getItem("receiverInfoId"))) {
		//			sessionStorage.removeItem("receiverInfoId");
		//		}
		if(localStorage.getItem("receiveraddressNone") === 'true') {
			sessionStorage.removeItem("receiverInfoId");
			localStorage.removeItem("receiverInfoId");
			$(".confirm-left").html('<img src="images/ic_-Location-@3x.png"/><div class="confirm-choose-addr">请选择收货地址</div>');
		}
		if(isCondition(sessionStorage.getItem("commodityCounts"))) {
			commodityCount = sessionStorage.getItem("commodityCounts");
			$(".confirm-goods-input").val(commodityCount);
		}
		getReceiver();
	}, 0);

	return 1;
}

function isCondition(param) { // (!typeof(a) === undefined)
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
//商品数量减少
function subNum(sub) {
	var inputNum = $(sub).next().val();
	var dataValue = $(sub).next().attr("data-value");
	var commodityId = $(sub).parent().attr("data-id");
	if(isCondition(giftbagId)) {
		dataValue = 1;
		return false;
	}
	inputNum--;
	if(inputNum > 0) {
		$(sub).next().val(inputNum);
	}
	if(inputNum <= 1) {
		$(sub).removeClass("confirm-goods-pre-active");
	}
	if(inputNum < dataValue) {
		$(sub).next().next().removeClass("confirm-goods-next-active");
	}
	//count();
	totalFreight();
	sessionStorage.setItem("commodityCounts", inputNum);
}

//商品数量增加
function addNum(add) {
	var dataValue = $(add).prev().attr("data-value");
	var inputNum = $(add).prev().val();
	var commodityId = $(add).parent().attr("data-id");
	if(isCondition(giftbagId)) {
		dataValue = 1;
		return false;
	}
	inputNum++;
	if(dataValue >= inputNum) {
		$(add).prev().val(inputNum);
	}
	if(dataValue == inputNum) {
		$(add).addClass("confirm-goods-next-active");
	}
	if(inputNum > 1) {
		$(add).prev().prev().addClass("confirm-goods-pre-active");
	}
	if(inputNum <= maxNum) {
		$(add).removeClass("confirm-goods-next-active");
	} else {
		$(add).addClass("confirm-goods-next-active");
	}

	//count();
	totalFreight();
	sessionStorage.setItem("commodityCounts", inputNum);
}

function confirmConfig() {
	//价格小数点后字体较小
	$(".confirm-goods-price").each(function() {
		var dataValue = $(this).attr("data-value");
		var dataValueArray = dataValue.split(".");
		$(this).find("span").eq(0).text("¥" + dataValueArray[0]);
		$(this).find("span").eq(1).text("." + dataValueArray[1]);
	});

	//减号的颜色
	$(".confirm-goods-input").each(function() {
		var inputNum = $(this).val();
		if(inputNum > 1) {
			$(this).prev().addClass("confirm-goods-pre-active");
			//$(this).next().addClass("confirm-goods-next-active");
		} else {
			$(this).prev().removeClass("confirm-goods-pre-active");
			//$(this).next().removeClass("confirm-goods-next-active");
		}
	});
	//加号的颜色
	$(".confirm-goods-input").each(function() {
		var inputNum = $(this).val();
		if(inputNum < maxNum) {
			$(this).next().removeClass("confirm-goods-next-active");
		} else {
			$(this).next().addClass("confirm-goods-next-active");
		}
	});

	//只有失效商品是的结算状态为禁用状态
	if($(".confirm-all>div").length == 0) {
		$(".confirm-fixed .gopay").addClass("gopayover");
		$(".gopay").removeAttr("onclick", "saveCommodityOrder()");
		$(".confirm-remark,.confirm-pay").hide();
		$(".pay-sub>span:eq(1)").hide();
	} else {
		$(".confirm-fixed .gopay").removeClass("gopayover");
		$(".gopay").attr("onclick", "saveCommodityOrder()");
	}

	//小计小数点后字体较小
	$(".pay").each(function() {
		var dataValue = $(this).attr("data-value");
		var dataValueArray = dataValue.split(".");
		$(this).find("span").eq(0).text("¥" + dataValueArray[0]);
		$(this).find("span").eq(1).text("." + dataValueArray[1]);
	});

	//小计小数点后字体较小
	$(".confirm-total-price").each(function() {
		var dataValue = $(this).attr("data-value");
		var dataValueArray = dataValue.split(".");
		$(this).find("span").eq(0).text("¥" + dataValueArray[0]);
		$(this).find("span").eq(1).text("." + dataValueArray[1]);
	});

	//获取商品总数
	var numberInput = 0;
	$(".confirm-all .confirm-shop").each(function(i, e) {
		var numberInput1 = 0;
		$(e).find(".confirm-goods-input").each(function(i, e) {
			numberInput1 += parseInt($(e).val());
		});
		$(e).find(".number-input").text(numberInput1);

	})

}

//编辑留言时底部提交订单栏隐藏
var $windowHeight = $(window).height();
$(window).resize(function() {
	if (clientType=='ios') {
		return false;
	}
	if($windowHeight <= $(window).height()) {
		$('.confirm-fixed').show();
		$(".comfirm-say").blur();
	} else {
		$('.confirm-fixed').hide();
	}
});
$(".comfirm-say").focus(function() {
	$(".confirm-fixed").hide();
});
$(".comfirm-say").blur(function() {
	$(".confirm-fixed").show();
});

function newviewopen(x) {
	setTimeout(function() {
		var viewBottom = window.innerHeight;
		var weizhi;
		var element = document.getElementById(x);
		var getElementPosition = function(elem) {
			weizhi = elem.getBoundingClientRect();
		}
		getElementPosition(element);
		var elementBottom = weizhi.bottom;
		if(viewBottom >= elementBottom) {} else {
			var vuleheight = elementBottom - viewBottom + $(window).scrollTop() + $(".confirm-remark-word").height();
			$(window).scrollTop(vuleheight);
			window.scrollTo(0, vuleheight);
		}
	}, 500);
}

//进入地址详情页
$(".confirm-addr").click(function() {
	//remarkCounts();
	//	flag = sessionStorage.setItem("flag", true);
	//	flag = sessionStorage.getItem("flag");
	localStorage.setItem("receiverInfoId", sessionStorage.getItem("receiverInfoId"));
	$(".confirm-all .confirm-shop").each(function(i, e) {
		sessionStorage.setItem($(e).attr("data-sellerid"), $(e).find(".comfirm-say").val());
	})
	if (clientType=="ios"&&isCondition(lxjversionsNameC)&&lxjversionsNameC.replace(/[^0-9]/ig, "")>=4008) {
		window.location.href=host + "/mms/html5/common/receiverInfo/receiveraddress.htm?receiverInfoId=" + sessionStorage.getItem("receiverInfoId")+"&clientType="+clientType+"&token="+token+"&lxjversionsName="+lxjversionsNameC;
	} else{
		showActivity(host + "/mms/html5/common/receiverInfo/receiveraddress.htm?receiverInfoId=" + sessionStorage.getItem("receiverInfoId"), "选择地址");
	}
});

//进入优惠券页面
//$(".confirm-remark-counpon").click(function() {
//	localStorage.setItem("receiverInfoId", sessionStorage.getItem("receiverInfoId"));
//	sessionStorage.setItem("remarkCount", $(".comfirm-say").val());
//	showActivity(host + "/mms/html5/common/coupons/multiOrderCoupons.htm?clientType=" + clientType, "优惠券");
//});
//获取收货地址
function getReceiver() {
	var receiverInfoId = localStorage.getItem("receiverInfoId");
	if(!isCondition(localStorage.getItem("receiverInfoId"))) {
		receiverInfoId = sessionStorage.getItem("receiverInfoId");
	}
	var areaParam = {};
	if(isCondition(receiverInfoId) && receiverInfoId != "null") {
		localStorage.removeItem("receiverInfoId");
		areaParam.body = {
			type: 3,
			id: receiverInfoId
		};
	} else {
		areaParam.body = {
			type: 1
		};
	}

	areaParam.header = {
		token: token,
		time_stamp: time_stamp
	};
	var areaParamString = JSON.stringify(areaParam);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getUserReceiverInfo?str=" + areaParamString,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			$(".confirm-left").html();
			//判断是否有地址
			if(data.receiverFlag == 1 && data.result == 0) {
				//判断修改地址后的显示情况
				if(areaParam.body.type == 3) {
					var defaultReceiver = data.receiver;
					var receiverAddr = _.template($("#receiverAddr").html());
					$(".confirm-left").html(receiverAddr(defaultReceiver));
					//	totalFreight(data.receiver.id);
					sessionStorage.setItem("receiverInfoId", data.receiver.id);
					confirmRefresh(data.receiver.id);
				} else if(data.full == 1) {
					var defaultReceiver = data.defaultReceiver;
					var confirmAddr = _.template($("#confirmAddr").html());
					$(".confirm-left").html(confirmAddr(defaultReceiver));
					//获取配送
					//	totalFreight(data.defaultReceiver.id);
					sessionStorage.setItem("receiverInfoId", data.defaultReceiver.id);
					confirmRefresh(data.defaultReceiver.id);
				} else {
					$(".confirm-remark-shipping").html('<span>配送费</span>');
					$(".confirm-left").html('<img src="images/ic_-Location-@3x.png"/><div class="confirm-choose-addr">请选择收货地址</div>');
					confirmRefresh();
				}
			} else {
				$(".confirm-remark-shipping").html('<span>配送费</span>');
				$(".confirm-left").html('<img src="images/ic_-Location-@3x.png"/><div class="confirm-choose-addr">请选择收货地址</div>');
				confirmRefresh();
			}

		}
	});

}

//确认订单所有数据获取
function confirmRefresh(receiverId) {
	//	if(flag) {
	//		if(shoppingCartId != null && shoppingCartId != "" && !(typeof(shoppingCartId) === undefined)) {
	//			shoppingCartCounts();
	//		} else {
	//			commodityCounts();
	//		}
	//	}

	var confirmParam = {};
	if(isCondition(shoppingCartId)) {
		confirmParam.body = {
			shoppingCartIds: shoppingCartId,
			receiverId: receiverId,
		};
	} else {
		if(!isCondition(commoditySkuId)) {
			//没有规格的商品
			confirmParam.body = {
				commodityId: commodityId,
				receiverId: receiverId,
				commodityCount: commodityCount,
				giftbagId: giftbagId
			};
		} else {
			confirmParam.body = {
				commodityId: commodityId,
				receiverId: receiverId,
				commoditySkuAttrIds: commoditySkuId,
				commodityCount: commodityCount,
				giftbagId: giftbagId
			};
		}
	}
	confirmParam.header = {
		token: token,
		time_stamp: time_stamp
	};

	var confirmParamString = JSON.stringify(confirmParam);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/confirmOrder?str=" + confirmParamString,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(JSON.stringify(data))
			$(".confirm-all").html("");
			var sellerList = data.sellerList;
			if(isCondition(sellerList) && sellerList.length > 0) {
				sellerReducedFeeList = data.sellerReducedFeeList;
				//商品列表
				var dataTemplate = _.template($('#confirm-seller').html());
				$('.confirm-all').html(dataTemplate({
					"data": data.sellerList
				}));
				//商品价格

				if(commoditySkuId != null) {
					//appAlert("555",sellerList[0].commodityList[0].commoditySkuId)
					commoditySkuIdsave = sellerList[0].commodityList[0].commoditySkuId;
				}
				confirmConfig();
			}

			/**************失效商品*****************/
			$('.confirm-shop-over').empty();
			if(isCondition(data.invalidList) && data.invalidList.length > 0) {
				var confirmOver = _.template($('#confirmOver').html());
				$('.confirm-shop-over').append(confirmOver({
					"dataover": data.invalidList
				}));
				confirmConfig();
			}

			if(isCondition(sessionStorage.getItem("shoppingCartCount"))) {
				if(isCondition(sellerList) && sellerList.length > 0) {
					var aa = "true";
					showshoppingCartCounts(aa);
				} else {
					var bb = "false";
					showshoppingCartCounts(bb);
				}

			} else {

				if(isCondition(sellerList) && sellerList.length > 0) {
					totalFreight();
				}
			}
			remarkCounts();
		}
	});
}

//确认订单的邮费
function totalFreight() {
	$(".confirm-remark,.confirm-pay").show();

	var receiverId = sessionStorage.getItem("receiverInfoId") || "";
	var totalFreight = {};
	if(isCondition(shoppingCartId)) {
		var shoppingCartCount = shoppingCartCounts();
		totalFreight.body = {
			shoppingCartCount: shoppingCartCount,
			receiverId: receiverId,
		};
	} else {
		var commodityCount = $(".confirm-goods-input").val();
		if(!isCondition(commoditySkuId)) {
			//没有规格的商品
			totalFreight.body = {
				commodityId: commodityId,
				receiverId: receiverId,
				commodityCount: commodityCount
			};
		} else {
			totalFreight.body = {
				commodityId: commodityId,
				receiverId: receiverId,
				commoditySkuAttrIds: commoditySkuId,
				commodityCount: commodityCount
			};
		}
	}
	totalFreight.header = {
		token: token,
		time_stamp: time_stamp
	};
	var totalFreightString = JSON.stringify(totalFreight);
	if(isCondition(giftbagId)) {
		setTimeout(function() {
			totalFreightdlb();
		}, 0)
		return false;
	} else {
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/calculateOrderFreight?str=" + totalFreightString,
			async: true,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			//jsonpCallback: "success_jsonpCallback",
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data.result == 0) {
					var receiverFlag = data.receiverFlag;

					var sellerFavorableToatlList = data.sellerFavorableToatlList;
					var sellerFreight = data.sellerFreight;
					totalPrice = data.totalPrice;
					$(".confirm-all .confirm-shop").each(function(i, e) {
						var sellerID = $(e).attr("data-sellerid");
						for(var i = 0; i < sellerFavorableToatlList.length; i++) {
							if(sellerFavorableToatlList[i].sellerId == sellerID) {
								var sellerPrivilege = "";
								var sellerTotalPrice = sellerFavorableToatlList[i].sellerTotalPrice;
								if(sellerFavorableToatlList[i].freightInfo) { //有邮费优惠
									sellerPrivilege = "  " + sellerFavorableToatlList[i].freightInfo;
									if(sellerFavorableToatlList[i].freight > 0) {
										$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>免邮</span><s class="total-freight">¥' + sellerFavorableToatlList[i].freight + '</s>');
									} else {
										$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>免邮</span>');
									}
								} else { //没有邮费优惠
									if(sellerFavorableToatlList[i].freight > 0) {
										$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>¥' + sellerFavorableToatlList[i].freight + '</span>');
										sellerTotalPrice = Number(sellerTotalPrice) + Number(sellerFavorableToatlList[i].freight);
									} else {
										$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>免邮</span>');
									}

								}
								if(sellerFavorableToatlList[i].freePriceInfo) { //有满减优惠
									sellerPrivilege = sellerFavorableToatlList[i].freePriceInfo + sellerPrivilege;
									sellerTotalPrice = Number(sellerTotalPrice) - Number(sellerFavorableToatlList[i].redecedFee ? sellerFavorableToatlList[i].redecedFee : 0);
								}
								if(sellerFavorableToatlList[i].freePriceInfo || sellerFavorableToatlList[i].freightInfo) { //有满减优惠
									$(e).find(".confirm-counpon-num").html(sellerPrivilege);
									$(e).find(".confirm-remark-counpon").show();
								} else { //没有任何优惠
									$(e).find(".confirm-remark-counpon").hide();
								}
								$(e).find(".confirm-total-price").attr("data-value", Number(sellerTotalPrice).toFixed(2));
								break;
							}
						}
					})
					if(receiverFlag != 1) {
						$(".confirm-remark-shipping").html('<span>配送费</span>');
					}

					var realTotalPrice = parseFloat(Number(data.realTotalPrice) + Number(data.totalFreight ? data.totalFreight : 0)).toFixed(2);
					$(".pay").attr("data-value", realTotalPrice);
					confirmConfig();
					sellerReducedFeeList = data.sellerReducedFeeList;
					sellerFreightSave = data.sellerFreight;
				} else {
					appAlert("失败", "获取价格信息失败");
				}

			}
		});
	}
}
//确认订单的邮费
function totalFreightdlb() {
	$(".confirm-remark,.confirm-pay").show();
	var receiverId = sessionStorage.getItem("receiverInfoId") || "";
	var totalFreight = {};
	var commodityCount = $(".confirm-goods-input").val();
	if(!isCondition(commoditySkuId)) {
		//没有规格的商品
		totalFreight.body = {
			commodityId: commodityId,
			receiverId: receiverId,
			commodityCount: commodityCount,
			giftbagId: giftbagId
		};
	} else {
		totalFreight.body = {
			commodityId: commodityId,
			receiverId: receiverId,
			commoditySkuAttrIds: commoditySkuId,
			commodityCount: commodityCount,
			giftbagId: giftbagId
		};
	}

	totalFreight.header = {
		token: token,
		time_stamp: time_stamp
	};
	var totalFreightString = JSON.stringify(totalFreight);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/calculateOrderFreight?str=" + totalFreightString,
		async: true,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.result == 0) {
				var receiverFlag = data.receiverFlag;
				var sellerFavorableToatlList = data.sellerFavorableToatlList;
				var sellerFreight = data.sellerFreight;
				totalPrice = data.totalPrice;
				$(".confirm-all .confirm-shop").each(function(i, e) {
					var sellerID = $(e).attr("data-sellerid");
					for(var i = 0; i < sellerFavorableToatlList.length; i++) {
						if(sellerFavorableToatlList[i].sellerId == sellerID) {
							var sellerPrivilege = "";
							var sellerTotalPrice = sellerFavorableToatlList[i].sellerTotalPrice;
							if(sellerFavorableToatlList[i].freightInfo) { //有邮费优惠
								sellerPrivilege = "   " + sellerFavorableToatlList[i].freightInfo;
								if(sellerFavorableToatlList[i].freight > 0) {
									$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>免邮</span><s class="total-freight">¥' + sellerFavorableToatlList[i].freight + '</s>');
								} else {
									$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>免邮</span>');
								}
							} else { //没有邮费优惠
								if(sellerFavorableToatlList[i].freight > 0) {
									$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>¥' + sellerFavorableToatlList[i].freight + '</span>');
									sellerTotalPrice = Number(sellerTotalPrice) + Number(sellerFavorableToatlList[i].freight);
								} else {
									$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>免邮</span>');
								}

							}
							if(sellerFavorableToatlList[i].freePriceInfo) { //有满减优惠
								sellerPrivilege = sellerFavorableToatlList[i].freePriceInfo + sellerPrivilege;
								sellerTotalPrice = Number(sellerTotalPrice) - Number(sellerFavorableToatlList[i].redecedFee ? sellerFavorableToatlList[i].redecedFee : 0);
							}
							if(sellerFavorableToatlList[i].freePriceInfo || sellerFavorableToatlList[i].freightInfo) { //有满减优惠
								$(e).find(".confirm-counpon-num").html(sellerPrivilege);
								$(e).find(".confirm-remark-counpon").show();
							} else { //没有任何优惠
								$(e).find(".confirm-remark-counpon").hide();
							}
							$(e).find(".confirm-total-price").attr("data-value", Number(sellerTotalPrice).toFixed(2));
							break;
						}
					}
				})
				if(receiverFlag != 1) {
					$(".confirm-remark-shipping").html('<span>配送费</span>');
				}

				var realTotalPrice = parseFloat(Number(data.realTotalPrice) + Number(data.totalFreight ? data.totalFreight : 0)).toFixed(2);
				$(".pay").attr("data-value", realTotalPrice);
				confirmConfig();
				sellerReducedFeeList = data.sellerReducedFeeList;
				sellerFreightSave = data.sellerFreight;
			} else {
				appAlert("失败", "获取价格信息失败");
			}

		}
	});
}
//购物车产品数量添加（购物卡id）
function shoppingCartCounts() {
	var shoppingCartCountString = {};
	var shoppingCartCountObject = [];
	$(".confirm-goods-num").each(function(i, e) {
		var shoppingCartId = $(this).attr("data-cartid");
		var count = ($(this).find("input").val()).replace(/[^0-9]/ig, "");
		if(!$(e).hasClass("confirm-goods-num-over")) {
			shoppingCartCountString[shoppingCartId] = count;
		}
		shoppingCartCountObject[i] = {
			shoppingCartId: shoppingCartId,
			count: count
		};

	});
	sessionStorage.setItem("shoppingCartCount", JSON.stringify(shoppingCartCountObject));
	return shoppingCartCountString;
}
//购物车数量修改刷新
function showshoppingCartCounts(blean) {
	console.log(blean);

	var shoppingCartCounts = JSON.parse(sessionStorage.getItem("shoppingCartCount"));
	if(!isCondition(shoppingCartCounts)) {
		return false;
	}
	$(".confirm-goods-num").each(function(i, e) {
		var shoppingCartId = $(this).attr("data-cartid");
		for(var j = 0; j < shoppingCartCounts.length; j++) {
			if(shoppingCartCounts[j].shoppingCartId == shoppingCartId) {
				if($(e).hasClass("confirm-goods-num-over")) {
					$(e).find("input").val("x" + shoppingCartCounts[j].count);
				} else {
					$(e).find("input").val(shoppingCartCounts[j].count);
				}
				break;
			}
		}
	});
	//count();
	if(blean === 'true') {
		totalFreight();
		remarkCounts();
	} else {
		$(".confirm-remark-shipping").html('<span>配送费</span>');
		$(".pay").attr("data-value", '0.00');
		$(".paytotal").text('0.00');
		$(".confirm-total-price").attr("data-value", '0.00');
		$(".pay-sub>span:eq(1)").hide();
		confirmConfig();
	}

}
//立即购买商品数量添加（购物卡id）
function commodityCounts() {
	//commodityCount = $(".confirm-goods-input").val();
}
//留言数据缓存
function remarkCounts() {
	//	remarkCount = $(".comfirm-say").val();
	//	sessionStorage.setItem("remarkCount", remarkCount);
	//	remarkCount = ;
	$(".confirm-all .confirm-shop").each(function(i, e) {
		if(isCondition(sessionStorage.getItem($(e).attr("data-sellerid")))) {
			$(e).find(".comfirm-say").val(sessionStorage.getItem($(e).attr("data-sellerid")))
		}
	})
}
//留言数据缓存
function saveRemark() {
	$(".confirm-all .confirm-shop").each(function(i, e) {
		sessionStorage.setItem($(e).attr("data-sellerid"), $(e).find(".comfirm-say").val());
	})
}
//编辑购物车或菜篮子商品数量接口
function count() {
	var countParam = {};
	if(isCondition(shoppingCartId)) {
		var shoppingCartCountc = shoppingCartCounts();
		console.log(shoppingCartCountc);
		countParam.body = {
			shoppingCartCount: shoppingCartCountc
		};
	} else {
		//立即购买产品数量添加(商品id)
		var commodityCount = $(".confirm-goods-input").val();
		if(!isCondition(commoditySkuId)) {
			countParam.body = {
				commodityId: commodityId,
				commodityCount: commodityCount
			};
		} else {
			countParam.body = {
				commodityId: commodityId,
				commoditySkuId: commoditySkuId,
				commodityCount: commodityCount
			};
		}

	}
	countParam.header = {
		token: token,
		time_stamp: time_stamp
	};
	var countParamString = JSON.stringify(countParam);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/editConfirmOrderCommodityCount?str=" + countParamString,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(data);
			//满减
			var totalReducePrice = data.totalReducePrice;
			$(".totalReducePrice").text(totalReducePrice);

			//应付款
			var realTotalPrice = data.realTotalPrice;
			$(".pay").attr("data-value", realTotalPrice);

			//总额
			var totalPrice = data.totalPrice;
			$(".paytotal").text(totalPrice);
			$(".confirm-total-price").attr("data-value", totalPrice);

			confirmConfig();

		}
	});
}
//提交订单
function saveCommodityOrder() {
	var receiverId = sessionStorage.getItem("receiverInfoId");
	if(!isCondition(receiverId)) {
		layer.msg('请选择收货地址', {
			time: 3000
		});
		return false;
	}
	if(!ajaxState){
		return false;
	}
	if($(".confirm-top-name").text().indexOf("LXJ") == 0 && $(".confirm-top-name").text().substr(3, 8).length >= 8 && /^\d+$/.test($(".confirm-top-name").text().substr(3, 8))) {
		$(".bgblack").show();
		$("#changeusername").show();
		$(".bgblack").height($("body").height() > $(window).height() ? $("body").height() : $(window).height());
		$("#changeusername").height($("#changeusername").height());
		sessionStorage.setItem("changereceiverInfoId", receiverId);
		return false;
	} else if(!isCondition($.trim($(".confirm-top-name").text()))) {
		$(".bgblack").show();
		$("#changeusername").show();
		$(".bgblack").height($("body").height() > $(window).height() ? $("body").height() : $(window).height());
		$("#changeusername").height($("#changeusername").height());
		sessionStorage.setItem("changereceiverInfoId", receiverId);
		return false;
	}
	var sellerRemark = [];
	$(".confirm-all .confirm-shop").each(function(i, e) {
		sellerRemark[i] = {
			sellerId: $(e).attr("data-sellerid"),
			content: $(e).find(".comfirm-say").val()
		}
	})
	var commitPrice = $(".pay").attr("data-value");
	var sureParam = {};
	if(isCondition(shoppingCartId)) {
		var shoppingCartCountc = shoppingCartCounts();
		//购物车购买
		sureParam.body = {
			householdSerial: householdSerial,
			categoryType: 1,
			shoppingCartCount: shoppingCartCountc,
			areaOrgaSeq: areaCode,
			receiverId: receiverId,
			sellerRemark: sellerRemark,
			totalPrice: totalPrice,
			commitPrice: commitPrice,
			freightList: sellerFreightSave,
			sellerReducedFeeList: sellerReducedFeeList
		};
	} else {
		var commodityCount = $(".confirm-goods-input").val();
		//立即购买
		if(!isCondition(commoditySkuId)) {
			commoditySkuIdsave = '';
		}
		sureParam.body = {
			householdSerial: householdSerial,
			categoryType: 1,
			areaOrgaSeq: areaCode,
			commodityId: commodityId,
			commodityCount: commodityCount,
			commoditySkuId: commoditySkuIdsave,
			receiverId: receiverId,
			sellerRemark: sellerRemark,
			totalPrice: totalPrice,
			commitPrice: commitPrice,
			freightList: sellerFreightSave,
			sellerReducedFeeList: sellerReducedFeeList,
			giftbagId: giftbagId
		};
	}

	sureParam.header = {
		token: token,
		time_stamp: time_stamp
	};
	var sureParamString = JSON.stringify(sureParam);
	$(".gopay").removeAttr("onclick", "saveCommodityOrder()");
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/saveMultiCommodityOrder?str=" + sureParamString,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(data.result == 0) {

				clearHistory();
				sessionStorage.setItem("successPage", "successfulappointment_supermarket.htm");
				sessionStorage.setItem("cancleOrderType", "1");
				sessionStorage.setItem("backStatus", "1"); //到支付界面点返回 回退到菜篮子
				var orderNo = data.orderNo;
				var jsonData2 = {
					eventId: "click35",
					eventName: "订单支付页面浏览次数"
				};
				jsonData2 = JSON.stringify(jsonData2);
				nativeMethod("baiduStatistics", jsonData2);
				var commitPrice = $(".pay").attr("data-value");
				var consumePrice = $(".paytotal").text();
				sessionStorage.setItem("token", token);
				sessionStorage.setItem("host", host);
                //lxjH5url=1兼容外链跳转
                if(clientType == 'android' && sessionStorage.getItem('lxjversionsName')>=5000) {
					setTimeout(function() {
						goBack();
					}, 0)
					showActivity(window.location.protocol + window.location.host + "/mms/html5/common/pay/finalstatement.htm" + "?cancleOrderType=1&successPage=successfulappointment_supermarket.htm&backStatus=1&orderNo=" + orderNo + "&consumePrice=" + consumePrice + "&commitPrice=" + commitPrice + "&giftbagId=" + giftbagId, '提交订单')
				} else {
					location.href = "../common/pay/finalstatement.htm" + "?lxjH5url=1&orderNo=" + orderNo + "&consumePrice=" + consumePrice + "&commitPrice=" + commitPrice + "&clientType=" + clientType+ "&giftbagId=" + giftbagId;
				}
			} else {
				$(".gopay").attr("onclick", "saveCommodityOrder()");
				/* Opentip(data.reason);*/
				console.log(data.reason);
			}
		}
	});
}

//ios10.0系统以上表情输入解决方案
function IOSTen() {
	var IOSTen = sessionStorage.getItem("clientType");
	if(IOSTen != "android") {
		$("#liuyanten").css("padding-bottom", "0");
		$("#remark").css({
			'padding-top': '1px',
			'padding-bottom': '0.2rem',
			'overflow': 'visible'
		});
	}
}

function keyUp() {
	var rm = $("#remark").val();
	var arr = new Array();
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "m83p3*2bx4pv")
	}
	var strss1 = rm.trim();
	var strss = strss1.replace(/[\r\n\"\ ]/g, "m83p3*2bx4pv"); //自定义秘钥
	arr = strss.split("m83p3*2bx4pv");
	if(arr.length != 1 || strss.indexOf("m83p3*2bx4pv") >= 0 || strss.indexOf("　") >= 0) { //可能是粘贴动作	 空格注意（不知道什么卵）
		//	var rm1 = rm.replace(/\s+/g, ""); //去掉空格
		var rm2 = rm.replace(/[\r\n\"]/g, ""); //去掉回车换行
		var rm3 = rm2.substring(0, 75);
		$("#remark").val(rm3);
		localStorage.setItem("remark", rm3);
	} else { //不是粘贴动作
		var rm1 = rm.replace(/\s+/g, ""); //去掉空格
		var rm2 = rm1.replace(/[\r\n\"]/g, ""); //去掉回车换行
		var rm3 = rm2.substring(0, 75);
		localStorage.setItem("remark", rm3);
	}

}
//调用APP接口，添加百度统计
var jsonData = {
	eventId: "click32",
	eventName: "订单填写页面浏览次数"
};
jsonData = JSON.stringify(jsonData);
nativeMethod("baiduStatistics", jsonData);

//收货人名字不符合,修改后并使用该地址
function closeChangewindow() {
	$("#changeusername").hide();
	var rm = $("#changename").val();
	var rm1 = rm.replace(/\s+/g, ""); //去掉空格
	var rm2 = rm1.replace(/[\r\n\"]/g, ""); //去掉回车换行
	if(isCondition(rm2)) {
		changereceiverName();
	} else if(!isCondition(rm)) {
		$(".bgblack").hide();
		return false;
	} else {
		$(".bgblack").hide();
		layer.msg('收货人不可以纯空格', {
			time: 1000
		});
		$("#changename").val("");
	}
}

function closeChangewindowC() {
	$("#changeusername").hide();
	$(".bgblack").hide();
}

//修改请求
function changereceiverName() {
	var timestamp = new Date().getTime();
	var params = {};
	var changeusername = $("#changename").val();
	if(changeusername.indexOf("LXJ") == 0 && changeusername.substr(3, 8).length >= 8 && /^\d+$/.test(changeusername.substr(3, 8))) {
		$(".bgblack").hide();
		layer.msg('保存失败，请填写真实姓名', {
			time: 1000
		});
		$("#changename").val("");
		return false;
	}
	var userNameTest = /^[\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]*$/;
	if(!userNameTest.test(changeusername)) {
		$(".bgblack").hide();
		layer.msg('抱歉，不支持特殊字符', {
			time: 2000
		});
		return false;
	}
	var changereceiverInfoId = sessionStorage.getItem("changereceiverInfoId");

	params.body = {
		type: 5,
		receiverInfoId: changereceiverInfoId,
		userName: changeusername
	};
	params.header = {
		token: token,
		time_stamp: timestamp
	};

	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/setUserReceiverInfo?str=" + paramData;
	$.ajax({
		type: "get",
		url: reqUrl,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			$(".bgblack").hide();
			if(odata.result == 0) {
				$(".confirm-top-name").html(changeusername);
				layer.msg('修改成功', {
					time: 1000
				});
			} else {
				//appAlert("提示", "保存失败");
				layer.msg('保存失败，请不要添加表情或特殊符号', {
					time: 1000
				});
			}
			$("#changename").val("");
		}
	})
}