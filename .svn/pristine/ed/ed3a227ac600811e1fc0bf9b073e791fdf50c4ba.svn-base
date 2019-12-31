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
var lxjversionsNameC = GetURLParameter("lxjversionsName");
var scrollTop = "";
if(!isCondition(giftbagId)) {
	giftbagId = '';
}

//立即购买的商品规格
var commoditySkuId = GetURLParameter("commoditySkuAttrIds");
var commodityId = GetURLParameter("commodityId");
var commoditySkuIdsave = "";
var commoditySkuId;
var maxNum = 100;
if(isCondition(giftbagId)) {
	maxNum = 1;
}
if(commoditySkuId != null && commoditySkuId != "" && !(typeof(commoditySkuId) === undefined)) {
	commoditySkuId = commoditySkuId.split(',');
}
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
var cTotalPriceMap; //商品总价信息
var redecedKeyMap; //商品是否参与满减信息
var couponId = "";
var couponMoney;
//截取后面的元并且去掉
//
//var areaCode = "4400100001";
//var shoppingCartId = "15293902890571b7c6e4cb404f2eb9ef";
//var commodityId = "1524625058828a3347f800d045549bf6"; //立即购买的商品规格
//var commoditySkuId = ["2563", "2566", "2568"];
//var commodityCount = 1;
/*var shoppingCartId = "154138346324647db5f5c52d4cad8082";
var areaCode = "4400100001";
var host = "https://tt.hori-gz.com:8443";
var token = "1541382482150eaf7c3dbe084c7c9064";*/

var remarkCount;
if(localStorage.getItem("receiveraddressNone") === 'true') {
	sessionStorage.removeItem("receiverInfoId");
	localStorage.removeItem("receiverInfoId");
}
getReceiver();
remarkCounts();
var ajaxState = true;
var ajaxStatechange; //异步请求数据点击处理
$(document).ready(function() {
	setTitle("确认订单");
	setLxjStorage("addressPageGo","2");
	$(document).ajaxSend(function(e, xhr, opt) {
		ajaxState = false;
		clearTimeout(ajaxStatechange);
		//console.log("ajax请求" +ajaxState);
	});
	$(document).ajaxComplete(function(event, request, settings) {
		ajaxStatechange = setTimeout("ajaxState=true", 1000);
	});

	/*	var str = navigator.userAgent.toLowerCase();
		var ver = str.match(/cpu iphone os (.*?) like mac os/);
		if(!ver) {} else {
			lxjTip.alert('测试ios版本：' + ver[1].replace(/_/g, "."), {
				skin: "demo3"
			})
		}*/
})

function setLxjStorage(keyN, contN) {
	localStorage.setItem(keyN, contN);
	try {
		if(clientType == "android") {

		} else { //ios
			if(sessionStorage.getItem("lxjversionsName") >= 5180) {
				callNativeMethod('setLxjStorage', {
					storageKey: keyN,
					storageContent: contN ? contN : ""
				}, 0)
			}
		}
	} catch(e) {}
}

function getLxjStorage(keyN) {
	var returnText = "";
	try {
		if(clientType == "android") {
		} else { //ios
			if(sessionStorage.getItem("lxjversionsName") >= 5180) {
				
				callNativeMethod('getLxjStorage', {
					storageKey: keyN
				}, 0)
			}
		}
	} catch(e) {
		
	}
	return returnText;
}

function sendWebMessage(items) {//getLxjStorage方法调用完毕，ios调用sendWebMessage回调内容
	var itemsObject = JSON.parse(items);
	
	var storageKey = itemsObject.storageKey;
	var storageContent = itemsObject.storageContent;
	if (storageKey=="addressPageGo"&&storageContent=="1") {
		getLxjStorage("receiverInfoId");	
	}else if (storageKey=="addressPageGo"&&storageContent=="2") {
		
	}
	if (storageKey=="receiverInfoId") {		
		localStorage.setItem(storageKey, storageContent);
		getLxjStorage("receiveraddressNone");	
	}
	if (storageKey=="receiveraddressNone") {
		localStorage.setItem(storageKey, storageContent);
		setLxjStorage("addressPageGo","2");
		refreshNext();
	}	
	return 1;
}

function refreshNext() {
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
}
		
function refreshData() {
	//localStorage.getItem("receiverInfoId");
	setTimeout(function() {
		if(clientType == "android" || sessionStorage.getItem("lxjversionsName") < 5180) {
			refreshNext();
		} else {
			getLxjStorage("addressPageGo");
		}

	}, 0);
	return 1;
}

function getCookie(Name) {
	var search = Name + "=";
	if(document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if(offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if(end == -1) end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end))
		} else return ""
	}
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
		} else {
			$(this).prev().removeClass("confirm-goods-pre-active");
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
	//	$(".confirm-all .confirm-goods-input").each(function() {
	//		numberInput += parseInt($(this).val());
	//	});
	//$(".number-input").text(numberInput);

}

//编辑留言时底部提交订单栏隐藏
var $windowHeight = $(window).height();
$(window).resize(function() {
	if(clientType == 'ios') {
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
	//sessionStorage.setItem("remarkCount", $(".comfirm-say").val());
	$(".confirm-all .confirm-shop").each(function(i, e) {
		sessionStorage.setItem($(e).attr("data-sellerid"), $(e).find(".comfirm-say").val());
	})
	if(clientType == "ios" && isCondition(lxjversionsNameC) && lxjversionsNameC.replace(/[^0-9]/ig, "") >= 4008 && lxjversionsNameC.replace(/[^0-9]/ig, "") <= 5180) {
		window.location.href = host + "/mms/html5/common/receiverInfo/receiveraddress.htm?receiverInfoId=" + sessionStorage.getItem("receiverInfoId") + "&clientType=" + clientType + "&token=" + token + "&lxjversionsName=" + lxjversionsNameC;
	} else {
		showActivity(host + "/mms/html5/common/receiverInfo/receiveraddress.htm?receiverInfoId=" + sessionStorage.getItem("receiverInfoId"), "选择地址");
	}
	//window.open(host + "/mms/html5/common/receiverInfo/receiveraddress.htm?receiverInfoId=" + sessionStorage.getItem("receiverInfoId")+"&clientType="+clientType+"&token="+token)
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
	if(isCondition(receiverInfoId) && receiverInfoId != 'null') {
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

				if(commoditySkuId != null) {
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
		//console.log(shoppingCartCount);
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
				commodityCount: commodityCount,
			};
		} else {
			totalFreight.body = {
				commodityId: commodityId,
				receiverId: receiverId,
				commoditySkuAttrIds: commoditySkuId,
				commodityCount: commodityCount,
			};
		}
	}
	totalFreight.header = {
		token: token,
		time_stamp: time_stamp
	};
	if(isCondition(couponId)) {
		totalFreight.body.couponId = couponId;
	}
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
					/*var totalReducedFreight=0;*/
					$(".confirm-all .confirm-shop").each(function(i, e) {
						var sellerID = $(e).attr("data-sellerid");
						for(var i = 0; i < sellerFavorableToatlList.length; i++) {
							if(sellerFavorableToatlList[i].sellerId == sellerID) {
								var sellerPrivilege = "";
								var sellerTotalPrice = sellerFavorableToatlList[i].sellerTotalPrice;
								/*if(sellerFavorableToatlList[i].originalFreight!=sellerFavorableToatlList[i].freight) { //有邮费优惠
									sellerPrivilege = "   " + sellerFavorableToatlList[i].freightInfo;
									if(sellerFavorableToatlList[i].freight > 0) {
										var priceN=Number(sellerFavorableToatlList[i].originalFreight-sellerFavorableToatlList[i].freight).toFixed(2);										
										$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>¥'+sellerFavorableToatlList[i].freight+'</span><s class="total-freight">¥' + priceN + '</s>');
									} else {
										$(e).find(".confirm-remark-shipping").html('<span>配送费</span><span>免邮</span><s class="total-freight">¥' + sellerFavorableToatlList[i].originalFreight + '</s>');
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
								}*/
								if(sellerFavorableToatlList[i].originalFreight > 0) {
									$(e).find(".confirm-remark-shipping").html('<span>运费</span><span>¥' + sellerFavorableToatlList[i].originalFreight + '</span>');
								} else {
									$(e).find(".confirm-remark-shipping").html('<span>运费</span><span>免邮</span>');
								}
								var redecedFee = sellerFavorableToatlList[i].redecedFee ? sellerFavorableToatlList[i].redecedFee : 0.00;
								$(e).find(".redecedFee").html('<span>满减优惠</span><span class="confirm-counpon-num">减 ¥' + Number(redecedFee).toFixed(2) + '</span>');
								var redecedFreight = (sellerFavorableToatlList[i].originalFreight ? sellerFavorableToatlList[i].originalFreight : 0.00) - (sellerFavorableToatlList[i].freight ? sellerFavorableToatlList[i].freight : 0.00);
								$(e).find(".redecedFreight").html('<span>运费优惠</span><span class="confirm-counpon-num">减 ¥' + Number(redecedFreight).toFixed(2) + '</span>');
								/*totalReducedFreight=Number(totalReducedFreight+redecedFreight).toFixed(2);*/
								sellerTotalPrice = Number(sellerTotalPrice) + Number(sellerFavorableToatlList[i].freight ? sellerFavorableToatlList[i].freight : 0.00) - Number(redecedFee);
								$(e).find(".confirm-total-price").attr("data-value", Number(sellerTotalPrice).toFixed(2));
								break;
							}
						}
					})
					//				var freeFreight = data.freeFreight;
					//				var totalFreight = 0;
					//				if(freeFreight == 1) {
					//					if(data.totalReducedFreight > 0) {
					//						$(".confirm-remark-shipping").html('<span>配送费</span><span>免邮</span><s class="total-freight">¥' + data.totalReducedFreight + '</s>');
					//					} else {
					//						$(".confirm-remark-shipping").html('<span>配送费</span><span>免邮</span>');
					//					}
					//				} else if(isCondition(receiverId)) {
					//					totalFreight = data.totalFreight;
					//					$(".confirm-remark-shipping").html('<span>配送费</span><span>¥' + data.totalFreight + '</span>');
					//				}
					//总额
					//var totalPrice = parseFloat(Number(data.realTotalPrice));
					//$(".paytotal").text(data.totalPrice);
					//	$(".confirm-total-price").attr("data-value", totalPrice);

					//满减
					//				if(data.totalReducePrice > 0) {
					//					$(".pay-sub>span:eq(1)").show();
					//					var totalReducePrice = data.totalReducePrice;
					//					$(".totalReducePrice").text(totalReducePrice);
					//					$(".pay-sub-word").show();
					//				} else {
					//					$(".pay-sub>span:eq(1)").hide();
					//				}
					if(receiverFlag != 1) {
						$(".confirm-remark-shipping").html('<span>配送费</span>');
					}

					var realTotalPrice = parseFloat(Number((parseFloat(Number(data.realTotalPrice) - data.couponMoney)) > 0 ? (parseFloat(Number(data.realTotalPrice) - data.couponMoney)) : "0.00") + Number(data.totalFreight ? data.totalFreight : 0)).toFixed(2);
					$(".pay").attr("data-value", realTotalPrice);
					confirmConfig();
					sellerReducedFeeList = data.sellerReducedFeeList;
					sellerFreightSave = data.sellerFreight;
					/***5.2新增**/
					if(sessionStorage.getItem("lxjversionsName") >= 5108) {
						$(".totalInfoBox").show();
						$(".totalInfoBox .couponPriceTextBox .moneyTotal").text("¥" + data.totalPrice);
						$(".totalInfoBox .couponPriceTextBox .moneyTotalR").text("-¥" + data.totalReducePrice);
						$(".totalInfoBox .couponPriceTextBox .moneyTotalF").text("¥" + (data.totalFreight ? data.totalFreight : "0.00"));
						/*$(".totalInfoBox .couponPriceTextBox .moneyTotalFR").text("-¥" + (totalReducedFreight ? totalReducedFreight : "0.00"));*/
						$(".totalInfoBox .couponPriceTextBox .moneyTotalcouponMoney").text("-¥" + (data.couponMoney ? data.couponMoney : "0.00"));

						couponMoney = data.couponMoney ? data.couponMoney : "0.00";
						if(couponMoney <= 0) {
							couponId = "";

						}
						$(".chooseCouponBox .chooseCouponText2").text("优惠了" + couponMoney + "元")

						cTotalPriceMap = data.cTotalPriceMap; //商品总价信息
						redecedKeyMap = data.redecedKeyMap; //商品是否参与满减信息
						getConfirmOrderCoupon()
					} else {

					}

				} else {
					lxjTip.alert('获取价格信息失败', {
						skin: "demo3"
					})
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
				/*var totalReducedFreight=0;*/
				totalPrice = data.totalPrice;
				$(".confirm-all .confirm-shop").each(function(i, e) {
					var sellerID = $(e).attr("data-sellerid");
					for(var i = 0; i < sellerFavorableToatlList.length; i++) {
						if(sellerFavorableToatlList[i].sellerId == sellerID) {
							var sellerPrivilege = "";
							var sellerTotalPrice = sellerFavorableToatlList[i].sellerTotalPrice;
							/*if(sellerFavorableToatlList[i].freightInfo) { //有邮费优惠
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
							}*/

							if(sellerFavorableToatlList[i].originalFreight > 0) {
								$(e).find(".confirm-remark-shipping").html('<span>运费</span><span>¥' + sellerFavorableToatlList[i].originalFreight + '</span>');
							} else {
								$(e).find(".confirm-remark-shipping").html('<span>运费</span><span>免邮</span>');
							}
							var redecedFee = sellerFavorableToatlList[i].redecedFee ? sellerFavorableToatlList[i].redecedFee : 0.00;
							$(e).find(".redecedFee").html('<span>满减优惠</span><span class="confirm-counpon-num">减 ¥' + Number(redecedFee).toFixed(2) + '</span>');
							var redecedFreight = (sellerFavorableToatlList[i].originalFreight ? sellerFavorableToatlList[i].originalFreight : 0.00) - (sellerFavorableToatlList[i].freight ? sellerFavorableToatlList[i].freight : 0.00);
							$(e).find(".redecedFreight").html('<span>运费优惠</span><span class="confirm-counpon-num">减 ¥' + Number(redecedFreight).toFixed(2) + '</span>');
							/*totalReducedFreight=Number(totalReducedFreight+redecedFreight).toFixed(2);*/
							sellerTotalPrice = sellerTotalPrice + Number(sellerFavorableToatlList[i].freight ? sellerFavorableToatlList[i].freight : 0.00) - Number(redecedFee);
							$(e).find(".confirm-total-price").attr("data-value", Number(sellerTotalPrice).toFixed(2));
							break;
						}
					}
				})
				if(receiverFlag != 1) {
					$(".confirm-remark-shipping").html('<span>配送费</span>');
				}

				var realTotalPrice = parseFloat(Number((parseFloat(Number(data.realTotalPrice) - data.couponMoney)) > 0 ? (parseFloat(Number(data.realTotalPrice) - data.couponMoney)) : "0.00") + Number(data.totalFreight ? data.totalFreight : 0)).toFixed(2);
				$(".pay").attr("data-value", realTotalPrice);
				confirmConfig();
				sellerReducedFeeList = data.sellerReducedFeeList;
				sellerFreightSave = data.sellerFreight;
				/***5.2新增**/
				/*if(sessionStorage.getItem("lxjversionsName") >= 5103) {
					$(".totalInfoBox").show();
					$(".totalInfoBox .couponPriceTextBox .moneyTotal").text("¥" + data.totalPrice);
					$(".totalInfoBox .couponPriceTextBox .moneyTotalR").text("- ¥" + data.totalReducePrice);
					$(".totalInfoBox .couponPriceTextBox .moneyTotalF").text("¥" + (data.totalFreight ? data.totalFreight : "0.00"));

					$(".totalInfoBox .couponPriceTextBox .moneyTotalcouponMoney").text("- ¥" + (data.couponMoney ? data.couponMoney : "0.00"));

					couponMoney = data.couponMoney ? data.couponMoney : "0.00";
					if(couponMoney <= 0) {
						couponId = "";
					}
					$(".chooseCouponBox .chooseCouponText2").text("优惠了" + couponMoney + "元")

					cTotalPriceMap = data.cTotalPriceMap; //商品总价信息
					redecedKeyMap = data.redecedKeyMap; //商品是否参与满减信息
					getConfirmOrderCoupon()
				} else {

				}*/

			} else {
				lxjTip.alert('获取价格信息失败', {
					skin: "demo3"
				})
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
	//console.log(blean);

	var shoppingCartCounts = JSON.parse(sessionStorage.getItem("shoppingCartCount"));
	if(!isCondition(shoppingCartCounts)) {
		return false;
	}
	//console.log(JSON.parse(sessionStorage.getItem("shoppingCartCount")));
	//console.log($(".confirm-goods-num").length)
	$(".confirm-goods-num").each(function(i, e) {
		//console.log($(".confirm-goods-num").length+"        "+i+"      "+shoppingCartCounts.length)
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

//提交订单
function saveCommodityOrder() {
	var receiverId = sessionStorage.getItem("receiverInfoId");
	if(!isCondition(receiverId)) {
		layer.msg('请选择收货地址', {
			time: 3000
		});
		return false;
	}
	if(!ajaxState) {
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
			categoryType: 2,
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
			categoryType: 2,
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
	if(isCondition(couponId)) {
		sureParam.body.couponId = couponId;
	}

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
				var newCommitPrice = data.newCommitPrice ? data.newCommitPrice : "0.00";
				if(commitPrice <= 0 && newCommitPrice <= 0) {
					showActivity(host + "/mms/html5/common/pay/successfulappointment_supermarket.htm?backStatus=1", '订单支付结果')
				} else {
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
					//var commitPrice = $(".pay").attr("data-value");

					if(commitPrice <= 0 && newCommitPrice > 0) {
						commitPrice = newCommitPrice;
					}
					var consumePrice = $(".paytotal").text();
					sessionStorage.setItem("token", token);
					sessionStorage.setItem("host", host);
					if(clientType == 'android' && sessionStorage.getItem('lxjversionsName') >= 5000) {
						setTimeout(function() {
							goBack();
						}, 0)
						showActivity(window.location.protocol + window.location.host + "/mms/html5/common/pay/finalstatement.htm" + "?cancleOrderType=1&successPage=successfulappointment_supermarket.htm&backStatus=1&orderNo=" + orderNo + "&consumePrice=" + consumePrice + "&commitPrice=" + commitPrice + "&giftbagId=" + giftbagId, '提交订单')

					} else {
						window.location.replace("../common/pay/finalstatement.htm" + "?lxjH5url=1&orderNo=" + orderNo + "&consumePrice=" + consumePrice + "&commitPrice=" + commitPrice + "&clientType=" + clientType + "&giftbagId=" + giftbagId);

					}
				}

				//location.href = "../common/pay/finalstatement.htm" + "?orderNo=" + orderNo + "&consumePrice=" + consumePrice + "&commitPrice=" + commitPrice + "&clientType=" + clientType + "&giftbagId=" + giftbagId;
			} else {
				lxjTip.alert(data.reason, {
					skin: "demo3"
				})
				$(".gopay").attr("onclick", "saveCommodityOrder()");

				//	console.log(data.reason);
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

/*优惠券控制*/
var disHaveAvailableList = false;

function getConfirmOrderCoupon() {
	var timestamp = new Date().getTime();
	var params = {};
	params.body = {
		cTotalPriceMap: cTotalPriceMap,
		redecedKeyMap: redecedKeyMap
	};
	params.header = {
		token: token,
		time_stamp: timestamp
	};

	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/getConfirmOrderCoupon?str=" + paramData;
	$.ajax({
		type: "get",
		url: reqUrl,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			console.log(odata);
			var availableList = odata.availableList;
			var unavailableList = odata.unavailableList;
			$('.yesCouponInfo .couponInfoTitle2Text').html("可用优惠券(" + availableList.length + ")")
			$('.noCouponInfo .couponInfoTitle2Text').html("不可用优惠券(" + unavailableList.length + ")")
			//可用
			if(availableList.length == 0) {
				var imgKongCoupon = _.template($("#imgKongCouponHtm").html());
				$("#yesCouponBoxMain").html(imgKongCoupon());
				$(".yesCouponBoxMain1,.couponConfirm").hide();
				$("#yesCouponBoxMain").removeClass("yesCouponBoxMainShort");
				disHaveAvailableList = true;
			} else {
				$(".yesCouponBoxMain1,.couponConfirm").show();
				$("#yesCouponBoxMain").addClass("yesCouponBoxMainShort");
				disHaveAvailableList = false;
				var dataTemplate = _.template($('#yesCouponBoxMainHtm').html());
				$('#yesCouponBoxMain').html(dataTemplate({
					"data": availableList
				}));
			}

			//不可用
			if(unavailableList.length == 0) {
				var imgKongCoupon2 = _.template($("#imgKongCoupon2Htm").html());
				$("#noCouponBoxMain").html(imgKongCoupon2());
			} else {
				var dataTemplate = _.template($('#noCouponBoxMainHtm').html());
				$('#noCouponBoxMain').html(dataTemplate({
					"data": unavailableList
				}));
			}
			if($(".couponInfoBoxTitle2 .focuOn").hasClass("noCouponInfo")) {
				$(".yesCouponBoxMain1,.couponConfirm").hide();
			}

		}
	})
}

var firstChoose = true;

function showCouponInfo() {
	try {
		scrollTop = document.scrollingElement.scrollTop;
	} catch(e) {
		scrollTop = document.documentElement.scrollTop;
	}
	document.body.style.top = -(scrollTop) + "px";
	document.body.style.overflow = 'hidden';
	document.body.style.position = 'fixed';
	$(".bgTangcan").show()
	var eleG = document.getElementById("couponInfoI");
	if(couponMoney <= 0) {
		$(".yesCouponBoxMain1").html("请选择优惠券");
		$("#yesCouponBoxMain .couponInfo1 img").removeClass("chooseActive");
		$("#yesCouponBoxMain .couponInfo1 img").attr("src", "images/ic_gray_circle@3x.png")
	} else {
		$("#yesCouponBoxMain .couponInfo1 img[dataCouponId='" + couponId + "']").eq(0).addClass("chooseActive");
		$("#yesCouponBoxMain .couponInfo1 img[dataCouponId='" + couponId + "']").eq(0).attr("src", "images/ic_choise_yes.png");

		var couponMoneyC = $("#yesCouponBoxMain .couponInfo1[dataCouponId='" + couponId + "']").eq(0).attr("dataCouponMoney");
		$(".yesCouponBoxMain1").html("您已选择一张优惠券，共可抵扣<span>¥" + couponMoneyC + "</span>");
	}

	setTimeout(function() {
		eleG.style.maxHeight = "9rem";
	}, 10)

	if(firstChoose) {
		firstChoose = false;
		setTimeout(function() {
			$(".chooseCouponBox .chooseCouponText2").text("优惠了0元")
		}, 800)
	}

}

function aminateFun(state) {
	var eleG = document.getElementById("couponInfoI");
	eleG.style.maxHeight = "0";
	setTimeout(function() {
		$(".bgTangcan").hide();
		document.body.style.overflow = 'auto';
		document.body.style.position = 'static';
		try {
			document.scrollingElement.scrollTop = scrollTop;
		} catch(e) {
			document.documentElement.scrollTop = scrollTop;
		}
		$("#yesCouponBoxMain .couponInfo1 img").removeClass("chooseActive");
		$("#yesCouponBoxMain .couponInfo1 img").attr("src", "images/ic_gray_circle@3x.png")
	}, 600)
	if(state) {
		if($("#yesCouponBoxMain .couponInfo1 .chooseActive").length >= 1) {
			couponId = $("#yesCouponBoxMain .couponInfo1 .chooseActive").attr("dataCouponId");
		} else {
			couponId = "";
		}
		totalFreight()
	}
}

function ruleShowAnimate(e) {
	var clickState = e.getAttribute("dataState") == 1 ? true : false;
	var clickState2 = e.getAttribute("dataStateC");
	if(clickState2 == "2") {
		return false;
	}
	var eleG = e;
	var eleT = eleG.previousSibling;
	eleG.setAttribute("dataStateC", "2");
	setTimeout(function() {
		eleG.setAttribute("dataStateC", "1");
	}, 600)
	if(clickState) {
		eleT.previousSibling.classList.add("couponInfoRuleAnimat")
		eleT.previousSibling.style.whiteSpace = 'normal';
		eleG.setAttribute("dataState", "2");
		eleG.src = "images/btn_ic_put-up.png";
	} else {
		eleT.previousSibling.classList.remove("couponInfoRuleAnimat");
		eleG.src = "images/ic_put-up@3x.png";
		setTimeout(function() {
			eleT.previousSibling.style.whiteSpace = 'nowrap';
			eleG.setAttribute("dataState", "1");
		}, 600)
	}
}

function changeModel(i) {
	if(i == 1) {
		$(".yesCouponInfo").addClass("focuOn");
		$(".noCouponInfo").removeClass("focuOn");
		$(".noCouponBoxMainS").hide();
		$(".yesCouponBoxMainS").show();
		if(disHaveAvailableList) {
			$(".yesCouponBoxMain1,.couponConfirm").hide();
			$("#yesCouponBoxMain").removeClass("yesCouponBoxMainShort");
		} else {
			$(".yesCouponBoxMain1,.couponConfirm").show();
			$("#yesCouponBoxMain").addClass("yesCouponBoxMainShort");
		}
	} else {
		$(".yesCouponInfo").removeClass("focuOn");
		$(".noCouponInfo").addClass("focuOn");
		$(".yesCouponBoxMainS").hide();
		$(".noCouponBoxMainS").show();
	}
}

function chooseCoupon(e) {
	if($("#yesCouponBoxMain .couponInfo1 .chooseActive").length >= 1) {
		if($(e).children("img").hasClass("chooseActive")) {
			$(e).children("img").attr("src", "images/ic_gray_circle@3x.png")
			$(e).children("img").removeClass("chooseActive");
			$(".yesCouponBoxMain1").html("请选择优惠券");
		} else {
			$("#yesCouponBoxMain .couponInfo1 img").removeClass("chooseActive");
			$("#yesCouponBoxMain .couponInfo1 img").attr("src", "images/ic_gray_circle@3x.png")
			$(e).children("img").attr("src", "images/ic_choise_yes.png")
			$(e).children("img").addClass("chooseActive");

			var couponMoneyC = $(e).attr("dataCouponMoney");
			$(".yesCouponBoxMain1").html("您已选择一张优惠券，共可抵扣<span>¥" + couponMoneyC + "</span>");
		}
	} else {
		$(e).children("img").attr("src", "images/ic_choise_yes.png")
		$(e).children("img").addClass("chooseActive");
		var couponMoneyC = $(e).attr("dataCouponMoney");
		$(".yesCouponBoxMain1").html("您已选择一张优惠券，共可抵扣<span>¥" + couponMoneyC + "</span>");

	}

}