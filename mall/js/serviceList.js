//刷新页面
setRefreshOnResume();
//清楚缓存
clearHistory();
//rem布局动态获取根字体大小
/*function remDynamicLayout() {
	var $windowWidth = $(window).width();

	function htmlFontZize() {
		$windowWidth = $(window).width();
		if($windowWidth > 640) {
			$windowWidth = 640; //限定最大宽度为640
		}
		$("html").css("font-size", (100 / 320) * $windowWidth + "px");
	}
	setTimeout(function() {
		htmlFontZize();
	}, 100);
	$(window).resize(function() {
		htmlFontZize();
	});
}
remDynamicLayout();*/

var pageNum = 1;
var pageSize = 8;
var pageCount = "";
var addDatestate = true;
//从URL获取token、手机类型
var token = GetURLParameter("token");
//手机类型
var clientType = GetURLParameter("clientType");
//住户编号
var householdSerial = GetURLParameter("householdSerial");
//小区机构编号
var areaCode = GetURLParameter("organizationSeq");
//解析url带的id
var activityId = GetURLParameter("activityId");
//activityId = "15049250701264b73cb897334b349a45";
//areaCode = "4400100001";
//token = "15059788963197cfc54dd5e1442f9a0e";
//host = 'http://118.190.8.133:8090';
var flag = 2; //商品列表页
var commodityListLength; //每次上拉返回数据的实际数目
var time_stamp = getTimeStamp();
var isVisitor = false;
if(token && token.indexOf("_") == 0) {
	isVisitor = true;
}

function refreshData() {
	setTimeout(function() {
		$(".shoppingcart").attr("onclick", "turnToshoppingcart()");
		var listnumber = $("#thelist li").length;
		if(listnumber < 8) {
			listnumber = 8;
			pageNum = 1;
		} else {
			pageNum = Math.ceil(listnumber / 8);
			listnumber = Math.ceil(listnumber / 8) * 8;
		}

		getServiceList(listnumber, true);
		getshoppingNum();
	}, 0);
	return 1;
}

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

////分割小数点
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
$(function() {
	var jsonData = {
		eventId: "click29",
		eventName: "服务列表页浏览次数"
	};
	jsonData = JSON.stringify(jsonData);
	//调用APP接口，添加百度统计
	nativeMethod("baiduStatistics", jsonData);
	var myScroll;
	var pullDownEl;
	var pullDownOffset;
	var pullUpEl;
	var pullUpOffset;
	var generatedCount = 0;

	//发起查询商品列表请求
	getServiceList(8);
	getshoppingNum();
	$(".img_box1 span").css({
		"line-height": $(".img_box1 span").width() + "px",
		"border-radius": $(".img_box1 span").width() + "px",
		"width": $(".img_box1 span").width() + "px",
		"height": $(".img_box1 span").width() + "px",
	});
	if(clientType == "android") {
		$(".img_box1 span").css({
			"line-height": (Number($(".img_box1 span").width()) + 1) + "px"
		});
	}
});

function getServiceList(pageSize, refreshState) {
	var time_stamp = getTimeStamp();
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		flag: "2",
		activityId: activityId,
		areaSeq: areaCode,
		pageSize: pageSize,
		pageNum: refreshState ? 1 : pageNum

	};

	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/getActivity?str=" + paramData;
	$.ajax({
		url: reqUrl,
		async: true,
		type: "get",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(JSON.stringify(data));
			if(clientType == "ios") {
				try {
					contact_setTitle(data.title);
				} catch(exception) {
					callNativeMethod('setNewtitle', {
						titleText: data.title
					});
				}
			} else {
				setTitle(data.title);
			}

			if(data.canSee == 'Yes') {
				//var shoppingCartNum = data.shoppingCart;
				var commodityList = data.commodityList;
				commodityListLength = commodityList.length;
				pageSize = data.pageSize;
				if(pageNum == 1 && commodityListLength == 0) {
					$("#nomoreshop").show();
					$("#shoppingnum").show();
					//购物车数量信息的填入

					//if (shoppingCartNum > 99) {
					//    $("#shoppingnum").html("99+");
					//} else {
					//    $("#shoppingnum").html(shoppingCartNum);
					//}
				} else {
					$("#shoppingnum").show();
					//购物车数量信息的填入
					//if (shoppingCartNum > 99) {
					//    $("#shoppingnum").html("99+");
					//} else {
					//    $("#shoppingnum").html(shoppingCartNum);
					//}
					if(refreshState) {
						$("#thelist").empty();
					}
					for(var j = 0; j < commodityListLength; j++) {
						var item = commodityList[j];
						//模板
						var maintainBox = _.template($('#maintainlistTemplate').html());
						$('#thelist').append(maintainBox(item));
					}

					//	根据商品数量判断显示‘没有更多数据’提示

					//					if(commodityListLength >= pageSize) {
					//						
					//						
					//					} else {
					//						
					//						//                        $("#nomoretip").show();
					//					}
					if(data.totalCount > $("#thelist li").length) {
						pageNum++;
						addDatestate = true;
						$("#pullUp").show();
						$("#wrapper").css("background", "#F0F0F0");
					} else {
						addDatestate = false;
						$("#pullUp").css("background", "#F0F0F0");
						$("#pullUp").hide();
					}
					console.log(data.totalCount + "  " + $("#thelist li").length)
					if(data.totalCount == $("#thelist li").length) {
						$("#nomoretip").show();
					}

					//福分显示/隐藏、福分样式
					fufenType();
					myScroll.refresh();
				}

			} else {
				$("#wrapper").hide();
				$("#pullUp").hide();
				//$(".top").hide();
				$(".shoppingnum").hide();
				$(".shoppingcart").hide();
				$("#activityLose").show();

			}

		}
	});

}
//购物车数量
function getshoppingNum() {
	var str = "{\"body\":{\"areaOrgSeq\":\"" + areaCode + "\",\"type\":\"" + 1 + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/getShoppingcartCountServlet?str=" + str,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//  jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.result == 0) {
				var total = data.totalCount;
				if(total <= 9 && total > 0) {
					$(".img_box1 span").show();
					$(".img_box1 span").empty().text(total);
					//	$(".img_box1 span").css("height", "0.123rem");

				} else if(total <= 0) {
					$(".img_box1 span").hide();
					$(".img_box1 span").empty().text(total);
					//	$(".img_box1 span").css("height", "0.123rem");

				} else {
					$(".img_box1 span").show();
					$(".img_box1 span").empty().text("…");
					//$(".img_box1 span").css("height", "0.16rem");
					if(clientType == "android") {
						$(".img_box1 span").css({
							"line-height": (Number($(".img_box1 span").width()) - 4) + "px"
						});
					} else {
						$(".img_box1 span").css({
							"line-height": (Number($(".img_box1 span").width()) - 3) + "px"
						});
					}
				}

				var totalPrice = data.realTotalPrice; //菜篮子里所有商品总价
				totalPrice = totalPrice.replace(/^\s+$/, "");
				totalPrice = doubleValue(totalPrice);
				showprice = splitNum(totalPrice);
				$(".integer").html(showprice[0] + ".");
				$("#decimal").html(showprice[1]);
				if(data.totalReducePrice && data.totalReducePrice > 0) {
					$("#totalReducePrice .totalReducePriceN").html("¥ " + data.totalReducePrice);
					$("#totalPrice").addClass("totalPriceTR");
					$("#totalPrice").removeClass("totalPriceT");
					$("#totalReducePrice").show();
				} else {
					$("#totalReducePrice").hide();
					$("#totalPrice").addClass("totalPriceT");
					$("#totalPrice").removeClass("totalPriceTR");
				}

			}
		}
	});

}
//福分显示/隐藏、福分样式
function fufenType() {
	$(".add-maintainlist").each(function() {
		var fufenType = $(this).attr("data-fufenType");
		var fufen = $(this).find("#fufen");
		var fufenNum = $(this).find(".fufenNum").html();
		if(!isCondition(fufenNum) || doubleValue(fufenNum) < 0.01) {
			fufen.hide();
		} else {
			fufen.show();
		}
		if(fufenType == 1) {
			fufen.removeClass().addClass("fufen1");
		} else {
			fufen.removeClass().addClass("fufen0");
		}
	});
}
//跳转到详情页
function turnTo(ele) {
	var commodityId = $(ele).attr("id");
	//showActivity(host + "/mms/html5/mall/productDetail.htm?commodityId=" + commodityId, "");
	showActivity(host + "/mms/html5/supermarket/ProductDetail.htm?commodityId=" + commodityId, "商品详情");

}
//	点击购物车图标
function turnToshoppingcart() {
	if(isVisitor) {
		needLogin(token);
		return false;
	}
	$(".img_box1,.payFor").attr("onclick", "");
	//appAlert("ss","99999");
	setTimeout(function() {
		$(".img_box1,.payFor").attr("onclick", "turnToshoppingcart()");
	}, 5000);
	showActivitySpecial(host + "/mms/html5/supermarket/shoppingcart.htm?type=1", "购物车", 1, null);

	//showActivitySpecial(host + "/mms/html5/mall/shoppingcart.htm", "购物车", 1, null);
}

function pullDownAction() {
	return false;
}

function pullUpAction() {
	if(addDatestate) {
		setTimeout(function() {
			getServiceList(8);
			myScroll.refresh();
		}, 100)
	}

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
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载8条数据';

				//this.maxScrollY = pullUpOffset;
			}
			if(!addDatestate) {
				//	$("#nomoretip").show();
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

			if(!addDatestate) {
				//	$("#nomoretip").hide();
			}
			/*向上滑动显示我的底部导航条/到达顶部时候隐藏*/
			//			var winHeight = $("#scroller").offset().top;
			//			//              console.log(winHeight);
			//			if(winHeight < -100) {
			//				$('.top').show(300);
			//			} else {
			//				$('.top').hide(300);
			//			}
			//			$('.top').on('click', function() {
			//				$("#scroller").css("transform", "translate(0px,0px)");
			//				$(this).hide(300);
			//			});
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