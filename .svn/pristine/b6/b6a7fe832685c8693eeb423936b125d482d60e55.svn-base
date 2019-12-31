setRefreshOnResume(); //刷新页面(防止返回之后，没有重新请求)
initializeSession();
setTitle("商品收藏");
var time_stamp = getTimeStamp();
//小区机构编号
areaCode = sessionStorage.getItem("areaCode");
pageSize = 10;
pageNum = 1;
type = 1;

function refreshData() {
	setTimeout(function() {
		getData();
	}, 0);
	return 1;
}

var commodityId = "";
/*areaCode="2300200299";
token = "1541466880691d6d3bc5bfaa4dca98e7";
host="https://tt.hori-gz.com:8443";*/
$(document).ready(function() {
	function showView() {
		if(null) {
			getData();
		} else {
			getData();
		}
	}
	$(window).load(function() {
		if(token == null || token == "") {
			window.location.href = host + "/mms/html5/common/loading/downloadWarn.htm";
		} else {
			showView();
		}
	});
	//toast弹出框
	function toast(message) {
		layer.msg(message);
	};

	//mui左滑动事件
	mui.init();
	(function($) {
		$('#addUserComOrSellerLose').on('tap', '.mui-btn', function() {
			var elem = this;
			var li = elem.parentNode.parentNode;
			getData1(li.id);
			li.parentNode.removeChild(li);
			var msg = "取消收藏成功";
			toast(msg);
			//              判断删除之后有无收藏商品
			favoritesCount();
		});
		$('#addUserComOrSellerLove').on('tap', '.mui-btn', function() {
			var elem = this;
			var li = elem.parentNode.parentNode;
			getData1(li.id);
			li.parentNode.removeChild(li);
			var msg = "取消收藏成功";
			toast(msg);
			//              判断删除之后有无收藏商品
			favoritesCount();
		});
	})(mui);

});

function getData() {

	var str = "{\"body\":{\"areaSeq\":\"" + areaCode + "\",\"pageSize\":\"50\",\"pageNum\":\"1\",\"type\":\"1\",\"commodityType\":\"2\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	$.ajax({
		type: "post",
		async: false,
		url: host + "/mms/servlet/searchComdityUserLove?str=" + str,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(data);
			var list = data.list;
			if(list.length > 0) {
				$(".notice").show();
				$(".no-favorites").hide();
				$("#addUserComOrSellerLose").empty();
				$("#addUserComOrSellerLove").empty();
				for(var j = 0; j < list.length; j++) {
					var commodityStatus = list[j].commodityStatus;
					if(commodityStatus != 1) {
						var loseTitle = list[j];
						var losePrice = list[j].commodityPrice;
						var commodityType = list[j].commodityType;
						//losePrice=losePrice.toFixed(2);
						loseintegerT = (losePrice + "").split(".")[0];
						losescaleT = (losePrice + "").split(".")[1];
						var lose = _.template($("#addUserComOrSellerLoseTemplate").html());
						$("#addUserComOrSellerLose").append(lose(loseTitle));
					} else {
						var favoriteTitle = list[j];
						var commodityPrice = list[j].commodityPrice;
						//commodityPrice = commodityPrice.toFixed(2);
						commodityintegerT = (commodityPrice + "").split(".")[0];
						commodityscaleT = (commodityPrice + "").split(".")[1];
						var favorite = _.template($("#addUserComOrSellerLoveTemplate").html());
						$("#addUserComOrSellerLove").append(favorite(favoriteTitle));
					}
				}
				$(".commodityIds").on("click", function() {
					var li = $(this);
					commodityId = li.attr("id");
					commodityType = li.attr("commodityType");
					sessionStorage.setItem("commodityId", commodityId);
					if(commodityType == 1) {
						showActivity(host + "/mms/html5/supermarket/ProductDetail.htm?commodityId=" + commodityId, "商品详情");
					} else {
						showActivity(host + "/mms/html5/mall/productDetail.htm?commodityId=" + commodityId, "商品详情");
					}
					return false;
				});
			} else {
				$(".no-favorites").show();
				$(".notice").hide();
				$("#addUserComOrSellerLove").css("margin-bottom", "0");
			}
		},
	});
}

function getData1(id) {
	var commodityId = id;
	var str = "{\"body\":{\"commodityId\":\"" + commodityId + "\",\"type\":\"1\",\"commodityType\":\"2\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	$.ajax({
		type: "post",
		async: false,
		url: "/mms/servlet/addUserComOrSellerLove?str=" + str,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {}
	})
}

//取消收藏判断是否显示‘无收藏商品’提示
function favoritesCount() {
	var favoritesCount = 0;
	var a = $('#addUserComOrSellerLove').find('li').length;
	var b = $('#addUserComOrSellerLose').find('li').length;
	if(a == 0 && b == 0) {
		favoritesCount = 0; //没收藏商品了
	} else {
		favoritesCount = 1;
	};
	if(favoritesCount == 1) {
		$(".no-favorites").hide();
		$('.notice').show();
	} else {
		$(".no-favorites").show();
		$("#addUserComOrSellerLove").css("margin-bottom", "0");
		$('.notice').hide();
	}
}