var pageNum = 1;
var pageSize = 20;
//原生传的url分割
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
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
sessionStorage.setItem("host", host);
var token = GetURLParameter("token");
if (isCondition(token)) {
	sessionStorage.setItem("token", token);
}else {
	location.href=host+"/mms/html5/common/loading/downloadWarn.htm";
}

var commodityId = GetURLParameter("commodityId");
var householdSerial = GetURLParameter("householdSerial");

var commodityName = "";
var sellerId = "";
var areaId = "";
var areaName = "";
var areaOrgaSeq = GetURLParameter("organizationSeq");
var currentPrice = 0.0;
var originalPrice = 0.0;
//--------------------------------ready开始--------------
$(function() {
	setTitle("团购详情");
	var time_stamp = Date.parse(new Date());
	var status = "1";
	var data = "{\"body\":{\"commodityId\":\"" + commodityId + "\",\"status\":\"" + status + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getGroupCouponCommodityDetail?str=" + data,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(JSON.stringify(data));
			var list = data.commodity;
			var isOverTime = list.isOverTime;
			commodityName = list.name;
			sellerId = list.sellerId;
			//商家坐标
			var sellerLat = list.sellerLat;
			var sellerLng = list.sellerLng;
			var sellerName = list.sellerName;
			var sellerAddress = list.sellerAddress;
			var sellerLogo = list.sellerLogo;
			originalPrice = list.originalPrice;
			currentPrice = list.currentPrice;
			//商品图片
			var photo = list.detailPhotos;
			//遍历product里面的photo数组
			for(var i = 0; i < photo.length; i++) {
				var imgUrl = photo[i];
				var product = _.template($("#productTemplate").html());
				$("#product").append(product(imgUrl)); //推进图片数组
			}
			//对应的左边翻页看banner事件
			 if(photo.length>1){
                    //对应的左边翻页看banner事件
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true ,
                        autoplay : 2000,
                        autoplayDisableOnInteraction : false
                    });
               }
			var thumLogo = list;
			var foodpic = _.template($("#foodpicture").html());
			$(".main").append(foodpic(thumLogo));
			//商品套餐
			var foodlist = list.packages;
			for(var i = 0; i < foodlist.length; i++) {
				var food = foodlist[i];
				var foodlis = _.template($("#foodlist").html());
				$("#sellfoodlist").append(foodlis(food));
			}
			//商品使用规则
			var foodrel = list;
			var foodre = _.template($("#foodrule").html());
			$(".main").append(foodre(foodrel));
			//卖家电话
			var phone = list;
			var phonenum = _.template($("#sellphone").html());
			$("#phone").append(phonenum(phone));
			//价格
			var shoppric = list;
			var price = _.template($("#shopprice").html());
			$("#qiang-gou").append(price(shoppric));

			var currentPriceA = doubleValue(currentPrice);
			var integerT = splitNum(currentPriceA)[0];
			var scaleT = splitNum(currentPriceA)[1];
			var currentPriceB =  currentPriceA;

			var currentPriceC = doubleValue(originalPrice);
			var integerA = splitNum(currentPriceC)[0];
			var scaleA = splitNum(currentPriceC)[1];
			var currentPriceD = currentPriceC;
			$("#new-prices").html(currentPrice+"元");
			$("#old-prices").html(originalPrice+"元");
			
			//判断原价格是否为0
			judgePrice(originalPrice);
			if(isCondition(sellerLogo)){
			   $(".shop-img img").attr("src",sellerLogo);
			}
			
			//打电话
			$(".shop-phone").click(function() {
				$("#phone").addClass("donghua");
				$("#phone").css("display", "block")
				$("#mask").show();

				$(".quxiao").click(function() {
					$("#mask").fadeOut(200);
					$("#phone").removeClass("donghua");
					$("#phone").css("display", "none");
					//	document.body.style.overflowX = document.body.style.overflowY = "auto";
				});
			});
			$("#sellerAddress").click(function() {
				showMap(sellerName, sellerAddress, sellerLng, sellerLat);
			});
			//图文跳转
			$(".SpecialtyDetailPicture").click(function() {
				showActivity(host + "/mms/html5/specialty/specialtydetailpicture.htm?commodityId=" + commodityId, "图文详情");
			});
			if(isOverTime >= 2) {
				$("#open").removeAttr("onclick", "doSubmit()");
				$("#open span").text("已过期");
				$("#open").css("background-color", "#CCCCCC");
			}
		}
	});
	var time_stamp = Date.parse(new Date());
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
					areaId=odata.areaId;
					areaName=odata.areaName;
					areaAddress=odata.areaAddress;
				}
			})
})

//-----------原价判断---------
function judgePrice(pric) {
	var price = parseInt(pric);
	if(price <= 0) {
		$(".old-prices").hide();
	}
}

function doSubmit() {
	$("#open").removeAttr("onclick", "doSubmit()");
	$("#open").css("background-color", "#CCCCCC");
	var commodityDetails = commodityName;
	var count = 1;
	var time_stamp = Date.parse(new Date());
	var type = "7"; //订单类型  服务型订单
	var totalPrice = 0.00; //传后台数据，暂无意义
	var consumePrice = doubleValue(count * currentPrice); //消费金额
	var couponPrice = 0.00; //优惠金额
	var commitPrice = doubleValue(consumePrice - couponPrice); //支付金额
	var clientType = sessionStorage.getItem("clientType");
	$("footer .buy-right").css("background-color", "#c0c0c0");
	var categoryType=3;
	var data = "{\"body\":{\"getInvoice\":0," +
		"\"commodityList\":[{\"commodityName\":\"" + commodityName + "\",\"categoryType\":\"" + categoryType + "\",\"commodityId\":\"" + commodityId + "\",\"counts\":\"" + count + "\"," +
		"\"sellerId\":\"" + sellerId + "\",\"originalPrice\":" + originalPrice + "," +
		"\"commodityVersionId\":\"\",\"commodityDetails\":\"" + commodityDetails + "\", \"areaId\":\"" + areaId + "\", \"areaName\":\"" + areaName + "\", \"areaOrgaSeq\":\"" + areaOrgaSeq + "\"" +
		"}],\"totalPrice\":" + totalPrice + ",\"couponPrice\":" + couponPrice + ",\"payPrice\":" + commitPrice + ",\"type\":" + type + "},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":" + time_stamp + "}}";
	data = encodeURIComponent(data);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/saveCommodityOrder?str=" + data,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			if(odata.result == 0) {
				clearHistory();
				var orderNo = odata.orderNo;
				sessionStorage.setItem("successPage", "successfulappointment_specialty.htm"); //成功页面
				sessionStorage.setItem("cancleOrderType", "7"); //成功页面
				sessionStorage.setItem("cancleOrderParam", commodityId); //成功页面所需参数
				location.href = "../common/pay/finalstatement.htm" + "?orderNo=" + orderNo + "&consumePrice=" + consumePrice + "&couponPrice=" + couponPrice + "&commitPrice=" + commitPrice + "&clientType=" + clientType;
			} else {
				appAlert("提示", odata.reason);
			}
		}
	});
}