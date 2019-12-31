var time_stamp;
var token = "";
var clientType = ""; //ios或者android
var householdSerial = "";
var commodityId = ""; //商品id
var sellerId = ""; //店铺id
var areaCode = "";
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
	}else{
		$('.buy').hide();
	}
});

function keyUp() {
	var rm = $("#remark").val();
	sessionStorage.setItem("remark", rm);
}　　
document.onkeyup = keyUp;


function Opentip(tip) {
	layer.msg(tip, {
					time: 3000
		});
}

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//分割小数点
function splitNum(numberN) {
	var Num = numberN;
	var Nums = new Array();
	Nums = (Num + "").split(".");
	return Nums;
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

token = GetURLParameter("token");
if (isCondition(token)) {
	sessionStorage.setItem("token", token);
}else {
	location.href=host+"/mms/html5/common/loading/downloadWarn.htm";
}
clientType = GetURLParameter("clientType");
householdSerial = GetURLParameter("householdSerial");
areaCode = GetURLParameter("organizationSeq");
commodityId = GetURLParameter("commodityId");
//sessionStorage.setItem("token", token);
sessionStorage.setItem("clientType", clientType);
sessionStorage.setItem("householdSerial", householdSerial);
sessionStorage.setItem("areaCode", areaCode);
if(isCondition(commodityId)) {
	sessionStorage.setItem("commodityId", commodityId);
}
sessionStorage.setItem("host", host);
$(document).ready(function() {
	setTitle("预约维修");
	IOSTen();
	setRefreshOnResume();
	$("#Coupons").on("click", function() {
		var rm = $("#remark").val();
		sessionStorage.setItem("remark", rm);
		location.href = "../common/coupons/coupons.htm?clientType=" + clientType;
	});
	//跳转地址
	$("#address").click(function() {
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
	},1000);
	$('#remark').bind('focus', function() {	
		$('.buy').hide();
	}).bind('blur', function() {
		$('.buy').show();
	});
	//设置留言
	$("#remark").val(sessionStorage.getItem("remark"));
	var addressStatus = sessionStorage.getItem("addressStatus");
	if(addressStatus != "1") { //执行一次  查询当前住房并同步到收货表
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
	if(commodityId != "" && commodityId != undefined) {
		var token = sessionStorage.getItem("token");
		var time_stamp = Date.parse(new Date());
		
		var moduleName="repair";
		var areaSeq = sessionStorage.getItem("areaCode");
		var data = "{\"body\":{\"commodityId\":\"" + commodityId + "\",\"moduleName\":\"" + moduleName + "\",\"areaSeq\":\"" + areaSeq + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
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
					var currentPriceP = doubleValue(obj.currentPrice);
					var integerT = splitNum(currentPriceP)[0];
					var scaleT = splitNum(currentPriceP)[1];
					var cp = "<span class='font_sizebig'>" + currentPriceP + "</span>";
					$("#price").html(cp);
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
					var areaId = sessionStorage.getItem("areaId");
					var couponCount = getCouponCount(token, tPrice, "[{'" + commodityId + "':" + c + "}]", 1, sellerId, areaId);
					var couponStatus = sessionStorage.getItem("couponStatus"); //有选优惠券
					var couponPrice = sessionStorage.getItem("couponPrice"); //优惠金额
					var commitPrice = doubleValue(tPrice - couponPrice);

					var integerT = splitNum(commitPrice)[0];
					var scaleT = splitNum(commitPrice)[1];
					var cpp = "<span class='font_sizebig'>" + integerT + ".<span class='font_size3'>"+scaleT+"</span></span>";

					$("#total_item_1").html(cpp);
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
				sessionStorage.setItem("receiverInfoId", receiverInfoId);
				sessionStorage.setItem("currentHouseholdId", odata.currentHouseholdId);
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
});
//
//ios10.0系统以上表情输入解决方案
function IOSTen(){
	var IOSTen=	clientType;
	if(IOSTen!="android"){
		$("#liuyanten").css("padding-bottom","0");
		$("#remark").css({'padding-top':'1px','padding-bottom':'0.2rem','overflow':'visible'});
		
	}
				
}
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
	var remark = $("#remark").val(); //留言
	sessionStorage.setItem("remark",remark);
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
	var sellerId = sessionStorage.getItem("sellerId");
	var commodityDetails = commodityName;
	var areaOrgaSeq = sessionStorage.getItem("areaCode");
	var deliveryTime = $("#result").html() + ":00";
	var count = 1;
	var time_stamp = Date.parse(new Date());
	var type = "3"; //订单类型  服务型订单
	var totalPrice = 0.00; //传后台数据，暂无意义
	var consumePrice = doubleValue(count * currentPrice); //消费金额
	var couponPrice = doubleValue(sessionStorage.getItem("couponPrice")); //优惠金额
	var couponStr = sessionStorage.getItem("couponStr"); //优惠券id
	var commitPrice = doubleValue(consumePrice - couponPrice); //支付金额
	var areaId = sessionStorage.getItem("areaId");
	var areaName = sessionStorage.getItem("areaName");
	if(!isCondition(couponPrice)) {
		couponPrice = 0.0;
	}
	if(!isCondition(couponStr)) {
		couponStr = "";
	}
	var clientType = sessionStorage.getItem("clientType");
	$("#open1").removeAttr("onclick", "doSubmit()");
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
	opentimetable(serviceInterval, startHour, startMinute,endHour,endMinute);
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
	var TimenumberO="";
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
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":30";
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
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":"+Mintue;
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + Mintue;
				sessionStorage.setItem("NewDay", myDay);
			} else if(timehourend == hour) {
				if(timehourendM > 0) {
					Mintue = "30";
					hour = setHour(hour);
					document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":30";
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
					document.getElementById("result").innerText = newYear + "-" + NewMonth + "-" + NewmyDay + " " + hour + ":00";
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
				document.getElementById("result").innerText = newYear + "-" + NewMonth + "-" + NewmyDay + " " + hour + ":" + Mintue;
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
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":00";
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + "00";
				sessionStorage.setItem("NewDay", myDay);
			} else if(timehourstar == hour) {
				if(timehourstarM > 0) {
					Mintue = "30";
				} else {
					Mintue = "00";
				}
				hour = setHour(hour);
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":" + Mintue;
				Timenumber = PYear.toString() + PMonth.toString() + myDay.toString() + hour.toString() + Mintue;
				sessionStorage.setItem("NewDay", myDay);
			} else if(hour < timehourstar) {

				hour = timehourstar;
				hour = setHour(hour);
				document.getElementById("result").innerText = PYear + "-" + PMonth + "-" + myDay + " " + hour + ":00";
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
				document.getElementById("result").innerText = newYear + "-" + NewMonth + "-" + NewmyDay + " " + hour + ":" + Mintue;
				Timenumber = newYear.toString() + NewMonth.toString() + NewmyDay.toString() + hour.toString() + Mintue;
				sessionStorage.setItem("NewDay", NewmyDay);
			}
		}
		sessionStorage.setItem("Timenumber", parseInt(Timenumber));
		var time = $("#result").html();
		sessionStorage.setItem("Timeresult", time);

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
				TimenumberO=sessionStorage.getItem("Timenumber");
				if(hh == timehourstar) {
					if(timehourstarM > 0) {
						if(II < 30) {
							Opentip("所选时间不在服务范围</br>请重新选择");
							STime();
							return ;
						}
					}
				} else if(hh == timehourend) {
					 if(timehourendM==0){
						if(II >0) {
							Opentip("所选时间不在服务范围</br>请重新选择");
							STime();
							return ;
						}
					}
				} 
			
				if(parseInt(Timenumberset) >= parseInt(TimenumberO)) {
					result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + rs.h.text + ":" + rs.i.text;
					sessionStorage.setItem("Timenumber", parseInt(Timenumberset));
					var time = $("#result").html();
					sessionStorage.setItem("Timeresult", time);
				}else{
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
			var vuleheight = elementBottom - viewBottom + 80;
			$(window).scrollTop(vuleheight);
			window.scrollTo(0, vuleheight);
		}
	}, 500);
}