function doubleValue(price) {
	return(Math.round(price * 10000) / 10000).toFixed(2);
}

function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

var time_stamp;
var host = "";
var onloadStatus = 0;
var url = window.location.search;
host = "http://" + window.location.host; //主机名,包含端口
sessionStorage.setItem("host", host);
var householdSerial = "";

var receiverInfoId = "";
var commodityId=GetURLParameter("commodityId");

$("#water_commodity_info").css("display", "");
init();

//----------------$(document)方法  start-------------------
function init() {
	
	/*var commodityCount = sessionStorage.getItem("commodityCount");
	if(isCondition(commodityCount)) {
		$("#qty_item_1").val(commodityCount);
	}*/
	
//	$('#qty_item_1').bind('focus', function() {
//		$('.buy').css('position', 'static');
//	}).bind('blur', function() {
//		$('.buy').css({
//			'position': 'fixed',
//			'bottom': '0'
//		});
//	});
//	$('#remark').bind('focus', function() {
//		$('.buy').css('position', 'static');
//	}).bind('blur', function() {
//		$('.buy').css({
//			'position': 'fixed',
//			'bottom': '0'
//		});
//	});

	var overlayStatus = sessionStorage.getItem("overlayStatus");
	if(overlayStatus == 0 && status == "1") { //没有出现过覆盖层
		$("#overlay").show();
		$("#other").show();
		$("#other2").show();
		sessionStorage.removeItem("overlayStatus");
	}
	$("#overlay,#other,#other2").click(function() {
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/setWaterOverlayStatus?str=" + data,
			async: false,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(odata) {
				if(odata.result == 0) {
					$("#overlay").css("display", "none");
					$("#other").css("display", "none");
					$("#other2").css("display", "none");
				}
			}
		})
	});

	//根据商品id获取商品详情接口
	if(isCondition(commodityId)) {
		var token = "";
		var time_stamp = Date.parse(new Date());
		var waterdata = "{\"body\":{\"commodityId\":\"" + commodityId + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/getCommodityInfo?str=" + waterdata,
			async: false,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(odata) {
				if(odata.result == 0) {
					var obj = odata.list[0];
					$(".img img").attr("src", obj.thumLogo);
					$(".introduce").html(obj.name);
					$("#price_item_1").html(doubleValue(obj.currentPrice));
					sessionStorage.setItem("commodityName", obj.name);
					sessionStorage.setItem("currentPrice", obj.currentPrice);
					sessionStorage.setItem("originalPrice", obj.originalPrice);
					sessionStorage.setItem("sellerId", obj.sellerId); //设置店铺信息------

					//展示价格
					var currentPrice = obj.currentPrice;
					var c = $("#qty_item_1").val();
					var tPrice = doubleValue(c * currentPrice); //总价
					var data = "{\"body\":{\"totalPrice\":" + tPrice + "," +
						"\"commodityInfo\":[{\"" + commodityId + "\":" + c + "}]},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":" + time_stamp + "}}";
					var commodityInfo = "[{'" + commodityId + "':" + c + "}]";
					sessionStorage.setItem("commodityInfo", commodityInfo);
					sessionStorage.setItem("tp", tPrice); //选择优惠券时使用到

					var sellerId = sessionStorage.getItem("sellerId");
					var areaId = sessionStorage.getItem("areaId");
					var couponCount = 0;
					var couponStatus = "0";
					var commitPrice = doubleValue(tPrice - 0);
					$("#total_item_1").html(commitPrice);
					if(couponStatus == "1") {
						$("#coupon").html("<span style='font-size: 0.3rem;'>- ¥</span> " + couponPrice);
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
	$("#userName").html("用户名");
	$("#telephone").html("联系电话");
	$("#userAddress").html("用户地址");
	$(".address-left").show();
	$("#address_none").hide();
	
	//展示合计价格
	function getTotal(c) { //c  商品数量
		setCountCss();
		var token = sessionStorage.getItem("token");
		var time_stamp = Date.parse(new Date());
		var currentPrice = sessionStorage.getItem("currentPrice");
		var commodityId = sessionStorage.getItem("commodityId");
		var tPrice = doubleValue(c * (currentPrice * 100) / 100); //总价
		sessionStorage.setItem("totalPrice", tPrice);
		var data = "{\"body\":{\"totalPrice\":" + tPrice + "," +
			"\"commodityInfo\":[{\"" + commodityId + "\":" + c + "}]},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":" + time_stamp + "}}";
		$("#total_item_1").html(tPrice);
		sessionStorage.removeItem("couponStr");
		sessionStorage.removeItem("couponPrice");
		sessionStorage.removeItem("couponStatus");
		var commodityInfo = "[{'" + commodityId + "':" + c + "}]";
		sessionStorage.setItem("commodityInfo", commodityInfo);
		sessionStorage.setItem("tp", tPrice);
		var sellerId = sessionStorage.getItem("sellerId");
		var areaId = sessionStorage.getItem("areaId");
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
//	$(".add").click(function() {
//		var t = $(this).parent().find('input[type=number]');
//		if(parseInt(t.val()) >= 99) {
//			t.val(99);
//			$(".add").addClass("disable");
//			$(".add").attr("disabled", "true");
//		} else {
//			t.val(parseInt(t.val()) + 1)
//			$(".reduce").removeClass("disable");
//			document.getElementById("reduce_btn").disabled = false;
//		}
//
//		getTotal(t.val());
//
//	})
//	$(".reduce").click(function() {
//		var t = $(this).parent().find('input[type=number]');
//		if(parseInt(t.val()) <= 1) {
//			t.val(1);
//			$(".reduce").addClass("disable");
//			$(".reduce").attr("disabled", "true");
//		} else {
//			t.val(parseInt(t.val()) - 1);
//			$(".add").removeClass("disable");
//			document.getElementById("add").disabled = false;
//		}
//		getTotal(t.val());
//	})
//	$("#qty_item_1").change(function() {
//		var value = parseInt($(this).val());
//		$(this).val(value);
//		if(isNaN(value)) {
//			$(this).val(1);
//		}
//		if(value > 99) {
//			$(this).val(99);
//			appAlert("提示", "数量超出范围");
//		}
//		if(value <= 0) {
//			$(this).val(1);
//		}
//		getTotal($(this).val());
//	})
} //----------------$(document)方法  end-------------------    


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
	if(isCondition(startServiceTime)) {
		var arr = startServiceTime.split(":");
		var startHour = parseInt(arr[0]);
		if(!isNaN(startHour)) {
			startServiceTime = startHour;
		} else {
			startServiceTime = 9;
		}
	} else {
		startServiceTime = 9;
	}
	if(isCondition(endServiceTime)) {
		var arr1 = endServiceTime.split(":");
		var endHour = parseInt(arr1[0]);
		if(!isNaN(endHour)) {
			endServiceTime = endHour;
		} else {
			endServiceTime = 19;
		}
	} else {
		endServiceTime = 19;
	}
	if(startServiceTime > endServiceTime) {
		if(endServiceTime == 0) {
			startServiceTime = startServiceTime;
			endServiceTime = 23;
		} else {
			startServiceTime = 9;
			endServiceTime = 19;
		}
	}
	if(serviceInterval == 0) {
		serviceInterval = 0;
	} else if(isCondition(serviceInterval)) {
		serviceInterval = serviceInterval;
	} else {
		serviceInterval = 1;
	}
	opentimetable(serviceInterval, startServiceTime, endServiceTime);
}

function setHour(hour) {
	if(parseInt(hour) < 10) {
		return "0" + hour;
	}
	return hour;
}

function opentimetable(a, b, c) {
	//	商家时间
	var a = a;
	var b = b;
	var c = c;
	sessionStorage.setItem("timeinterval", a);
	sessionStorage.setItem("timehourstar", b);
	sessionStorage.setItem("timehourend", c);
	var timeinterval = parseInt(a);
	var timehourstar = parseInt(b);
	var timehourend = parseInt(c);
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
	var Timenumber = "";
	var Timeresult = sessionStorage.getItem("Timeresult");
	if(!isCondition(Timeresult)) {
		STime();
	} else {
		document.getElementById("result").innerText = Timeresult;
	}

	function STime() {
		// 	//当前时间小于30分时，计算成30分
		if(myMintues < 30 && myMintues >= 0) {

			var hour = myDate.getHours();
			if(timehourstar <= hour && hour < timehourend) {
				hour = setHour(hour);
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":30";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "30";
			} else if(hour < timehourstar) {
				hour = timehourstar;
				hour = setHour(hour);
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":00";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
			} else if(timehourend <= hour) {
				hour = timehourstar;
				hour = setHour(hour);
				var myTomorrow = new Date();
				myTomorrow.setDate(myDate.getDate() + 1);
				var NewMonth = myTomorrow.getMonth() + 1;
				if(NewMonth < 10) NewMonth = "0" + NewMonth.toString();
				var NewmyDay = myTomorrow.getDate();
				if(NewmyDay < 10) NewmyDay = "0" + NewmyDay.toString();
				var newYear = myTomorrow.getFullYear();
				document.getElementById("result").innerText = newYear + "-" + NewMonth + "-" + NewmyDay + " " + hour + ":00";
				Timenumber = newYear.toString() + NewMonth.toString() + NewmyDay.toString() + hour.toString() + "00";
			}
		} else {
			// document.getElementById("result").innerText = PYear+ "-"+PMonth+ "-"+myDay +" "+hour+ ":00";
			//超过30分加一小时，分变为00
			var hour = myDate.getHours();
			var hour = hour + 1;
			if(timehourstar <= hour && hour <= timehourend) {
				hour = setHour(hour);
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":00";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
			} else if(hour < timehourstar) {
				hour = timehourstar;
				hour = setHour(hour);
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":00";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
			} else if(hour > timehourend) {
				hour = timehourstar;
				hour = setHour(hour);
				var myTomorrow = new Date();
				myTomorrow.setDate(myDate.getDate() + 1);
				var NewMonth = myTomorrow.getMonth() + 1;
				if(NewMonth < 10) NewMonth = "0" + NewMonth.toString();
				var NewmyDay = myTomorrow.getDate();
				if(NewmyDay < 10) NewmyDay = "0" + NewmyDay.toString();
				var newYear = myTomorrow.getFullYear();
				document.getElementById("result").innerText = newYear + "-" + NewMonth + "-" + NewmyDay + " " + hour + ":00";
				Timenumber = newYear.toString() + NewMonth.toString() + NewmyDay.toString() + hour.toString() + "00";
			}
		}
		sessionStorage.setItem("Timenumber", parseInt(Timenumber));
		var time = $("#result").html();
		sessionStorage.setItem("Timeresult", time);
	}

}
function newTime() {
	var timeinterval = parseInt(sessionStorage.getItem("timeinterval"));
	var timehourstar = parseInt(sessionStorage.getItem("timehourstar"));
	var timehourend = parseInt(sessionStorage.getItem("timehourend"));
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
	var Timenumber2 = "";
	if(myMintues < 30 && myMintues >= 0) {
		var hour = myDate.getHours();
		if(timehourstar <= hour && hour < timehourend) {
			hour = setHour(hour);
			Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "30";
		} else if(hour < timehourstar) {
			hour = timehourstar;
			hour = setHour(hour);
			Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
		} else if(timehourend <= hour) {
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
	} else {
		var hour = myDate.getHours();
		var hour = hour + 1;
		if(timehourstar <= hour && hour <= timehourend) {
			hour = setHour(hour);
			Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
		} else if(hour < timehourstar) {
			hour = timehourstar;
			hour = setHour(hour);
			Timenumber2 = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
		} else if(hour > timehourend) {
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