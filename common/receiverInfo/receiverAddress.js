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

var condition = "0"; //默认根据店铺获取收货地址信息 
var token = GetURLParameter("token");
var lxjversionsNameC=GetURLParameter("lxjversionsName");
var clientType=GetURLParameter("clientType");
if(!isCondition(token)) {
	token = sessionStorage.getItem("token");
}
var time_stamp = Date.parse(new Date());

var organizationSeq = GetURLParameter("orga"); //机构编号

//var sellerId = GetURLParameter("sellerId"); //店铺id
//var receiverInfoId = sessionStorage.getItem("receiverInfoId");
//var defReceiverInfoId = ""; //默认地址id
//var currentHouseholdId = sessionStorage.getItem("currentHouseholdId"); //当前住房id(householdId)
//if(!isCondition(sellerId)) {
//	sellerId = "";
//}
//var token = "150638997554896470ba99f342968b41";
//var host = "https://tt.hori-gz.com:8443";
setRefreshOnResume();
setTitle("选择地址");
//if(isCondition(organizationSeq)) {
//	condition = "1";
//}
setLxjStorage("addressPageGo","1")

function refreshData() {

	setTimeout(function() {
		getData();
	}, 0);
	return 1;
}

//function getData(condition) {
//	var data = "";
//	
//	if(condition == "0") {
//		data = "{" +
//			"\"body\":{\"sellerId\":\"" + sellerId + "\",\"condition\":\"" + condition + "\",\"type\":\"" + 2 + "\"}," +
//			"\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}" +
//			"}";
//	} else {
//		data = "{" +
//			"\"body\":{\"organizationSeq\":\"" + organizationSeq + "\",\"condition\":\"" + condition + "\",\"type\":\"" + 2 + "\"}," +
//			"\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}" +
//			"}";
//	}
//	$.ajax({
//		type: "get",
//		url: host + "/mms/servlet/getUserReceiverInfo?str=" + data,
//		dataType: "jsonp",
//		jsonp: "jsoncallback",
//		jsonpCallback: "success_jsonpCallback",
//		success: function(odata) {
//			sessionStorage.setItem("addresslist",JSON.stringify(odata));			
//			if(odata.result == 0) {
//				var addresslist = odata.list;
//				if(addresslist.length <= 0) {
//					$('html').css("background-color", "#fff");
//					$("#no_have_address").show();
//					sessionStorage.setItem("receiverInfoId", "");
//					return false;
//				}
//				var defOnserver = 0; //默认地址是否在服务范围
//				for(var i = 0; i < addresslist.length; i++) { //默认地址
//					var item = addresslist[i];
//					if(item.isDef == 1) {
//						var address = addresslist[i];
//						defReceiverInfoId = item.id;
//						sessionStorage.setItem("defReceiverInfoId", defReceiverInfoId);
//						var yesaddress;
//						if(item.onServer == 1) { //且在服务范围
//							defOnserver = 1;
//							yesaddress = _.template($("#address_yes_use").html());
//						} else {
//							yesaddress = _.template($("#address_no_use").html());
//						}
//						$("#addresslist").append(yesaddress(address));
//					}
//				}
//				var currentHouseId;
//				var k = 0;
//				for(var i = 0; i < addresslist.length; i++) { //当前住房地址(在范围 不是默认 当前住房)
//					var item = addresslist[i];
//					if(item.onServer == 1 && item.isDef != 1 && item.householdId == currentHouseholdId) {
//						var address = addresslist[i];
//						var yesaddress = _.template($("#address_yes_use").html());
//						$("#addresslist").append(yesaddress(address));
//						k++;
//						if(k == 1) {
//							currentHouseId = item.id; //取第一个
//						}
//					}
//				}
//				var otherHouseId;
//				for(var i = 0; i < addresslist.length; i++) { //非住房地址(在范围 不是默认 不是当前住房)
//					var item = addresslist[i];
//					var c = 0;
//					if(item.onServer == 1 && item.isDef != 1 && item.householdId != currentHouseholdId) {
//						var address = addresslist[i];
//						var yesaddress = _.template($("#address_yes_use").html());
//						$("#addresslist").append(yesaddress(address));
//						c++;
//						if(c == 1) {
//							otherHouseId = item.id; //取第一个
//						}
//					}
//
//				}
//				for(var i = 0; i < addresslist.length; i++) {
//					var item = addresslist[i];
//					if(item.onServer == 0 && item.isDef != 1) {
//						var address2 = addresslist[i];
//						var disaddress = _.template($("#address_no_use").html());
//						$("#addresslist").append(disaddress(address2));
//					}
//				}
//				/*if(addresslist.length == $(".disable-address").length) { //如果全都不在服务范围 选择地址置空
//					sessionStorage.setItem("receiverInfoId", "");
//				}*/
//				var reId = sessionStorage.getItem("receiverInfoId");
//				if(isCondition(reId)) { //有选中的地址
//					$("#" + reId).addClass("background-img");
//				} else {
//					var id;
//					if(isCondition(defReceiverInfoId) && defOnserver == 1) { //有默认地址且在范围
//						id = defReceiverInfoId;
//						$("#" + defReceiverInfoId).addClass("background-img");
//					} else if(isCondition(currentHouseId)) { //选中在范围的当前住房地址
//						id = currentHouseId;
//						$("#" + currentHouseId).addClass("background-img");
//					} else if(isCondition(otherHouseId)) {
//						id = otherHouseId;
//						$("#" + otherHouseId).addClass("background-img");
//					} else {
//						id = "";
//					}
//					sessionStorage.setItem("receiverInfoId", id);
//				}
//				$(".address_default img[value=1]").hide();
//				$(".address_default img[value=1]").next().text("默认").addClass("address_default_red");
//				$(".address_default img[value=0]").next().parent().hide();
//
//				$(".address_isInarea .address_first_line").click(function() {
//					var choosename=$(this).find(".a_number .name").text();
//					if(choosename.indexOf("LXJ") == 0&&choosename.substr(3,8).length>=8&&/^\d+$/.test(choosename.substr(3,8))) {
//							 $(".bgblack").show();
//							 $("#changeusername").show();
//							 $(".bgblack").height($("body").height()>$(window).height()?$("body").height():$(window).height());			 
//							 $("#changeusername").height($("#changeusername").height());
//							 var id = $(this).parent().attr("id");
//						     sessionStorage.setItem("changereceiverInfoId", id);						
//					}else{
//						$("li").removeClass("background-img");
//						$(this).parent().addClass("background-img");
//						//选择地址动作
//						var id = $(this).parent().attr("id");
//						sessionStorage.setItem("receiverInfoId", id);
//						popUrl();
//					}
//				   
//				});
//			}
//		}
//		
//	})
//}
function getData() {
	var timestamp = Date.parse(new Date());
	var params = {};
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	params.body = {
		type: 2,
	};
	var paramData = JSON.stringify(params);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getUserReceiverInfo?str=" + paramData,
		async: true,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.result == 0) {
				$("#addresslist").empty();
				var addresslist = data.receiverList;
				if(addresslist.length <= 0) {
					$('html').css("background-color", "#fff");
					$("#no_have_address").show();
					setLxjStorage("receiverInfoId", "");
					return false;
				}
				for(var i = 0; i < addresslist.length; i++) {
					var address = addresslist[i];
					if(address.isDefault == 1) {
						sessionStorage.setItem("defReceiverInfoId", address.id);
					}
					var yesaddress = _.template($("#address_yes_use").html());
					$("#addresslist").append(yesaddress(address));
				}
				var reId = localStorage.getItem("receiverInfoId");
				if(isCondition(reId) && $("#" + reId).children(".address_first_line").attr("value") == 1) { //有已经的地址					
					$("#" + reId).addClass("background-img");
					setLxjStorage("receiveraddressNone", "false");
				} else {
					setLxjStorage("receiveraddressNone", "true");
				}
				$(".address_default img[value=1]").hide();
				$(".address_default img[value=1]").next().text("默认").addClass("address_default_red");
				$(".address_default img[value=0]").next().parent().hide();
				$(".address_isInarea .address_first_line").click(function() {
					if($(this).attr("value") == 1) { //地址完整可以选择
						var choosename = $(this).find(".a_number .name").text();
						if(choosename.indexOf("LXJ") == 0 && choosename.substr(3, 8).length >= 8 && /^\d+$/.test(choosename.substr(3, 8))) {
							$(".bgblack").show();
							$("#changeusername").show();
							$(".bgblack").height($("body").height() > $(window).height() ? $("body").height() : $(window).height());
							$("#changeusername").height($("#changeusername").height());
							var id = $(this).parent().attr("id");
							sessionStorage.setItem("changereceiverInfoId", id);
						} else if(!isCondition($.trim(choosename))) {
							$(".bgblack").show();
							$("#changeusername").show();
							$(".bgblack").height($("body").height() > $(window).height() ? $("body").height() : $(window).height());
							$("#changeusername").height($("#changeusername").height());
							var id = $(this).parent().attr("id");
							sessionStorage.setItem("changereceiverInfoId", id);
						} else {
							$("li").removeClass("background-img");
							$(this).parent().addClass("background-img");
							//选择地址动作
							var id = $(this).parent().attr("id");
							setLxjStorage("receiverInfoId", id);
							setLxjStorage("receiveraddressNone", "false");
							if (clientType=="ios"&&isCondition(lxjversionsNameC)&&lxjversionsNameC.replace(/[^0-9]/ig, "")>=4008&& isCondition(lxjversionsNameC)&&lxjversionsNameC.replace(/[^0-9]/ig, "")<=5180) {
								popUrl();
							} else{
								goBack();
							}
						
						}
					} else { //地址不完整，跳到编辑页面
						var setId = $(this).parent().attr("id");
						var length = $("li").length; //地址数量  最后一条不可删除
						console.log(setId);
						layer.msg("请补全详细收货地址", {
							time: 1000
						});
						setTimeout(function() {
							showActivity(host + "/mms/html5/common/receiverInfo/edit_receiveraddress.htm?receiverInfoId=" + setId + "&length=" + length, "编辑地址");
						}, 1200);
					}
				});
			} else {
				layer.msg(JSON.stringify(data), {
					time: 100000
				});
				$('html').css("background-color", "#fff");
				$("#no_have_address").show();
				setLxjStorage("receiverInfoId", "");
			}

		},
		error: function(retMsg) {
			layer.msg(retMsg.responseText, {
				time: 100000
			});
		}
	});
}
getData();
//新增地址
function addInfo() {
	showActivity(host + "/mms/html5/common/receiverInfo/edit_receiveraddress.htm", "新增地址");
}
//----设置第一个地址为默认地址
function changeDefault() {
	var receiverInfoId = $("li")[0].id; //选中默认地址的值
	if(!isCondition(receiverInfoId) || $("li:first").children(".address_first_line").attr("value") != 1) {

		return false;
	}
	//请求修改默认地址
	var timestamp = new Date().getTime();
	var params = {};
	params.body = {
		type: 4,
		receiverInfoId: receiverInfoId
	};
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	var paramData = JSON.stringify(params);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/setUserReceiverInfo?str=" + paramData,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			console.log(JSON.stringify(odata));
			if(odata.result == 0) {
				sessionStorage.setItem("defReceiverInfoId", receiverInfoId);
				$(".address_default img[name=" + receiverInfoId + "]").hide();
				$(".address_default img[name=" + receiverInfoId + "]").next().text("默认").addClass("address_default_red");
				$(".address_default img[name=" + receiverInfoId + "]").parent().show();
				if(!isCondition(localStorage.getItem("receiverInfoId"))) {
					$("li").removeClass("background-img");
					$("#" + receiverInfoId).addClass("background-img");
					setLxjStorage("receiverInfoId", receiverInfoId);
				}
			} else {
				layer.msg(JSON.stringify(odata), {
					time: 10000
				})
			}

		}
	})
}

//----选择编辑地址操作
function editAddress(name) {
	//跳转编辑页面
	addressid = $(name).attr("name"); //带地址的ID过来
	var length = $("li").length; //地址数量  最后一条不可删除
	showActivity(host + "/mms/html5/common/receiverInfo/edit_receiveraddress.htm?receiverInfoId=" + addressid + "&length=" + length, "编辑地址");
}
//----执行删除地址操作
function deleAddress(name) {
	var addressid = $(name).attr("name");
	lxjTip.confirm('你确定删除该地址吗？', {
		skin: 'demo3',
		yes: function(index) {
			deleYAddress(addressid);
			lxjTip.close(); //如果设定了yes回调，需进行手工关闭
		}
	});
	//	layer.confirm('你确定删除该地址吗？', {
	//		title: '',
	//		closeBtn: '0',
	//		skin: 'demo_two'
	//	}, function(index) {
	//		deleYAddress(addressid);
	//		layer.close(index);
	//	});

}

//----确定删除地址操作
function deleYAddress(addressId) {
	$("#tip_bg").hide();
	$("#tip").hide();
	var length = $("li").length;
	if(length <= 3) {
		setTimeout(function() {
			lxjTip.alert('至少保留一个收货地址', {
				skin: 'demo2',
				btn: ['我知道了']
			});
		}, 200)

		//		layer.alert('至少保留一个收货地址', {
		//			title: '',
		//			closeBtn: '0',
		//			skin: 'demo_one',
		//			btn: '我知道了'
		//		});
		return false;
	}
	var receiverInfoId = localStorage.getItem("receiverInfoId");
	var timestamp = new Date().getTime();
	var params = {};
	params.body = {
		type: 3,
		receiverInfoId: addressId
	};
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	var paramData = JSON.stringify(params);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/setUserReceiverInfo?str=" + paramData,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			if(odata.result == 0) {
				$("li[name=" + addressId + "]").remove();
				var defId = sessionStorage.getItem("defReceiverInfoId"); //默认地址
				var id = "";
				if(addressId == receiverInfoId) {
					setLxjStorage("receiverInfoId", "");
					$("li").each(function(i, e) {
						if($(e).attr("value") == 1 && $(e).children(".address_first_line").attr("value") == 1) {
							id = $(this).attr("name");
							return false;
						}
					});
					$("li").removeClass("background-img");
					$("#" + id).addClass("background-img");
					setLxjStorage("receiverInfoId", id);
				}
				if(addressId == defId) { //如果删除默认地址操作，则选择下一个地址为默认地址
					changeDefault();
				}
			} else {
				layer.msg(JSON.stringify(odata), {
					time: 10000
				});
			}

		}
	})
}

//收货人名字不符合,修改后并使用该地址
function closeChangewindow() {
	$("#changeusername").hide();
	var rm = $("#changename").val();
	var rm1 = rm.replace(/\s+/g, ""); //去掉空格
	var rm2 = rm1.replace(/[\r\n\"]/g, ""); //去掉回车换行	
	if(isCondition(rm2)) {
		changereceiverName();
	} else if(!isCondition(rm)) {
		$(".bgblack").hide();
		return false;
	} else {
		$(".bgblack").hide();
		layer.msg('收货人不可以纯空格', {
			time: 1000
		});
		$("#changename").val("");
	}
}

function closeChangewindowC() {
	$("#changeusername").hide();
	$(".bgblack").hide();
}

//修改请求
function changereceiverName() {

	var timestamp = new Date().getTime();
	var params = {};
	var changeusername = trim($("#changename").val());
	if(changeusername.indexOf("LXJ") == 0 && changeusername.substr(3, 8).length >= 8 && /^\d+$/.test(changeusername.substr(3, 8))) {
		$(".bgblack").hide();
		layer.msg('保存失败，请填写真实姓名', {
			time: 1000
		});
		$("#changename").val("");
		return false;
	}
	var userNameTest = /^[\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]*$/;
	if(!userNameTest.test(changeusername)) {
		$(".bgblack").hide();
		layer.msg('抱歉，不支持特殊字符', {
			time: 2000
		});
		return false;
	}
	function lTrim(str) {
		if(str.charAt(0) == " ") {
			str = str.slice(1);
			str = lTrim(str);
		}
		return str;
	}

	function rTrim(str) {
		var iLength;
		iLength = str.length;
		if(str.charAt(iLength - 1) == " ") {
			str = str.slice(0, iLength - 1);
			str = rTrim(str);
		}
		return str;
	}

	function trim(str) {
		return lTrim(rTrim(str));
	}
	if(!isCondition(changeusername)) {
		layer.msg('收货人不可为空', {
			time: 2000
		});
		return false;
	}
	var changereceiverInfoId = sessionStorage.getItem("changereceiverInfoId");

	params.body = {
		type: 5,
		receiverInfoId: changereceiverInfoId,
		userName: changeusername
	};
	params.header = {
		token: token,
		time_stamp: timestamp
	};

	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/setUserReceiverInfo?str=" + paramData;
	$.ajax({
		type: "get",
		url: reqUrl,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			console.log(JSON.stringify(odata));
			$(".bgblack").hide();
			if(odata.result == 0) {
				$("#" + changereceiverInfoId + " .a_number .name").text(changeusername);
				$("li").removeClass("background-img");
				$("#" + changereceiverInfoId).addClass("background-img");
				setLxjStorage("receiverInfoId", changereceiverInfoId);
				layer.msg('修改成功', {
					time: 1000
				});
			} else {
				//appAlert("提示", "保存失败");
				layer.msg('保存失败，请不要添加表情或特殊符号', {
					time: 1000
				});
			}
			$("#changename").val("");
		}
	})
}
function setLxjStorage(keyN,contN) {
	localStorage.setItem(keyN, contN);
	try {
		if(clientType == "android") {
			
		} else { //ios
			if(sessionStorage.getItem("lxjversionsName")>=5180) {
				callNativeMethod('setLxjStorage', {
					storageKey: keyN,
					storageContent: contN?contN:""
				},0)
			}
		}
	} catch(e) {}
}
function getLxjStorage(keyN) {
	var returnText="";
	try {
		if(clientType == "android") {
		} else { //ios
			if(sessionStorage.getItem("lxjversionsName")>=5180) {
				callNativeMethod('getLxjStorage', {
					storageKey: keyN
				},0)
			}
		}
	} catch(e) {
	}
	return returnText;
}

/*getLxjStorage("skdjhks",function(conntent){
	console.log(conntent)
	if (conntent=="isNothing") {
		
	}else{
		
	}
})*/


