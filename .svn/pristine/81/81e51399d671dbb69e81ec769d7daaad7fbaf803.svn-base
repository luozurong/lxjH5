var list = [];
var unuselist = [];
var couponMap = new Map();
limitUseMap = new Map();
/*var test = sessionStorage.getItem("test");
if(!test){
	appAlert("test",test);
}
sessionStorage.setItem("test",12);*/
var oldLimitUseMap = sessionStorage.getItem("limitUseMap");
var limitUseFlag = false;
var limitUseMap = new Map();
if (!oldLimitUseMap) {
	limitUseFlag = true;
} else {
	oldLimitUseMap = JSON.parse(oldLimitUseMap);
	for (var i = 0; i < oldLimitUseMap.elements.length; i++) {
		limitUseMap.put(oldLimitUseMap.elements[i].key, oldLimitUseMap.elements[i].value);
	}
}
//优惠券详情id组合字符串
var checkedCoupon = sessionStorage.getItem("couponStr");

//总优惠金额
var couponPrice = "";
//优惠券详情id组合字符串
var couponStr = "";
var couponId = "";

$(function() {
	var selectedUse = [];
	var disabledUse = [];

	setTitle("选择优惠券");
	sessionStorage.setItem("status", "1"); //不再自动预约请求
	var token = sessionStorage.getItem("token");
	var totalPrice = sessionStorage.getItem("showprice");
	var commodityInfo = sessionStorage.getItem("commodityInfo");
	var sellerId = sessionStorage.getItem("sellerId");
	var areaId = sessionStorage.getItem("areaId");
	var areaName = sessionStorage.getItem("areaName");
	var commoditySkuAttrIds=sessionStorage.getItem("commoditySkuAttrIds");
	var shoppingCartIds = sessionStorage.getItem("shoppingCartId");
	var startTime;
	var endTime;
	var unStartTime;
	var unEndTime;
	//调用访问
	//getMultiOrderCouponCount(token,totalPrice,countFlag,shoppingCartIds,areaId,areaName);
	//var resqData = getCouponsForMultiOrder(token, totalPrice, 0, shoppingCartIds, areaId, areaName,commoditySkuAttrIds);
	//list = resqData.couponList;
	//unuselist = resqData.unUseList;
	list=[];//暂时设定为空,不请求数据
	unuselist=[];//暂时设定为空,不请求数据
	$("#validCount").html(list.length);
	$("#inValidCount").html(unuselist.length);
	if (list.length == 0 ) {
		$(".no_order").show();
	}
	for (var i = 0; i < list.length; i++) {
		couponMap.put(list[i].detailId, i);
		if (limitUseFlag) {
			limitUseMap.put(list[i].couponId, 0);
		}
		startTime = list[i].effectiveStartDate.replace(/\-/g, ".");
		endTime = list[i].effectiveEndDate.replace(/\-/g, ".");
		var ohtml = "<li class='list' id='" + list[i].detailId + "'  name='" + list[i].couponId + "'>" +
			"<div class='imgBox_2 background_imgBox' >" +
			"<p class='card_name' >" + list[i].name + "</p>" +
			"<p class='price_1' name='" + list[i].denomination + "'>¥" + list[i].denomination + "</p>" +
			"</div>" +
			"<div class='coupons_detail'>" +
			"<p class='name'>满" + list[i].useConditionAmount + "可用</p>" +
			"<p class='condition'>仅限<span>" + list[i].commodityUse + "</p>" +
			"<p class='time_limit'>有效期：<span>" + startTime + "-" + endTime + "</span></p>" +
			"</div></li>";
		$("#available_list").append(ohtml);
		if (list[i].commodityUse == "") {
			$("#available_list li:last-child").find(".condition").html("不限制");
		}
		if (sessionStorage.selectedUse) {
			if (sessionStorage.selectedUse.indexOf(list[i].detailId) >= 0) {
				$("#available_list li:last-child").addClass("checked");
			}
		}
		if (sessionStorage.disabledUse) {
			if (sessionStorage.disabledUse.indexOf(list[i].detailId) >= 0) {
				$("#available_list li:last-child").addClass("background_list");
				$("#available_list li:last-child").find(".imgBox_2").addClass("background_imgBox");
			}
		}

		$("#available_list .list").each(function(){
			if($(this).attr("id") == checkedCoupon){
				$(this).children(".coupons_detail").addClass("checked");
				var currentdetailId = $(this).attr("id");
				$("#available_list .list").each(function() {
					if (currentdetailId != $(this).attr("id")) {
						$(this).addClass("background_list");
					}
				})
			}
		});
	}

	//appAlert(unuselist.length);
	for (var i = 0; i < unuselist.length; i++) {
		unStartTime = unuselist[i].effectiveStartDate.replace(/\-/g, ".");
		unEndTime = unuselist[i].effectiveEndDate.replace(/\-/g, ".");
		var uhtml = "<li class='list' name='" + unuselist[i].couponId + "'>" +
			"<div class='imgBox_2'>" +
			"<p class='card_name'>" + unuselist[i].name + "</p>" +
			"<p class='price_1'>¥" + unuselist[i].denomination + "</p>" +
			"</div>" +
			"<div class='coupons_detail'>" +
			"<p class='name'>满" + unuselist[i].useConditionAmount + "可用</p>" +
			"<p class='condition'>仅限<span>" + unuselist[i].commodityUse + "</p>" +
			"<p class='time_limit'>有效期：<span>" + unStartTime + "-" + unEndTime + "</span></p>" +
			"</div></li>";
		$("#disabled_list").append(uhtml);
		if (unuselist[i].commodityUse == "") {
			$("#disabled_list li:last-child").find(".condition").html("不限制");
		}
	}

	$(document).on("click", "#available_list .list", function() {
		if (!$(this).children(".coupons_detail").hasClass("checked") && !$(this).hasClass("background_list")) {
			$(this).children(".coupons_detail").addClass("checked");
			var currentdetailId = $(this).attr("id");
			$("#available_list .list").each(function() {
				if (currentdetailId != $(this).attr("id")) {
					$(this).addClass("background_list");
				}
			})
		} else if($(this).children(".coupons_detail").hasClass("checked")){
			$(this).children(".coupons_detail").removeClass("checked");
			$("#available_list .list").each(function() {
				$(this).removeClass("background_list");
			});
			sessionStorage.removeItem("couponStr");
			sessionStorage.removeItem("couponPrice");
			sessionStorage.removeItem("couponId");
			
		}
		$(".list").each(function() {
			if ($(this).children(".coupons_detail").hasClass("checked")) {
				var couponDetailId = $(this).attr("id");
				couponId = $(this).attr("name");
//				couponStr += couponDetailId + "|" + couponId + ",";
				couponStr = couponDetailId;
				var a = $(this).find("p :eq(1)").attr("name");
				couponPrice += (a * 100) / 100;
			}
		});
		sessionStorage.setItem("couponStr", couponStr);
		sessionStorage.setItem("couponPrice", couponPrice);
		sessionStorage.setItem("couponId", couponId);
		if (couponPrice > 0) {
			sessionStorage.setItem("couponStatus", "1");
		} else {
			sessionStorage.setItem("couponStatus", "0");
		}
		couponStr = "";
		couponPrice = 0.0;
	})

	$(".available").click(function() {
		$(".no_order").hide();
		$("#disabled_list").css("display", "none");
		$(".disabled .arrow").css("display", "none");
		$("#available_list").css("display", "block");
		$(".available .arrow").css("display", "block");
		if(list.length==0){
			$(".no_order").show();
		}
	});
	$(".disabled").click(function() {
		$(".no_order").hide();
		$("#available_list").css("display", "none");
		$(".available .arrow").css("display", "none");
		$("#disabled_list").css("display", "block");
		$(".disabled .arrow").css("display", "block");
		
		if(unuselist.length==0){
			$(".no_order").show();
		}
	});

})

function disabledSelect(currentObj) {
	currentObj.removeClass("checked");
	currentObj.addClass("background_list");
	currentObj.find(".imgBox_2").addClass("background_imgBox");
}

function enabledSelect(currentObj) {
	currentObj.removeClass("checked");
	currentObj.removeClass("background_list");
	currentObj.find(".imgBox_2").removeClass("background_imgBox");
}

function hasSameElement(source, target) {
	var flag = false;

	for (var i = 0; i < source.length; i++) {
		if (target.indexOf(source[i]) >= 0) {
			flag = true;
			break;
		}
	}
	return flag;
}