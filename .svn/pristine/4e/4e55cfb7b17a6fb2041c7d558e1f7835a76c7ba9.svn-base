var token = "";
var clientType = ""; //手机类型 
var householdSerial = "";
var areaCode = "";
var pageNum = 1;
var first = 1;
function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
var $windowWidth = $(window).width();
if($windowWidth > 640) {
	$windowWidth = 640; //限定最大宽度为640
}
$("html").css("font-size", (100 / 320) * $windowWidth + "px");

$(window).resize(function() {
	$windowWidth = $(window).width();
	if($windowWidth > 640) {
		$windowWidth = 640;
	}
	$("html").css("font-size", (100 / 320) * $windowWidth + "px");
});

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//从URL获取token、手机类型
token = GetURLParameter("token");
if (!isCondition(token)) {
	location.href=host+"/mms/html5/common/loading/downloadWarn.htm";
}
//手机类型
clientType = GetURLParameter("clientType");
//住户编号 
householdSerial = GetURLParameter("householdSerial");
//小区机构编号
areaCode = GetURLParameter("organizationSeq");

$(document).ready(function() {
	//设置标题
	var myScroll;
	var pullDownEl;
	var pullDownOffset;
	var pullUpEl;
	var pullUpOffset;
	var generatedCount = 0;
	//发起查询商品列表请求
	showData();
	/*setTimeout(function(){
		progressstar();
	},3000);
		setTimeout(function(){
		progressend();
	},6000);*/

})

function showData() {
	var categoryId = "146241839857868652fc68ec4119a14e"; //家政商品分类id  不作变更
	var pageSize = 10;
	var time_stamp = Date.parse(new Date());
    var moduleName="housekeeping";
	var data = "{" +
		"\"body\":{\"categoryId\":\"" + categoryId + "\",\"areaCode\":\"" + areaCode + "\",\"moduleName\":\"" + moduleName + "\",\"areaSeq\":\"" + areaCode + "\",\"pageNum\":" + pageNum + ",\"pageSize\":" + pageSize + "}," +
		"\"header\":{\"token\":\" " + token + " \",\"time_stamp\":\" " + time_stamp + " \"}" +
		"}";
	if(pageNum > 0) {
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/findCommodityList?str=" + data,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			async: false,
			success: function(obj) {
				console.log(JSON.stringify(obj))
				if(obj.result == 0) {
					var olist = obj.list;
					if(pageNum == 1 && olist.length == 0) {
						$("#nomoreshop").show();
						clearHistory();
					} else {
						for(var j = 0; j < olist.length; j++) {
							var item = olist[j];
							var hoursekeepli = "<li class='select padding-left' id='" + item.id + "' onclick='OnserverDetails(this)'>" +
								"<div class='logo'><span></span>" +
								"<img src='" + item.thumLogo + "' />" +
								"</div>" +
								"<span class='title'>" +
								"" + item.name + "" +
								"</span>" +
								"</li>";
							$("#main").append(hoursekeepli);
						}
						$("#maintainlist").show();
					}
				} else {
					appAlert("提示", "请求参数有错，请退出重新进入");
				}
				if(olist.length >= pageSize) {
					pageNum++;
					$("#pullUp").show();
					$("#wrapper").css("background", "#F0F0F0");
				} else {
					first = 3;
					if(pageNum == 1) {
						$("#wrapper").css("background", "#f0f0f0");
						$("#pullUp").css("display", "none");
						first = 2;
					}
					pageNum = 0;
					$("#pullUp").css("background", "#F0F0F0");
					$("#pullUp").hide();
				}
			}

		});
		myScroll.refresh();
	} else {
		pageNum = 0;
		$("#pullUp").css("background", "#F0F0F0");
		$("#pullUp").hide();
		//		$("#nomoretip").css("display","block");
		$(".pullUpIcon").hide();
		$(".pullUpLabel").hide();
	}

}

function OnserverDetails(ele) {
	commodityId = $(ele).attr("id");
	showActivity(host + "/mms/html5/housekeep/serverDetails.htm?commodityId=" + commodityId, "服务介绍");

}

function pullDownAction() {
	return false;
}

function pullUpAction() {
	setTimeout(function() {
		showData();
		myScroll.refresh();
	}, 100)

}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function() {
			if(pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = ' ';
			} else
			if(pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上拉';
			}
		},
		onScrollMove: function() {
			if($("#scroller").height() < $(window).height()) this.maxScrollY = 0;
			if((this.y < this.maxScrollY) && (this.pointY < 1)) {
				this.scrollTo(0, this.maxScrollY, 300);
				return;
			} else if(this.y > 0 && (this.pointY > window.innerHeight - 1)) {
				this.scrollTo(0, 0, 300);
				return;
			} else if(this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
				this.minScrollY = 0;
			} else if(this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
				this.minScrollY = -pullDownOffset;
			} else
			if(this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '放开手刷新';
				this.maxScrollY = this.maxScrollY;
			} else if(this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上拉';
				this.maxScrollY = pullUpOffset;
			}
			if(first == 3) {
				$("#nomoretip").show();
			}

		},
		onScrollEnd: function() {
			if(pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
				pullDownAction(); // Execute custom function (ajax call?)
			} else
			if(pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
				pullUpAction(); // Execute custom function (ajax call?)
			}
			if(first == 3) {
				$("#nomoretip").hide();
			}
		}
	});
	document.getElementById('wrapper').style.left = '0';
}
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function() {
	setTimeout(loaded, 200);
}, false);

//进度条
/*function progressstar() {
	var jindutiao = "<div id='caseBlanche'><div id='rond'><div id='test'></div></div><div id='load'><p>loading</p></div></div>";
	$("body").append(jindutiao);
}
function progressend(){
	$("#caseBlanche").css("display","none");
}*/