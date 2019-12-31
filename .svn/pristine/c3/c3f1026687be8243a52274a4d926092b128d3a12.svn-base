initializeSession();
//获取小区信息
var areaCode = sessionStorage.getItem("areaCode");
var commodityId = GetURLParameter("commodityId");
var token = sessionStorage.getItem("token");

//获取购物车id并且缓存到本地
var shoppingCartId = GetURLParameter("shoppingCartId");
sessionStorage.setItem("shoppingCartId", shoppingCartId);
//获取商品规格型号
var commoditySkuAttrIds = GetURLParameter("commoditySkuAttrIds");
sessionStorage.setItem("commoditySkuAttrIds", commoditySkuAttrIds);

var skuId = "";
//获取商品数量
var commodityCount = GetURLParameter("commodityCount");
//截取后面的元并且去掉
var showprice = "";
var time_stamp = "";
var freightList;
var url = window.location.search;

function doubleValue(price) {
	return(Math.round(price * 10000) / 10000).toFixed(2);
}

function splitNum(numberN) {
	var Num = numberN;
	var Nums = new Array();
	Nums = (Num + "").split(".");
	return Nums;
}

function isCondition(param) { // (!typeof(a) === undefined)
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}

function Opentip(tip) {
	layer.msg(tip, {
		time: 3000
	});
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

var $windowHeight = $(window).height();
$(window).resize(function() {
	if($windowHeight <= $(window).height()) {
		$('.buy').show();
	} else {
		$('.buy').hide();
	}
});

$(document).ready(function() {
	setTitle("确认订单");
	var jsonData={
	    eventId:"click32",
	    eventName:"订单填写页面浏览次数"
	};
	jsonData=JSON.stringify(jsonData);
	//调用APP接口，添加百度统计
	nativeMethod("baiduStatistics",jsonData);
	IOSTen();
	var addressStatus = sessionStorage.getItem("addressStatus");
	if(addressStatus != "1") { //执行一次  查询当前住房并同步到收货表
		var time_stamp = Date.parse(new Date());
		var householdSerial = sessionStorage.getItem("householdSerial");
		//获取默认的收货地址信息 包含小区信息
		var data = "{" + "\"body\":{\"type\":\"" + 1 + "\",\"householdSerial\":\"" + householdSerial + "\"}," +
			"\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/getUserReceiverInfo?str=" + data,
			async: false,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(odata) {
				var info = odata.receiverInfo;
				if(isCondition(info)) {
					sessionStorage.setItem("receiverInfoId", info.id);
				}
				sessionStorage.setItem("currentHouseholdId", odata.currentHouseholdId);
				sessionStorage.setItem("areaId", odata.areaId);
				sessionStorage.setItem("areaName", odata.areaName);
				sessionStorage.setItem("areaAddress", odata.areaAddress);
				sessionStorage.setItem("addressStatus", "1");
			}
		})
	}
	//根据收货id获取收货地址详情接口
	var receiverInfoId = sessionStorage.getItem("receiverInfoId");
	if(isCondition(receiverInfoId)) {
		var time_stamp = Date.parse(new Date());
		var sellerId = sessionStorage.getItem("sellerId");
		var data = "{" + "\"body\":{\"type\":\"" + 4 + "\",\"receiverInfoId\":\"" + receiverInfoId + "\"}," +
			"\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/getUserReceiverInfo?str=" + data,
			async: false,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(odata) {

				var info = odata.receiverInfo;
				var receiverInfoId = info.id;
				var onServer = odata.onServer;
				sessionStorage.setItem("onServer", onServer);
				sessionStorage.setItem("receiverInfoId", receiverInfoId);
				sessionStorage.setItem("mobile", info.mobile);
				sessionStorage.setItem("address", info.address);
				sessionStorage.setItem("isDef", info.isDef);
				sessionStorage.setItem("householdId", info.householdId);
				sessionStorage.setItem("communityId", info.communityId);
				$("#userName").html(info.username);
				$("#telephone").html(info.mobile);
				$("#userAddress").html(info.address);

			}
		})
	} else {
		$(".address-left").hide();
		$("#address_none").show();
	}
	$("#remark").val(localStorage.getItem("remark"));
	getData();
	time_stamp = Date.parse(new Date());
	var areaId = sessionStorage.getItem("areaId");
	var areaName = sessionStorage.getItem("areaName");
	var countFlag = 1;
	//var couponCount = getCouponCount(countFlag,shoppingCartId,areaId,showprice,areaName,token,time_stamp);
	//var couponCount = getCouponCount(countFlag,shoppingCartIdss,areaId,showprice,areaName,token,time_stamp);
	//(token,totalPrice,countFlag,shoppingCartIds,areaId,areaName)
	var couponCount = getMultiOrderCouponCount(token, showprice, countFlag, shoppingCartId, areaId, areaName, commoditySkuAttrIds);
	var couponStatus = sessionStorage.getItem("couponStatus");
	var couponPrice = sessionStorage.getItem("couponPrice");
	if(couponStatus == "1") {
		$("#coupon").html("<span class='fuhao'>- ¥</span> " + couponPrice);
	} else {
		$("#coupon").hide();
	}
	if(couponCount > 0) {
		$("#useCoupon").css("background-color", "#ec584e").html(couponCount + "张可用");
	} else {
		$("#useCoupon").html("暂无可用").css("background-color", "#9d9d9d");
	}
	$("#hcho").show();

	//点击地址跳转的地址切换页面
	$("#Address").click(function() {
		var rm = $("#remark").val();
		localStorage.setItem("remark", rm);
		var clientType = sessionStorage.getItem("clientType");
		var orga = sessionStorage.getItem("areaCode");
		location.href = "../common/receiverInfo/receiveraddress.htm?clientType=" + clientType + "&orga=" + orga + "&type=ios";
	});
	$("#Coupons").on("click", function() {
		var rm = $("#remark").val();
		localStorage.setItem("remark", rm);
		var clientType = sessionStorage.getItem("clientType");
		location.href = "../common/coupons/multiOrderCoupons.htm?clientType=" + clientType;
	});
	setTimeout(function() {
		var body_height = $("body").height();
		var window_height = $(window).height();
		var b_clientType = sessionStorage.getItem("clientType");
		if(b_clientType != "ios" && window_height >= body_height) {
			$("body").height(window_height + 1);
			$("body").css("overflow", "hidden");
		}
	}, 1000);
	$('#remark').bind('focus', function() {
		$('.buy').hide();
	}).bind('blur', function() {
		$('.buy').show();
	});

});
var sellerList = new Array();
var commodityList = new Array();
var sellerReducedFeeList=new Array();
//软键盘弹出时页面底部位置的固定定位
function newviewopen(x) {
	setTimeout(function() {
		var viewBottom = window.innerHeight;
		var weizhi;
		var element = document.getElementById(x);
		var getElementPosition = function(elem) {
			var defaultRect = {
				top: 0,
				left: 0
			};
			weizhi = elem.getBoundingClientRect();
		}
		getElementPosition(element);
		var elementBottom = weizhi.bottom;
		if(viewBottom >= elementBottom) {} else {
			var vuleheight = elementBottom - viewBottom + 100;
			$(window).scrollTop(vuleheight);
			window.scrollTo(0, vuleheight);
		}
	}, 500);
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
//根据住房id获取收货地址详情接口
var householdId = sessionStorage.getItem("householdId");
//判断是否登录
function needLogin(token) {
	try {
		return contact.needLogin(token);
	} catch(exception) {
		return true;
	}
}

try {
	contact.hideCart();
} catch(exception) {}

function showView() {
	if(null) {

	} else {

		setTimeout(function() {
			getData();
		}, 500);
	}
}
//showView();
//    调用接口信息
function getData() {
	getFreight();
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	//购物车页面跳转过来和立即购买跳转过来所带参数的判断
	if(isCondition(shoppingCartId != null && shoppingCartId != "" && !(typeof(shoppingCartId) === undefined))) {
		params.body = {
			shoppingCartIds: shoppingCartId,
			areaOrgaSeq: areaCode
		}
	} else {
		//判断立即购买是否有带规格型号
		if(isCondition(commoditySkuAttrIds != null && commoditySkuAttrIds != "" && !(typeof(commoditySkuAttrIds) === undefined))) {
			params.body = {
				commodityId: commodityId,
				commoditySkuAttrIds: commoditySkuAttrIds,
				commodityCount: commodityCount,
				areaOrgaSeq: areaCode
			};
		} else {
			params.body = {
				commodityId: commodityId,
				commodityCount: commodityCount,
				areaOrgaSeq: areaCode
			};

		}
	}

	var str = JSON.stringify(params);
	$.ajax({
		type: "post",
		async: false,
		url: host + "/mms/servlet/confirmCommodityOrder?str=" + str,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			//推送商品图片进入
			if(data.result == 0) {
				var productImg = data.commodityList;
				sellerList = data.sellerList;
				sellerReducedFeeList=data.sellerReducedFeeList;
				skuId = data.sellerList[0].commodityList[0].skuId;
				commodityList = data.commodityList;
				for(var i = 0; i < productImg.length; i++) {
					var product = _.template($("#productImgTemplate").html());
					$("#productImg").append(product(productImg[i]));
				}
				//    推送商品数量进去
				var productNum = data;
				var productInformation = _.template($("#productNumTemplate").html());
				$(".productNum").append(productInformation(productNum));
				var totalReducePrice=data.totalReducePrice;
				var totalPrice=data.totalPrice;
                sessionStorage.setItem("totalPriceF",totalPrice);
                if(sessionStorage.getItem("freightPriceF")>0){
                    totalPrice=doubleValue(Number(data.totalPrice)+Number(sessionStorage.getItem("freightPriceF")));
                }
				$(".text-totalizer").html("总额：¥"+totalPrice);
				$(".text-reduction").text("满减：¥"+totalReducePrice);
                sessionStorage.setItem("totalReducePrice",totalReducePrice);
                if(totalReducePrice<=0){
                    $(".text-totalizer").html("¥"+totalPrice);
                    $(".text-reduction").hide();
				}
				if(!isCondition(showprice)) {
					showprice = data.realTotalPrice;
					sessionStorage.setItem("showprice", showprice);
				}

				if(sessionStorage.getItem("totalFreight")) {
					showprice = (parseFloat(showprice) + parseFloat(sessionStorage.getItem("freightPrice"))).toFixed(2);
				}
				//总价信息的填入
				if(sessionStorage.getItem("couponPrice")) {
					var currentP = showprice - sessionStorage.getItem("couponPrice");
					var showPrices = doubleValue(currentP);
					var finalShow = splitNum(showPrices);
					$(".integer").html(finalShow[0] + ".");
					$(".decimal").html(finalShow[1]);
				} else {
					var showPrices = doubleValue(showprice);
					var finalShow = splitNum(showPrices);
					$(".integer").html(finalShow[0] + ".");
					$(".decimal").html(finalShow[1]);
				}
				//				var toatalp=$("#total_item_1").html();

			}

			//    跳转到商品清单页
			$("#product").on("click", function() {
				var rm = $("#remark").val();
				localStorage.setItem("remark", rm);
				//sessionStorage.setItem("shoppingCartId", shoppingCartId);
				//window.location.href="productList.htm?shoppingCartId="+shoppingCartId+"";
				var num = data.commodityNum;
				var bean = "{\"message\":\"共" + num + "件\"}";
				if(isCondition(shoppingCartId != null && shoppingCartId != "" && !(typeof(shoppingCartId) === undefined))) {
					showActivitySpecial(host + "/mms/html5/mall/productList.htm?shoppingCartId=" + shoppingCartId, "商品清单", 2, bean);
				} else {
					showActivitySpecial(host + "/mms/html5/mall/productList.htm?skuId=" + skuId + "&commodityId=" + commodityId + "&commodityCount=" + commodityCount, "商品清单", 2, bean);
				}

			})
		}
	});
}

//点击确定预约进行下单  start----------------------
function doSubmit() {
	$("#open1").removeAttr("onclick", "doSubmit()");
	var remark = $("#remark").val(); //留言
	var receiverId = sessionStorage.getItem("receiverInfoId");
	if(!isCondition(receiverId)) {
		Opentip("请选择收货地址");
		return false;
	} else {
		if($("#userName").text().indexOf("LXJ") == 0&&$("#userName").text().substr(3,8).length>=8&&/^\d+$/.test($("#userName").text().substr(3,8))) {
				 $(".bgblack").show();
				 $("#changeusername").show();	
				 $(".bgblack").height($("body").height()>$(window).height()?$("body").height():$(window).height());			 
				 $("#changeusername").height($("#changeusername").height());
				 $("#open1").attr("onclick", "doSubmit()");		 			
			return false;
		}
	}
	localStorage.removeItem("remark");
	var totalPrice = (parseFloat(sessionStorage.getItem("showprice")) + parseFloat(sessionStorage.getItem("freightPrice"))).toFixed(2);
	var areaId = sessionStorage.getItem("areaId");
	var areaName = sessionStorage.getItem("areaName");
	var areaOrgaSeq = sessionStorage.getItem("areaCode");
	time_stamp = Date.parse(new Date());
	//	var commodityDetails = JSON.stringify(commodityList);
	var consumePrice = doubleValue(totalPrice); //消费金额
	//appAlert("consumePrice",consumePrice)
	var couponStr = sessionStorage.getItem("couponStr"); //优惠券id

	if(sessionStorage.getItem("couponPrice")) {
		var couponPrice = doubleValue(sessionStorage.getItem("couponPrice")); //优惠金额
	} else {
		couponPrice = 0.0;
	}
//	var discountAmount = (parseFloat(couponPrice) + parseFloat(sessionStorage.getItem("totalAvoidFreight"))).toFixed(2);
	var discountAmount = (parseFloat(couponPrice)).toFixed(2);
	var commitPrice = doubleValue(consumePrice - couponPrice); //支付金额
	if(!isCondition(couponStr)) {
		couponStr = "";
	}
	sellerList = JSON.stringify(sellerList);
	commodityList = JSON.stringify(commodityList);
	sellerReducedFeeList = JSON.stringify(sellerReducedFeeList);
	//shoppingCartId = sessionStorage.getItem("shoppingCartId");
	$("footer .buy-right span").css("background-color", "#c0c0c0");
    var categoryType = 1 ;
    var householdSerial = sessionStorage.getItem("householdSerial");
	if(shoppingCartId != null && shoppingCartId != "" && !(typeof(shoppingCartId) === undefined)) {
		var data = "{\"body\":{\"householdSerial\":\"" + householdSerial + "\",\"receiverId\":\"" + receiverId + "\",\"categoryType\":\"" + categoryType + "\",\"areaId\":\"" + areaId + "\", \"areaName\":\"" + areaName + "\", \"freightList\":" + freightList + "," +
			"\"areaOrgaSeq\":\"" + areaOrgaSeq + "\",\"couponDetailIds\":\"" + couponStr + "\",\"remark\":\"" + remark + "\",\"shoppingCartIds\":\"" + shoppingCartId + "\",\"getInvoice\":0," +
			"\"totalPrice\":" + totalPrice + ",\"sellerReducedFeeList\":" + sellerReducedFeeList + ",\"sellerList\":" + sellerList + ",\"commitPrice\":" + commitPrice + "},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
		data = encodeURIComponent(data);

	} else {
		var odata = "{\"body\":{\"householdSerial\":\"" + householdSerial + "\",\"receiverId\":\"" + receiverId + "\",\"categoryType\":\"" + categoryType + "\",\"areaId\":\"" + areaId + "\", \"areaName\":\"" + areaName + "\", \"freightList\":" + freightList + "," +
			"\"areaOrgaSeq\":\"" + areaOrgaSeq + "\",\"couponDetailIds\":\"" + couponStr + "\",\"remark\":\"" + remark + "\",\"getInvoice\":0," +
			"\"totalPrice\":" + totalPrice + ",\"commodityList\":" + commodityList + ",\"sellerReducedFeeList\":" + sellerReducedFeeList + ",\"sellerList\":" + sellerList + ",\"commitPrice\":" + commitPrice + "},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
		data = encodeURIComponent(odata);
	}
	var clientType = sessionStorage.getItem("clientType");
	$.ajax({
		type: "post",
		url: host + "/mms/servlet/saveMultiCommodityOrder?str=" + data,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			if(odata.result == 0) {
				clearHistory();
				var orderNo = odata.orderNo;
				sessionStorage.setItem("successPage", "successfulappointment_supermarket.htm");
				sessionStorage.setItem("cancleOrderType", "1");
				sessionStorage.setItem("backStatus", "1"); //到支付界面点返回 回退到菜篮子
				var jsonData2={
					eventId:"click35",
				    eventName:"订单支付页面浏览次数"
				};
				jsonData2=JSON.stringify(jsonData2);
				nativeMethod("baiduStatistics",jsonData2);
				location.href = "../common/pay/finalstatement.htm" + "?orderNo=" + orderNo + "&consumePrice=" + consumePrice + "&couponPrice=" + couponPrice + "&commitPrice=" + commitPrice + "&clientType=" + clientType;
			} else {
				Opentip(odata.reason);
			}
		}
	});
}

function getFreight() {
	var timestamp = new Date().getTime();
	var areaId = sessionStorage.getItem("areaId");
	var couponId = "";
	if(sessionStorage.getItem("couponId")) {
		couponId = sessionStorage.getItem("couponId");
	}
	var params = {};
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	if(shoppingCartId != null && shoppingCartId != "" && !(typeof(shoppingCartId) === undefined)) {
		params.body = {
			shoppingCartIds: shoppingCartId,
			areaSeq: areaCode
		};
	} else {
		if(isCondition(commoditySkuAttrIds != null && commoditySkuAttrIds != "" && !(typeof(commoditySkuAttrIds) === undefined))) {
			params.body = {
				commodityId: commodityId,
				commoditySkuAttrIds: commoditySkuAttrIds,
				commodityCount: commodityCount,
				areaSeq: areaCode
			};
		} else {
			params.body = {
				commodityId: commodityId,
				commodityCount: commodityCount,
				areaSeq: areaCode
			};

		}
		
	}
	var paramData = JSON.stringify(params);
	//appAlert("11",paramData);
	var reqUrl = host + "/mms/servlet/calculateOrderFreight?str=" + paramData;
	$.ajax({
		type: "get", //jquey是不支持post方式跨域的
		async: false,
		url: reqUrl, //跨域请求的URL
		dataType: "jsonp",
		//传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonp: "jsoncallback",
		//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		jsonpCallback: "success_jsonpCallback",
		//成功获取跨域服务器上的json数据后,会动态执行这个callback函数
		success: function(data) {
			if(data.result == 0) {
				//appAlert("sss",JSON.stringify(data));
				//sessionStorage.setItem("totalAvoidFreight", data.totalAvoidFreight); //保存总减免的运费
				sessionStorage.setItem("totalFreight", data.totalFreight); //保存需要支付的运费
				//var freightPrice = doubleValue(data.totalFreight - data.totalAvoidFreight);
				
				freightList = JSON.stringify(data.sellerFreight);
				var freeFreight=data.freeFreight;
				var totalReducedFreight=data.totalReducedFreight;

				if(freeFreight == 1) {
					sessionStorage.setItem("freightPrice", 0);
					if(totalReducedFreight==0){
						$("#freight").html("免邮");
					}else{
						$("#freight").html("<span style='text-decoration:line-through;padding-right: 10px;color:#999;'>¥"+totalReducedFreight+" </span>免邮");
                    }
                    sessionStorage.setItem("freightPriceF", 0);
				} else {
					var freightPrice = doubleValue(data.totalFreight);
					sessionStorage.setItem("freightPrice", freightPrice);
                    sessionStorage.setItem("freightPriceF", freightPrice);

                    $("#freight").text("¥" + freightPrice);
				}
                if(sessionStorage.getItem("totalPriceF")>0){
                    var totalPriceF=doubleValue(Number(sessionStorage.getItem("totalPriceF"))+Number(sessionStorage.getItem("freightPriceF")));
                    $(".text-totalizer").html("总额：¥"+totalPriceF);
                }
                var totalReducePrice=sessionStorage.getItem("totalReducePrice");
                if(totalReducePrice<=0){
                    var totalPriceF=doubleValue(Number(sessionStorage.getItem("totalPriceF"))+Number(sessionStorage.getItem("freightPriceF")));
                    $(".text-totalizer").html("¥"+totalPriceF);
                }
//				var deliveryWays = data.deliveryWay;
//				$("#deliverWay").text(deliveryWays);
			}
		}
	});
}
//收货人名字不符合,修改后并使用该地址
function closeChangewindow() {
	$("#changeusername").hide();
	var rm=$("#changename").val();
	var rm1 = rm.replace(/\s+/g, ""); //去掉空格
	var rm2 = rm1.replace(/[\r\n\"]/g, ""); //去掉回车换行	
	if(isCondition(rm2)) {		
		changereceiverName();
	}else if(!isCondition(rm)){
		$(".bgblack").hide();
		return false;
	}else{
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
	if(changeusername.indexOf("LXJ") == 0&&changeusername.substr(3,8).length>=8&&/^\d+$/.test(changeusername.substr(3,8))){
		$(".bgblack").hide();
		layer.msg('保存失败，请填写真实姓名', {
					time: 1000
				});
				$("#changename").val("");
		return false;
	}
	var userNameTest= /^[\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]*$/;
	if(!userNameTest.test(changeusername)){
		$(".bgblack").hide();
		layer.msg('抱歉，不支持特殊字符', {
			time: 2000
		});
		return false;
	}
	var isDef = String(sessionStorage.getItem("isDef"));
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	params.body = {
		operateType: 1,
		receiverInfoId: sessionStorage.getItem("receiverInfoId"),
		isDef: isDef,
		communityId: sessionStorage.getItem("communityId"),
		userName: changeusername,
		mobile: sessionStorage.getItem("mobile"),
		householdId: sessionStorage.getItem("householdId"),
		address: sessionStorage.getItem("address")
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
				$("#userName").html(changeusername);
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
