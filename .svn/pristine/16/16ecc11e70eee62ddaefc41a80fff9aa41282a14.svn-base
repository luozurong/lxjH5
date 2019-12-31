var str = "";
var pageNum = 1;
var parentId = "14624185451897e60844d2c34aa39148";
var pageSize = 20;
var first = 1;

function doubleValue(price) {
	return(Math.round(price * 10000) / 10000).toFixed(2);
}
//原生传的url分割
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
function splitNum(numberN) {
	var Num = numberN;
	var Nums = new Array();
	Nums = (Num + "").split(".");
	return Nums;
}
var token = GetURLParameter("token");
if (!isCondition(token)) {
	location.href=host+"/mms/html5/common/loading/downloadWarn.htm";
}
var organizationSeq = GetURLParameter("organizationSeq");
var clientType = GetURLParameter("clientType");

function judgePrice(pric) {
	var price = parseInt(pric);
	if(price <= 0) {
		$(".line_font").hide();
	}
}
//--------------------------------ready开始--------------
$(function() {
		var myScroll;
		var pullDownEl;
		var pullDownOffset;
		var pullUpEl;
		var pullUpOffset;
		var generatedCount = 0;

		var time_stamp = Date.parse(new Date());
		var status = "1";
		var data = "{\"body\":{\"parentId\":\"" + parentId + "\",\"status\":\"" + status + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + "11111" + "\"}}";
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/findCommodityCategoryList?str=" + data,
			async: false,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(data) {
				console.log(JSON.stringify(data));
				var list = data.list;

				for(var i = 0; i < list.length; i++) {
					var oHtml = "<div class='swiper-slide'><div class='title' id='" + list[i].id + "'>" + list[i].name + "</div></div>";
					$(".swiper-wrapper").append(oHtml);
				}
				var mySwiper = new Swiper('.swiper-container', {
					pagination: '.pagination',
					paginationClickable: true,
					slidesPerView: 'auto'
				})
				$(".swiper-slide .title").on("click", function() {
					var commodityId = $(this).attr("id");
					pageNum = 1;
					sessionStorage.setItem("commodityId", commodityId);
					$(".swiper-slide .title").removeClass("border-color-li");
					$("#" + commodityId).addClass("border-color-li");
					$("#container").empty();
					$("#nomoretip").hide();
					openNewlist();
				});

				sessionStorage.setItem("commodityId", "all");
				setTimeout(function() {
					openNewlist();
				}, 100);
			}

		});

	})
	//--------------------------------ready结束--------------
function openNewlist() {
	var str = "";
	var categroyId = sessionStorage.getItem("commodityId");
	$("#nomoreshop").hide();
	var time_stamp = Date.parse(new Date());
	if(categroyId == "all") {
		str = "{\"body\":{\"organizationSeq\":\"" + organizationSeq + "\",\"parentId\":\"" + parentId + "\",\"pageSize\":\"" + pageSize + "\",\"pageNum\":\"" + pageNum + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	} else {
		str = "{\"body\":{\"organizationSeq\":\"" + organizationSeq + "\",\"categoryId\":\"" + categroyId + "\",\"pageSize\":\"" + pageSize + "\",\"pageNum\":\"" + pageNum + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	}

	console.log("str:" + str);
	if(pageNum > 0) {
		$.ajax({
			type: "get",
			url: host + "/mms/servlet/getGroupCouponCommodityList?str=" + str,
			async: true,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			jsonpCallback: "success_jsonpCallback",
			success: function(data) {
				//	console.log(JSON.stringify(data));
				//         重新拼装ajax 请求到上
				var list = data.list;
				//查看商品是否有
				if(pageNum == 1 && list.length == 0) {
					$("#nomoreshop").show();
				}
				var oHtml = "";
				for(var i = 0; i < list.length; i++) {
					var originalPrice = list[i].originalPrice;

					var currentPriceA = doubleValue(list[i].currentPrice);
					var integerT = splitNum(currentPriceA)[0];
					var scaleT = splitNum(currentPriceA)[1];
					var currentPriceB = currentPriceA;

					var currentPriceC = doubleValue(originalPrice);
					var integerA = splitNum(currentPriceC)[0];
					var scaleA = splitNum(currentPriceC)[1];
					var original = "原价：" + currentPriceC + "元";

					if(originalPrice <= 0) original = "";
					var oHtml = "<div class ='shop_food' id='" + list[i].id + "' onclick='Onspecialtydetails(this)'><div class='picture_p'><img  class = 'img-responsive'  src='' alt='" + list[i].name + "'  / >" +
						"</div><div class='title_cai'><span>" + list[i].name + "</span>" +
						"</div><div class='pric'>" +
						"<span class='red_font'>现价：" + currentPriceB + "元</span>" +
						"<span class='line_font'>" + original + "</span>" +
						"<span class='people_num'>" + list[i].selledCount + "人尝过</span>" +
						"</div></div>";
					//judgePrice(originalPrice);
					$("#container").append(oHtml);
					$("#" + list[i].id + " img").attr("src", list[i].logo);
				}
				document.getElementById('wrapper').style.display = 'block';
				//判断是否还有数据
				if(list.length >= pageSize) {
					pageNum++;
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
				myScroll.refresh();
			}
		});
		myScroll.refresh();
	} else {
		pageNum = 0;
		$("#pullUp").css("background", "#F0F0F0");
		$("#pullUp").hide();
	}
}

function Onspecialtydetails(ele) {
	var shopId = $(ele).attr("id");
	//跳转specialtydetails.htm
	showActivity(host + "/mms/html5/specialty/specialtydetails.htm?commodityId=" + shopId, "团购详情");

}

function pullDownAction() {
	return false;

}

function pullUpAction() {
	//这里写ajax数据处理
	setTimeout(function() {
		openNewlist();
		myScroll.refresh();
	}, 100);
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
				this.scrollTo(0, 0, 150);
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