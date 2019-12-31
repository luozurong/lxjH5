var pageNum = 1;
var pageSize = 20;
var host = "";
host = "http://" + window.location.host; //主机名,包含端口
sessionStorage.setItem("host", host);
//原生传的url分割
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function doubleValue(price) {
	return(Math.round(price * 10000) / 10000).toFixed(2);
}

var commodityId = GetURLParameter("commodityId");
var commodityName = "";
var sellerId = "";
var areaId = "";
var areaName = "";

var currentPrice = 0.0;
var originalPrice = 0.0;
//--------------------------------ready开始--------------
$(function() {

	var time_stamp = Date.parse(new Date());
	var status = "1";
	var token = "";
	var data = "{\"body\":{\"commodityId\":\"" + commodityId + "\",\"status\":\"" + status + "\"},\"header\":{\"time_stamp\":\"" + time_stamp + "\",\"token\":\"" + token + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getCommodityPreviewDetail?type=7&str=" + data,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			var list = data.commodity;
			var isOverTime = list.isOverTime;
			commodityName = list.name;
			sellerId = list.sellerId;
			var sellerLat = list.sellerLat;
			var sellerLng = list.sellerLng;
			var sellerName = list.sellerName;
			var sellerAddress = list.sellerAddress;
			originalPrice = list.originalPrice;
			currentPrice = list.currentPrice;
			//				//商品图片
			var photo = list.detailPhotos;
			//             //遍历product里面的photo数组
			for(var i = 0; i < photo.length; i++) {
				var imgUrl = photo[i];
				var product = "<li class='img-responsive swiper-slide'><img src='" + imgUrl.photo + "' /></li>";
				$("#product").append(product); //推进图片数组
			}
			var browser = navigator.appName;
			var b_version = navigator.appVersion;
			var version = b_version.split(";");
			var trim_Version ="";
			if (browser == "Microsoft Internet Explorer") {//ie分离出去判断
				trim_Version = version[1].replace(/[ ]/g, "");
			}
			if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
				alert("ie6浏览器版本过低请下载新版本查看效果");
			} else if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
				alert("ie6浏览器版本过低请下载新版本查看效果");
			} else if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
				alert("ie6浏览器版本过低请下载新版本查看效果");
			} else {
				if(photo.length > 1) {
					var swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						paginationClickable: true,
						autoplay: 2000,
						autoplayDisableOnInteraction: false
					});
				}
			}
			//             //对应的左边翻页看banner事件

			var thumLogo = list;
			var foodname = thumLogo.name;
			$(".food-title").text(foodname);

			var foodnum = thumLogo.selledCount + "人已购买";
			$(".people-number").html(foodnum);

			var sellerLogo = "<img src='" + list.sellerLogo + "' alt='" + list.sellerName + "' />";
			$(".shop-img").html(sellerLogo);

			var sellername = "<div class='shop-Name'>" + list.sellerName + "</div><div class='shop-Type'>" + list.sellerCategory + "</div>";
			$(".shop-name-type").html(sellername);

			var address = list.sellerAddress;
			$(".shop-address").html(address);

			var validityDate = list.validityDate;
			$(".yes_time").html(validityDate);

			var disabledDate = list.disabledDate;
			$(".no_time").html(disabledDate);

			var rule = list.rule;
			$("#use_rule li").html(rule);

			var sellerTelephone = "<a href='tel:" + list.sellerTelephone + "'>" + list.sellerTelephone + "</a>";
			$(".xuanxiang li").html(sellerTelephone);

			var price = "<span class='new-prices'><span style='font-size: 18px;'>¥</span>" + list.currentPrice + "</span><span class='old-prices'><span style='font-size: 18px;'>¥</span>" + list.originalPrice + "</span>";
			$(".buy-left").html(price);
			//				//商品套餐
			var foodlist = list.packages;
			for(var i = 0; i < foodlist.length; i++) {
				var food = foodlist[i];
				var foodlis = "<li><span class='dish-name'>" + food.name + "</span><span class='dish-right'><span  class='dish-number'>" + food.num + food.unit + "</span><span class='dish-price'>" + food.price + "元</span></span></li>";
				$("#sellfoodlist").append(foodlis);
			}

			//判断原价格是否为0
			judgePrice(originalPrice);
			//打电话
			$(".shop-phone").click(function() {
				$("#phone").addClass("donghua");
				$("#phone").css("display", "block")
				$("#mask").show();
				$(".quxiao").click(function() {
					$("#mask").fadeOut(200);
					$("#phone").removeClass("donghua");
					$("#phone").css("display", "none");
					//	document.body.style.overflowX = document.body.style.overflowY = "auto";
				});
			});
		}
	});
})

//-----------原价判断---------
function judgePrice(pric) {
	var price = parseInt(pric);
	if(price <= 0) {
		$(".old-prices").hide();
	}
}