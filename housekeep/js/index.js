var time_stamp;
var clientType = ""; //ios或者android
var commodityId = ""; //商品id
var sellerId = ""; //店铺id
var commodityName = "";
var currentPrice = 0.0;
var originalPrice = 0.0;
var areaId = "";
var areaName = "";
var areaAddress = "";

var $windowHeight = $(window).height();
$(window).resize(function() {
	if($windowHeight <= $(window).height()) {
		$('.buy').show();
	} else {
		$('.buy').hide();
	}
});

function keyUp() {
	var c = $("#qty_item_1").val();
	sessionStorage.setItem("commodityCount", c);
	var rm = $("#remark").val();
	sessionStorage.setItem("remark", rm);
}　　
document.onkeyup = keyUp;

function Opentip(tip) {
	layer.msg(tip, {
					time: 3000
		});
}

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function doubleValue(price) {
	return(Math.round(price * 10000) / 10000).toFixed(2);
}

function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
//分割小数点
function splitNum(numberN) {
	var Num = numberN;
	var Nums = new Array();
	Nums = (Num + "").split(".");
	return Nums;
}
//从URL获取token、手机类型
token = GetURLParameter("token");
//手机类型
clientType = GetURLParameter("clientType");
//住户编号 
householdSerial = GetURLParameter("householdSerial");
//小区机构编号
areaCode = GetURLParameter("organizationSeq");
commodityId = GetURLParameter("commodityId");
sessionStorage.setItem("token", token);
sessionStorage.setItem("clientType", clientType);
sessionStorage.setItem("householdSerial", householdSerial);
sessionStorage.setItem("areaCode", areaCode);
if(isCondition(commodityId)) {
	sessionStorage.setItem("commodityId", commodityId);
}

sessionStorage.setItem("host", host);
//----------------$(document)方法  start-------------------
$(document).ready(function() {
	setTitle("预约家政");
	IOSTen();
	var commodityCount = sessionStorage.getItem("commodityCount");
	if(isCondition(commodityCount)) {
		if(commodityCount != 0) {
			$("#qty_item_1").val(commodityCount);
		}
	}
	$("#Coupons").on("click", function() {
		var c = $("#qty_item_1").val();
		sessionStorage.setItem("commodityCount", c);
		var rm = $("#remark").val();
		sessionStorage.setItem("remark", rm);
		location.href = "../common/coupons/coupons.htm?clientType=" + clientType;
	});
	$("#Address").click(function() {
		var c = $("#qty_item_1").val();
		sessionStorage.setItem("commodityCount", c);
		var rm = $("#remark").val();
		sessionStorage.setItem("remark", rm);
		var sellerId = sessionStorage.getItem("sellerId");
		location.href = "../common/receiverInfo/receiveraddress.htm?clientType=" + clientType + "&sellerId=" + sellerId + "&type=ios";
	});
	setTimeout(function(){
            var body_height=$("body").height();
            var window_height=$(window).height();
            var b_clientType=sessionStorage.getItem("clientType");
            if(b_clientType!="ios"&&window_height>=body_height){
            	$("body").height(window_height+1);
            	$("body").css("overflow","hidden");
            }
	},1000)
	$('#remark').bind('focus', function() {
		$('.buy').hide();
	}).bind('blur', function() {
		$('.buy').show();
	});
	$('#qty_item_1').bind('focus', function() {
		$('.buy').hide();
	}).bind('blur', function() {
		$('.buy').show();
	});
	//设置留言
	$("#remark").val(sessionStorage.getItem("remark"));

	var addressStatus = sessionStorage.getItem("addressStatus");
	if(addressStatus != "1") {
		var token = sessionStorage.getItem("token");
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

	//根据商品id获取商品详情接口
	commodityId = sessionStorage.getItem("commodityId");
	if(isCondition(commodityId)) {
		var token = sessionStorage.getItem("token");
		time_stamp = Date.parse(new Date());
		var moduleName="housekeeping";
		var areaCode = sessionStorage.getItem("areaCode");
		var data = "{\"body\":{\"commodityId\":\"" + commodityId + "\",\"moduleName\":\"" + moduleName + "\",\"areaSeq\":\"" + areaCode + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
		$.ajax({
			type: "get",
			async: false,
			url: host + "/mms/servlet/getCommodityInfo?str=" + data,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(odata) {
				if(odata.result == 0) {
					var obj = odata.list[0];
					$(".picture img").attr("src", obj.thumLogo);
					$(".title").html(obj.name);
					var currentPriceP = doubleValue(obj.currentPrice);
					var integerT = splitNum(currentPriceP)[0];
					var scaleT = splitNum(currentPriceP)[1];
					$(".price").html("<span class='font_sizebig'>" +currentPriceP+ "</span>" + "元/小时");
					$(".introduce").html(obj.introduction);
					if(obj.introduction == null || obj.introduction == "" || obj.introduction == undefined) {
						$("#introduce").hide();
					} else {
						animateIntroduction();
					}
					commodityName = obj.name;
					currentPrice = obj.currentPrice;
					originalPrice = obj.originalPrice;
					sellerId = obj.sellerId; //设置店铺信息------
					sessionStorage.setItem("sellerId", sellerId);

					//展示价格
					var c = $("#qty_item_1").val();
					var tPrice = doubleValue(c * currentPrice); //总价
					var commodityInfo = "[{'" + commodityId + "':" + c + "}]";
					sessionStorage.setItem("commodityInfo", commodityInfo);
					sessionStorage.setItem("tp", tPrice); //选择优惠券时使用到
					var areaId = sessionStorage.getItem("areaId");
					var couponCount = getCouponCount(token, tPrice, "[{'" + commodityId + "':" + c + "}]", 1, sellerId, areaId);
					var couponStatus = sessionStorage.getItem("couponStatus"); //有选优惠券
					var couponPrice = sessionStorage.getItem("couponPrice"); //优惠金额
					var commitPrice = doubleValue(tPrice - couponPrice);
					var integerT = splitNum(commitPrice)[0];
					var scaleT = splitNum(commitPrice)[1];
					var cp = "<span class='font_sizebig'>" + integerT + "</span>.<span class='font_size3'>" + scaleT + "</span>";
					$("#total_item_1").html(cp);
					if(couponStatus == "1") {
						$("#coupon").html("- ¥ " + couponPrice);
					} else {
						$("#coupon").hide();
					}
					if(couponCount > 0) {
						$("#useCoupon").css("background-color", "#ec584e").html(couponCount + "张可用");
					} else {
						$("#useCoupon").html("暂无可用").css("background-color", "#9d9d9d");
					}
					var detail = odata.detail;
					if(detail != null && detail.hasServiceTime != 0) {
						var startServiceTime = detail.startServiceTime; //起始服务时间
						var endServiceTime = detail.endServiceTime; //截止服务时间
						var serviceInterval = detail.serviceInterval; //服务时间间隔(单位:小时)
						setServiceTime(startServiceTime, endServiceTime, serviceInterval);
					} else {
						setServiceTime("9:00", "19:00", 1);
					}
				}
			}
		});
	}
	//根据收货id获取收货地址详情接口
	var receiverInfoId = sessionStorage.getItem("receiverInfoId");
	if(isCondition(receiverInfoId)) {
		var token = sessionStorage.getItem("token");
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
				$("#userName").html(info.username);
				$("#telephone").html(info.mobile);
				$("#userAddress").html(info.address);
				$(".address-left").show();
				$("#address_none").hide();
			}
		})
	} else {
		$(".address-left").hide();
		$("#address_none").show();
	}
	//展示合计价格
	function getTotal(c) { //c  商品数量
		var c = $("#qty_item_1").val();
		sessionStorage.setItem("commodityCount", c);
		setCountCss();
		time_stamp = Date.parse(new Date());
		var tPrice = doubleValue(c * currentPrice); //总价
		var integerT = splitNum(tPrice)[0];
		var scaleT = splitNum(tPrice)[1];
		var ispric = "<span >" + integerT + "</span>.<span class='font_size3'>" + scaleT + "</span>";

		$("#total_item_1").html(ispric);
		var data = "{\"body\":{\"totalPrice\":" + tPrice + "," +
			"\"commodityInfo\":[{\"" + commodityId + "\":" + c + "}]},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":" + time_stamp + "}}";
		sessionStorage.removeItem("couponStr");
		sessionStorage.removeItem("couponPrice");
		sessionStorage.removeItem("couponStatus");
		var commodityInfo = "[{'" + commodityId + "':" + c + "}]";
		sessionStorage.setItem("commodityInfo", commodityInfo);
		sessionStorage.setItem("tp", tPrice);
		var areaId = sessionStorage.getItem("areaId");
		var sellerId = sessionStorage.getItem("sellerId");
		var couponCount = getCouponCount(token, tPrice, "[{'" + commodityId + "':" + c + "}]", 1, sellerId, areaId);
		if(couponCount > 0) {
			$("#useCoupon").css("background-color", "#ec584e").html(couponCount + "张可用");
		} else {
			$("#useCoupon").html("暂无可用").css("background-color", "#9d9d9d");
		}
		sessionStorage.setItem("couponStatus", "0"); //选取优惠券状态
		sessionStorage.setItem("couponPrice", 0); //优惠金额
		sessionStorage.setItem("couponStr", "");
		sessionStorage.setItem("selectedUse", []);
		sessionStorage.setItem("disabledUse", []);
		sessionStorage.setItem("limitUseMap", "")

		$("#coupon").hide();
		$("#hcho").show();
	}

	setCountCss();

	//改变商品数量
	$(".add").click(function() {
		var t = $(this).parent().find('input[type=number]');
		if(parseInt(t.val()) >= 99) {
			t.val(99);
			$(".add").addClass("disable");
			$(".add").attr("disabled", "true");
		} else {
			t.val(parseInt(t.val()) + 1)
			$(".reduce").removeClass("disable");
			document.getElementById("reduce_btn").disabled = false;
		}
		getTotal(t.val());
	})
	$(".reduce").click(function() {
		var t = $(this).parent().find('input[type=number]');
		if(parseInt(t.val()) <= 1) {
			t.val(1);
			$(".reduce").addClass("disable");
			$(".reduce").attr("disabled", "true");
		} else {
			t.val(parseInt(t.val()) - 1);
			$(".add").removeClass("disable");
			document.getElementById("add").disabled = false;
		}
		getTotal(t.val());
	})
	$("#qty_item_1").change(function() {
		var value = parseInt($(this).val());
		$(this).val(value);
		if(isNaN(value)) {
			$(this).val(1);
		}
		if(value > 99) {
			$(this).val(99);
			Opentip("数量超出范围");
		}
		if(value <= 1) {
			$(this).val(1);
		}
		getTotal($(this).val());
	})
}); //----------------$(document)方法  end-------------------    

//ios10.0系统以上表情输入解决方案
function IOSTen(){
	var IOSTen=	clientType;
	if(IOSTen!="android"){
		$("#liuyanten").css("padding-bottom","0");
		$("#remark").css({'padding-top':'1px','padding-bottom':'0.2rem','overflow':'visible'});
		
	}
				
}

//说明动画效果
function animateIntroduction() {
	var ins_height = $(".introduce").height();
	var html_size = $('html').css("font-size");
	html_size = html_size.replace("px", "");
	ins_height1 = Number(ins_height);
	html_size = Number(html_size);
	var ii = ins_height1 - html_size;
	if(ii >= 0) {
		$("#introduce_more").show();
		$(".introduce").css({
			"-webkit-line-clamp": '2',
			"margin-bottom": '0'
		});
		var ins_height2 = $(".introduce").height();
		$(".introduce").css("height", ins_height2 + 'px');
		$("#introduce_more").click(function() {
			var linenum = $(".introduce").css("-webkit-line-clamp");
			if(linenum == 2) {
				$(".introduce").css("-webkit-line-clamp", '99');
				$(".introduce").animate({
					height: ins_height + 'px'
				});
				$("#introduce_more img").attr("src", "img/ic_up@3x.png");
			} else {
				$(".introduce").css("-webkit-line-clamp", '2');
				$(".introduce").animate({
					height: ins_height2 + 'px'
				});
				$("#introduce_more img").attr("src", "img/ic_down@3x.png");
			}
		});
	} else {
		$(".introduce").css("-webkit-line-clamp", '99');
	}
}
//点击确定预约进行下单  start----------------------
function doSubmit() {
	var token = sessionStorage.getItem("token");
	var remark = $("#remark").val(); //留言
	sessionStorage.setItem("remark", remark);
	var receiverId = sessionStorage.getItem("receiverInfoId");
	if(!isCondition(receiverId)) {
		Opentip("请选择服务地址");
		return false;
	}
	newTime();
	var aa = sessionStorage.getItem("Timenumber");
	var bb = sessionStorage.getItem("Timenumber2");
	if(bb > aa) {
		Opentip("所选时间不在服务范围</br>请重新选择");
		return false;
	}
	$("#open1").removeAttr("onclick", "doSubmit()");
	var commodityDetails = commodityName;
	var time = $("#result").html();
	time = time.substring(0, time.length - 1);
	var deliveryTime = time.trim() + ":00";
	var count = $("#qty_item_1").val();
	var time_stamp = Date.parse(new Date());
	var sellerId = sessionStorage.getItem("sellerId");
	var type = "3"; //订单类型  服务型订单
	var totalPrice = 0.00; //传后台数据，暂无意义
	var consumePrice = doubleValue(count * currentPrice); //消费金额
	var couponPrice = doubleValue(sessionStorage.getItem("couponPrice")); //优惠金额
	var couponStr = sessionStorage.getItem("couponStr"); //优惠券id
	var commitPrice = doubleValue(consumePrice - couponPrice); //支付金额
	var areaId = sessionStorage.getItem("areaId");
	var areaName = sessionStorage.getItem("areaName");
	var areaOrgaSeq = sessionStorage.getItem("areaCode");
	var clientType = sessionStorage.getItem("clientType");
	if(!isCondition(couponPrice)) {
		couponPrice = 0.0;
	}
	if(!isCondition(couponStr)) {
		couponStr = "";
	}
	$("footer .buy-right span").css("background-color", "#c0c0c0");
	var householdSerial = sessionStorage.getItem("householdSerial");
	var data = "{\"body\":{\"householdSerial\":\"" + householdSerial + "\",\"getInvoice\":0," + "\"deliveryTime\":\"" + deliveryTime + "\"," +
		"\"commodityList\":[{\"commodityName\":\"" + commodityName + "\",\"commodityId\":\"" + commodityId + "\",\"counts\":\"" + count + "\"," +
		"\"sellerId\":\"" + sellerId + "\",\"originalPrice\":" + originalPrice + ",\"receiverId\":\"" + receiverId + "\"," +
		"\"commodityVersionId\":\"\",\"commodityDetails\":\"" + commodityDetails + "\",\"couponStr\":\"" + couponStr + "\", \"areaId\":\"" + areaId + "\", \"areaName\":\"" + areaName + "\", \"areaOrgaSeq\":\"" + areaOrgaSeq + "\"" +
		"}],\"totalPrice\":" + totalPrice + ",\"couponPrice\":" + couponPrice + ",\"payPrice\":" + commitPrice + ",\"type\":" + type + ",\"remark\":\"" + remark + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":" + time_stamp + "}}";
	data = encodeURIComponent(data);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/saveCommodityOrder?str=" + data,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			if(odata.result == 0) {
				var orderNo = odata.orderNo;
				sessionStorage.setItem("successPage", "successfulappointment_maintain.htm"); //成功页面
				location.href = "../common/pay/finalstatement.htm" + "?orderNo=" + orderNo + "&consumePrice=" + consumePrice + "&couponPrice=" + couponPrice + "&commitPrice=" + commitPrice + "&clientType=" + clientType;
			} else {
				Opentip(odata.reason);
			}
		}
	});
}
//点击确定预约进行下单  end--------------------
//设置商品数量样式
function setCountCss() {
	var cc = $("#qty_item_1").val();
	if(cc == 1) {
		$(".reduce").attr("disabled", "true");
		document.getElementById("add").disabled = false;
		$(".reduce").removeClass("reduceNor");
		$(".add").removeClass("addPre");
		$(".reduce").addClass("reducePre");
		$(".add").addClass("addNor");
	} else if(cc > 1 && cc < 99) {
		document.getElementById("reduce_btn").disabled = false;
		document.getElementById("add").disabled = false;
		$(".reduce").removeClass("reducePre");
		$(".add").removeClass("addPre");
		$(".reduce").addClass("reduceNor");
		$(".add").addClass("addNor");
	} else {
		document.getElementById("reduce_btn").disabled = false;
		$(".add").attr("disabled", "true");
		$(".reduce").removeClass("reducePre");
		$(".add").removeClass("addNor");
		$(".reduce").addClass("reduceNor");
		$(".add").addClass("addPre");
	}
}

function setServiceTime(startServiceTime, endServiceTime, serviceInterval) {
	var arr = startServiceTime.split(":");
	var startHour = parseInt(arr[0]);
	var startMinute = parseInt(arr[1]);
	var arr1 = endServiceTime.split(":");
	var endHour = parseInt(arr1[0]);
	var endMinute = parseInt(arr1[1]);
	if(isCondition(serviceInterval)) {
		serviceInterval = serviceInterval;
	} else {
		serviceInterval = 0;
	}
	opentimetable(serviceInterval, startHour, startMinute, endHour, endMinute);
}

function setHour(hour) {
	if(parseInt(hour) < 10) {
		return "0" + hour;
	}
	return hour;
}

function opentimetable(a, c, d, e, g) {
	//	商家时间 opentimetable(1,9,30,18,30)
	var a = a;
	var b = c;
	var c = e;
	var bb = d;
	var cc = g;
	sessionStorage.setItem("timeinterval", a);
	sessionStorage.setItem("timehourstar", b);
	sessionStorage.setItem("timehourend", c);
	sessionStorage.setItem("timehourstarM", bb);
	sessionStorage.setItem("timehourendM", cc);
	var timeinterval = a;
	var timehourstar = b;
	var timehourstarM = bb;
	var timehourend = c;
	var timehourendM = cc;

	//	document.getElementById("result").innerText = timeinterval+ "-"+timehourstar+ "-"+timehourend;

	//时间修改成增加商家时间
	var myDate = new Date();
	var myHour1 = myDate.getHours();
	var myHour2 = myHour1 + timeinterval;
	myDate.setHours(myHour2);
	var PYear = myDate.getFullYear();
	var PMonth = myDate.getMonth() + 1;
	if(PMonth < 10) PMonth = "0" + PMonth.toString();
	var myDay = myDate.getDate();
	if(myDay < 10) myDay = "0" + myDay.toString();
	var myHour = myDate.getHours();
	var myMintues = myDate.getMinutes();
	console.log(myHour + "--" + myMintues);
	var Timenumber = "";
	var Mintue = "";
	var TimenumberO = "";
	var Timeresult = sessionStorage.getItem("Timeresult");
	if(!isCondition(Timeresult)) {
		STime();
	} else {
		document.getElementById("result").innerText = Timeresult;
	}

	function STime() {

		//当前时间小于30分时，计算成30分
		if(myMintues < 30 && myMintues >= 0) {
			var hour = myDate.getHours();

			if(timehourstar <= hour && hour < timehourend) {
				hour = setHour(hour);
				if(timehourstarM > 0) {
					Mintue = "30";
				} else {
					Mintue = "00";
				}
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":30" + " " + "起";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "30";
				sessionStorage.setItem("NewDay", myDay);
			} else if(hour < timehourstar) {
				hour = timehourstar;
				hour = setHour(hour);
				if(timehourstarM > 0) {
					Mintue = "30";
				} else {
					Mintue = "00";
				}
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":" + Mintue + " " + "起";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + Mintue;
				sessionStorage.setItem("NewDay", myDay);
			} else if(timehourend == hour) {
				if(timehourendM > 0) {
					Mintue = "30";
					hour = setHour(hour);
					document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":30" + " " + "起";
					Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "30";
					sessionStorage.setItem("NewDay", myDay);
				} else {
					hour = timehourstar;
					hour = setHour(hour);
					var myTomorrow = new Date();
					myTomorrow.setDate(myDate.getDate() + 1);
					var NewMonth = myTomorrow.getMonth() + 1;
					if(NewMonth < 10) NewMonth = "0" + NewMonth.toString();
					var NewmyDay = myTomorrow.getDate();
					if(NewmyDay < 10) NewmyDay = "0" + NewmyDay.toString();
					var newYear = myTomorrow.getFullYear();
					document.getElementById("result").innerText = newYear + "-" + NewMonth + "-" + NewmyDay + " " + hour + ":00" + " " + "起";
					Timenumber = newYear.toString() + NewMonth.toString() + NewmyDay.toString() + hour.toString() + "00";
					sessionStorage.setItem("NewDay", NewmyDay);
				}
			} else if(timehourend < hour) {
				if(timehourstarM > 0) {
					Mintue = "30";
				} else {
					Mintue = "00";
				}
				hour = timehourstar;
				hour = setHour(hour);
				var myTomorrow = new Date();
				myTomorrow.setDate(myDate.getDate() + 1);
				var NewMonth = myTomorrow.getMonth() + 1;
				if(NewMonth < 10) NewMonth = "0" + NewMonth.toString();
				var NewmyDay = myTomorrow.getDate();
				if(NewmyDay < 10) NewmyDay = "0" + NewmyDay.toString();
				var newYear = myTomorrow.getFullYear();
				document.getElementById("result").innerText = newYear + "-" + NewMonth + "-" + NewmyDay + " " + hour + ":" + Mintue + " " + "起";
				Timenumber = newYear.toString() + NewMonth.toString() + NewmyDay.toString() + hour.toString() + Mintue;
				sessionStorage.setItem("NewDay", NewmyDay);
			}

		} else {

			// document.getElementById("result").innerText = PYear+ "-"+PMonth+ "-"+myDay +" "+hour+ ":00";
			//超过30分加一小时，分变为00
			var hour = myDate.getHours();
			var hour = hour + 1;

			if(timehourstar < hour && hour <= timehourend) {
				hour = setHour(hour);
				if(timehourstarM > 0) {
					Mintue = "30";
				} else {
					Mintue = "00";
				}
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":00" + " " + "起";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
				sessionStorage.setItem("NewDay", myDay);
			} else if(timehourstar == hour) {
				if(timehourstarM > 0) {
					Mintue = "30";
				} else {
					Mintue = "00";
				}
				hour = setHour(hour);
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":" + Mintue + " " + "起";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + Mintue;
				sessionStorage.setItem("NewDay", myDay);
			} else if(hour < timehourstar) {
				hour = timehourstar;
				hour = setHour(hour);
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":00" + " " + "起";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
				sessionStorage.setItem("NewDay", myDay);
			} else if(hour > timehourend) {
				if(timehourstarM > 0) {
					Mintue = "30";
				} else {
					Mintue = "00";
				}
				hour = timehourstar;
				hour = setHour(hour);
				var myTomorrow = new Date();
				myTomorrow.setDate(myDate.getDate() + 1);
				var NewMonth = myTomorrow.getMonth() + 1;
				if(NewMonth < 10) NewMonth = "0" + NewMonth.toString();
				var NewmyDay = myTomorrow.getDate();
				if(NewmyDay < 10) NewmyDay = "0" + NewmyDay.toString();
				var newYear = myTomorrow.getFullYear();
				document.getElementById("result").innerText = newYear + "-" + NewMonth + "-" + NewmyDay + " " + hour + ":" + Mintue + " " + "起";
				Timenumber = newYear.toString() + NewMonth.toString() + NewmyDay.toString() + hour.toString() + Mintue;
				sessionStorage.setItem("NewDay", NewmyDay);
			}
		}
		sessionStorage.setItem("Timenumber", parseInt(Timenumber));
		var time = $("#result").html();
		sessionStorage.setItem("Timeresult", time);
        console.log()
	}
	mui.init();
	var result = mui('#result')[0];
	var btns = mui('.Time-choose');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			//var picker = new mui.DtPicker(options);
			newTime();
			var startime=sessionStorage.getItem("Timenumber2");
			console.log(startime);
			startime=String(startime)
			var starY=Number(startime.substring(0,4));
			var starM=Number(startime.substring(4,6))-1;
			var starD=Number(startime.substring(6,8));
			var starH=Number(startime.substring(8,10));
			var endY=starY;
			var endM=starM;
			var endD=starD+7;
			var endH=timehourend;
			console.log(starY+"--"+starM+"--"+starD+"--"+starH)
			var picker = new mui.DtPicker({
				    type: "minutes",//设置日历初始视图模式  
				    beginDate: new Date(starY,starM,starD,starH),//设置开始日期  
				    endDate: new Date(endY,endM,endD,endH),//设置结束日期  
				    labels: ["年", "月", "日", "小时", "分"],//设置默认标签区域提示语  
				    customData: {
				        i: [{
				            value: '00',
				            text: '00'  
				        }, {  
				            value: '30',  
				            text: '30'  
				        }]  
				    }//时间/日期别名  
			})
			picker.show(function(rs) {
				var hh = rs.h.value;
				var MM = rs.m.value;
				var DD = rs.d.value;
				var II = rs.i.value;
				var Timenumberset = rs.y.text + rs.m.text + rs.d.text + rs.h.text + rs.i.text;
				TimenumberO = sessionStorage.getItem("Timenumber");
				if(hh == timehourstar) {
					if(timehourstarM > 0) {
						if(II < 30) {
							Opentip("所选时间不在服务范围</br>请重新选择");
							STime();
							return;
						}
					}
				} else if(hh == timehourend) {
					if(timehourendM == 0) {
						if(II > 0) {
							Opentip("所选时间不在服务范围</br>请重新选择");
							STime();
							return;
						}
					}
				}

				if(parseInt(Timenumberset) >= parseInt(TimenumberO)) {
					result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + rs.h.text + ":" + rs.i.text + " " + "起";
					sessionStorage.setItem("Timenumber", parseInt(Timenumberset));
					var time = $("#result").html();
					sessionStorage.setItem("Timeresult", time);
				} else {
					Opentip("所选时间不在服务范围</br>请重新选择");
					STime();
				}
			}, false);
		});
	});

}

function newTime() {
	var timeinterval = parseInt(sessionStorage.getItem("timeinterval"));
	var timehourstar = parseInt(sessionStorage.getItem("timehourstar"));
	var timehourend = parseInt(sessionStorage.getItem("timehourend"));
	var timehourstarM = parseInt(sessionStorage.getItem("timehourstarM"));
	var timehourendM = parseInt(sessionStorage.getItem("timehourendM"));
	var myDate = new Date();
	var myHour1 = myDate.getHours();
	var myHour2 = myHour1 + timeinterval;
	myDate.setHours(myHour2);
	var PYear = myDate.getFullYear();
	var PMonth = myDate.getMonth() + 1;
	if(PMonth < 10) PMonth = "0" + PMonth.toString();
	var myDay = myDate.getDate();
	if(myDay < 10) myDay = "0" + myDay.toString();
	var myHour = myDate.getHours();
	var myMintues = myDate.getMinutes();
	var Timenumber = "";
	var Mintue = "";
	//当前时间小于30分时，计算成30分
	if(myMintues < 30 && myMintues >= 0) {
		var hour = myDate.getHours();
		if(timehourstar <= hour && hour < timehourend) {
			hour = setHour(hour);
			if(timehourstarM > 0) {
				Mintue = "30";
			} else {
				Mintue = "00";
			}
			Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "30";
		} else if(hour < timehourstar) {
			hour = timehourstar;
			hour = setHour(hour);
			Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
		} else if(timehourend == hour) {
			if(timehourendM > 0) {
				Mintue = "30";
				hour = setHour(hour);
				Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "30";
			} else {
				hour = timehourstar;
				hour = setHour(hour);
				var myTomorrow = new Date();
				myTomorrow.setDate(myDate.getDate() + 1);
				var NewMonth = myTomorrow.getMonth() + 1;
				if(NewMonth < 10) NewMonth = "0" + NewMonth.toString();
				var NewmyDay = myTomorrow.getDate();
				if(NewmyDay < 10) NewmyDay = "0" + NewmyDay.toString();
				var newYear = myTomorrow.getFullYear();
				Timenumber2 = newYear.toString() + NewMonth.toString() + NewmyDay.toString() + hour.toString() + "00";
			}
		} else if(timehourend < hour) {
			if(timehourstarM > 0) {
				Mintue = "30";
			} else {
				Mintue = "00";
			}
			hour = timehourstar;
			hour = setHour(hour);
			var myTomorrow = new Date();
			myTomorrow.setDate(myDate.getDate() + 1);
			var NewMonth = myTomorrow.getMonth() + 1;
			if(NewMonth < 10) NewMonth = "0" + NewMonth.toString();
			var NewmyDay = myTomorrow.getDate();
			if(NewmyDay < 10) NewmyDay = "0" + NewmyDay.toString();
			var newYear = myTomorrow.getFullYear();
			Timenumber2 = newYear.toString() + NewMonth.toString() + NewmyDay.toString() + hour.toString() + Mintue;
		}

	} else {
		//超过30分加一小时，分变为00
		var hour = myDate.getHours();
		var hour = hour + 1;
		if(timehourstar < hour && hour <= timehourend) {
			hour = setHour(hour);
			if(timehourstarM > 0) {
				Mintue = "30";
			} else {
				Mintue = "00";
			}
			Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
			sessionStorage.setItem("NewDay", myDay);
		} else if(timehourstar == hour) {
			if(timehourstarM > 0) {
				Mintue = "30";
			} else {
				Mintue = "00";
			}
			hour = setHour(hour);
			Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + Mintue;
		} else if(hour < timehourstar) {
			hour = timehourstar;
			hour = setHour(hour);
			Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
		} else if(hour > timehourend) {
			if(timehourstarM > 0) {
				Mintue = "30";
			} else {
				Mintue = "00";
			}
			hour = timehourstar;
			hour = setHour(hour);
			var myTomorrow = new Date();
			myTomorrow.setDate(myDate.getDate() + 1);
			var NewMonth = myTomorrow.getMonth() + 1;
			if(NewMonth < 10) NewMonth = "0" + NewMonth.toString();
			var NewmyDay = myTomorrow.getDate();
			if(NewmyDay < 10) NewmyDay = "0" + NewmyDay.toString();
			var newYear = myTomorrow.getFullYear();
			Timenumber2 = newYear.toString() + NewMonth.toString() + NewmyDay.toString() + hour.toString() + Mintue;
		}
	}
	sessionStorage.setItem("Timenumber2", parseInt(Timenumber2));
}

function newviewopen(x) {
	setTimeout(function() {
		var viewBottom = window.innerHeight;
		var weizhi;
		//输出viewBottom
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
		//输出
		if(viewBottom >= elementBottom) {
			//input可视范围内
		} else {
			var vuleheight = elementBottom - viewBottom + 100;
			$(window).scrollTop(vuleheight);
			window.scrollTo(0, vuleheight);
		}
	}, 500);
}