function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function refreshData() {
	setTimeout(function() {}, 0);
	return 1;
}
var $windowHeight = $(window).height();
$(window).resize(function() {
	if($windowHeight <= $(window).height()) {
		$('.estimate_fixed').show();
	} else {
		$('.estimate_fixed').hide();
	}
});
var orderNo = GetURLParameter("orderNo");
var token = GetURLParameter("token");
var householdSerial = GetURLParameter("householdSerial");
var commodityId = GetURLParameter("commodityId");
//判断是否开放放大图片
var lxjversionsName2 = Number(sessionStorage.getItem("lxjversionsName"));
var clientType = GetURLParameter("clientType");
/*orderNo = "201712131956072720066";
var token = "15132143507881f7cdd95cc4444eb861";
var host = "http://118.190.8.133:8090";
commodityId="1504773709729bed01fd2bd74173879e";*/
if(clientType == "android") {
	LazyLoad.js(['../mall/js/mui.min.js', 'js/mui.previewimage.js', '../mall/js/mui.zoom.js'], function() {
		mui.previewImage();
	});
} else if(isCondition(lxjversionsName2) && lxjversionsName2 >= 3005) {
	LazyLoad.js(['../mall/js/mui.min.js', 'js/mui.previewimage.js', '../mall/js/mui.zoom.js'], function() {
		mui.previewImage();
	});
}

$(function() {
	getData();
	$('#evaluateText').bind('focus', function() {
		$('.estimate_fixed').hide();
	}).bind('blur', function() {
		$('.estimate_fixed').show();
	});
})

function getData() {
	var time_stamp = Date.parse(new Date());
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		orderNo: orderNo,
	};
	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/getOrderCommodities?str=" + paramData;

	$.ajax({
		type: "get",
		url: reqUrl,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.result == 0 && data.commodityList.length > 0 && isCondition(data.commodityList)) {
				var commodityList = data.commodityList;
				for(var i = 0; i < commodityList.length; i++) {
					var commodity = commodityList[i];
					if(commodity.commodityId == commodityId) {
						var shopimg = commodity.commodityImg;
						$(".appraise_fl").css("background-image", "url(" + shopimg + ")");
						var commodityName = commodity.commodityName;
						$(".appraise_f2").html(commodityName);
						var commentT = commodity.comment;
						if(commentT == 1) {
							layer.msg("该商品你已经评价过了，请不要重复评价。", {
								time: 3000
							});
							$(".estimate_fixed").removeAttr("onclick", "doSubmit()");
							$(".estimate_fixed").css("background-color", "#c0c0c0");
						}
					}
				}

			} else {
				layer.msg(JSON.stringify(data), {
					time: 10000
				});
			}
		}
	});
}

//上传图片
var feedBackImages = [];

function imageUpload() {
	$(".appraise .estimate #evaluateText").blur();
	var picturenum = $("#picture").children("div").length;
	var maxPicture = 7 - parseInt(picturenum);
	console.log("添加图片操作");
	if(maxPicture > 0) {
		//300毫秒延迟调用需ios出客户端才可以去掉
		setTimeout(function() {
			selectPicture(maxPicture);
		}, 300)

	}
}

function onPictureSelected(json) {
	var josnObj = JSON.parse(json);
	if(josnObj.result == '0') {
		var imageArray = josnObj.list;
		if(imageArray.length > 0) {
			// 获取到上传图片的路径
			for(var i = 0; i < imageArray.length; i++) {
				feedBackImages.push(imageArray[i]);
				var o_path = imageArray[i].o_path; // 原图路径
				var t_path = imageArray[i].t_path; // 缩略图路径
				var picturefirst = "<div class='img_box' oimg=\'" + o_path + "'\" name=\'" + o_path + "'\" style='background-image:url(" + o_path + ")'><div class='dele_box' onclick='delePicture(this)'><img class='dele_img' src='images/btn_ic_cancel@3x.png'/></div><img src=\'" + o_path + "'\" data-preview-src='' data-preview-group='1' /></div>";
				$("#picture .uploadimg_box").before(picturefirst);
				//	getimgWidthHeight(o_path,o_path);
				var picturenum = $("#picture").children("div").length;
				if(picturenum >= 7) {
					$("#uploadimg").css("display", "none");
				}
				if(picturenum >= 3) {
					$(".content_box").css("display", "none");
				}
				//	mui.previewImage();
			}
		}
	}
}

//textarea输入值的处理
function keyUp() {
	var textareaText = $(".estimate .estimate_text").val();
	var textareaTextdiv = textareaText.split("\n").join("<br />");
	$(".estimate div").html(textareaTextdiv);
}

function delePicture(ele) {
	var deleimgurl = $(ele).next().attr("src");
	$(ele).parent().remove();
	var picturenum = $("#picture").children("div").length;
	if(picturenum < 7) {
		$("#uploadimg").show();
	}
	if(picturenum == 2) {
		$(".content_box").css("display","inline-block");
	}
	var upLoadimglenght = feedBackImages.length;
	for(var i = 0; i < upLoadimglenght; i++) {
		if(feedBackImages[i].o_path == deleimgurl) {
			feedBackImages.splice(i, 1);
			break;
		}
	}
}

function doSubmit() {
	var time_stamp = Date.parse(new Date());
	var commentContent = $("#evaluateText").val();
	var rm1 = commentContent.replace(/\s+/g, ""); //去掉空格
	var rm2 = rm1.replace(/[\r\n\"]/g, ""); //去掉回车换行	
	var commentImages = JSON.stringify(feedBackImages).replace(/o_path/g, "imgUrl").replace(/t_path/g, "thumImgUrl").replace(/\"/g, "'")
	if(!isCondition(rm2) && feedBackImages.length == 0) {
		layer.msg("请至少填写一条评价或上传一张图片", {
			time: 1500
		});
		return false;
	}
	if(!isCondition(orderNo) || !isCondition(commodityId)) {
		layer.msg("订单有误，请联系客服", {
			time: 1500
		});
		return false;
	}
	$(".estimate_fixed").removeAttr("onclick", "doSubmit()");
	var commentContent2=commentContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		orderNo: orderNo,
		commodityId: commodityId,
		commentContent: commentContent2,
		commentImages: commentImages
	};
	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/commentCommodity?str=" + encodeURIComponent(paramData);
	$.ajax({
		type: "get",
		url: reqUrl,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//		timeout: 10000,
		jsonpCallback: "success_jsonpCallback",
		success: function(data2) {
			if(data2.result == 0 && data2.commentFlag == 1) {
				layer.msg("评价成功", {
					time: 1000
				});
				setTimeout(function() {
					goBack();
				}, 2000);
			} else {
				layer.msg(JSON.stringify(data2), {
					time: 10000
				});
				$(".estimate_fixed").attr("onclick", "doSubmit()");
			}
		}
	});
}