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
//var choose_areaId = "";
//var choose_id = ""; //
//var choose_address = ""; //
//var rId = ""; //
//var householdId = "";
var token = GetURLParameter("token");
var receiverInfoId = GetURLParameter("receiverInfoId");
var householdSerial = GetURLParameter("householdSerial");
//var token = "1504660324879949adf64ebb4c338099";
//var host = "http://118.190.8.133:8090";
//receiverInfoId="14690050574900a18e19d2da4691874c";
var clientType = GetURLParameter("clientType");
var length = GetURLParameter("length");
var ajaxState = "true";
var ajaxStatechange;
$(document).ready(function() {
	var agent = navigator.userAgent.toLowerCase();
	var version;
	if(agent.indexOf("like mac os x") > 0) {
		//ios
		var regStr_saf = /os [\d._]*/gi;
		var verinfo = agent.match(regStr_saf);
		version = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
	}
	var version_str = version + "";

	if(version_str != "undefined" && version_str.length > 0) {
		version = String(version).split('.')[0];
		if(version >= 11) {
			$("#receive_name").attr("onkeyup", "");
		} else {
			$("#receive_name").attr("onkeyup", "value=value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5\ ]/g,'')");
		}
	}

	//IOSTen();
	$("#choose_name span,#choose_number span").css("line-height", ($("#receive_name").height() + 1) + "px");
	$("#receive_name,#receive_phone").css("line-height", $("#receive_name").height() + "px");
	sessionStorage.removeItem("selsectStreet");
	if(!isCondition(receiverInfoId)) { //新增操作
		setTitle("新增地址");
		sessionStorage.removeItem("provinceCode");
		sessionStorage.removeItem("cityCode");
		sessionStorage.removeItem("areaCode");
		sessionStorage.removeItem("townCode");

	} else {
		setTitle("编辑地址");
		getInfoById(receiverInfoId);
	}

	$("#receive_phone,#receive_name").focus(function() {
		$(".address_choose_on").removeAttr("onclick");
	}).blur(function() {
		$(".address_choose_on").attr("onclick", "chooseAddress()");
	});
	$(document).ajaxSend(function(e, xhr, opt) {
		ajaxState = "false";
		clearTimeout(ajaxStatechange);
		//console.log("ajax请求" +ajaxState);
	});
	$(document).ajaxComplete(function(event, request, settings) {
		ajaxStatechange = setTimeout("ajaxState='true'", 800);

	});

});
//编辑时底部提交栏隐藏
var $windowHeight = $(window).height();
$(window).resize(function() {
	if (clientType=="ios") {
		return false;
	}
	if($windowHeight <= $(window).height()) {
		$('#bt_buttom').show();
		$("#details_address,#receive_phone,#receive_name").blur();
		$(".mui-poppicker").show();
	} else {
		$('#bt_buttom').hide();
		$(".mui-poppicker").hide();
	}
});
$("#details_address,#receive_phone,#receive_name").focus(function() {
	$("#bt_buttom").hide();
	$(".mui-poppicker").hide();
});
$("#details_address,#receive_phone,#receive_name").blur(function() {
	$("#bt_buttom").show();
	$(".mui-poppicker").show();
});
//ios10.0系统以上表情输入解决方案
function IOSTen() {
	var IOSTen = clientType;
	//	if(IOSTen != "android") {
	//		$("#choose_name").css("padding-bottom", "0");
	//		$("#receive_name").css({
	//			'padding-top': '1px',
	//			'padding-bottom': '16.1071px',
	//			'overflow': 'visible'
	//		});
	//	}

}

function refreshData() {

	setTimeout(function() {}, 0);
	return 1;
}
//根据id获取收货信息
function getInfoById(setid) {
	var timestamp = Date.parse(new Date());
	var params = {};
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	params.body = {
		type: 3,
		id: setid
	};
	var paramData = JSON.stringify(params);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getUserReceiverInfo?str=" + paramData,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			console.log(JSON.stringify(odata));
			if(odata.result == 0) {

				$("#receive_name").val(odata.receiver.username);
				$("#receive_phone").val(odata.receiver.mobile);
				$("#details_address").val(odata.receiver.detailAddress);
				var isDef = odata.receiver.isDefault || "0";
				if(isDef == 1) {
					$("#isDef").attr("value", "1");
					$(".address_default img").attr("src", 'btn_ic_press@3x.png');
					$(".address_default img").next().text("默认地址");
					$(".address_default img").next().addClass("address_default_red");
				}
				sessionStorage.setItem("provinceCode", odata.receiver.provinceCode || "");
				sessionStorage.setItem("cityCode", odata.receiver.cityCode || "");
				sessionStorage.setItem("areaCode", odata.receiver.areaCode || "");
				sessionStorage.setItem("townCode", odata.receiver.townCode || "");

				if(isCondition(odata.receiver.provinceCode) || isCondition(odata.receiver.cityCode) || isCondition(odata.receiver.areaCode)) {
					document.getElementById('select_ssq').innerText = (odata.receiver.provinceName || '') + " " + (odata.receiver.cityName || '') + " " + (odata.receiver.areaName || '');
				}
				if(isCondition(odata.receiver.areaCode) && !isCondition(odata.receiver.townCode)) {
					sessionStorage.setItem("townCode", "9999999");
					document.getElementById('select_jd').innerText = "暂不选择";
				}
				if(isCondition(odata.receiver.townCode)) {
					document.getElementById('select_jd').innerText = (odata.receiver.townName);
				}
				if(isCondition(odata.receiver.areaCode)) {
					sessionStorage.setItem("selsectStreet", (odata.receiver.areaCode));
					getAddressdate(2, (odata.receiver.areaCode), 'street');
				}
			} else {
				layer.msg(JSON.stringify(odata), {
					time: 10000
				});
			}
			//			var info = odata.receiverInfo;
			//			var userName = info.username;
			//			var mobile = info.mobile;
			//			householdId = info.householdId;
			//			choose_areaId = info.communityId;
			//			var address = info.address;
			//			$("#receive_name").val(userName);
			//			$("#receive_phone").val(mobile);
			//			var isDef = info.isDef;
			//			$("#isDef").val(isDef);
			//			if(isDef == 1) {
			//				$(".address_default img").attr("src", 'ic_choise_red@3x.png');
			//				$(".address_default img").next().text("默认地址");
			//				$(".address_default img").next().addClass("address_default_red");
			//			}
		}
	})
}

function changeDefault() {
	var val = $("#isDef").attr("value");
	if(val == "0") {
		$("#isDef").attr("value", "1");
		$("#isDef img").attr("src", "btn_ic_press@3x.png");
		$(".address_default span").text("设为默认").addClass("address_default_red");
	} else {
		$("#isDef").attr("value", "0");
		$("#isDef img").attr("src", "btn_ic_nor@3x.png");
		$(".address_default span").text("设为默认").removeClass("address_default_red");
	}
}

//--保存地址操作
function saveAddress() {
	var tempUserName = sessionStorage.getItem("userName");
	var tempMobile = sessionStorage.getItem("mobile");
	var tempAddress = sessionStorage.getItem("address");
	var tempIsDef = sessionStorage.getItem("isDef");
	var provinceCode = "";
	var cityCode = "";
	var areaCode = "";
	var townCode = "";
	var time_stamp = Date.parse(new Date());
	//获取收件人
	var userName = trim($("#receive_name").val());
	var userNameTest = /^[\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]*$/;
	if(!userNameTest.test(userName)) {
		layer.msg('抱歉，不支持特殊字符', {
			time: 2000
		});
		setTimeout(function() {
			document.getElementById("receive_name").focus();
		}, 1000);
		return false;
	}
	sessionStorage.setItem("userName", userName);

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
	if(!isCondition(userName)) {
		layer.msg('收货人不可为空', {
			time: 2000
		});

		setTimeout(function() {
			document.getElementById("receive_name").focus();
		}, 1000);
		return false;
	}
	//获取电话号码
	var mobile = $("#receive_phone").val();
	sessionStorage.setItem("mobile", mobile);
	//	if (!isCondition(mobile)) {
	//		appAlert("提示","联系方式不可为空");
	//		return false;
	//	}
	var rag2 = /^(1[0-9])\d{9}$/;
	var rag = /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})+(\-?[0-9]{1,4})?$/;
	var rag4 = /^(0[0-9]{2,3}\-)+([2-9][0-9]{6,7})+(\-[0-9]{1,4})$/;
	//var rag=/(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+([0-9]{1,4})?$)|(^0?[1][3-9][0-9]{9}$)/;
	var leng = mobile.length;
	if(leng == 0) {
		if(!rag.test(mobile)) {
			layer.msg('请输入手机号码', {
				time: 2000
			});
			setTimeout(function() {
				document.getElementById("receive_phone").focus();
			}, 1000);
			return false;
		}
	} else if(0 < leng && leng < 11) {
		if(!rag.test(mobile)) {
			layer.msg('请输入正确的手机号码', {
				time: 2000
			});
			setTimeout(function() {
				document.getElementById("receive_phone").focus();
			}, 1000);
			return false;
		}
	} else if(leng == 11) {
		if(!rag.test(mobile) && !rag2.test(mobile)) {
			layer.msg('请输入正确的手机号码', {
				time: 2000
			});
			setTimeout(function() {
				document.getElementById("receive_phone").focus();
			}, 1000);
			return false;
		}
	} else if(leng > 11 && leng < 18) {
		if(!rag.test(mobile)) {
			layer.msg('请输入正确的手机号码', {
				time: 2000
			});
			setTimeout(function() {
				document.getElementById("receive_phone").focus();
			}, 1000);
			return false;
		}
	} else if(leng >= 18) {
		if(!rag4.test(mobile)) {
			//appAlert("提示", "请填写正确的电话号码");
			layer.msg('请输入正确的手机号码', {
				time: 2000
			});
			setTimeout(function() {
				document.getElementById("receive_phone").focus();
			}, 1000);
			return false;
		}
	}
	//验证地址是否选择省市区
	//	var addressCodes1 = cityPicker3.getSelectedItems();
	//	var addressCodes2 = cityPicker1.getSelectedItems();	
	//	provinceCode=addressCodes1[0].value || "";
	//	cityCode=addressCodes1[1].value || "";
	//	areaCode=addressCodes1[2].value || "";
	//	townCode=addressCodes2[0].value || "";
	//if (!sessionStorage.getItem("cityAreachange")) {
	//没有对省市区操作过        
	//}
	provinceCode = sessionStorage.getItem("provinceCode") || "";
	cityCode = sessionStorage.getItem("cityCode") || "";
	areaCode = sessionStorage.getItem("areaCode") || "";
	townCode = sessionStorage.getItem("townCode") || "";

	if(!isCondition(provinceCode) || !isCondition(cityCode) || !isCondition(areaCode)) {
		layer.msg('请选择省市区', {
			time: 2000
		});
		return false;
	}
	if(cityData1.length > 0 && !isCondition(townCode)) {
		layer.msg('请选择街道信息', {
			time: 2000
		});
		return false;
	}
	if(townCode == "9999999") {
		townCode = "";
	}
	//	return false;

	//验证详细地址，字数限定5-45字以内（详细地址为纯空格则算0字符，非纯空格，空格算字符），少于5个字或多于45字提示：详细地址限5~45个字符字以内
	var detailAddress = $("#details_address").val();
	var detailAddressY = trim(detailAddress);
	if(!isCondition(detailAddress)) {
		layer.msg('请填写详细收货地址！', {
			time: 2000
		});
		setTimeout(function() {
			document.getElementById("details_address").focus();
		}, 1000);
		return false;
	}
	if(detailAddressY.length < 5 || detailAddressY.length > 45) {
		layer.msg('详细地址限5-45个字符以内', {
			time: 2000
		});
		setTimeout(function() {
			document.getElementById("details_address").focus();
		}, 1000);
		return false;
	}

	var hId = $(".address_choose_on").attr("value");
	var address = $(".address_choose_on").text();
	sessionStorage.setItem("address", address);
	var isDef = parseInt($("#isDef").attr("value"));
	if(isNaN(isDef)) {
		isDef = 0;
	}
	sessionStorage.setItem("isDef", isDef);

	$("#baoz_bt").attr("onclick", "");
	$("#baoz_bt").css("background-color", "#bbb");
	var timestamp = new Date().getTime();
	var params = {};
	params.body = {
		type: 2,
		receiverInfoId: receiverInfoId,
		householdSerial: householdSerial,
		userName: userName,
		detailAddress: detailAddress,
		mobile: mobile,
		isDef: isDef,
		provinceCode: provinceCode,
		cityCode: cityCode,
		areaCode: areaCode,
		townCode: townCode,
	};

	if(!isCondition(receiverInfoId)) { //新增保存操作
		params.body.type = 1;
	}
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	var paramData = JSON.stringify(params);

	$.ajax({
		type: "get",
		url: host + "/mms/servlet/setUserReceiverInfo?str=" + paramData,
		dataType: "jsonp",
		timeout: 15000,
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(odata) {
			console.log(JSON.stringify(odata));
			if(odata.result == 0) {
				layer.msg('保存成功', {
					time: 1000
				});
				setTimeout(function() {
					goBack();
				}, 1200);
			} else {
				//appAlert("提示", "保存失败");
				layer.msg('保存失败，请不要添加表情或特殊符号', {
					time: 1000
				});
				$("#baoz_bt").attr("onclick", "saveAddress()");
				$("#baoz_bt").css("background-color", "#FF661B");
				return false;
			}
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			$("#baoz_bt").attr("onclick", "saveAddress()");
			$("#baoz_bt").css("background-color", "#FF661B");
			layer.msg("哎呀，当前网络不太好，请重新保存", {
				time: 2000
			});
		}
	})

}

//----执行删除地址操作
//function deleYAddress() {
//	var operateType = 3;
//	var time_stamp = Date.parse(new Date());
//	var str = "";
//	if(!isCondition(receiverInfoId)) { //新增时
//		if(isCondition(rId)) { //有保存
//			str = "{" +
//				"\"body\":{\"receiverInfoId\":\"" + rId + "\",\"operateType\":\"" + operateType + "\"}," +
//				"\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}" +
//				"}";
//			$.ajax({
//				type: "get",
//				url: host + "/mms/servlet/setUserReceiverInfo?str=" + str,
//				async: false,
//				dataType: "jsonp",
//				jsonp: "jsoncallback",
//				jsonpCallback: "success_jsonpCallback",
//				success: function(odata) {
//					$("#tip_bg").hide();
//					$("#tip").hide();
//				}
//			})
//		}
//		$("#tip_bg").hide();
//		$("#tip").hide();
//	} else { //编辑
//		str = "{" +
//			"\"body\":{\"receiverInfoId\":\"" + receiverInfoId + "\",\"operateType\":\"" + operateType + "\"}," +
//			"\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}" +
//			"}";
//		$.ajax({
//			type: "get",
//			url: host + "/mms/servlet/setUserReceiverInfo?str=" + str,
//			async: false,
//			dataType: "jsonp",
//			jsonp: "jsoncallback",
//			jsonpCallback: "success_jsonpCallback",
//			success: function(odata) {
//				sessionStorage.setItem("receiverInfoId", "");
//				$("#tip_bg").hide();
//				$("#tip").hide();
//			}
//		})
//	}
//	goBack();
//}

//function chooseAddress() {
//	$(".swiper-wrapper").empty();
//	$("#tip_bg").show();
//	setTimeout(function() {
//		$(".choose_address_on").css("bottom", "-200%");
//		$(".choose_address_on").animate({
//			bottom: '0'
//		}, 500);
//	}, 200);
//	setData();
//}
//
//function choose_No() {
//	//	$(".choose_address_on").hide();
//	$("#tip_bg").hide();
//	$(".swiper-wrapper").empty();
//	$(".choose_address_on").animate({
//		bottom: '-40%'
//	}, 500);
//}
//
//function choose_Yes() {
//	//	$(".choose_address_on").hide();
//	$("#tip_bg").hide();
//	$(".choose_address_on").animate({
//		bottom: '-40%'
//	}, 500);
//	if(isCondition(choose_id)) {
//		$(".address_choose_on").attr("value", choose_id);
//		$(".address_choose_on").text(choose_address);
//		$(".address_choose_on").css("text-align", "left");
//	}
//	$(".swiper-wrapper").empty();
//}
////----选择删除地址操作
//function deleAddress() {
//	layer.confirm('你确定删除该地址吗？', {
//		title: '',
//		closeBtn: '0',
//		skin: 'demo_two'
//	}, function(index) {
//		deleYAddress();
//		layer.close(index);
//	});
//}

//function setData() {
//	var odata = JSON.parse(sessionStorage.getItem("odata"));
//	var list = odata.list;
//	for(var i = 0; i < list.length; i++) {
//		var option = "<div class='swiper-slide' value='" + list[i].id + "' name='" + list[i].areaId + "'><p>" + list[i].address + "</p><div></div></div>";
//		$(".swiper-wrapper").append(option);
//	}
//	var option2 = "<div class='swiper-slide' id='swiper-slide_none'></div>";
//	$(".swiper-wrapper").append(option2);
//	var mySwiper = new Swiper('.swiper-container', {
//		pagination: '.pagination',
//		//paginationClickable: true,
//		mode: 'vertical',
//		freeMode: true,
//		//freeModeFluid: true,
//		slidesPerView: 'auto',
//	});
//	$(".swiper-slide[value='" + householdId + "']").addClass("address_list_on_white");
//	$(".swiper-slide").click(function() {
//		if($(this).attr("id") == "swiper-slide_none") {
//			return false;
//		}
//		$(".swiper-slide").removeClass("address_list_on_white");
//		$(this).addClass("address_list_on_white");
//		choose_id = $(this).attr("value");
//		choose_address = $(this).text();
//		choose_areaId = $(this).attr("name");
//	});
//}
//获取绑定的住房地址
//function getBindHousehold() {
//	var time_stamp = Date.parse(new Date());
//	var data2 = "{" + "\"body\":{\"type\":\"" + 3 + "\"}," +
//		"\"header\":{\"token\":\"" + token + "\",\"time_stamp\":\"" + time_stamp + "\"}}";
//	$.ajax({
//		type: "get",
//		url: host + "/mms/servlet/getUserReceiverInfo?str=" + data2,
//		async: false,
//		dataType: "jsonp",
//		jsonp: "jsoncallback",
//		jsonpCallback: "success_jsonpCallback",
//		success: function(odata) {
//			var data = JSON.stringify(odata);
//			sessionStorage.setItem("odata", data);
//		}
//	})
//}
//3级滚动，数据填充操作
function selectCity(objectCity) {
	console.log(objectCity);
	closeStatut = 0;
	console.log("                               " + closeStatut);
	var selectType = objectCity.type || '';
	var selectValue = objectCity.value || '';
	var selectText = objectCity.text || '';
	var lastSelect = sessionStorage.getItem(selectType);
	console.log(selectValue + "        " + lastSelect);
	//轻轻滚动，实际位置不变判断
	if(lastSelect != selectValue) {
		sessionStorage.setItem(selectType, selectValue);
		switch(selectType) {
			case 'province':
				console.log("选择修改" + selectText + "  准备加载" + selectText + "下的市及区");
				for(var i = 0; i < cityData3.length; i++) {
					if(cityData3[i].value == selectValue) {
						//如果之前已近加载过的数据，不再请求加载
						if(cityData3[i].children != undefined && cityData3[i].children.length > 0) {
							cityPicker3.pickers[1].setSelectedIndex(0);
							cityPicker3.pickers[2].setSelectedIndex(0);
							console.log("市数据已经加载过一次，不再重复加载");
							//var SelectedItems=cityPicker3.getSelectedItems();
							//console.log(SelectedItems[1].text)
						} else {
							//添加该省下的所有市并市返回第一个  ,
							getAddressdate(2, selectValue, 'cities', i);
							//	cityPicker3.pickers[2].setSelectedIndex(0,500);
						}
						return 1;
					}
				}
				break;
			case 'cities':
				console.log("选择修改" + selectText + "  准备加载" + selectText + "下的区");
				for(var i = 0; i < cityData3.length; i++) {
					if(cityData3[i].children != undefined && cityData3[i].children.length > 0) {
						for(var j = 0; j < cityData3[i].children.length; j++) {
							//如果之前已近加载过的数据，不再请求加载
							if(cityData3[i].children[j].value == selectValue) {
								if(cityData3[i].children[j].children != undefined && cityData3[i].children[j].children.length > 0) {
									cityPicker3.pickers[2].setSelectedIndex(0, 500);
									console.log("区数据已经加载过一次，不再重复加载");
								} else {
									getAddressdate(2, selectValue, 'counties', i, j);
								}
								//添加该市下的所有区并返回第一个
								return 1;
							}
						}
					}
				}
				break;
			case 'counties':
				console.log("选择修改" + selectText + "下的街道");
				break;
			default:
				console.log("错误空选项");
		}
	} else {
		console.log("不做操作");
	}
}
//获取省市区数据
function getAddressdate(typeY, valueY, form, number1, number2) {
	var timestamp = Date.parse(new Date());
	var parentCode = valueY;
	var type = typeY;
	var params = {};
	params.header = {
		token: token,
		time_stamp: timestamp
	};
	params.body = {
		type: type,
		parentCode: parentCode
	};
	var paramData = JSON.stringify(params);
	//console.log(host + "/mms/servlet/getAdministrativeDivision?str=" + paramData);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getAdministrativeDivision?str=" + paramData,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//	jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(data.result == 0) {
				switch(form) {
					case 'province':
						if(data.areaList != undefined && data.areaList.length > 0) {
							var provinceD1 = data.areaList;
							var index = "0";
							for(var i = 0; i < provinceD1.length; i++) {
								if(provinceD1[i].code == sessionStorage.getItem("provinceCode")) {
									index = i;
								}
								cityData3[i] = {
									value: provinceD1[i].code,
									type: 'province',
									text: provinceD1[i].name
								};
							}
							cityPicker3.setData(cityData3);
							cityPicker3.pickers[0].setSelectedIndex(index, 500);
							sessionStorage.setItem("provinceIndex", index);
						}
						break;
					case 'cities':
						if(!isCondition(data.areaList)) {
							sessionStorage.setItem("streetNone", "1");
							closeStatut = 1;
						}
						if(data.areaList != undefined && data.areaList.length > 0) {
							var provinceD2 = data.areaList;
							var citiesArray = [];
							var index = "0";
							for(var i = 0; i < provinceD2.length; i++) {
								if(provinceD2[i].code == sessionStorage.getItem("cityCode")) {
									index = i;
								}
								citiesArray[i] = {
									value: provinceD2[i].code,
									type: form,
									text: provinceD2[i].name
								};
							}
							cityData3[number1].children = citiesArray;
							cityPicker3.setData(cityData3);
							cityPicker3.pickers[1].setSelectedIndex(index, 500);
							sessionStorage.setItem("citiesIndex", index);
						}
						break;
					case 'counties':
						if(!isCondition(data.areaList)) {
							sessionStorage.setItem("streetNone", "1");
							closeStatut = 1;
						}
						if(data.areaList != undefined && data.areaList.length > 0) {
							var provinceD2 = data.areaList;
							var countiesArray = [];
							var index = "0";
							for(var i = 0; i < provinceD2.length; i++) {
								if(provinceD2[i].code == sessionStorage.getItem("areaCode")) {
									index = i;
								}
								countiesArray[i] = {
									value: provinceD2[i].code,
									type: form,
									text: provinceD2[i].name
								};
							}
							cityData3[number1].children[number2].children = countiesArray;
							cityPicker3.setData(cityData3);
							cityPicker3.pickers[2].setSelectedIndex(index, 500);
							sessionStorage.setItem("countiesIndex", index);
						}
						break;
					case 'street':
						if(!isCondition(data.areaList)) {
							sessionStorage.setItem("streetNone", "1");
						} else {
							sessionStorage.setItem("streetNone", "0");
						}
						if(data.areaList != undefined && data.areaList.length > 0) {
							var provinceD2 = data.areaList;
							var streetArray = [];
							var index = "0";
							for(var i = 0; i < provinceD2.length; i++) {
								if(provinceD2[i].code == sessionStorage.getItem("townCode")) {
									index = i;
								}
								streetArray[i] = {
									value: provinceD2[i].code,
									type: form,
									text: provinceD2[i].name
								};
							}
							var noneObject = {
								value: "9999999",
								type: "street",
								text: "暂不选择"
							}
							streetArray.push(noneObject);
							cityData1 = streetArray;
							cityPicker1.setData(cityData1);
							cityPicker1.pickers[0].setSelectedIndex(index, 500);
							sessionStorage.setItem("streetIndex", index);
						}
						break;
					default:
						console.log("错误空选项");
				}
			} else {
				console.log(JSON.stringify(data));
			}
		}
	});
}
//3级数据遍历查询，得出相对应的的位置移动
function getIndexfromarray(value1, value2, value3, arrayY) {
	var indexArray = [];
	var arrayY = arrayY;
	for(var i = 0; i < arrayY.length; i++) {
		if(arrayY[i].value == value1) {
			indexArray[0] = i;
			if(arrayY[i].children == undefined) {
				break;
			}
			for(var j = 0; j < arrayY[i].children.length; j++) {
				if(arrayY[i].children[j].value == value2) {
					indexArray[1] = j;
					if(arrayY[i].children[j].children == undefined) {
						break;
					}
					for(var z = 0; z < arrayY[i].children[j].children.length; z++) {
						if(arrayY[i].children[j].children[z].value == value3) {
							indexArray[2] = z;
						}
					}
				}
			}
		}
	}
	return indexArray;
}