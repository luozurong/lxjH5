setTitle("商品详情");
setRefreshOnResume(); //刷新页面(防止返回之后，没有重新请求)
clearHistory(); // 清除历史缓存记录 缓存清除后，后退会直接关闭当前原生界面
localStorage.removeItem("remark");
switchFullScreen(false); //关闭全屏显示
var commoditySkuAttrIds = ""; //商品SKU属性的ID
var commodityNumbers = 1; //商品数量信息
var productSkuData = ""; //商品的SKU数据
var commodityDetails = ""; //用户选择的商品规格信息
var pageNum = 1; //分页信息
var sourceSkuCategoriesId = ""; //商品默认的SKU分类
var selectSkuCategoriesId = ""; //用户已经选择了的SKU分类id
var stockQuantity = 0; //当前规格的商品库存数量
var flag = true; //是否选择了商品SKU
var userShoppingInfo = ""; //用户购物车里面的商品信息
var skuList = "";
var skuIdString;
var price = 0; //用户添加到收藏夹的时候，商品的价格
var hasChonise = "No"; //判断用户是否加入过该商品
var skuAttrIdsRecord = ""; //记录用户选择商品SKU
var shoppingCartCount = 0; //购物车已购买的商品数量
var boxSkuHistory = "";
var skuName = "";
var key_border = ""; //键盘调用状态
var clickInfo = ""; //判断点击的是立即购买还是加入购物车
var photo;
var minPrice;
var maxPrice;
var commodityCheckSku = "";
var commentCount = "";
var photoLink = "";
var buyPeople;
var photoUrl = GetURLParameter("photoUrl");
initializeSession(); //初始化
//解析商品id
var commodityId = GetURLParameter("commodityId");

// 新手礼包对应的活动id
var giftbagId = GetURLParameter("giftbagId");
if(!isCondition(giftbagId)) {
	giftbagId = '';
}
//小区机构编号
areaCode = sessionStorage.getItem("areaCode");
/*commodityId="152445198936192357fa81d44f5c8d6c";
areaCode="4400100001";
token="15248102431413bca1737a8744788965";
host="https://tt.hori-gz.com:8443";*/

// 添加埋点
var isVisitor = false;
if(token.indexOf("_") == 0) {
	isVisitor = true;
}

//设置时间戳
var time_stamp = getTimeStamp();

function showView() {
	getData();
}
//当token为空时将跳转到下载页面
$(window).load(function() {
	if(token == null || token == "") {
		window.location.href = host + "/mms/html5/common/loading/downloadWarn.htm";
	} else {
		var jsonData = {
			eventId: "click25",
			eventName: "商品详情页浏览次数"
		};
		jsonData = JSON.stringify(jsonData);
		//调用APP接口，添加百度统计
		nativeMethod("baiduStatistics", jsonData);
		showView();
	}
});
//判断空值
function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
//toast弹出框
function toast(message) {
	layer.msg(message);
}

function doubleValue(price) {
	return(Math.round(price * 10000) / 10000).toFixed(2);
}

function getNewlist(list, key) {
	var newList = new Array();
	var oldList = [];
	oldList = list;
	for(var i = 0; i < oldList.length; i++) {
		if(oldList[i].skuId.indexOf(key) >= 0) {
			newList.push(oldList[i])
		}
	}
	return newList;
}

function getTagBox() {
	var tagBoxList = new Array();
	var tagBox = $('ul[name="skuBox"]');
	var key = "0";
	for(var i = 0; i < tagBox.length; i++) {
		var items = $(tagBox[i]).find('li');
		for(var j = 0; j < items.length; j++) {
			if($(items[j]).hasClass("current")) {
				key = "1";
				break;
			}
		}
		if(key == "0") {
			//提示用户选出商品对应的规则型号
			tagBoxList.push(tagBox[i]);
		}
		key = "0";
	}
	return tagBoxList;
}

function getshowStatue0(list) {
	var newList = new Array();
	for(var i = 0; i < list.length; i++) {
		if(list[i].showStatue == '0') {
			newList.push(list[i]);
		}
	}
	return newList;
}

function changeSkustate(list) {
	for(var i = 0; i < list.length; i++) {
		var items = $(list[i]).find('li');
		for(var j = 0; j < items.length; j++) {
			$(items[j]).addClass("fallChoose");
		}
	}
}

function changeOneSkuliststate(list, skuBoxlist1) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].showStatue == '0') {
			var items = $(skuBoxlist1[0]).find('li');
			for(var j = 0; j < items.length; j++) {
				if(list[i].skuId.indexOf($(items[j]).attr("id")) >= 0) {
					$(items[j]).addClass("fallChoose");
					break;
				}
			}
		}
	}
}

function changeNoneSkuliststate(idlist, nonelist) {
	$("#productCommoditySku ul").each(function(i, e) {
		var listLi = $(e).children("li[class!='current']");
		if(listLi.length > 0) {
			isChange(listLi, idlist, nonelist, i)
		}
	})
}

function isChange(list1, list2, list3, index) {
	for(var i = 0; i < list1.length; i++) {
		var newlist1 = new Array();
		newlist1 = list2.slice(0);
		newlist1[index] = $(list1[i]).attr('id');
		var skuIda = newlist1.join(",");
		for(var j = 0; j < list3.length; j++) {
			if(list3[j].skuId == skuIda) {
				$(list1[i]).addClass("fallChoose");
				break;
			}
		}
	}
}

function getskushowStatue() {
	var skuIdArridlist = new Array();
	//	var skuIdNoneidlist = new Array();//没有选中状态的规格
	var skuCommodityList = new Array();
	var skuListO = new Array();
	var showStatue = 0;
	skuListO = skuList;
	$("#productCommoditySku li").each(function() {
		if($(this).attr("class") == "current") {
			skuIdArridlist.push($(this).attr("id"));
		} else {
			//skuIdNoneidlist.push($(this).attr("id"));
		}
	});
	for(var i = 0; i < skuIdArridlist.length; i++) {
		skuListO = getNewlist(skuListO, skuIdArridlist[i])
	}
	for(var i = 0; i < skuListO.length; i++) {
		if(skuListO[i].showStatue == '1') {
			showStatue = 1
			break;
		}
	}
	var skuBoxlist = getTagBox();
	if(skuBoxlist.length == '0') {
		$('#productCommoditySku li').removeClass("fallChoose")
		var showNonelist = getshowStatue0(skuList); //不可选择的规格组合数组
		changeNoneSkuliststate(skuIdArridlist, showNonelist);
	} else {
		$('#productCommoditySku li').removeClass("fallChoose")
	}
	if(showStatue == '0') {
		changeSkustate(skuBoxlist);
	} else {
		if(skuBoxlist.length == '1') {
			changeOneSkuliststate(skuListO, skuBoxlist);
		}
	}
}

//选中规格型号对应的价格的显示
function selectprice() {
	var flags = false;
	var skuIdArr = "";
	$("#productCommoditySku li").each(function() {
		if($(this).attr("class") == "current") {
			if(skuIdArr.length == "") {
				skuIdArr = $(this).attr("id");
			} else {
				skuIdArr = skuIdArr + "," + $(this).attr("id");
			}

		}
	});
	if(skuIdArr == "") { //没有选择任何规格
		flags = false;
	} else {
		for(var i = 0; i < skuList.length; i++) {
			if(skuIdArr == skuList[i].skuId) {
				var everyprice = skuList[i].price;
				$("#eachprice").html("<span class='font02'>¥</span><span class='font02'>" + everyprice.split('.')[0] + "</span>.<span class='font01'>" + everyprice.split('.')[1] + "</span>");
				//              $("#eachprice").css("font-size", "0.2rem");
				flags = true;
				break;
			} else {
				flags = false;

			}
		}
	}
	if(!flags && $("#productCommoditySku li").length > 0) {
		$("#eachprice").html("<span class='font02'>¥</span><span class='font02'>" + minPrice.split('.')[0] + "</span>.<span class='font01'>" + minPrice.split('.')[1] + "</span>" + "<span  class='line_Box'> ～</span><span class='font02'>" + maxPrice.split('.')[0] + "</span>.<span class='font01'>" + maxPrice.split('.')[1] + "</span>");
		//      $("#eachprice").css("font-size", "0.2rem"); 
	}

}

function refreshData() {
	setTimeout(function() {
		flag = true;
		$('.btn_reduce,.btn_add,.colorClassify>li').off('click');
		//预览大图时数据重复加载问题
		$(".dives .mui-slider-item").each(function(i, e) {
			if($(this).attr("id") == 'first-photo' || $(this).attr("id") == 'last-photo') {} else {
				$(this).remove();
			}
		});
		getshoppingNum();
		selectprice();
		getData();
	}, 0);

	return 1;
}

function photoLinks(ele) {
	//window.location.href=($(ele).attr("data-src"));
	showActivity($(ele).attr("data-src"), "商品详情");
}
$(document).ready(function() {

	$(".activityLose div").on("click", function() {
		gobackIndex();
	});
	//点击查看全部评价按钮跳转到评价列表页面
	$(".evalucateButton").on("click", function() {
		if(isVisitor) {
			needLogin(token);

			return false;
		}
		showActivity(host + "/mms/html5/mall/evaluate.htm?commodityId=" + commodityId, "全部评价");
	});

	//点击弹窗里的加入购物车
	$("#selected").on("click", function() {
		if(isVisitor) {
			needLogin(token);
			return false;
		}
		pushShoppingcart();
		getshoppingNum();
	});
	//点击弹窗里的确定
	$("#confirm").on("click", function() {
		if(isVisitor) {
			needLogin(token);
			return false;
		}
		nowBuy();
		
	});
	//点击购物车跳转到购物车页面，带有编辑按钮在标题
	$(".shoppingcart").on("click", function() {
		if(isVisitor) {
			needLogin(token);
			return false;
		}
		showActivitySpecial(host + "/mms/html5/supermarket/shoppingcart.htm?type=1", "购物车", 1, null);
		// showActivitySpecial(host + "/mms/html5/mall/shoppingcart.htm", "购物车", 1, null);
	});
	//个人收藏商品与取消收藏商品
	$("#favorite").on("click", function() {
		if(isVisitor) {
			needLogin(token);
			return false;
		}
		var srcUrl = $("#favoriteImg").attr("src").split("/");
		var last = parseInt(srcUrl.length) - 1;
		var sellerId = sessionStorage.getItem("sellerId");
		if(!sessionStorage.getItem("sellerId") || sessionStorage.getItem("sellerId") == "undefined" || sessionStorage.getItem("sellerId") == "") {
			return false;
		}
		getFavorite();

		function getFavorite() {
			var str = "{\"body\":{\"sellerId\":\"" + sellerId + "\",\"price\":\"" + price + "\",\"commodityId\":\"" + commodityId + "\",\"type\":\"1\",\"commodityType\":2},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
			if(srcUrl[last] == "ic_-collection-@3x.png") {
				$.ajax({
					type: "post",
					async: false,
					url: host + "/mms/servlet/addUserComOrSellerLove?str=" + str,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback",
					success: function(data) {
						if(data.result == "0") {
							var message = "收藏成功";
							toast(message);
							$("#favorite>a>img").attr("src", "images/ic_-collectioned@3x.png");
						} else {
							var message = "收藏失败";
							toast(message);
						}

					}
				});
			} else {
				$.ajax({
					type: "post",
					async: false,
					url: host + "/mms/servlet/addUserComOrSellerLove?str=" + str,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback",
					success: function(data) {
						if(data.result == "0") {
							var message = "取消收藏成功";
							toast(message);
							$("#favorite>a>img").attr("src", "images/ic_-collection-@3x.png");
						} else {
							var message = "取消收藏失败";
							toast(message);
						}

					}
				});
			}
		}
	});
	//设置商品的数量
	$('.productvalue').bind('blur', function() {
		commodityNumbers = $(".productvalue").val();
		commodityNumbers = parseInt(commodityNumbers);
		var canPushNumbers = parseInt(100) - parseInt(shoppingCartCount); //实际上可加入的商品数量
		var message = "";
		if(commoditySkuAttrIds != '') {
			var tagBox = $('ul[name="skuBox"]');
			skuIdString = "";
			var message = "No";
			for(var i = 0; i < tagBox.length; i++) {
				var items = $(tagBox[i]).find('li');
				for(var j = 0; j < items.length; j++) {
					//如果选中了某种规则，再次点击就取消选中
					if($(items[j]).hasClass("current")) {
						flag = false;
					}
				}
				if(flag) {
					//提示用户选出商品对应的规则型号
					message = message + $(tagBox[i]).attr("skuName") + "&nbsp";
				} else {
					flag = true;
				}
			}
			if(message == "No") {
				flag = false;
			}
			if(productSkuData.length > 0 && flag) { //判断用户是否将商品SKU选择完整
				if(commodityNumbers <= 1) {
					$(".productvalue").val(1);
					commodityNumbers = 1;
					$(".btn_add").removeClass("disabled"); //将添加数量的按钮置灰色
					$(".btn_reduce").addClass("disabled");
				} else {

					$(".btn_add").removeClass("disabled"); //将添加数量的按钮置灰色
					$(".btn_reduce").removeClass("disabled");
				}
				return;
			} else {
				if(commodityNumbers > stockQuantity && canPushNumbers != 0) {
					if(stockQuantity > 100) { //足够库存的情况下
						if(commodityNumbers < canPushNumbers) { //输入的商品数量没有超过允许的数量
							$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
							$(".btn_reduce").removeClass("disabled");
						} else {
							message = "亲，商品购买数量已达上限了";
							toast(message);
							$(".productvalue").val(canPushNumbers);
							commodityNumbers = canPushNumbers;
							$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
							$(".btn_reduce").removeClass("disabled");
						}
					} else if(stockQuantity == 100) { //当总库存为101，添加一件商品到购物车之后的情况或者当总库存为100，购物车还没有此件商品
						message = "亲，商品购买数量已达上限了";
						toast(message);
						$(".productvalue").val(canPushNumbers);
						commodityNumbers = canPushNumbers;
						$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
						$(".btn_reduce").removeClass("disabled");
					} else { //库存少于100的情况
						if(stockQuantity == 1) {
							message = "亲，老板没那么多存货呢";
							toast(message);
							$(".productvalue").val(stockQuantity);
							commodityNumbers = stockQuantity;
							$(".btn_add").addClass("disabled");
							$(".btn_reduce").addClass("disabled");
						} else if(canPushNumbers < stockQuantity) {
							message = "亲，商品购买数量已达上限了";
							toast(message);
							$(".productvalue").val(canPushNumbers);
							commodityNumbers = canPushNumbers;
							$(".btn_add").addClass("disabled");
							if(canPushNumbers <= 1) {
								$(".btn_reduce").addClass("disabled");
							} else {
								$(".btn_reduce").removeClass("disabled");
							}
						} else {
							message = "亲，老板没那么多存货呢";
							toast(message);
							if(stockQuantity <= 1) {
								$(".productvalue").val(1);
								commodityNumbers = 1;
								$(".btn_add").addClass("disabled");
								$(".btn_reduce").addClass("disabled");
							} else {
								$(".productvalue").val(stockQuantity);
								commodityNumbers = stockQuantity;
								$(".btn_add").addClass("disabled");
								$(".btn_reduce").removeClass("disabled");
							}

						}
					}
				} else if(commodityNumbers == stockQuantity && canPushNumbers != 0) {
					if(stockQuantity > 100) {
						message = "亲，商品购买数量已达上限了";
						toast(message);
						$(".productvalue").val(canPushNumbers);
						commodityNumbers = canPushNumbers;
						$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
						$(".btn_reduce").removeClass("disabled");
					} else {
						if(stockQuantity <= 1) {
							$(".productvalue").val(1);
							commodityNumbers = 1;
							$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
							$(".btn_reduce").addClass("disabled");
						} else {
							message = "亲，老板没那么多存货呢";
							toast(message);
							$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
							$(".btn_reduce").removeClass("disabled");
						}
					}
				} else if(commodityNumbers <= 1) {
					if(canPushNumbers <= 1 || stockQuantity <= 1) {
						$(".productvalue").val(1);
						commodityNumbers = 1;
						$(".btn_add").addClass("disabled");
						$(".btn_reduce").addClass("disabled");
					} else {
						$(".productvalue").val(1);
						commodityNumbers = 1;
						$(".btn_add").removeClass("disabled");
						$(".btn_reduce").addClass("disabled");
					}
				} else if(canPushNumbers == 0) { //购物车已经购买100件商品
					message = "亲，商品购买数量已达上限了";
					toast(message);
					$(".productvalue").val(1);
					commodityNumbers = 1;
					$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
					$(".btn_reduce").addClass("disabled");
				} else if(commodityNumbers >= canPushNumbers) {
					if(canPushNumbers <= 1) {
						message = "亲，商品购买数量已达上限了";
						toast(message);
						$(".productvalue").val(1);
						commodityNumbers = 1;
						$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
						$(".btn_reduce").addClass("disabled");
					} else {
						message = "亲，商品购买数量已达上限了";
						toast(message);
						$(".productvalue").val(canPushNumbers);
						commodityNumbers = canPushNumbers;
						$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
						$(".btn_reduce").removeClass("disabled");
					}
				} else {
					$(".btn_reduce").removeClass("disabled");
				}
			}
		} else {
			$("#iddd").show();
			//没有选中规则的时候显示效果
			if(commodityNumbers == 0 || commodityNumbers == 1) {
				$(".btn_add").removeClass("disabled");
				$(".btn_reduce").addClass("disabled")
			} else {
				$(".btn_add").removeClass("disabled");
				$(".btn_reduce").removeClass("disabled");
			}
		}
		if(giftbagId != "" && giftbagId != null && giftbagId != undefined) {
			$(".productvalue").val(1);
			commodityNumbers = 1;
			$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
			$(".btn_reduce").addClass("disabled"); //将减法数量的按钮置灰色
		}
	});
	//点击加入购物车对应的商品规则的选择弹出
	$(".addShoppingCart").on("click", function() {
		//按钮统计
		_hmt.push(['_trackEvent', commodityId, '1', '加入购物车']); //百度统计 点击次数	

		if(isVisitor) {
			needLogin(token);
			return false;
		}
		$(".selected").show();
		$(".confirm").hide();
		clickInfo = 1;
		if(productSkuData.length == 0) {
			var push = "Yes";
			if(hasChonise == "Yes") {
				stockQuantity = sessionStorage.getItem("stockQuantity");
				var canPushNumbers = parseInt(100) - parseInt(shoppingCartCount); //可加入的商品数量
				var selectNumbers = parseInt(commodityNumbers);
				if(selectNumbers > stockQuantity) {
					push = "No";
					var message = "亲，老板没那么多存货呢";
					toast(message);
				} else if(selectNumbers > canPushNumbers) {
					push = "No";
					var message = "亲，老板没那么多存货呢";
					toast(message);
				}
			} else {
				if(userShoppingInfo.length > 0) {
					for(var i = 0; i < userShoppingInfo.length; i++) {
						if(userShoppingInfo[i].commodityId == commodityId) {
							var selectNumbers = parseInt(userShoppingInfo[i].count) + parseInt(commodityNumbers);
							var canPushNumbers = parseInt(100) - parseInt(userShoppingInfo[i].count); //可加入的商品数量
							if(selectNumbers > stockQuantity) {
								push = "No";
								var message = "亲，老板没那么多存货呢";
								toast(message);
							} else if(commodityNumbers > canPushNumbers) {
								push = "No";
								var message = "亲，老板没那么多存货呢";
								toast(message);
							}
						}
					}
				} else {
					var selectNumbers = parseInt(commodityNumbers);
					if(selectNumbers > stockQuantity || stockQuantity < 0) {
						push = "No";
						var message = "亲，老板没那么多存货呢";
						toast(message);
					}
				}
			}
			if(push == "Yes") {
				pushShoppingcart();
				getshoppingNum();

			}
		} else {
			$(".productParam").css("display", "block");
			$("#overlay").show();
			$("body").css("overflow", "hidden");
			$("body").css("position", "fixed");
		}
	});
	//点击立即购买对应的商品规则的选择弹出
	$(".nowBuy").on("click", function() {
		//按钮点击统计
		_hmt.push(['_trackEvent', commodityId, '2', '立即购买']); //百度统计 点击次数	

		if(isVisitor) {
			needLogin(token);
			return false;
		}
		if(GetURLParameter("isbindingHouse") == "0") {
			if(isCondition(sessionStorage.getItem("lxjversionsName")) && Number(sessionStorage.getItem("lxjversionsName")) >= 4008) {
				nativeMethod("bindingHouse", null);
				return false;
			}
		}
		$(".selected").hide();
		$(".confirm").show();
		clickInfo = 2;
		if(productSkuData.length == 0) {
			var push = "Yes";
			if(hasChonise == "Yes") {
				stockQuantity = sessionStorage.getItem("stockQuantity");
				var canPushNumbers = parseInt(100) - parseInt(shoppingCartCount); //可加入的商品数量
				var selectNumbers = parseInt(commodityNumbers);
				if(selectNumbers > stockQuantity) {
					push = "No";
					var message = "亲，老板没那么多存货呢";
					toast(message);
				} else if(selectNumbers > canPushNumbers) {
					push = "No";
					var message = "亲，老板没那么多存货呢";
					toast(message);

				}
			} else {
				if(userShoppingInfo.length > 0) {
					for(var i = 0; i < userShoppingInfo.length; i++) {
						if(userShoppingInfo[i].commodityId == commodityId) {
							var selectNumbers = parseInt(userShoppingInfo[i].count) + parseInt(commodityNumbers);
							var canPushNumbers = parseInt(100) - parseInt(userShoppingInfo[i].count); //可加入的商品数量
							if(selectNumbers > stockQuantity) {
								push = "No";
								var message = "亲，老板没那么多存货呢";
								toast(message);
							} else if(commodityNumbers > canPushNumbers) {
								push = "No";
								var message = "亲，老板没那么多存货呢";
								toast(message);
							}
						}
					}
				} else {
					var selectNumbers = parseInt(commodityNumbers);
					if(selectNumbers > stockQuantity || stockQuantity < 0) {
						push = "No";
						var message = "亲，老板没那么多存货呢";
						toast(message);
					}
				}
			}
			if(push == "Yes") {
				nowBuy();
				$(".colorClassify>li").removeClass("current");
			}
		} else {
			$(".productParam").css("display", "block");
			$("#overlay").show();
			$("body").css("overflow", "hidden");
			$("body").css("position", "fixed");
		}
	});
	$(".closeSku").on("click", function() {
		$(".productParam").css("display", "none");
		$("#overlay").hide();
		$("body").css("overflow", "auto");
		$("body").css("position", "relative");
	});
	$("#overlay").on("click", function() {
		$(".productParam").css("display", "none");
		$("#overlay").hide();
		$("body").css("overflow", "auto");
		$("body").css("position", "relative");
	});
	//数量输入的时候键盘弹出和收起的控制
	$('#productvalue').bind('focus', function() {
		key_border = 1;
		$("body").css({
			'overflow': 'hidden',
			'position': 'fixed'
		});
		$("#overlay").css({
			'top': '0',
			'overflow': 'hidden'
		});
		if(clientType == "ios") {
			$(".productParam").css({
				'top': '70%',
				'overflow': 'hidden',
				'height': '30%'
			});
		} else {
			setTimeout(function() {
				$(".productParam").css({
					'overflow': 'hidden',
					'height': '40%',
					'bottom': '0'
				});
				var idddheight = $(".productParam").height() - $(".shoppingNum").height();
				$("#iddd").css({
					"height": idddheight + "px",
					'line-height': idddheight + 'px'
				});
			}, 500);
		}

		$("#productCommoditySku").hide();
		$("#selected").hide();
		$("#confirm").hide();
		$(".shoppingNum").css("bottom", "0");
		$("#iddd").show();
		var tagBox = $('ul[name="skuBox"]');
		var message = "";
		var key = "0";
		for(var i = 0; i < tagBox.length; i++) {
			var items = $(tagBox[i]).find('li');
			for(var j = 0; j < items.length; j++) {
				if($(items[j]).hasClass("current")) {
					key = "1";
				}
			}
			if(key == "0") {
				//提示用户选出商品对应的规则型号
				message = message + $(tagBox[i]).attr("skuName") + "&nbsp";
			}
			key = "0";
		}
		if(message == "") {
			key = "0";
		}
		if(key == "0" && message != "") { //提示还没有选择的规格信息
			$("#iddd").html("<span>请选择：</span>" + "<span>" + message + "</span>");
			$("#iddd").css("height", "120px");
		} else if(message != "" && key == "1") {
			$("#iddd").html("<span>请选择：</span>" + "<span>" + message + "</span>");
		} else {
			//已选中规则型号的显示效果
			$("#iddd").html("<span>已选：</span>" + "<span>" + commodityDetails + "</span>");
		}
	}).bind('blur', function() {
		key_border = 0;
		$("body").css({
			'overflow': 'hidden',
			'position': 'fixed',
			'top': '0'
		});
		if(clickInfo == 1) {
			$("#selected").show();
			$("#confirm").hide();
		} else if(clickInfo == 2) {
			$("#selected").hide();
			$("#confirm").show();
		}

		$("#productCommoditySku").show();
		$(".productParam").css({
			'overflow': 'auto',
			'height': '50%'
		});
		if(clientType == "ios") {
			$(".productParam").css({
				'top': '50%'
			});
		}
		$(".shoppingNum").css("bottom", "50px");
		$("#iddd").hide();
	});

	getshoppingNum();
	getComment();
});

//监听安卓机的键盘收起
var $windowHeight = $(window).height();
$(window).resize(function() {
	if(clientType == "ios") {
		return false;
	}
	if($windowHeight <= $(window).height()) {
		//收起键盘的时候
		$("body").css('overflow', 'hidden');
		//	layer.msg(document.body.style.overflow+"006"+$windowHeight+"  "+$(window).height(),{time:5000});
		if($windowHeight <= $(window).height() && key_border != 1) {
			$("body").css('overflow', 'auto');
		}
		if(key_border == 1) {
			$("body").css({
				'overflow': 'hidden',
				'position': 'fixed',
				'top': '0'
			});
			if(clickInfo == 1) {
				$("#selected").show();
				$("#confirm").hide();
			} else if(clickInfo == 2) {
				$("#selected").hide();
				$("#confirm").show();
			}
			$("#productCommoditySku").show();
			$(".productParam").css({
				'overflow': 'auto',
				'height': '50%'
			});
			if(clientType == "ios") {
				$(".productParam").css({
					'top': '50%'
				});
			}
			$(".shoppingNum").css("bottom", "50px");
			$("#iddd").hide();
			key_border = 0;
		}
	} else {
		key_border = 1;
		//  弹出键盘的时候
		$("body").css({
			'overflow': 'hidden',
			'position': 'fixed'
		});
		$("#overlay").css({
			'top': '0',
			'overflow': 'hidden'
		});
		if(clientType == "ios") {
			$(".productParam").css({
				'top': '70%',
				'overflow': 'hidden',
				'height': '30%'
			});
		} else {
			setTimeout(function() {
				$(".productParam").css({
					'overflow': 'hidden',
					'height': '40%',
					'bottom': '0'
				});
				var idddheight = $(".productParam").height() - $(".shoppingNum").height();
				$("#iddd").css({
					"height": idddheight + "px",
					'line-height': idddheight + 'px'
				});
			}, 500);
		}

		$("#productCommoditySku").hide();
		$("#selected").hide();
		$("#confirm").hide();
		$(".shoppingNum").css("bottom", "0");
		$("#iddd").show();
		var tagBox = $('ul[name="skuBox"]');
		var message = "";
		var key = "0";
		for(var i = 0; i < tagBox.length; i++) {
			var items = $(tagBox[i]).find('li');
			for(var j = 0; j < items.length; j++) {
				if($(items[j]).hasClass("current")) {
					key = "1";
				}
			}
			if(key == "0") {
				//提示用户选出商品对应的规则型号
				message = message + $(tagBox[i]).attr("skuName") + "&nbsp";
			}
			key = "0";
		}
		if(message == "") {
			key = "0";
		}
		if(key == "0" && message != "") { //提示还没有选择的规格信息
			$("#iddd").html("<span>请选择：</span>" + "<span>" + message + "</span>");
			$("#iddd").css("height", "24px");
		} else if(message != "" && key == "1") {
			$("#iddd").html("<span>请选择：</span>" + "<span>" + message + "</span>");
		} else {
			//已选中规则型号的显示效果
			$("#iddd").html("<span>已选：</span>" + "<span>" + commodityDetails + "</span>");
		}
	}
});
//购物车数量信息的填入
function getshoppingNum() {
	var str = "{\"body\":{\"areaOrgSeq\":\"" + areaCode + "\",\"commodityId\":\"" + commodityId + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/getShoppingcartCountServlet?str=" + str,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			var totalCount = data.totalCount;
			if(totalCount > 9) {
				$("#shoppingCart").show();
				$("#shoppingCart").empty().html("…");
				$("#shoppingCart").css("height", "0.14rem");
				$("#shoppingCart").css("line-height", "0.1rem");
			} else if(totalCount <= 0) {
				$("#shoppingCart").hide();
			} else {
				$("#shoppingCart").show();
				$("#shoppingCart").empty().append(totalCount);
				$("#shoppingCart").css("height", "0.14rem");
				$("#shoppingCart").css("line-height", "0.14rem");
			}
		}
	});
}

function getData() {
	var str = "{\"body\":{\"areaOrgSeq\":\"" + areaCode + "\",\"commodityId\":\"" + commodityId + "\",\"giftbagId\":\"" + giftbagId + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/getCommodityDetail?str=" + str,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(data);
			userShoppingInfo = data.shoppingCartInfo;

			//商品规则型号
			skuList = data.skuList;
			if(data.commoditySku.length == 0) {
				stockQuantity = data.totalStockQuantity;
				for(var j = 0; j < userShoppingInfo.length; j++) {
					if(userShoppingInfo[j].commodityId == commodityId) {
						shoppingCartCount = parseInt(userShoppingInfo[j].count);
					}
				}

			}
			//添加轮播图的小圆圈
			var photo = data.product[0].photo;
			buyPeople = data.product[0].buyPeople;
			if(photo.length > 1) {
				//遍历轮番的banner图
				//遍历product里面的photo数组
				var length_p = photo.length - 1;
				var first_photo = photo[0];
				first_photo = first_photo.photoUrl; //第一张图片的URL
				var last_photo = photo[length_p];
				last_photo = last_photo.photoUrl; //最后一张图片的URL
				$("#first-photo>a>img").attr("ssrc", last_photo);
				$("#first-photo>a>img").css("background-image", "url(" + last_photo + ")");
				$("#last-photo>a>img").attr("ssrc", first_photo);
				$("#last-photo>a>img").css("background-image", "url(" + first_photo + ")");
				for(var i = 0; i < photo.length; i++) {
					var imgUrl = photo[i];
					var product = _.template($("#productTemplate").html());
					$('#last-photo').before(product(imgUrl)); //在最后一张之前推进图片
				}

				var str_circle = '<div class="mui-indicator mui-active"></div>';
				for(var i = 0; i < photo.length - 1; i++) {
					str_circle += '<div class="mui-indicator"></div>';
				}
				$("#mui-slider-circle").empty().append(str_circle);
				mui.init();
				(function() {
					var slider = mui("#slider");
					slider.slider({
						interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
					});
					$('.mui-slider-item').on('tap', function() {
						//详情图片预览 恢复头部当前第几张显示
						$('.mui-preview-header').show();
						if($('#__MUI_PREVIEWIMAGE').css('display') == 'none') {
							slider.slider({
								interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
							});
						}
					});
					//预览图轻触事件 恢复滚动
					$('#__MUI_PREVIEWIMAGE').on('tap', function() {
						if($('#__MUI_PREVIEWIMAGE').css('display') == 'block') {
							slider.slider({
								interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
							});
						}
						var currentImage = $('.mui-preview-indicator').text().split('/')[0];
						slider.slider().gotoItem(currentImage - 1); //跳转到第currentImage-1张图片，gotoItem()从0开始；
					})
				})(mui);
				//              一张图情况
			} else if(photo.length == 1) {
				var product = _.template($("#productTemplate").html());
				$('#last-photo').before(product(photo[0])); //在最后一张之前推进图片
				(function() {
					//轮播图片轻触事件 不滚动
					mui('.mui-slider').slider().setStopped(true);

				})(mui);
				//无图情况
			} else {
				//轮番图默认图
				var commodityLogo = data.product[0].commodityLogo;
				//如果没有轮番图就用列表里默认的图
				var commodityLogoHtml = "<div class='morentu'><img src='' class='photoUrl' style='width:100%;height:1.8rem;' /></div>";
				$(".lunbotu1").hide();
				$(".lunbotu2").hide();
				$('#slider').empty().append(commodityLogoHtml);
				$('.photoUrl').attr('src', commodityLogo);
			}
			//推荐商品图片显示
			var recommendphoto = data.product[0].recommendPhoto;
			$("#recommandphoto").find("div").eq(2).css("float", "right");
			if(recommendphoto.length == 0) {
				$(".recommandphotoBox").hide();
			} else {
				$('#recommandphoto').empty();
				for(var i = 0; i < recommendphoto.length; i++) {
					var imgUrl = recommendphoto[i];
					var photoUrl = imgUrl.photoUrl;
					photoLink = imgUrl.photoLink;
					if(photoLink) {
						recommandphotoes = '<div style="float: left;width: 50%;box-sizing: border-box;"><img src="' + photoUrl + '" class="recommendpic" data-src="' + photoLink + '"  onclick="photoLinks(this)"/></div>';
					} else {
						recommandphotoes = '<div style="float: left;width: 50%;box-sizing: border-box;"><img src="' + photoUrl + '" class="recommendpic" data-src="' + photoLink + '"/></div>';
					}
					$('#recommandphoto').append(recommandphotoes);
					$('#recommandphoto .recommendpic').height($('#recommandphoto .recommendpic').width());

				}
			}

			//原价如果为0的时候就不显示
			var productName = data.product[0];
			maxPrice = productName.maxPrice;
			minPrice = productName.minPrice;
			var commodityFufen = productName.commodityFufen;
			var fufenType = productName.fufenType;
			if(maxPrice == minPrice) {
				//最低价和最高价
				productName.minintegerT = (minPrice + "").split(".")[0];
				productName.minscaleT = (minPrice + "").split(".")[1];
				productName.maxintegerT = (maxPrice + "").split(".")[0];
				productName.maxscaleT = (maxPrice + "").split(".")[1];
				var productInformation = _.template($("#productInformationTemplate").html());
				$("#productInformation").empty().append(productInformation(productName));
				$(".minPrice").show();
				$("#line_Box").hide();
				$(".originalPrice").hide();
			} else {
				//最低价和最高价
				productName.minintegerT = (minPrice + "").split(".")[0];
				productName.minscaleT = (minPrice + "").split(".")[1];
				productName.maxintegerT = (maxPrice + "").split(".")[0];
				productName.maxscaleT = (maxPrice + "").split(".")[1];
				var productInformation = _.template($("#productInformationTemplate").html());
				$("#productInformation").empty().append(productInformation(productName));

			}
			price = productName.minPrice;
			sessionStorage.setItem("sellerId", data.sellerId);

			if(!isCondition(commodityFufen) || doubleValue(commodityFufen) < 0.01) {
				$(".fufen").hide();
			} else {
				$(".fufen").show();
			}
			if(fufenType == 0) {
				$(".fufen").css("background", "none");
				$(".fufen").css("color", "#ff661b");
			}
			//促销商品 对应的数据
			var promotionInfo = _.template($("#promotionInfoTemplate").html());
			$("#promotionInfo").empty().append(promotionInfo(data));

			var Bigcarriage = _.template($("#BigcarriageTemplate").html());
			$("#Bigcarriage").empty().append(Bigcarriage(data));

			//判断运费显示情况 如果是运费模板type=2将不显示否则就显示统一运费
			var freightType = data.freightType;
			var freight = data.freight;
			if(freight == 0) {
				$("#carriage").html("免邮");
				$("#carriage").css("margin-left", "0.08rem");
			}
			var promotionInfo = data.promotionInfo;
			if(promotionInfo == 0) {
				$("#promotionInfo").hide();
			}
			//服务保障信息填入
			var sevice = data.product[0];
			var safeguard = _.template($("#safeguardTemplate").html());
			$("#safeguard").empty().append(safeguard(sevice));
			if(sevice.sevenDay == "0") {
				$(".sevenDay").hide()
			}
			if(sevice.ppsq == "0") {
				$(".ppsq").hide()
			}
			if(sevice.zpbz == "0") {
				$(".zpbz").hide()
			}

			// 新手礼包页面的判断展示
			var giftBagPrice = data.giftBagPrice;
			mingiftBagPrice = (giftBagPrice + "").split(".")[0];
			maxgiftBagPrice = (giftBagPrice + "").split(".")[1];

			if(giftbagId != "" && giftbagId != null && giftbagId != undefined) {
				$(".addShoppingCart").hide();
				$(".shoppingcart").hide();
				$("#favorite").hide();
				$(".shoppingfixed").css("height", "68px");
				$("#none_bottom").css("height", "68px");
				$(".shoppingfixed").css("line-height", "68px");
				$(".shoppingfixed").removeClass('border-t1');
				$(".nowBuy").addClass("nowBuy2");
				$(".nowBuy").removeClass('floatR');
				$(".nowBuy>a").css("height", "40px");
				$(".nowBuy>a").css("line-height", "40px");
				//$(".currentPrice>span").eq(0).html(mingiftBagPrice);
				//$(".currentPrice>span").eq(1).html(maxgiftBagPrice);
				//$(".minPrice").hide();
				$("#line_Box").hide();
				$(".originalPrice").hide();

			}
			//店铺名称
			var sellerName = data;
			var sellerNamess = _.template($("#sellerNameTemplate").html());
			$("#sellerName").empty().append(sellerNamess(sellerName));

			//在商品参数页里推入对应的商品参数信息
			var productCommodity = data.productCommodity[0];
			if(data.hasParams == "No" && data.hasParam2 == "No") {
				// $("#NoproductCommodity").show();
			} else {
				var productCommodityinform = _.template($("#productCommodityTemplate").html());
				$("#productCommodityA").empty().append(productCommodityinform(productCommodity));
				var customParams = data.productCommodity[1].customParamsList; //自定义参数
				if(customParams.length > 0) {
					var productcustomParams = _.template($("#customParamsTemplate").html());
					$("#productCommodityB").empty();
					for(var key = 0; key < customParams.length; key++) {
						$("#productCommodityB").append(productcustomParams(customParams[key]));
					}
				}
			}
			//在商品详情页里推入对应的商品详情页信息
			var productDetail = data.productDetail;
			if(data.hasParam2 == "No" || data.hasParam == "No") {

				if(productDetail == "000x000") {
					$(".productCommodityBox").hide();
					$("#productDetail").hide();
				} else {
					$(".productCommodityBox").show();
					var productDetailinform = _.template($("#productDetailTemplate").html());
					$("#productDetail").empty().append(productDetailinform(data));
				}

			} else {
				if(productDetail == "000x000") {
					$(".productCommodityBox").hide();
					$("#productDetail").hide();
				} else {
					$(".productCommodityBox").show();
					var productDetailinform = _.template($("#productDetailTemplate").html());
					$("#productDetail").empty().append(productDetailinform(data));
				}

			}

			//setTimeout(function() {
			//    var bodyHeight = $("body").height();
			//    var paddingbottomheight = $(window).height() - $("body").height();
			//    $("#productDetail").css("padding-bottom", Number(paddingbottomheight) + "px");
			//}, 2000);

			//去除br换行标签
			$("#productDetail").find('br').remove();

			$("#productDetail img").attr("data-preview-src", "");
			$("#productDetail img").attr("data-preview-group", "5");

			//详情图片预览 隐藏头部当前第几张
			$('#productDetail p img').on('tap', function() {
				$('.mui-preview-header').hide();
			});
			//当商品没有折扣信息时候隐藏
			//点击商品参数对应一些属性隐藏和显示
			var commodity = data.productCommodity[0];
			if(commodity.productNote == "0") {
				$("#productNote").css("display", "none")
			} else {
				$("#productNote").css("display", "flex")
			}
			if(commodity.specification == "0") {
				$("#specification").css("display", "none")
			} else {
				$("#specification").css("display", "flex")
			}
			if(commodity.productSize == "0") {
				$("#productSize").css("display", "none")
			} else {
				$("#productSize").css("display", "flex")
			}
			if(commodity.productColor == "0") {
				$("#productColor").css("display", "none")
			} else {
				$("#productColor").css("display", "flex")
			}
			if(commodity.productWeight == "0") {
				$("#productWeight").css("display", "none")
			} else {
				$("#productWeight").css("display", "flex")
			}
			if(commodity.productPlace == "0") {
				$("#productPlace").css("display", "none")
			} else {
				$("#productPlace").css("display", "flex")
			}

			//点击收藏图标时候商品收藏属性的变化
			if(data.favorite == "0") {
				$("#favorite>a>img").attr("src", "images/ic_-collection-@3x.png");
			} else {
				$("#favorite>a>img").attr("src", "images/ic_-collectioned@3x.png");
			}
			//初始化商品价格
			var eachprice = _.template($("#eachpriceTemplate").html());
			$("#eachprice").empty().append(eachprice(productName));

			//初始化商品规格信息
			productSkuData = data.commoditySku;

			$("#productCommoditySku").empty();
			for(var j = 0; j < productSkuData.length; j++) {
				var skuName = _.template($("#productCommoditySkuTemplate").html());
				$("#productCommoditySku").append(skuName(productSkuData[j]));
				var skuParams = productSkuData[j].skuValues;
				var skuID = productSkuData[j].skuId;
				for(var z = 0; z < skuParams.length; z++) {
					$("ul#" + skuID + "").append("<li id=" + skuParams[z].paramId + ">" + skuParams[z].paramName + "</li>");
				}
			}
			if(data.commoditySku.length == 1) {
				getskushowStatue();
			}
			//点击选择当前商品规格型号
			$(".colorClassify>li").on("click", function() {
				if($(this).hasClass("fallChoose")) {
					return false;
				}
				if($(this).hasClass("current")) {
					$(this).removeClass("current");
					flag = true;
				} else {
					$(this).addClass("current");
					$(".productvalue").val(1);
					$(".btn_reduce").addClass("disabled");
				}
				$(this).siblings("li").removeClass("current");
				$(".productvalue").val() + 1;
				commoditySkuAttrIds = new Array();
				commodityDetails = "";
				$("#productCommoditySku li").each(function() {
					if($(this).attr("class") == "current") {
						//第一次选择将此规格的商品加入购物车
						commoditySkuAttrIds = commoditySkuAttrIds + "," + $(this).attr("id");
						var parentNode = $(this).parent();
						var preParentNode = parentNode.prev(); //获取到规格的div
						if(commodityDetails == "") {
							commodityDetails = "" + preParentNode.text() + ":" + $(this).html();
						} else {
							commodityDetails = "" + preParentNode.text() + ":" + $(this).html() + "" + "; " + commodityDetails;
						}
						commoditySkuAttrIds_box = commoditySkuAttrIds.slice(1, commoditySkuAttrIds.length); //去掉字符串前面id的逗号跟空格
						skuAttrIdsRecord = sessionStorage.getItem("skuAttrIdsRecord");
						if(skuAttrIdsRecord == commoditySkuAttrIds_box && hasChonise == "Yes") { //表示在同个界面已经添加过该商品
							stockQuantity = sessionStorage.getItem("stockQuantity");
							for(var j = 0; j < userShoppingInfo.length; j++) {
								if(userShoppingInfo[j].skuId == commoditySkuAttrIds_box && userShoppingInfo[j].commodityId == commodityId) {
									shoppingCartCount = parseInt(userShoppingInfo[j].count);
								}
							}
						} else {
							for(var i = 0; i < skuList.length; i++) { //设置对应规格的商品库存数
								var reoucesIds = skuList[i].skuId;
								if(commoditySkuAttrIds_box == reoucesIds) { //判断商品规格的id是否相同，即是判断选择的规格
									if(userShoppingInfo.length == 0) {
										stockQuantity = skuList[i].stockQuantity;
									} else {
										var isExit = false; //标志购物车是否存在这个商品
										for(var j = 0; j < userShoppingInfo.length; j++) {
											if(userShoppingInfo[j].skuId == commoditySkuAttrIds_box && userShoppingInfo[j].commodityId == commodityId) {
												stockQuantity = parseInt(skuList[i].stockQuantity) - parseInt(userShoppingInfo[j].count);
												shoppingCartCount = parseInt(userShoppingInfo[j].count);
												isExit = true;
											}
											if(isExit) {
												break;
											}
										}
										if(!isExit) {
											stockQuantity = skuList[i].stockQuantity;
											shoppingCartCount = 0;
										}
									}
								}
							}
						}
						$(".productvalue").val(1);
						commodityNumbers = 1;
						var tagBox = $('ul[name="skuBox"]');
						skuIdString = "";
						var message = "No";
						for(var i = 0; i < tagBox.length; i++) {
							var items = $(tagBox[i]).find('li');
							for(var j = 0; j < items.length; j++) {
								if($(items[j]).hasClass("current")) {
									flag = false;
								}
							}
							if(flag) {
								//提示用户选出商品对应的规则型号
								message = message + $(tagBox[i]).attr("skuName") + "&nbsp";
							} else {
								flag = true;
							}
						}
						if(message == "No") {
							flag = false;
						}
						if(productSkuData.length > 0 && flag) { //用户没有将规格信息选择完整
							$(".btn_add").removeClass("disabled");
						} else {
							if(stockQuantity <= 1) { //当前规格的商品库存恰好为1
								$(".btn_add").addClass("disabled");
							} else if(shoppingCartCount >= 99) {
								$(".btn_add").addClass("disabled");
							} else {
								$(".btn_add").removeClass("disabled");
							}
						}
						$(".btn_reduce").addClass("disabled");
					}

				});
				selectprice();
				getskushowStatue();
				if(giftbagId != "" && giftbagId != null && giftbagId != undefined) {
					$(".productvalue").val(1);
					commodityNumbers = 1;
					$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
					$(".btn_reduce").addClass("disabled"); //将减法数量的按钮置灰色
				}
			});

			//商品数量加减符号的控制
			var btn_reduce = $(".btn_reduce");
			var btn_add = $(".btn_add");
			btn_add.on("click", function() {
				if(giftbagId != "" && giftbagId != null && giftbagId != undefined) {
					$(".productvalue").val(1);
					commodityNumbers = 1;
					$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
					$(".btn_reduce").addClass("disabled"); //将减法数量的按钮置灰色
					return false;
				}
				var canPushNumbers = parseInt(100) - parseInt(shoppingCartCount); //可加入的商品数量
				var thisvalue = $(this).parent().find("input");
				if(commoditySkuAttrIds.length != 0) {
					var tagBox = $('ul[name="skuBox"]');
					skuIdString = "";
					var message = "No";
					for(var i = 0; i < tagBox.length; i++) {
						var items = $(tagBox[i]).find('li');
						for(var j = 0; j < items.length; j++) {
							if($(items[j]).hasClass("current")) {
								flag = false;
							}
						}
						if(flag) {
							//提示用户选出商品对应的规则型号
							message = message + $(tagBox[i]).attr("skuName") + "&nbsp";
						} else {
							flag = true;
						}
					}
					if(message == "No") {
						flag = false;
					}
					if(productSkuData.length > 0 && flag) { //判断用户是否将商品SKU选择完整
						thisvalue.val((+thisvalue.val()) + 1);
						$(this).parent().find(".btn_reduce").removeClass("disabled");
						return;
					} else {
						if($(this).hasClass("disabled")) { //判断+是否为不可点击状态
							return;
						}
						if(!isNaN(thisvalue.val())) { //判断输入框是否为数字
							if(shoppingCartCount >= 99) { //判断已购买的商品数量是否等于99,此次只能购买一件商品
								thisvalue.val(1);
								$(this).addClass("disabled");
								$(this).parent().find(".btn_reduce").addClass("disabled");
								commodityNumbers = thisvalue.val(); //商品的数量
							} else {
								thisvalue.val((+thisvalue.val()) + 1);
								var canPushNumbers = parseInt(100) - parseInt(shoppingCartCount);

								if(thisvalue.val() >= canPushNumbers) {

									message = "亲，商品购买数量已达上限了";
									toast(message);
									if(canPushNumbers <= 1) {
										$(this).addClass("disabled");
										thisvalue.val(1);
										$(this).parent().find(".btn_reduce").addClass("disabled");
									} else {
										$(this).addClass("disabled");
										thisvalue.val(canPushNumbers);
										$(this).parent().find(".btn_reduce").removeClass("disabled");
									}
								} else if(thisvalue.val() == 100) {
									message = "亲，商品购买数量已达上限了";
									toast(message);
									$(this).addClass("disabled");
									$(this).parent().find(".btn_reduce").removeClass("disabled");
								} else if(thisvalue.val() == stockQuantity) {
									if(stockQuantity < canPushNumbers) {
										message = "亲，老板没那么多存货呢";
										toast(message);
										$(this).addClass("disabled");
										$(this).parent().find(".btn_reduce").removeClass("disabled");
									} else {
										message = "亲，商品购买数量已达上限了";
										toast(message);
										thisvalue.val(canPushNumbers);
										$(this).addClass("disabled");
										$(this).parent().find(".btn_reduce").removeClass("disabled");
									}
								} else if((+(thisvalue.val())) > 1) {
									if(canPushNumbers == thisvalue.val()) { //判断剩下的能够加入多少件商品
										$(this).addClass("disabled");
									}
									$(this).parent().find(".btn_reduce").removeClass("disabled");
								}
								commodityNumbers = thisvalue.val(); //商品的数量

							}
						} else {
							thisvalue.val(1);
							commodityNumbers = 1;
							$(this).removeClass("disabled");
							$(this).parent().find(".btn_reduce").addClass("disabled");
							return;
						}

					}
				} else {
					thisvalue.val((+thisvalue.val()) + 1);
					if((+(thisvalue.val())) >= 1) {
						$(this).parent().find(".btn_reduce").removeClass("disabled");
					}
					commodityNumbers = thisvalue.val(); //商品的数量
				}
			});
			btn_reduce.on("click", function() {
				if($(this).hasClass("disabled")) {
					return;
				}
				var thisvalue = $(this).parent().find("input");
				if(!isNaN(thisvalue.val())) { //判断输入框是否为数字
					thisvalue.val((+thisvalue.val()) - 1);
					commodityNumbers = thisvalue.val(); //商品的数量
					if((+(thisvalue.val())) <= 1) {
						$(this).addClass("disabled");
					}
					if((+(thisvalue.val())) < stockQuantity) {
						$(this).parent().find(".btn_add").removeClass("disabled");
					}
				} else {
					thisvalue.val(1);
					commodityNumbers = thisvalue.val(); //商品的数量
					$(this).parent().find(".btn_add").removeClass("disabled");
					$(this).addClass("disabled");
				}
			});
		}
	});
}
//添加商品到购物车
function pushShoppingcart() {
	var tagBox = $('ul[name="skuBox"]');
	var message = "请选择";
	for(var i = 0; i < tagBox.length; i++) {
		var items = $(tagBox[i]).find('li');
		for(var j = 0; j < items.length; j++) {
			if($(items[j]).hasClass("current")) {
				flag = false;
			}
		}
		if(flag) {
			//提示用户选出商品对应的规则型号
			message = message + $(tagBox[i]).attr("skuName") + "&nbsp";
		} else {
			flag = true;
		}
	}
	if(message == "请选择") {
		flag = false;
	}
	if(productSkuData.length > 0 && flag) {
		//请选择商品规则型号提示语
		var messageImg = "<img src='images/ic_a@3x.png' style='width:0.28rem;height:0.28rem;'/>";
		var message = messageImg + '<br>' + message;
		toast(message);
		return;
	} else if(productSkuData.length == 0 || flag) {
		commoditySkuAttrIds = "\"\"";
		commodityDetails = "";
	} else { //存在商品SKU规格信息。并且
		skuIdString = commoditySkuAttrIds.slice(1, commoditySkuAttrIds.length); //去掉商品规格型号字符串前面id的逗号跟空格;
		if(commoditySkuAttrIds.indexOf("[") == -1) {
			commoditySkuAttrIds = commoditySkuAttrIds.split(",");
			var boxSku = new Array();
			for(var key = 0; key < commoditySkuAttrIds.length; key++) {
				if(commoditySkuAttrIds[key] != "") {
					if(key >= 1) {
						boxSku[key - 1] = commoditySkuAttrIds[key];
					}
				}
			}
			sessionStorage.setItem("skuAttrIdsRecord", boxSku); //将当前用户加入购物车的商品SKU记录下来
			commoditySkuAttrIds = JSON.stringify(boxSku);

		}
		if(commodityNumbers <= 0 || commodityNumbers == null || isNaN(commodityNumbers)) {
			var message = "请添加商品数量";
			toast(message);
			return;
		}
		if(parseInt(commodityNumbers) > stockQuantity) {
			var message = "亲，老板没那么多存货呢";
			toast(message);
			//将库存数量等同进去
			if(stockQuantity <= 0) {
				$(".productvalue").val(1);
				commodityNumbers = 1;
				$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
				$(".btn_reduce").addClass("disabled"); //将减法数量的按钮置灰色
			} else {
				$(".productvalue").val(stockQuantity);
				commodityNumbers = stockQuantity;
				$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
			}
			return;
		} else {
			var canPushNumbers = parseInt(100) - parseInt(shoppingCartCount); //可加入的商品数量
			if(parseInt(commodityNumbers) > parseInt(canPushNumbers)) {
				var message = "亲，老板没那么多存货呢";
				toast(message);
				commodityNumbers = 1;
				$(".productvalue").val(1);
				$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
				return;
			}
		}
	}
	//将用户购买的商品数量减去库存，剩下的能够购买的商品库存记录下来
	commodityDetails = urlEncode(commodityDetails);
	console.log(commoditySkuAttrIds);
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};

	params.body = {
		commodityId: commodityId,
		areaOrgSeq: areaCode,
		count: commodityNumbers,
		commoditySkuAttrIds: commoditySkuAttrIds,
		commodityDetails: commodityDetails
	};
	var param = JSON.stringify(params);
	//console.log(param);
	//appAlert("aa",param);
	$.ajax({
		type: "post",
		async: false,
		url: host + "/mms/servlet/addShoppingcart?str=" + param,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			$(".productParam").css("display", "none");
			$("#overlay").hide();
			$("body").css("overflow", "auto");
			$("body").css("position", "relative");
			if(data.result == "0") {
				$(".colorClassify>li").siblings("li").removeClass("current");
				$(".btn_add").removeClass("disabled");
				$(".btn_reduce").addClass("disabled");
				sessionStorage.setItem("stockQuantity", parseInt(stockQuantity) - (commodityNumbers));
				$(".productvalue").val(1);
				//commoditySkuAttrIds = "";
				commodityNumbers = 1;
				flag = true;
				commodityDetails = "";
				$(".colorClassify>li").removeClass("current");
				hasChonise = "Yes";
				var message = "加入购物车成功";
				toast(message);
				refreshData();
			} else if(data.result == "017") {
				$("#overlay").show();
				$("#detail_activityLose").show();
			} else {
				var message = "加入购物车失败";
				toast(message);
			}
		}
	});
}
//在商品评价里推入商品评价信息
function getComment() {
	var str = "{\"body\":{\"areaOrgSeq\":\"" + areaCode + "\",\"type\":1,\"pageSize\":10,\"pageNum\":1,\"commodityId\":\"" + commodityId + "\"},\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
	$.ajax({
		type: "get",
		async: false,
		url: host + "/mms/servlet/getCommodityComments?str=" + str,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			var userImage = data.userImage;
			commentCount = data.commentCount;
			if(commentCount == 0) {
				$(".productevaluateBox").hide();
			} else {
				//插入评价的第一条消息
				var commentBox = _.template($("#commentListTemplate").html());
				$("#commentList").empty().append(commentBox(data)); //推进数据
				//判断用户头像如果是空的话就显示默认头像
				if(userImage == "") {
					$(".headPortrait").attr('src', "images/AA.png");
				} else {
					$(".headPortrait").attr('src', userImage);
				}
				//插入评论图片信息
				var commentImages = data.commentImages;
				if(commentImages.length == 0) {

				} else {
					$("#evaluatePhotoes").empty();
					for(var j = 0; j < commentImages.length; j++) {
						var commentImagesBox = _.template($("#commentImagesTemplate").html());
						$("#evaluatePhotoes").append(commentImagesBox({
							commentImages: commentImages[j].imgUrl
						})); //推进数据
					}
				}

				var reply = data.reply;
				if(reply == 2) {
					var replyBox = _.template($("#replycommentTemplate").html());
					$("#replycomment").empty().append(replyBox(data)); //推进数据
					var replyImages = data.replyImages;
					//遍历卖家回复图片
					$("#replyPhotoes").empty();
					for(var i = 0; i < replyImages.length; i++) {
						var replyImagesBox = _.template($("#replyImagesTemplate").html());
						$("#replyPhotoes").append(replyImagesBox({
							replyImages: replyImages[i].imgUrl
						})); //推进数据
					}
				} else {
					$(".reply").hide();
				}
				var commentCountBox = _.template($("#commentCountTemplate").html());
				$("#commentCount").empty().append("(" + commentCount + ")"); //推进数据
				if(commentCount == 1) {
					$(".commentCounts").hide();
				} else {
					$(".commentCounts").show();
				}

			}

		}
	});
}
//立即购买跳转
function nowBuy() {
	var tagBox = $('ul[name="skuBox"]');
	var message = "请选择";
	for(var i = 0; i < tagBox.length; i++) {
		var items = $(tagBox[i]).find('li');
		for(var j = 0; j < items.length; j++) {
			if($(items[j]).hasClass("current")) {
				flag = false;
			}
		}
		if(flag) {
			//提示用户选出商品对应的规则型号
			message = message + $(tagBox[i]).attr("skuName") + "&nbsp";
		} else {
			flag = true;
		}
	}
	if(message == "请选择") {
		flag = false;
	}
	if(productSkuData.length > 0 && flag) {
		//请选择商品规则型号提示语
		var messageImg = "<img src='images/ic_a@3x.png' style='width:0.28rem;height:0.28rem;'/>";
		var message = messageImg + '<br>' + message;
		toast(message);
		return;
	} else if(productSkuData.length == 0 || flag) {
		commoditySkuAttrIds = "\"\"";
		commodityDetails = "";
		$(".colorClassify>li").removeClass("current");
	} else { //存在商品SKU规格信息。并且
		skuIdString = commoditySkuAttrIds.slice(1, commoditySkuAttrIds.length); //去掉字符串前面id的逗号跟空格;
		if(commoditySkuAttrIds.indexOf("[") == -1) {
			commoditySkuAttrIds = commoditySkuAttrIds.split(",");
			var boxSku = new Array();
			for(var key = 0; key < commoditySkuAttrIds.length; key++) {
				if(commoditySkuAttrIds[key] != "") {
					if(key >= 1) {
						boxSku[key - 1] = commoditySkuAttrIds[key];
					}
				}
			}

			sessionStorage.setItem("skuAttrIdsRecord", boxSku); //将当前用户加入购物车的商品SKU记录下来
			commoditySkuAttrIds = JSON.stringify(boxSku);
			commodityCheckSku = boxSku;

		}
		console.log(commoditySkuAttrIds)
		if(commodityNumbers <= 0 || commodityNumbers == null || isNaN(commodityNumbers)) {
			var message = "请添加商品数量";
			toast(message);
			return;
		}
		if(parseInt(commodityNumbers) > stockQuantity) {
			var message = "亲，老板没那么多存货呢";
			toast(message);
			//将库存数量等同进去
			if(stockQuantity <= 0) {
				$(".productvalue").val(1);
				commodityNumbers = 1;
				$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
				$(".btn_reduce").addClass("disabled"); //将减法数量的按钮置灰色
			} else {
				$(".productvalue").val(stockQuantity);
				commodityNumbers = stockQuantity;
				$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
			}
			return;
		} else {
			var canPushNumbers = parseInt(100) - parseInt(shoppingCartCount); //可加入的商品数量
			if(parseInt(commodityNumbers) > parseInt(canPushNumbers)) {
				var message = "亲，老板没那么多存货呢";
				toast(message);
				commodityNumbers = 1;
				$(".productvalue").val(1);
				$(".btn_add").addClass("disabled"); //将添加数量的按钮置灰色
				return;
			}
		}
	}

	$(".productParam").css("display", "none");
	$("#overlay").hide();
	$("body").css("overflow", "auto");
	$("body").css("position", "relative");

	$(".colorClassify>li").siblings("li").removeClass("current");
	$(".btn_add").removeClass("disabled");
	$(".btn_reduce").addClass("disabled");

	var num = $(".productvalue").val();
	num = parseInt(num);
	price = parseFloat(price);
	var buyType = "1";
	$(".colorClassify>li").removeClass("current");
	if(commoditySkuAttrIds.indexOf("[") == -1) {
		showActivity(host + "/mms/html5/supermarket/confirmOrderNew.htm?commodityId=" + commodityId + "&commodityCount=" + num + "&buyType=" + buyType + "&giftbagId=" + giftbagId, "确认订单");
	} else {
		showActivity(host + "/mms/html5/supermarket/confirmOrderNew.htm?commodityId=" + commodityId + "&commoditySkuAttrIds=" + commoditySkuAttrIds + "&commodityCount=" + num + "&buyType=" + buyType + "&giftbagId=" + giftbagId, "确认订单");
	}
	refreshData();
}

function gobackIndex() {
	if(clientType == "android") {
		contact.goBack();
	} else { //ios
		contact_closeActivity();
	}
}

function urlEncode(url) {
	return escape(url).replace(/\+/g, '%2B');
}

var agent = navigator.userAgent.toLowerCase();
var iLastTouch = null;
if(agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
	document.body.addEventListener('touchend', function(event) {
		var iNow = new Date().getTime();
		iLastTouch = iLastTouch || iNow + 1;
		var delta = iNow - iLastTouch;
		if(delta < 500 && delta > 0) {
			event.preventDefault();
			return false;
		}
		iLastTouch = iNow;
	}, false);
}