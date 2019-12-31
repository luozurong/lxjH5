var fufenOperateType = "";
var pageSize = "10";
var pageNum = "1";

var pageMax = "0";

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
$(document).ready(function() {
	getfufenActivityId();
	getOrderList();

});

$(".mybox").DataLazyLoad({
	load: function(page, unLocked) {
		var html = '';
		var max = pageMax;
		if (max!=0) {
			getOrderList();
		}	
		//Check whether to end
		page = page >= max ? 0 : page + 1;
		//To prevent repeated load, The first parameter to the next page, No page is 0

		unLocked(page);
		/* if (page == 0) {
		 alert($("li").length)
		 $("<li class = 'h2'>The End!</li>").appendTo('.orderInformation');
		 } */

	}
});
var aab="0";
function getOrderList() {
	var time_stamp = getTimestamp();
	var str = "{\"body\":{\"fufenOperateType\":\"" + fufenOperateType + "\",\"pageNum\":\"" + pageNum + "\",\"pageSize\":\"" + pageSize + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getFufenDetailList?str=" + str,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.result == 0 && isCondition(data.list)) {
				var limitlist = data.list;
				pageCount = data.pageCount;
				var packageback = data.pageNum;
				if(pageNum < pageCount) {
					pageNum = Number(pageNum) + 1;
				}
				var aa = "";
				if(limitlist.length > 0) {
					for(var i = 0; i < limitlist.length; i++) {
						
						var fufenOperateType2 = "";
						if(limitlist[i].type == 3||limitlist[i].type == 6) {
							var fufenOperateType1 = limitlist[i].fufenOperateType;
							var fdd = fufenOperateType1.split(" ");
							if(isCondition(fdd[1])) {
								fufenOperateType2 = fdd[0] + " ****" + fdd[1].substr(fdd[1].length - 4);
							} else {
								fufenOperateType2 = fdd[0];
							}

						} else {
							fufenOperateType2 = limitlist[i].fufenOperateType;
						}
						//console.log(fufenOperateType2);
						aa = aa + "<div class='lines'><span class='linesA'>" + fufenOperateType2 + "</span><span class='linesB'>" + limitlist[i].fufen + "</span></div>";
					}
					$("#myboxx").append(aa);
				}
				if(packageback == 1 && pageCount == 1){
					pageMax=0;
				}else if(packageback == 1){
				  pageMax = pageCount-1;	
				}
				if($("#myboxx").height() - $(".mybox").height() < 100 && pageCount != packageback && packageback == 1 && pageCount >= 2) {
					getOrderList();
					pageMax = pageCount - 2;
				}
			} else if(data.result == 0 && !isCondition(data.list)) {
				if(data.pageNum == 1) {
					$("#disnonefufen").show();
				}
			} else if(data.result != 0) {
				//console.log(data.reason)
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
		async: true,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data1) {
			//console.log(JSON.stringify(data1));
			if(data1.result == 0) {
				var totalFufen = data1.totalFufen;
				var xiaohaofufen = Number(sessionStorage.getItem("lotteryDrawFufen"));
				$(".bgup .title #totalFufen").text(totalFufen);
				if(isCondition(xiaohaofufen) && xiaohaofufen != 0) {
					if(totalFufen >= xiaohaofufen) {
						var Cnum = Math.floor(totalFufen / xiaohaofufen);
						$(".bgup .notice").html("可参与<span>" + Cnum + "</span>次100%抽奖!");
					} else {
						var fufencha = xiaohaofufen - totalFufen;
						$(".bgup .notice").html("再获得<span>" + fufencha + "</span>福分可参与100%的抽奖呦！");
					}
				}
			} else if(data1.result != 0) {
				//console.log(data1.reason);

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
		//jsonpCallback: "success_jsonpCallback",
		success: function(data0) {
			//console.log(JSON.stringify(data0));
			if(data0.result == 0 && isCondition(data0.fuFenActivityId)) {
				sessionStorage.setItem("fufenActivityId", data0.fuFenActivityId);
				sessionStorage.setItem("lotteryDrawFufen", data0.lotteryDrawFufen);
				getSumFufen();
			} else if(data0.result != 0) {
//				layer.msg(data0.reason, {
//					time: 10000
//				});
				getSumFufen();
			} else {
				getSumFufen();
			}

		}
	});
}

