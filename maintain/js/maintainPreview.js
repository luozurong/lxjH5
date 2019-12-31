var time_stamp;
var token = "";
var clientType = ""; //ios或者android
var householdSerial = "";
var commodityId = ""; //商品id
var sellerId = ""; //店铺id
var commodityName = "";
var currentPrice = 0.0;
var originalPrice = 0.0;
var areaId = "";
var areaName = "";
var areaAddress = "";

var $windowWidth = $(window).width();
$windowWidth = $(window).width();
if($windowWidth < 414) {
	$windowWidth = 414; //限定最大宽度为640
}
$("html").css("font-size", "64.6875px");

$(window).resize(function() {
	$windowWidth = $(window).width();
	if($windowWidth < 414) {
		$windowWidth = 414; //限定最大宽度为640
	}
	$("html").css("font-size", "64.6875px");
});

function keyUp() {
	var rm = $("#remark").val();
	sessionStorage.setItem("remark", rm);
}　　
document.onkeyup = keyUp;

//获取URL参数
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

commodityId = GetURLParameter("commodityId");

$(document).ready(function() {
	
	$('#remark').bind('focus', function() {
		//$('.buy').css('position', 'static');
	}).bind('blur', function() {
		/*$('.buy').css({
			'position': 'fixed',
			'bottom': '0'
		});*/
	});
	
	if(commodityId != "" && commodityId != undefined) {
		var token = "";
		var time_stamp = Date.parse(new Date());
		var data = "{\"body\":{\"commodityId\":\"" + commodityId + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/getCommodityInfo?str=" + data,
			async: false,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(odata) {
				if(odata.result == 0) {
					var obj = odata.list[0];
					$(".picture img").attr("src", obj.thumLogo);
					$(".title").html(obj.name);
					$(".introduce").html(obj.introduction);
					$("#price").html(obj.currentPrice);
					if(obj.introduction == null || obj.introduction == "" || obj.introduction == undefined) {
						$("#introduce").hide();
					} else {
						animateIntroduction();
					}
					commodityName = obj.name;
					currentPrice = obj.currentPrice;
					originalPrice = obj.originalPrice;
					sellerId = obj.sellerId;
					sessionStorage.setItem("sellerId", obj.sellerId); //设置店铺信息------
					//---改变数字框大小
					if(clientType == "ios") {
						$(".text").css("height", "0.5rem");
						$(".text").css("line-height", "0.5rem");
					}
					//展示价格
					var tPrice = doubleValue(currentPrice); //总价
					var c = 1; //数量
					var commodityInfo = "[{'" + commodityId + "':" + c + "}]";
					sessionStorage.setItem("commodityInfo", commodityInfo);
					sessionStorage.setItem("tp", tPrice);

					var couponCount = 0;
					var couponStatus = "0"; //有选优惠券
					var couponPrice = 0; //优惠金额
					
					var commitPrice = doubleValue(tPrice - couponPrice);
					$("#total_item_1").html(commitPrice);
					
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
		$("#userName").html("用户名");
		$("#telephone").html("联系电话");
		$("#userAddress").html("收货地址");
		$(".address-left").show();
		$("#address_none").hide();
	} else {
		$(".address-left").hide();
		$("#address_none").show();
	}
});
//
function animateIntroduction() {
		var ins_height = $(".introduce").height();
	var html_size = $('html').css("font-size");
	html_size = html_size.replace("px", "");
	ins_height1 = Number(ins_height);
	html_size = Number(html_size);
	var ii = ins_height;
	if(ii > 42) {
		$("#introduce_more").show();
		$(".introduce").css({
			"height": '40px',
			"margin-bottom": '0'
		});
		var ins_height2 = $(".introduce").height();
		$(".introduce").css("height", ins_height2 + 'px');
		$("#introduce_more").click(function() {
			var linenum = $(".introduce").height();
			if(linenum == 40) {
				//$(".introduce").css("height", ins_height+"px");
				$(".introduce").animate({
					height: ins_height + 'px'
				});
				$("#introduce_more img").attr("src", "img/ic_up@3x.png");
			} else {
				//$(".introduce").height(40);
				$(".introduce").animate({
					height: ins_height2 + 'px'
				});
				$("#introduce_more img").attr("src", "img/ic_down@3x.png");
			}
		});
	} else {
		$(".introduce").height(ins_height);
	}
}

//点击确定预约进行下单  end--------------------

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
	if(isCondition(serviceInterval)) {
		if(!isNaN(serviceInterval)) {
			serviceInterval = serviceInterval;
		} else {
			startServiceTime = 1;
		}
	} else {
		startServiceTime = 1;
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
//	mui.init();
//	var result = mui('#result')[0];
//	var btns = mui('.Time-choose');
//	btns.each(function(i, btn) {
//		btn.addEventListener('tap', function() {
//			var optionsJson = this.getAttribute('data-options') || '{}';
//			var options = JSON.parse(optionsJson);
//			var id = this.getAttribute('id');
//			var picker = new mui.DtPicker(options);
//			picker.show(function(rs) {
//				var hh = rs.h.value;
//				var MM = rs.m.value;
//				var DD = rs.d.value;
//				var II = rs.i.value;
//				var Timenumberset = rs.y.text + rs.m.text + rs.d.text + rs.h.text + rs.i.text;
//				var Timenumber = sessionStorage.getItem("Timenumber");
//				if(parseInt(Timenumberset) >= parseInt(Timenumber)) {
//					result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + rs.h.text + ":" + rs.i.text;
//					sessionStorage.setItem("Timenumber", parseInt(Timenumberset));
//					var time = $("#result").html();
//					sessionStorage.setItem("Timeresult", time);
//				} else {
//					appAlert("提示", "时间不符合");
//					STime();
//				}
//			}, false);
//		});
//	});
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