setRefreshOnResume();
var Clheight = $(window).height(); //屏幕的高度
var token = GetURLParameter('token');
//
//手机类型
var clientType = GetURLParameter("clientType");
//住户编号 
var householdSerial = GetURLParameter("householdSerial");
//小区机构编号
var areaCode = GetURLParameter("organizationSeq");

sessionStorage.setItem("token", token);
sessionStorage.setItem("clientType", clientType);
sessionStorage.setItem("householdSerial", householdSerial);
sessionStorage.setItem("areaCode", areaCode);


$(function() {
	setTimeout(function(){
		getPersonPrize();
		getWininformation();
		getfufenActivityId();
	},300);
		     	
})


function onlaodDate(numle){
	var imgNum=numle;
	if(imgNum==0){
		document.getElementById("loadding").style.display="none";
		
	}
}
function goMygortune() {
	$(".header_bottom .header_fufen").addClass("header_fufen_click");
	setTimeout(function() {
		$(".header_bottom .header_fufen").removeClass("header_fufen_click");
	}, 200);
	
	showActivity(host + "/mms/html5/springactivity/myfortune.htm", "福分明细");
}

function goChoujiang() {
	$(".header_bottom .header_choujiang").addClass("header_choujiang_click");
	setTimeout(function() {
		$(".header_bottom .header_choujiang").removeClass("header_choujiang_click");
	}, 200);
	showActivity(host + "/mms/html5/springactivity/choujiang.htm", "福分抽奖");

}

function closeWindow() {
	goBack();
}

//活动规则展开
function ruleOpen() {
	$("body").css("overflow", "hidden");
	$("#bgwindow").fadeIn(800);
	$("#rule_big_box").fadeIn(1000);
}
//活动规则关闭
function ruleClose() {
	$("body").css("overflow", "auto");

	$("#bgwindow").fadeOut(800);
	$("#rule_big_box").fadeOut(1000);
}

//获取个人中奖记录
function getPersonPrize() {
	var type = ""; //1开门2、抽奖为空
	var time_stamp = getTimestamp();
	var str = "{\"body\":{\"type\":\"" + type + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getLotteryRecordList?str=" + str,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			//	console.log(JSON.stringify(data));
			if(data.result == 0 && isCondition(data.lotteryList)) {
				$("#prize_have_none").hide();
				var lotteryList = data.lotteryList; //纪录组
				var Htmllottery1 = "";
				var Htmllottery2 = "";
				var Htmllottery3 = "";
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
							Htmllottery1 = Htmllottery1 + "<div class='content'><div class='content_juan_wei'><img src='images/duihuan1_03_03_03.png'><div>" + awardName + "</div><p>兑奖码：<span>" + awardCode + "</span></p><span><em>请在物业工作时间内，到管理处兑换奖品</em><br/><em>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</em></span></div></div>";
						} else {
							Htmllottery1 = Htmllottery1 + "<div class='content'><div class='content_juan_wei'><img src='images/duihuan1_03_03_03.png'><div>" + awardName + "</div><p>兑奖码：<span>" + awardCode + "</span></p><span><em>请致电400-8822-252进行兑奖</em><br/><em>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</em></span></div></div>";
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
							Htmllottery2 = Htmllottery2 + "<div class='content'><div class='content_juan_wei'><img src='images/duihuan2_05.png'><div>" + awardName + "</div><p>兑奖码：<span>" + awardCode + "</span></p><span><em>请在物业工作时间内，到管理处兑换奖品</em><br/><em>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</em></span></div></div>";
						} else {
							Htmllottery2 = Htmllottery2 + "<div class='content'><div class='content_juan_wei'><img src='images/duihuan2_05.png'><div>" + awardName + "</div><p>兑奖码：<span>" + awardCode + "</span></p><span><em>请致电400-8822-252进行兑奖</em><br/><em>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</em></span></div></div>";
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
							Htmllottery3 = Htmllottery3 + "<div class='content'><div class='content_juan_wei'><img src='images/guoqi2_05.png'><div>" + awardName + "</div><p>兑奖码：<span>" + awardCode + "</span></p><span><em>请在物业工作时间内，到管理处兑换奖品</em><br/><em>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</em></span></div></div>";
						} else {
							Htmllottery3 = Htmllottery3 + "<div class='content'><div class='content_juan_wei'><img src='images/guoqi2_05.png'><div>" + awardName + "</div><p>兑奖码：<span>" + awardCode + "</span></p><span><em>请致电400-8822-252进行兑奖</em><br/><em>兑奖时间：" + prizedrawTime + "至" + effectiveEndTime + "</em></span></div></div>";
						}
					}
				}
				$(".section_bg").append(Htmllottery1 + Htmllottery2 + Htmllottery3);
			} else if(data.result == 0 && !isCondition(data.lotteryList)) {
				$("#prize_have_none").show();
			} else if(data.result != 0) {
//				layer.msg(data.reason, {
//					time: 10000
//				});
				$("#prize_have_none").show();
			}
		}
	});
}
//获取个人总福分
function getSumFufen() {
	var time_stamp = getTimestamp();
	var str = "{\"body\":{},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getSumFufen?str=" + str,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data1) {
			//console.log(JSON.stringify(data1));
			if(data1.result == 0) {
				var totalFufen = Number(data1.totalFufen);
				sessionStorage.setItem("totalFufen", totalFufen)
				var xiaohaofufen = Number(sessionStorage.getItem("lotteryDrawFufen"));
				$(".header_content .header_bottom-fufen span").html(totalFufen);
				if(isCondition(xiaohaofufen)&&xiaohaofufen!=0) {
					if(totalFufen >= xiaohaofufen) {
						var Cnum = Math.floor(totalFufen / xiaohaofufen);
						$(".header_content .header_bottom-again").html("可参与<strong>&nbsp" + Cnum + "&nbsp</strong>次100%抽奖!");
					} else {
						var fufencha = xiaohaofufen - totalFufen;
						$(".header_content .header_bottom-again").html('再获得<span>&nbsp' + fufencha + '&nbsp</span>福分可参与100%抽奖了哟！');
					}
				}

			} else if(data1.result != 0) {
//				layer.msg(window.location.href, {
//					time: 10000
//				});
			}
		}
	});
}
//
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
		jsonpCallback: "success_jsonpCallback",
		success: function(data2) {
			//	console.log(JSON.stringify(data2));
			if(data2.result == 0 && isCondition(data2.list)) {
				$("#dis_no_order").hide();
				var limitlist = data2.list;
				var text_listHtml = "";
				if(limitlist.length > 0) {
					$(".list_lh ul").empty();
					for(var i = 0; i < limitlist.length; i++) {
						var tel = String(limitlist[i].phone);
                        var areaName2 = String(limitlist[i].areaName);
						if(areaName2.length > 6) {
							areaName2 = areaName2.substring(0, 5) + "..."
						}
						tel = tel.substring(0, 3) + "*****" + tel.substr(tel.length - 3);

						var text_listHtml = text_listHtml + "<li><span class='span1'>恭喜</span><span class='span2'>" + areaName2 + "</span><span class='span3'>" + tel + "</span><span class='span4'>抽中</span><span class='span5'>" + limitlist[i].awardName + "</span></li>";
					}
					$(".list_lh ul").append(text_listHtml);

				}
	
			} else if(data2.result != 0) {
//				layer.msg(data2.reason, {
//					time: 10000
//				});
			}
		}
	});
}
//福分id
function getfufenActivityId() {
		
	var organizationSeq = sessionStorage.getItem("areaCode");
	var time_stamp = getTimestamp();
	var str = "{\"body\":{\"organizationSeq\":\"" + organizationSeq + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/isExistFufenActivity?str=" + str,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data3) {
	
			//console.log(JSON.stringify(data3));
			if(data3.result == 0 && isCondition(data3.fuFenActivityId)) {
				sessionStorage.setItem("fufenActivityId", data3.fuFenActivityId);
				sessionStorage.setItem("lotteryDrawFufen", data3.lotteryDrawFufen);
				if(isCondition(data3.activityInstructionUrl)) {
					$("#rule_li iframe").attr("src", data3.activityInstructionUrl)
				} else {
					$("#rule_li iframe").attr("src", "activityrule.htm")
				}

				getSumFufen();
			} else if(data3.result != 0) {
//				layer.msg(data3.reason, {
//					time: 10000
//				});
			}
		}
	});
}