var pageNum = 1;
var token = "";
var clientType = ""; //手机类型 
var householdSerial = "";
var areaCode = "";
var first = 1;

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
function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
function doubleValue(price) {
	return(Math.round(price * 10000) / 10000).toFixed(2);
}

//从URL获取token、手机类型
token = GetURLParameter("token");
	token="147912164724ee2c273d54984281b1af";
if (!isCondition(token)) {
	location.href=host+"/mms/html5/common/loading/downloadWarn.htm";
}
//手机类型
clientType = GetURLParameter("clientType");
//住户编号 
householdSerial = GetURLParameter("householdSerial");
//小区机构编号
areaCode = GetURLParameter("organizationSeq");

var param = "token=" + token + "&clientType=" + clientType + "&householdSerial=" + householdSerial + "&areaCode=" + areaCode;
//设置标题
//setTitle("维修项目");
$(function() {
	
	var myScroll;
	var pullDownEl;
	var pullDownOffset;
	var pullUpEl;
	var pullUpOffset;
	var generatedCount = 0;
	//发起查询商品列表请求
// 	areaCode=4400100001;
//	token="147912164724ee2c273d54984281b1af";
//	host="http://115.28.56.254:8090";
	getmaintainlistt();

});

function getmaintainlistt() {
	var categoryId = "1462418343953509da11466042488a8f"; //维修项目分类id  不作变更
	var pageSize = 10; //请求数据条数
	var time_stamp = Date.parse(new Date());
	 var moduleName="repair";
	var data = "{" +
		"\"body\":{\"categoryId\":\"" + categoryId + "\",\"areaCode\":\"" + areaCode + "\",\"moduleName\":\"" + moduleName + "\",\"areaSeq\":\"" + areaCode + "\",\"pageSize\":" + pageSize + ",\"pageNum\":" + pageNum + "}," +
		"\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\" " + time_stamp + " \"}" +
		"}";
	if(pageNum > 0) {
		$.ajax({
			url: host + "/mms/servlet/findCommodityList?str=" + data,
			async: false,
			type: "get", //jquey是不支持post方式跨域的 	
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(obj) {
//				console.debug(obj)
				if(obj.result == 0) {
					var olist = obj.list;
					if(pageNum == 1 && olist.length == 0) {
						$("#nomoreshop").show();
						clearHistory();
					} else {
						for(var j = 0; j < olist.length; j++) {
							var item = olist[j];
							var currentPriceP = doubleValue(item.currentPrice);
							var integerT = splitNum(currentPriceP)[0];
							var scaleT = splitNum(currentPriceP)[1];
							var currentPrice = "<span >" + currentPriceP + "</span>元/台";
							//新模板维修
							var maintainBox = _.template($('#maintainlistTemplate').html());
							$('#thelist').append(maintainBox(item))

						}
						$("#maintainlist").show();
					//	var wid = $(".picture img").width();
						//$(".picture img").height(wid);
						//$(".picture img").css("vertical-align", "middle");
					}
				} else {
					appAlert("提示", "服务器异常");
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
						//						$("#pullUp").show();
						//						$("#nomore").show();
						//						$("#pullUp").css("border", "none");
						//						$(".pullUpIcon,.pullUpLabel").hide();
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
//		if(first == 1) {
//			setTimeout(function() {
//				//$("#nomore").css("display", "none");
//				
////				$(".pullUpIcon").show();
////				$(".pullUpLabel").show();
//			}, 5000);
//		}
	}
}

function OnserverDetails(ele) {
	var commodityId = $(ele).find(".info").attr("id");
	showActivity(host + "/mms/html5/maintain/maintainindex.htm?commodityId=" + commodityId, "预约维修");
}

function pullDownAction() {
	return false;
}

function pullUpAction() {

	setTimeout(function() {
		getmaintainlistt();
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
			if(first==3){
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
			if(first==3){
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