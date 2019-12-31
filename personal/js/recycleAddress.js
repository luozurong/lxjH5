var token = GetURLParameter("token");
var childOrderNo = GetURLParameter("childOrderNo");
var safeguardNo = GetURLParameter("safeguardNo");
var host = host;

var returnAddress ="";
var returnName = "";
var returnPhone = "";

setTitle("填写地址");

/*var token = "152420337645d65e34ee9ebf41ce9320";
var host = "https://tt.hori-gz.com:8443";
var childOrderNo = "201804161131176307911";
var safeguardNo = "WQ201804161528274099177 ";*/

var cityData3 = [];
var cityData1 = [];
var cityPicker3;
var cityPicker1;
var closeStatut = 0;
var ajaxState = "true";
var ajaxStatechange;

sessionStorage.setItem("province", "0000");
sessionStorage.setItem("cities", "0000");
sessionStorage.setItem("counties", "0000");
sessionStorage.setItem("street", "0000");

sessionStorage.setItem("provinceCode", "");
sessionStorage.setItem("cityCode", "");
sessionStorage.setItem("areaCode", "");

$(document).ajaxSend(function(e, xhr, opt) {
	ajaxState = "false";
	clearTimeout(ajaxStatechange);
});
$(document).ajaxComplete(function(event, request, settings) {
	ajaxStatechange = setTimeout("ajaxState='true'", 800);
});

function refreshData() {
	setTimeout(function() {

	}, 0);
	return 1;
}

$(".recycleAddress-fixed div").click(function() {
	var companyName = $("#choose_name1 .right_buttom").text();
	var companyNum = $("#choose_name2 input").val();
	var peopleName = $("#choose_name3 input").val();
	var mobile = $("#choose_number input").val();
	/*var address = $("#choose_address1 span").text();
	var street = $("#choose_address2 span").text();
	var area = $("#details_address").val();*/

	var mobileRex = /[0-9]{11}/;
	//street = street == "暂不选择" ? '' : street;

	if(companyName == '') {
		lxjTip.msg("请输入快递公司");
		return;
	}
	if(companyNum == '') {
		lxjTip.msg("请输入快递单号");
		return;
	}
	if(peopleName == '') {
		lxjTip.msg("请输入收件人");
		return;
	}
	if(mobile == '' || !mobileRex.test(mobile)) {
		lxjTip.msg("请输入正确的手机号码");
		return;
	}
	/*if(address == '省 市 区') {
		lxjTip.msg("请输入省市区");
		return;
	}
	if(street == '街道') {
		lxjTip.msg("请输入街道");
		return;
	}
	if(area == '') {
		lxjTip.msg("请输入详细地址");
		return;
	}*/

	var params = {
		header: {
			token: token,
			time_stamp: new Date().getTime()
		},
		body: {
			childOrderNo: childOrderNo,
			safeguardNo: safeguardNo,
			logisticsName: companyName,
			logisticsNo: companyNum,
			receiverName: peopleName,
			receiverPhone: mobile,
			receiverAddress: returnAddress
			//	receiverAddress: address + street + area
		}
	}
	var paramData = JSON.stringify(params);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/saveUserReturnAddress?str=" + paramData,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(data);
			lxjTip.msg(data.result);
			if(data.result == 0) {
				lxjTip.msg("保存成功");
				var jsonData = {
					type: 5,
					safeguardNo: safeguardNo,
					chooseType: 1,
					targetUrl: "/mms/html5/personal/order_details.htm",
					orderNo: childOrderNo,
					returnMessage: returnAddress + " " + peopleName + " " + mobile
				};
				var jsonData2 = JSON.stringify(jsonData);
				nativeMethod("syncDataState", jsonData2);
				setTimeout(function() {
					goBack();
				}, 2000)
			}
		}
	});

});

$("#choose_name1").click(function() {
	var picker = new mui.PopPicker();
	picker.setData([{
			value: '001',
			text: '圆通'
		},
		{
			value: '002',
			text: '申通'
		},
		{
			value: '003',
			text: '中通'
		},
		{
			value: '004',
			text: '韵达'
		},
		{
			value: '005',
			text: '顺丰'
		},
		{
			value: '006',
			text: '宅急送'
		},
		{
			value: '007',
			text: 'EMS'
		},
		{
			value: '008',
			text: '天天'
		},
		{
			value: '009',
			text: '速尔'
		},
		{
			value: '010',
			text: '优速'
		},
		{
			value: '011',
			text: '德邦'
		},
		{
			value: '012',
			text: '其他'
		}
	]);
	picker.show(function(selectItems) {
		$("#choose_name1 .right_buttom").text(selectItems[0].text);
		$("#choose_name1 .right_buttom").removeClass("colorCCC");
	})
});

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

/*mui.init();
mui.ready(function() {
	sessionStorage.removeItem("provinceCode");
	sessionStorage.removeItem("cityCode");
	sessionStorage.removeItem("areaCode");
	sessionStorage.removeItem("townCode");

	cityPicker1 = new mui.PopPicker({
		layer: 1
	});
	cityPicker1.setData(cityData1);
	var showCityPickerButton = document.getElementById('choose_address2');
	var cityResult = document.getElementById('select_jd');
	showCityPickerButton.addEventListener('click', function(event) {

		$("textarea,input").blur();
		document.getElementById("details_address").blur();
		if(!isCondition(sessionStorage.getItem("provinceCode")) || !isCondition(sessionStorage.getItem("cityCode")) || !isCondition(sessionStorage.getItem("areaCode"))) {
			layer.msg("请先选省市区", {
				time: 2000
			});
			return false;
		}
		if(!isCondition(cityData1) && sessionStorage.getItem("streetNone") == 1) {
			layer.msg("空街道信息", {
				time: 2000
			});
			cityResult.innerText = "暂不选择";
			sessionStorage.setItem("townCode", "9999999");
			sessionStorage.setItem("streetchange", "true");
			return false;
		}
		if(cityPicker3.getSelectedItems()[0].value != sessionStorage.getItem("townCode")) {
			var indexArray = getIndexfromarray(sessionStorage.getItem("townCode"), "0000", "0000", cityData1);
			cityPicker1.pickers[0].setSelectedIndex(indexArray[0] || 0, 500);
		}
		if(sessionStorage.getItem("selsectStreet") != null && sessionStorage.getItem("selsectStreet") != undefined && cityData1.length > 0) {
			console.log(sessionStorage.getItem("selsectStreet"));
			//	console.log(cityPicker1)
			setTimeout(function() {
				cityPicker3.hide();
				cityPicker1.show(function(items) { //返回 false 可以阻止选择框的关闭
					cityResult.innerText = items[0].text;
					sessionStorage.setItem("townCode", (items[0].value || ''));
					sessionStorage.setItem("streetchange", "true");
				});
			}, 250);

		}

	}, false);

	cityPicker3 = new mui.PopPicker({
		layer: 3
	});
	cityPicker3.setData(cityData3);
	cityPicker3.pickers[1].setSelectedIndex(0);
	cityPicker3.pickers[2].setSelectedIndex(0);

	var showCityPickerButton = document.getElementById('choose_address1');
	var cityResult3 = document.getElementById('select_ssq');
	//					
	showCityPickerButton.addEventListener('tap', function(event) {
		$("textarea,input").blur();
		//var cityPicker3close="true";

		if(!isCondition(cityData3)) {
			return false;
		}

		if(cityPicker3.getSelectedItems()[0].value != sessionStorage.getItem("provinceCode") || cityPicker3.getSelectedItems()[1].value != sessionStorage.getItem("cityCode") || cityPicker3.getSelectedItems()[2].value != sessionStorage.getItem("areaCode")) {
			var indexArray = getIndexfromarray(sessionStorage.getItem("provinceCode"), sessionStorage.getItem("cityCode"), sessionStorage.getItem("areaCode"), cityData3);
			cityPicker3.pickers[0].setSelectedIndex(indexArray[0] || 0, 500);
			cityPicker3.pickers[1].setSelectedIndex(indexArray[1] || 0, 500);
			cityPicker3.pickers[2].setSelectedIndex(indexArray[2] || 0, 500);
		}
		setTimeout(function() {
			cityPicker1.hide();
			cityPicker3.show(function(items) { //返回 false 可以阻止选择框的关闭			
				if(sessionStorage.getItem("endscrollState") != "true") {
					return false;
				}
				if(!isCondition(items[1].value) || !isCondition(items[2].value) || ajaxState != "true") { //预防数据还没加载完毕就点确定
					if(closeStatut == 0) {
						return false;
					}
				}
				cityResult3.innerText = (items[0].text || '') + "" + (items[1].text || '') + "" + (items[2].text || '');
				sessionStorage.setItem("selsectStreet", (items[2].value));
				sessionStorage.setItem("provinceCode", (items[0].value || ''));
				sessionStorage.setItem("cityCode", (items[1].value || ''));
				sessionStorage.setItem("areaCode", (items[2].value || ''));
				ajaxState = "true";
				sessionStorage.setItem("townCode", '');
				sessionStorage.setItem("cityAreachange", "true");
				cityResult.innerText = "街道";
				cityData1 = [];
				cityPicker1.setData(cityData1);
				if(isCondition(items[2].value)) {
					getAddressdate(2, (items[2].value), 'street');
				}
			});
		}, 200);

	}, false);
});
getAddressdate(1, 1000, "province");*/
//3级滚动，数据填充操作
function selectCity(objectCity) {
	closeStatut = 0;
	var selectType = objectCity.type || '';
	var selectValue = objectCity.value || '';
	var selectText = objectCity.text || '';
	var lastSelect = sessionStorage.getItem(selectType);
	//轻轻滚动，实际位置不变判断
	if(lastSelect != selectValue) {
		sessionStorage.setItem(selectType, selectValue);
		switch(selectType) {
			case 'province':
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
				for(var i = 0; i < cityData3.length; i++) {
					if(cityData3[i].children != undefined && cityData3[i].children.length > 0) {
						for(var j = 0; j < cityData3[i].children.length; j++) {
							//如果之前已近加载过的数据，不再请求加载
							if(cityData3[i].children[j].value == selectValue) {
								if(cityData3[i].children[j].children != undefined && cityData3[i].children[j].children.length > 0) {
									cityPicker3.pickers[2].setSelectedIndex(0, 500);
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

var detailsAddress = document.getElementById("details_address");
detailsAddress.onfocus = function() {
	setTimeout(function() {
		cityPicker1.hide();
		cityPicker3.hide();
		//lxjTip.msg();
	}, 200)

}
getAddressFun();

function getAddressFun() {
	var params = {
		body: {
			safeguardNo: safeguardNo
		},
		header: {
			token: token,
			time_stamp: new Date().getTime()
		}
	}
	var paramsStr = encodeURI(JSON.stringify(params));

	//console.log(host + "/mms/servlet/getAdministrativeDivision?str=" + paramData);
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getBusinessReceiveMessage?str=" + paramsStr,
		async: false,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//	jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			returnAddress = data.returnAddress;
			returnName = data.returnName;
			returnPhone = data.returnPhone;

			$("#choose_name3 #receive_name").val(returnName);
			$("#receive_phone").val(returnPhone);
			$("#details_address").text(returnAddress);

		}
	})

}