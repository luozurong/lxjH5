//var mmsHost = 'https://tt.hori-gz.com:8443';
//var mmsHost = "http://192.168.51.41:8090";
var token = GetURLParameter('token');

var areaList = [];
var areaPickerList = [];
var streetParentCode = '';

var ajaxState = "true";
var ajaxStatechange;

var vue = new Vue({
	el: '.commanderInfo',
	data: {
		groupName: '',
		groupMobile: '',
		groupHome: '',
		groupAddress: '',
		groupStreet: '',
		groupArea: '',
		province: '',
		provinceName: '',
		city: '',
		cityName: '',
		country: '',
		countryName: '',
		town: '',
		townName: '',
		submitFlag: true,
		submitActive: false,
		isWxBrowser: isWxBrowser
	},
	watch: {
		groupName: function(o, n) {
			this.infoFilters();
		},
		groupMobile: function(o, n) {
			this.infoFilters();
		},
		groupHome: function(o, n) {
			this.infoFilters();
		},
		groupArea: function(o, n) {
			this.infoFilters();
		}
	},
	methods: {
		commanderInfoSubmit: function() {
			if(!this.submitActive || !this.submitFlag) {
				return false;
			}
			var myreg = /^[1][0-9][0-9]{9}$/;
			if(!myreg.test(this.groupMobile)) {
				lxjTip.msg("请填写正确的手机号码");
				return false;
			}
			this.submitFlag = false;
			var params = {
				body: {
					name: this.groupName,
					phone: this.groupMobile,
					province: this.province,
					provinceName: this.provinceName,
					city: this.city,
					cityName: this.cityName,
					country: this.country,
					countryName: this.countryName,
					town: this.town == "000000" ? "" : this.town,
					townName: this.town == "000000" ? "" : this.townName,
					areaName: this.groupHome,
					doorplateAddr: this.groupArea,
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/saveLeaderInfo?str=" + paramsStr;
			console.log(httpURL);
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				console.log(res);
				if(res.body.result == 0) {
					lxjTip.msg("信息提交成功");
					//
					if(isWxBrowser) {
						window.location.href = 'successInfo.htm'
					}else{
						showActivity(mmsHostN + "/mms/html5/groupon/commander/successInfo.htm", "提交成功");
					}

				} else {
					lxjTip.msg("信息提交失败");
				}
				this.submitFlag = true;
			}, function(res) {
				this.submitFlag = true;
			});
		},
		infoFilters: function() {
			if(this.groupName.trim() == '') {
				this.submitActive = false;
				return false;
			}
			if(this.groupMobile.trim() == '') {
				this.submitActive = false;
				return false;
			}
			if(this.groupHome.trim() == '') {
				this.submitActive = false;
				return false;
			}
			if(this.groupAddress.trim() == '') {
				this.submitActive = false;
				return false;
			}
			if(this.groupStreet.trim() == '') {
				this.submitActive = false;
				return false;
			}
			if(this.groupArea.trim() == '') {
				this.submitActive = false;
				return false;
			}
			this.submitActive = true;
		}
	},
	mounted: function() {
		if(!this.isWxBrowser) { //app环境			
			this.setCookie('token', this.GetURLParameter("token"));
			setTitle("团长招募");
			nativeMethod("showClosebutton", null);
		}
		var that = this;
		if(isWxBrowser) {
			this.wxJsdkConfig();
		}
	}
});

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function refreshData() {
	setTimeout(function() {
		//	vue.getBaseData();
	}, 0);
	return 1;
}

$(document).ready(function() {
	sessionStorage.removeItem("provinceCode");
	sessionStorage.removeItem("cityCode");
	sessionStorage.removeItem("areaCode");
	sessionStorage.removeItem("townCode");
	sessionStorage.removeItem("selsectStreet");

	$(document).ajaxSend(function(e, xhr, opt) {
		ajaxState = "false";
		clearTimeout(ajaxStatechange);
		//console.log("ajax请求" +ajaxState);
	});
	$(document).ajaxComplete(function(event, request, settings) {
		ajaxStatechange = setTimeout("ajaxState='true'", 800);

	});

});

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
		token: "_2019",
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
		url: mmsHost + "/mms/servlet/getAdministrativeDivision?str=" + paramData,
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
							/*var noneObject = {
								value: "9999999",
								type: "street",
								text: "暂不选择"
							}
							streetArray.push(noneObject);*/
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