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
var pageNum = 1;
var host = sessionStorage.getItem("host");
$(function() {
	var clientType = sessionStorage.getItem("clientType");
	var overlayStatus = sessionStorage.getItem("overlayStatus");
	var popStatus = sessionStorage.getItem("popStatus");
	var commodityId = sessionStorage.getItem("commodityId");

	if(overlayStatus == 0) { //首次预约
		setTitle("挑选商品");
		$("#firstTime").show();
		$("#wrapper").addClass("wrapper-first");
	} else {
		setTitle("其他品牌");
	}
	//无预约信息或无预约商品
	if(popStatus == 0 || !isCondition(commodityId)) {
		setTitle("挑选商品");
		clearHistory();
	} else {
		setTitle("其他品牌");
	}
	if(isCondition(commodityId)) {
		setTitle("其他品牌");
	}
	var myScroll;
	var pullDownEl;
	var pullDownOffset;
	var pullUpEl;
	var pullUpOffset;
	var generatedCount = 0;
	//发起查询商品列表请求
	getWaterList();
	/*setTimeout(function() {
		}, 500);*/
});

function getWaterList() {
	var categoryId = "1462418322933bdffe1ba9f14e87aa90"; //商品分类id  不作变更
	var pageSize = 10;
	var time_stamp = Date.parse(new Date());
	var token = sessionStorage.getItem("token");
	var areaCode = sessionStorage.getItem("areaCode");//小区机构编号

	var type = 1;
	var data = "{" +
		"\"body\":{\"categoryId\":\"" + categoryId + "\",\"areaCode\":\"" + areaCode + "\",\"pageSize\":" + pageSize + ",\"pageNum\":" + pageNum + "}," +
		"\"header\":{\"token\":\" " + token + " \",\"time_stamp\":\" " + time_stamp + " \"}" +
		"}";
	if(pageNum > 0) {
		$.ajax({
			type: "post",
			url: host + "/mms/servlet/findCommodityList?str=" + data,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			async: false,
			success: function(obj) {
				if(obj.result == 0) {
					var olist = obj.list;
					if(pageNum == 1 && olist.length == 0) {
						$("#nomoreshop").show();
						clearHistory();
					}
					for(var j = 0; j < olist.length; j++) {
						var item = olist[j];
						var currentPriceP = doubleValue(item.currentPrice);
						var integerT = splitNum(currentPriceP)[0];
						var scaleT = splitNum(currentPriceP)[1];
						var currentPriceC = "<span >" + integerT + "</span>.<span class='font_size2'>" + scaleT + "</span>";

						var oHtml = "<li class='add-waterTypelist' id='" + item.id + "'>" +
							"<div class='img'>" + "<img src='../common/images/c_s_error.png' onload=\"this.src='" + item.thumLogo + "'\" onerror=\"this.src='../common/images/c_s_error.png'\" /></div>" +
							"<div class='info' id='" + item.id + "'>" +
							"<div class='introduce' id='" + item.sellerId + "'>" + item.name + "</div>" +
							"<div class='price_d'><span class='price'><span class='font_size2'>¥&nbsp;</span>" + currentPriceC + "</span></div></div>" +
							"</li>";
						$("#thelist").append(oHtml);
						var commodityId = sessionStorage.getItem("commodityId");
						if(item.id == commodityId) {
							$("#" + commodityId).addClass("background-img");
						}
					}
					$(".add-waterTypelist").click(function() {
						sessionStorage.setItem("limitUseMap", "");
						sessionStorage.setItem("selectedUse", []);
						sessionStorage.setItem("disabledUse", []);

						$("li").removeClass("background-img");
						$(this).addClass("background-img");
						commodityId = $(this).find(".info").attr("id");
						sessionStorage.setItem("commodityId", commodityId);
						sessionStorage.setItem("sellerId", item.sellerId); //设置店铺信息
						sessionStorage.setItem("status", "1");
						sessionStorage.setItem("couponPrice", 0); //优惠金额
						sessionStorage.setItem("couponStatus", "0"); //选取优惠券状态
						//选择商品后  地址重置为当前小区内的住房地址
						var clientType = sessionStorage.getItem("clientType");
						var popStatus = sessionStorage.getItem("popStatus");
						if(popStatus == "0") { //首次或进行活动
							setTimeout(function() {
								window.location.href = "index.htm?clientType=" + clientType + "&type=ios";
							}, 250);
						} else {
							popUrl();
						}
					});
				}
				if(olist.length >= pageSize) { //可以二次拉动时
					pageNum++;
					$("#pullUp").show();
					$("#wrapper").css("background", "#F0F0F0");
				} else {
					if(pageNum == 1) {
						$("#wrapper").css("background", "none");
						$("#pullUp").css("display", "none");
						$("#nomoretip").show();
					}
					pageNum = 0;
				}
			}

		});
		myScroll.refresh();
	} else {
		pageNum = 0;
		$("#nomore").css("display", "block");
		setTimeout(function() {
			$("#nomore").css("display", "none");
		}, 5000);
	}
}

function pullDownAction() {
	return false;

}

function pullUpAction() {
	getWaterList();
	myScroll.refresh();
	//这里写ajax数据处理
	/*setTimeout(function() { 
		}, 500);*/
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
			if(this.y > 5 && !pullDownEl.className.match('flip')) {
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