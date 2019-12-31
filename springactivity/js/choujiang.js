var time = 1000;
var lenght = ""; //中奖转动条数

var mainwidth = ""; //抽奖部分宽度

var Clheight = $(window).height(); //屏幕的高度

//抽奖开始结束参数
var numberZnum1 = 0;
var numberZnum2 = 0;
var numberZnum3 = 0;
//ajax请求需要参数
var token = GetURLParameter("token");
var householdSerial = GetURLParameter("householdSerial");
var organizationSeq = GetURLParameter("organizationSeq");
var clientType = GetURLParameter("clientType");
var areaCode = GetURLParameter("areaCode");
//小区id
var time_stamp = "";

sessionStorage.setItem("token", token);
sessionStorage.setItem("clientType", clientType);
sessionStorage.setItem("householdSerial", householdSerial);
sessionStorage.setItem("areaCode", organizationSeq);


$(function() {
	setTimeout(function(){
		mainwidth = $(".main2").width(); //抽奖部分宽度
		$("#head_img ").height(Math.floor(mainwidth / 320 * 136.038));
		$(".main2").height(Math.floor(mainwidth / 320 * 293));
		$(".bgwindow_color").height(Clheight);
		$("#fufen_number").css("line-height", $("#fufen_number").height() + "px");

		
		getWininformation();
		getfufenActivityId();
		getPersonNewfufen();
		getPersonPrize();
		isBlackRecord();
	},300);
		     	
})


function imgLoading() {

	var imgNum = "0";
	$(".img_none_first img").each(function() {
		if($(this).height() != 0) {
			imgNum++;
			console.log(imgNum);
		}
	});
	if(imgNum == 10) {
		onlaodDate();
	} else {
		setTimeout(imgLoading, 500);
	}

}

//$(document).ready(function() {
//document.getElementById("loadding").style.display="none";

//setTimeout(onlaodDate,500);       
//});

function onlaodDate() {
	//var imgNum=numle;
	//if(imgNum==0){
	//document.getElementById("loadding").style.display="none";

	//	}
}

//中奖轮播
function textZdong() {
	lenght = Number($(".text_list .text").length - 1);
	var text_list_time = Number(lenght * 1500 + 1500);
	$(".text_list_scroll").css("animation-name", "text_scroll" + lenght);
	$(".text_list_scroll").css("-webkit-animation-name", "text_scroll" + lenght);
	$(".text_list_scroll").css("animation-duration", text_list_time + "ms");
	$(".text_list_scroll").css("-webkit-animation-duration", text_list_time + "ms");
}
//活动规则展开
function ruleOpen() {
	if(laohujistarLogo2) {
		$("body").css("overflow", "hidden");
		$("#bt_rule").addClass("bt_rule_active");
		$("#bgwindow").fadeIn(1000);
		$("#rule_big_box").fadeIn(1000);
	}

}
//活动规则关闭
function ruleClose() {
	$("body").css("overflow", "auto");
	$("#bt_rule").removeClass("bt_rule_active");
	$("#bgwindow").fadeOut(1000);
	$("#rule_big_box").fadeOut(1000);
}
//中奖奖品弹窗打开
function prizeWindowOpen() {
	var exchangeAwardIdpp = sessionStorage.getItem("exchangeAwardId");
	if(isCondition(exchangeAwardIdpp)) {
		$("body").css("overflow", "hidden");
		$("#prize_top_box").css("background-image", "url(images/prize_top_01.png)");
		$("#prize_quan_box").show();
		$("#bt_share_box").show();
		$("#bgwindow").fadeIn(500);
		$("#prize_window_open").fadeIn(500);
	}
	
}
//关闭页面或返回上一页
function backOrclose() {
	goBack();
}
//中奖奖品弹窗关闭
function prizeWindowClose() {
	laohujistarLogo2 = true;
	$("body").css("overflow", "auto");
	$("#bgwindow").fadeOut(1000);
	$("#prize_window_open").fadeOut(1000);
	sessionStorage.removeItem("exchangeAwardId");
	getPersonPrize();
}
//点击分享后弹窗改变
function fenxiangOpen() {
	addFufenfx();

}
//蓝黄闪光灯效果开
function lightOpen() {
	$("#container_box121").css("animation-play-state", "running");
	$("#container_box121").css("-webkit-animation-play-state", "running");

}
//蓝黄闪光灯效果关
function lightClose() {
	if(numberZnum1 == 0 && numberZnum2 == 0 && numberZnum3 == 0) {
		//console.log("结束");
		$("#container_box121").css("animation-play-state", "paused");
		$("#container_box121").css("-webkit-animation-play-state", "paused");
		laohujistarLogo = true;
		$("#bt_click").removeClass("bt_click_active");
		setTimeout(prizeWindowOpen, 200);
	}
}
//老虎机开始
function choujiangStar() {
	var huodongid = sessionStorage.getItem("fufenActivityId");
	var isBlackRcode = sessionStorage.getItem("code");
	var lotteryDrawFufen = Number(sessionStorage.getItem("lotteryDrawFufen"));
	var prizedatecode = sessionStorage.getItem("prizedatecode");
	if(isCondition(huodongid) && isBlackRcode == 0 && Number(sessionStorage.getItem("totalFufen")) >= lotteryDrawFufen && prizedatecode != 0) {
		if(laohujistarLogo2) {
			$("#bt_click").addClass("bt_click_active");
			$(".num-con3,.num-con2,.num-con1").removeClass("stop");
			laohujistarLogo = true;
			laohujistarLogo2 = false;
			lightOpen();
			//reset();
			firstZdong();
			secondZdong();
			thirdZdong();
			getActivityPrizeInfo();
		}
	} else if(isBlackRcode == 1) {
		layer.msg("账号异常，请联系客服:400-8822-252", {
			time: 3000
		});
		return false;
	} else if(isBlackRcode == 2) {
		layer.msg("该小区暂时不参加该活动", {
			time: 3000
		});
		return false;
	} else if(isBlackRcode == 3 || prizedatecode == 0) {
		layer.msg("不好意思已经没有奖品了，下次再抽吧", {
			time: 3000
		});
		return false;
	} else if(Number(sessionStorage.getItem("totalFufen")) < lotteryDrawFufen&&laohujistarLogo2) {
		layer.msg("当前福分不足<br/>使用APP开门、登录APP商城、分享<br/>礼品信息、在商城购物可获更多福分哟", {
			time: 5000
		});
	}

}
var lenghtP = "2";
var zhuangsudu = "11";
var laohujistarLogo = true;
var laohujistarLogo2 = true;
var stopnum = "";
//随机取值转动停止位置
function letGo() {
	var weizhi = "";
	var zid = sessionStorage.getItem("awardId");
	if(isCondition(zid)) {
		$(".num-con1 .num-img").each(function(i, e) {
			if($(e).attr("name") == zid) {
				weizhi = i;
			}
		});
	}
	stopnum = weizhi;
	//console.log("停止的位置" + stopnum);
	if(isCondition(stopnum)) {
		stopnum = stopnum;
	} else {
		stopnum = 9;
	}
	stopLogo();
}
//后端返回数据后转圈几秒后停下来
function stopLogo() {
	setTimeout(function() {
		laohujistarLogo = false;
		firstZdong();
		secondZdong();
		thirdZdong();
	}, 1500);
}
//老虎机三个转动控制核心
function firstZdong() {
	zhuangsudu = Number(lenghtP);
	var firstv = Math.floor(500 / 11 * zhuangsudu); //随机速度
	if(laohujistarLogo) {
		numberZnum1 += 1;
		$(".num-con1").addClass("num-con11");
		$(".num-con1").css("webkitAnimationName", "stop" + zhuangsudu);
		$(".num-con1").css("webkitAnimationDuration", firstv + "ms");
	} else { //停止时位置:paused;		
		$(".num-con1").removeClass("num-con11");
		$(".num-con1").addClass("stop");
		var stoptime1 = Number(50 * stopnum) + 1000;
		$(".num-con1").css("webkitAnimationDuration", stoptime1 + "ms");
		$(".num-con1").css("webkitAnimationName", "stop" + Number(stopnum));
		setTimeout(function() {
			numberZnum1 = 0;
			lightClose();
		}, stoptime1);
	}
}

function secondZdong() {
	zhuangsudu = Number(lenghtP);
	var secondv = Math.floor(1200 / 11 * zhuangsudu);
	if(laohujistarLogo) {
		numberZnum2 = numberZnum2 + 1;
		$(".num-con2").addClass("num-con22");
		$(".num-con2").css("webkitAnimationName", "stop" + zhuangsudu);
		$(".num-con2").css("webkitAnimationDuration", secondv + "ms");
	} else {
		$(".num-con2").removeClass("num-con22");
		var stoptime2 = Number(70 * stopnum) + 1800;
		$(".num-con2").addClass("stop");
		$(".num-con2").css("webkitAnimationDuration", stoptime2 + "ms");
		$(".num-con2").css("webkitAnimationName", "stop" + Number(stopnum));
		setTimeout(function() {
			numberZnum2 = 0;
			lightClose();
		}, stoptime2);
	}

}

function thirdZdong() {
	zhuangsudu = Number(lenghtP);
	var thirdv = Math.floor(1400 / 11 * zhuangsudu);
	if(laohujistarLogo) {
		numberZnum3 = numberZnum3 + 1;
		$(".num-con3").addClass("num-con33");
		$(".num-con3").css("webkitAnimationName", "stop" + zhuangsudu);
		$(".num-con3").css("webkitAnimationDuration", thirdv + "ms");
	} else {
		$(".num-con3").removeClass("num-con33");
		var stoptime3 = Number(90 * stopnum) + 2200;
		$(".num-con3").addClass("stop");
		$(".num-con3").css("webkitAnimationDuration", stoptime3 + "ms");
		$(".num-con3").css("webkitAnimationName", "stop" + Number(stopnum));
		setTimeout(function() {
			numberZnum3 = 0;
			lightClose();
		}, stoptime3);
	}

}

//老虎机重置
//function reset() {
//	//console.log("重置重新开始");
//	
//}
//获取中奖播放信息
function getWininformation() {
	var limitNum = "10"; //获取多少条中奖信息 （默认传10
	var type = ""; //1、开门；2、抽奖 这里空即可
	var time_stamp = getTimestamp();

	var str = "{\"body\":{\"limitNum\":\"" + limitNum + "\",\"type\":\"" + type + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getAllUserPrizeList?str=" + str,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data1) {
			//	console.log(JSON.stringify(data1));
			if(data1.result == 0 && isCondition(data1.list)) {
				var limitlist = data1.list;
				var text_listHtml = "";
				if(limitlist.length > 0) {
					$(".text_box_b .text_list").empty();
					for(var i = 0; i < limitlist.length; i++) {
						var tel = String(limitlist[i].phone);
						tel = tel.substring(0, 3) + "*****" + tel.substr(tel.length - 3);
						var areaName2 = String(limitlist[i].areaName);
						if(areaName2.length > 6) {
							areaName2 = areaName2.substring(0, 5) + "..."
						}
						var awardName1 = String(limitlist[i].awardName);
						if(awardName1.length > 17) {
							awardName1 = awardName1.substring(0, 16) + "..."
						}
						var text_listHtml = text_listHtml + "<div class='text'>&nbsp;恭喜&nbsp;&nbsp;" + areaName2 + "&nbsp;&nbsp;" + tel + "<br />抽中<strong>" + awardName1 + "</strong></div>";
					}
					var areaName0 = String(limitlist[0].areaName);
					if(areaName0.length > 6) {
						areaName0 = areaName0.substring(0, 5) + "..."
					}
					var awardName0 = String(limitlist[0].awardName);
					if(awardName0.length > 17) {
						awardName0 = awardName0.substring(0, 16) + "..."
					}
					var text_listHtml = text_listHtml + "<div class='text'>&nbsp;恭喜&nbsp;&nbsp;" + areaName0 + "&nbsp;&nbsp;" + String(limitlist[0].phone).substring(0, 3) + "*****" + String(limitlist[0].phone).substr(String(limitlist[0].phone).length - 3) + "<br />抽中<strong>" + awardName0 + "</strong></div>";
					$(".text_box_b .text_list").append(text_listHtml);
					//	$(".text").height($(".text_box2").height());
					$(".text_box2").height($(".text_box2").height());

				}
				textZdong(); //中奖轮播
			} else if(data1.result != 0) {
				//				layer.msg(data1.reason, {
				//					time: 3000
				//				});
			}
		}
	});

	//setTimeout(getWininformation, 5000);
}
//获取个人已中奖品信息
function getPersonPrize() {
	var type = "2"; //1开门2、抽奖
	var time_stamp = getTimestamp();

	var data = "{\"body\":{\"type\":\"" + type + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getLotteryRecordList?str=" + data,
		async: true,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//	jsonpCallback: "success_jsonpCallback",
		success: function(data2) {
			//console.log(JSON.stringify(data2));
			if(data2.result == 0 && isCondition(data2.lotteryList)) {
				var lotteryList = data2.lotteryList; //纪录组
				var Htmllottery1 = "";
				var Htmllottery2 = "";
				var Htmllottery3 = "";
				$("#content_img").empty();
				for(var i = 0; i < lotteryList.length; i++) {
					var lottery = lotteryList[i];
					if(lottery.status == 0) {
						//未兑换
						var awardName = lottery.awardName;
						var awardCode = lottery.awardCode;
						var attribute = lottery.attribute; //判断是物业还是电话领奖
						var prizedrawTime0 = String(lottery.prizedrawTime).split(" ")[0];
						var prizedrawTime = prizedrawTime0.split("-")[0] + "." + prizedrawTime0.split("-")[1] + "." + prizedrawTime0.split("-")[2]
						var effectiveEndTime0 = String(lottery.effectiveEndTime).split(" ")[0];
						var effectiveEndTime = effectiveEndTime0.split("-")[0] + "." + effectiveEndTime0.split("-")[1] + "." + effectiveEndTime0.split("-")[2]

						if(attribute == 1) {
							Htmllottery1 = Htmllottery1 + "<div class='img_yes'><img src='images/duihuan1_03_03_03.png' /><div class='prize_title_box'><div class='prize_title'>" + awardName + "</div></div><div class='prize_number_box'><div class='prize_number'>兑奖码:" + awardCode + "</div></div><div class='prize_way_box'><div class='prize_way'>请在物业工作时间内，到管理处兑换奖品</div></div><div class='prize_time_box'><div class='prize_time'>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</div></div></div>";
						} else {
							Htmllottery1 = Htmllottery1 + "<div class='img_yes'><img src='images/duihuan1_03_03_03.png' /><div class='prize_title_box'><div class='prize_title'>" + awardName + "</div></div><div class='prize_number_box'><div class='prize_number'>兑奖码:" + awardCode + "</div></div><div class='prize_way_box'><div class='prize_way'>请致电400-8822-252进行兑奖</div></div><div class='prize_time_box'><div class='prize_time'>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</div></div></div>";
						}
					} else if(lottery.status == 1) {
						//已兑换
						var awardName = lottery.awardName;
						var awardCode = lottery.awardCode;
						var attribute = lottery.attribute; //判断是物业还是电话领奖
						var prizedrawTime0 = String(lottery.prizedrawTime).split(" ")[0];
						var prizedrawTime = prizedrawTime0.split("-")[0] + "." + prizedrawTime0.split("-")[1] + "." + prizedrawTime0.split("-")[2]
						var effectiveEndTime0 = String(lottery.effectiveEndTime).split(" ")[0];
						var effectiveEndTime = effectiveEndTime0.split("-")[0] + "." + effectiveEndTime0.split("-")[1] + "." + effectiveEndTime0.split("-")[2]
						if(attribute == 1) {
							Htmllottery2 = Htmllottery2 + "<div class='img_no'><img src='images/duihuan2_05.png' /><div class='prize_title_box'><div class='prize_title'>" + awardName + "</div></div><div class='prize_number_box'><div class='prize_number'>兑奖码:" + awardCode + "</div></div><div class='prize_way_box'><div class='prize_way'>请在物业工作时间内，到管理处兑换奖品</div></div><div class='prize_time_box'><div class='prize_time'>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</div></div></div>";
						} else {
							Htmllottery2 = Htmllottery2 + "<div class='img_no'><img src='images/duihuan2_05.png' /><div class='prize_title_box'><div class='prize_title'>" + awardName + "</div></div><div class='prize_number_box'><div class='prize_number'>兑奖码:" + awardCode + "</div></div><div class='prize_way_box'><div class='prize_way'>请致电400-8822-252进行兑奖</div></div><div class='prize_time_box'><div class='prize_time'>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</div></div></div>";
						}
					} else if(lottery.status == 2) {
						//已过期
						var awardName = lottery.awardName;
						var awardCode = lottery.awardCode;
						var attribute = lottery.attribute; //判断是物业还是电话领奖
						var prizedrawTime0 = String(lottery.prizedrawTime).split(" ")[0];
						var prizedrawTime = prizedrawTime0.split("-")[0] + "." + prizedrawTime0.split("-")[1] + "." + prizedrawTime0.split("-")[2]
						var effectiveEndTime0 = String(lottery.effectiveEndTime).split(" ")[0];
						var effectiveEndTime = effectiveEndTime0.split("-")[0] + "." + effectiveEndTime0.split("-")[1] + "." + effectiveEndTime0.split("-")[2]
						if(attribute == 1) {
							Htmllottery3 = Htmllottery3 + "<div class='img_no'><img src='images/guoqi2_05.png' /><div class='prize_title_box'><div class='prize_title'>" + awardName + "</div></div><div class='prize_number_box'><div class='prize_number'>兑奖码:" + awardCode + "</div></div><div class='prize_way_box'><div class='prize_way'>请在物业工作时间内，到管理处兑换奖品</div></div><div class='prize_time_box'><div class='prize_time'>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</div></div></div>";
						} else {
							Htmllottery3 = Htmllottery3 + "<div class='img_no'><img src='images/guoqi2_05.png' /><div class='prize_title_box'><div class='prize_title'>" + awardName + "</div></div><div class='prize_number_box'><div class='prize_number'>兑奖码:" + awardCode + "</div></div><div class='prize_way_box'><div class='prize_way'>请致电400-8822-252进行兑奖</div></div><div class='prize_time_box'><div class='prize_time'>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</div></div></div>";
						}
					}
				}
				$("#content_img").append(Htmllottery1 + Htmllottery2 + Htmllottery3);
				$("#prize_have_none").text(" ");
				$("#content_img").show();
			} else if(data2.result == 0 && !isCondition(data.lotteryList)) {
				$("#prize_have_none").text("你暂无中奖记录哦");
			} else if(data2.result != 0) {
				//				layer.msg(data2.reason, {
				//					time: 3000
				//				});
				$("#prize_have_none").text("你暂无中奖记录哦");
			}
		}
	});
}
//获取可以抽奖的奖品
function getPrizeDate() {
	var fufenActivityId = sessionStorage.getItem("fufenActivityId"); //活动id
	var organizationSeq = sessionStorage.getItem("areaCode");
	var time_stamp = getTimestamp();
	var str = "{\"body\":{\"fufenActivityId\":\"" + fufenActivityId + "\",\"organizationSeq\":\"" + organizationSeq + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getFufenActivityAwardList?str=" + str,
		async: true,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data3) {
			//console.log(JSON.stringify(data3));
			if(data3.result == 0 && isCondition(data3.list)) {
				sessionStorage.setItem("prizedatecode", "1");
				var prizeHtml = "";
				var prizelist = data3.list;
				$(".container .num-con1").empty();
				$(".container .num-con2").empty();
				$(".container .num-con3").empty();
				var aa = 1;
				for(; aa < 10;) {
					for(var i = 0; i < prizelist.length; i++) {
						aa += 1;
						var prizedate = prizelist[i];
						prizeHtml = prizeHtml + "<div class='num-img'  style='background-image:url(" + prizedate.url + ")'></div>";
					}
				}
				for(var i = 0; i < prizelist.length; i++) {
					var prizedate = prizelist[i];
					prizeHtml = prizeHtml + "<div class='num-img' name=" + prizedate.awardId + " style='background-image:url(" + prizedate.url + ")'></div>";
				}
				prizeHtml = prizeHtml + "<div class='num-img'  style='background-image:url(" + prizelist[0].url + ")'></div>";

				$(".container .num-con1").append(prizeHtml);
				$(".container .num-con2").append(prizeHtml);
				$(".container .num-con3").append(prizeHtml);
				$(".container_box1212").height($(".container_box1212").height());
				var lenghtPs = $(".num-con1 .num-img").length;
				lenghtP = lenghtPs - 1;
				$("#bt_click").attr("onclick", "choujiangStar()");
			} else if(data3.result == 0 && !isCondition(data3.list)) {
				sessionStorage.setItem("prizedatecode", "0");
				layer.msg("非常遗憾，暂无奖品可以抽取", {
					time: 3000
				});
				$("#bt_click").removeAttr("onclick", "choujiangStar()");
			} else if(data3.result != 0) {
				$("#bt_click").removeAttr("onclick", "choujiangStar()");
				//				layer.msg(data3.reason, {
				//					time: 3000
				//				});
			}
		}
	});
}
//获取抽中奖品信息
var exchangeAwardId = "";
var exchangeAwardId0 = "";

function getActivityPrizeInfo() {

	var type = "2"; //1、开门；2、抽奖
	var time_stamp = getTimestamp();
	var str = "{\"body\":{\"type\":\"" + type + "\",\"organizationSeq\":\"" + organizationSeq + "\",\"householdSerial\":\"" + householdSerial + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";

	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getFufenLottery?str=" + str,
		async: true,
		dataType: "jsonp",
		timeout: 30000,
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data4) {
			//console.log(JSON.stringify(data4));
			if(data4.result == 0 && isCondition(data4.exchangeAwardId)) {
				exchangeAwardId = data4.exchangeAwardId;
				sessionStorage.setItem("awardId", data4.awardId);
				sessionStorage.setItem("exchangeAwardId", exchangeAwardId);

				getPersonNewfufen();
				
				letGo();
				getActivityPrizePic();
			} else if(data4.result != 0) {
				//				layer.msg("出错<br/>" + JSON.stringify(data4), {
				//					time: 3000
				//				});
				letGo();
			} else if(data4.result == 0 && data4.code == 0) {
				layer.msg("账号异常，请联系客服:400-8822-252", {
					time: 3000
				});
				letGo();
			} else if(data4.result == 0 && data4.code == 2) {
				layer.msg("不好意思已经没有奖品了，下次再抽吧", {
					time: 3000
				});
				sessionStorage.setItem("code", "3");
				letGo();

			} else {
				letGo();
			}
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			letGo();
			layer.msg("哎呀，当前网络不太好，请稍后再来抽奖哦", {
				time: 5000
			});
		}
	});

}
//获取总福分
function getPersonNewfufen() {
	var time_stamp = getTimestamp();
	var str = "{\"body\":{},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getSumFufen?str=" + str,
		async: true,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data5) {
			//console.log(JSON.stringify(data5));
			if(data5.result == 0) {
				$("#fufen_number").text("当前福分：" + data5.totalFufen);
				$("#new_fufen").html("当前福分：<strong>" + data5.totalFufen + "</strong>&nbsp;购物可获得更多");
				sessionStorage.setItem("totalFufen", data5.totalFufen)
			} else if(data5.result != 0) {
				//								layer.msg(data5.reason, {
				//									time: 10000
				//								});
			}
		}
	});
}
//分享获得福分
function addFufenfx() {
	var totalFufen = sessionStorage.getItem("totalFufen");
	var fufenActivityId = sessionStorage.getItem("fufenActivityId"); //活动id
	var picOriginalUrl = sessionStorage.getItem("picOriginalUrl");
	var title = sessionStorage.getItem("title");
	var showData = "{\"picOriginalUrl\":\"" + picOriginalUrl + "\",\"awardName\":\"" + title + "\",\"fufenActivityId\":\"" + fufenActivityId + "\",\"totalFufen\":\"" + totalFufen + "\"}";
	showData = String(showData);
	nativeMethod("share", showData);
}

function isSharesuccess() {
	prizeWindowClose();
	getPersonNewfufen();
}
//获取中奖奖品图片
function getActivityPrizePic() {
	var type = "2";
	var exchangeAwardId = sessionStorage.getItem("exchangeAwardId");
	if(isCondition(exchangeAwardId)) {
		var time_stamp = getTimestamp();
		var str2 = "{\"body\":{\"type\":\"" + type + "\",\"exchangeAwardId\":\"" + exchangeAwardId + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/getActivityPrizeInfo?str=" + str2,
			async: true,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			//jsonpCallback: "success_jsonpCallback",
			success: function(data5) {
				//console.log(JSON.stringify(data5));
				if(data5.result == 0 && isCondition(data5.obj)) {
					var obj = data5.obj;
					$("#prize_img .prize_img_box").attr("name", " ");
					if(isCondition(obj.picSecUrl)) {
						$("#prize_img").css("background-image", "url(" + obj.picSecUrl + ")");
					} else {
						$("#prize_img").css("background-image", "url(../common/images/c_s_error.png)");
					}
					$("#prize_img .prize_img_box").attr("name", obj.link);

					sessionStorage.setItem("picOriginalUrl", obj.picOriginalUrl);
					sessionStorage.setItem("title", obj.awardName);
					var prizedrawTime0 = String(obj.prizedrawTime).split(" ")[0];
					var prizedrawTime = prizedrawTime0.split("-")[0] + "." + prizedrawTime0.split("-")[1] + "." + prizedrawTime0.split("-")[2]
					var effectiveEndTime0 = String(obj.effectiveEndTime).split(" ")[0];
					var effectiveEndTime = effectiveEndTime0.split("-")[0] + "." + effectiveEndTime0.split("-")[1] + "." + effectiveEndTime0.split("-")[2]
					var awardCode = String(obj.awardCode).substring(0, 3) + "-" + String(obj.awardCode).substring(3, 6) + "-" + String(obj.awardCode).substr(obj.awardCode.length - 3);
					$("#prize_window_open #prize_quan_box .prize_title").text(obj.awardName);
					$("#prize_window_open #prize_quan_box .prize_number").text("兑奖码：" + awardCode);
					if(obj.attribute == 1) {
						$("#prize_window_open #prize_quan_box .prize_way").text("请在物业工作时间内，到管理处兑换奖品");
					} else {
						$("#prize_window_open #prize_quan_box .prize_way").text("请致电400-8822-252进行兑奖");
					}
					$("#prize_window_open #prize_quan_box .prize_time").text("兑奖时间：" + prizedrawTime + " 至 " + effectiveEndTime);

				} else if(data5.result != 0) {
					//					layer.msg(JSON.stringify(data5), {
					//						time: 3000
					//					});
				}
			}
		});
	} else {
		exchangeAwardId = sessionStorage.getItem("exchangeAwardId");
		getActivityPrizePic();
	}

}
//福分id
function getfufenActivityId() {
	var organizationSeq = sessionStorage.getItem("areaCode");
	var time_stamp = getTimestamp();
	var str = "{\"body\":{\"organizationSeq\":\"" + organizationSeq + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/isExistFufenActivity?str=" + str,
		async: true,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data8) {
			//console.log(JSON.stringify(data8));
			if(data8.result == 0 && isCondition(data8.fuFenActivityId)) {
				sessionStorage.setItem("fufenActivityId", data8.fuFenActivityId);
				sessionStorage.setItem("lotteryDrawFufen", data8.lotteryDrawFufen);
				$("#fufen_xiaohao").text("需要消耗" + data8.lotteryDrawFufen + "福分");
				if(isCondition(data8.activityInstructionUrl)) {
					$("#rule_li iframe").attr("src", data8.activityInstructionUrl)
				} else {
					$("#rule_li iframe").attr("src", "activityrule.htm")
				}
				getPrizeDate();
			} else if(data8.result != 0) {
				//				layer.msg(data8.reason, {
				//					time: 10000
				//				});
			} else if(!isCondition(data8.lotteryDrawFufen) || !isCondition(data8.fuFenActivityId)) {
				layer.msg("该小区暂时不参加该活动", {
					time: 3000
				});
			}
		}
	});
}

function openPrizeview() {
	var linkurl = $("#prize_img .prize_img_box").attr("name");
	if(isCondition(linkurl)) {
		var showData = "{\"url\":\"" + linkurl + "\"}";
		showData = String(showData);
		nativeMethod("showNormalWebView", showData);
	}
}
//黑名单
function isBlackRecord() {
	var organizationSeq = sessionStorage.getItem("areaCode");
	var time_stamp = getTimestamp();
	var str = "{\"body\":{\"organizationSeq\":\"" + organizationSeq + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/isBlackRecord?str=" + str,
		async: true,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data9) {
			//console.log(JSON.stringify(data9));
			if(data9.result == 0 && isCondition(data9.code)) {
				//黑名单
				sessionStorage.setItem("code", data9.code)
			} else {
				//正常抽奖
			}

		}
	});
}