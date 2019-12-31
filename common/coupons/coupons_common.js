var host = sessionStorage.getItem("host");
//根据token 总价 商品信息获取优惠券接口
function getCouponsForOrder(token, totalPrice, commodityInfo, countFlag, sellerId, areaId) {
	var canUseList;
	var noCanUseList;
	var couponsCount;
	var time_stamp = Date.parse(new Date());
	var data = "{\"body\":" +
		"{\"totalPrice\":\"" + totalPrice + "\"," +
		"\"countFlag\":\"" + countFlag + "\"," +
		"\"sellerId\":\"" + sellerId + "\"," +
		"\"areaId\":\"" + areaId + "\"," +
		"\"commodityInfo\":" + commodityInfo + "}," +
		"\"header\":{" +
		"\"token\":\"" + token + "\"," +
		"\"time_stamp\":\"" + time_stamp + "\"" +
		"}" +
		"}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getCouponListForOrder?str=" + data,
		async: false,
		dataType: "jsonp",
		//传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonp: "jsoncallback",
		//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		jsonpCallback: "success_jsonpCallback",
		//成功获取跨域服务器上的json数据后,会动态执行这个callback函数
		success: function(odata) {
			if(odata.result == 0) {
				if(countFlag == 0) {
					canUseList = odata.couponList;
					noCanUseList = odata.unUseList;
				} else if(countFlag == 1) {
					couponsCount = odata.couponsCount;
				}

			}
		},
		error: function(r) {
			console.log(r);
		}
	});
	return {
		"couponList": canUseList,
		"unUseList": noCanUseList,
		"couponsCount": couponsCount
	}
}
//根据token 总价 商品信息获取可用优惠券数量
function getCouponCount(token, totalPrice, commodityInfo, countFlag, sellerId, areaId) {
	var resqData = getCouponsForOrder(token, totalPrice, commodityInfo, countFlag, sellerId, areaId);
	return resqData.couponsCount;
}

/***********以下是超市及商城的优惠券代码***************/
function getCouponsForMultiOrder(token, totalPrice, countFlag, shoppingCartIds, areaId, areaName,commoditySkuAttrIds) {
	
	var canUseList;
	var noCanUseList;
	var couponsCount;
	var time_stamp = Date.parse(new Date());
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	if(shoppingCartIds != null && shoppingCartIds != "" && !(typeof(shoppingCartIds) === undefined) ) {
		params.body = {
			areaName: areaName,
			areaId: areaId,
			countFlag: countFlag,
			shoppingCartIds: shoppingCartIds,
			totalPrice: totalPrice
		};
	} else {
		if(commoditySkuAttrIds != null && commoditySkuAttrIds != "" && !(typeof(commoditySkuAttrIds) === undefined)) {
			params.body = {
				areaName: areaName,
				areaId: areaId,
				countFlag: countFlag,
				commodityId: commodityId,
				commoditySkuAttrIds: commoditySkuAttrIds,
				commodityCount: commodityCount,
				totalPrice: totalPrice
			};
		} else {
			params.body = {
				areaName: areaName,
				areaId: areaId,
				countFlag: countFlag,
				commodityId: commodityId,
				commodityCount: commodityCount,
				totalPrice: totalPrice
			};
		}
	}
	
	var data = JSON.stringify(params);
	//var data="{\"body\":{\"areaName\":\""+areaName+"\",\"areaId\":\""+areaId+"\",\"countFlag\":\""+countFlag+"\",\"shoppingCartIds\":\""+shoppingCartIds+"\",\"totalPrice\":"+totalPrice+"},\"header\":{\"token\":\""+token+"\",\"time_stamp\":\"" + time_stamp + "\"}}";
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getCouponListForMultiOrder?str=" + data,
		async: false,
		dataType: "jsonp",
		//传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonp: "jsoncallback",
		//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		jsonpCallback: "success_jsonpCallback",
		//成功获取跨域服务器上的json数据后,会动态执行这个callback函数
		success: function(odata) {
			if(odata.result == 0) {
				if(countFlag == 0) {
					canUseList = odata.couponList;
					noCanUseList = odata.unUseList;
				} else if(countFlag == 1) {
					couponsCount = odata.couponsCount;
				}

			}
		},
		error: function(r) {
			console.log(r);
		}
	});
	return {
		"couponList": canUseList,
		"unUseList": noCanUseList,
		"couponsCount": couponsCount
	}
}

//根据token 总价 商品信息获取可用优惠券数量
function getMultiOrderCouponCount(token, totalPrice, countFlag, shoppingCartIds, areaId, areaName,commoditySkuAttrIds) {

	var resqData = getCouponsForMultiOrder(token, totalPrice, countFlag, shoppingCartIds, areaId, areaName,commoditySkuAttrIds);
	return resqData.couponsCount;
}