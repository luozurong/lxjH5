function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function isCondition(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}

var url = window.location.search;
var host = "https://" + window.location.host; //主机名,包含端口
var clientType = GetURLParameter("clientType");
sessionStorage.setItem("clientType", clientType);
sessionStorage.setItem("host", host);
var interlxjversionsName = ""
if(isCondition(sessionStorage.getItem("lxjversionsName"))) {
	interlxjversionsName = Number(sessionStorage.getItem("lxjversionsName"));
} else {
	interlxjversionsName = Number((GetURLParameter("lxjversionsName") ? GetURLParameter("lxjversionsName") : "0").replace(/[^0-9]/ig, ""));
	sessionStorage.setItem("lxjversionsName", interlxjversionsName);
}

var iosTitle = "";
var nativeState = true;
var setimeoutfunction;
//设置标题
function setTitle(title) {
	try {
		if(clientType == "android") {
			contact.setTitle(title);
		} else { //ios
			iosTitle = title;
		}
	} catch(e) {}

}

function setIosTitle() {
	return iosTitle;
}
//弹出一个原生的提示框
function appAlert(title, message) {
	try {
		if(clientType == "android") {
			contact.alert(title, message);
		} else { //ios
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('showAlert', {
					title: title,
					message: message
				})
			} else {
				contact_alert(title, message);
			}
		}
	} catch(e) {}
}
//以原生界面activity的形式打开一个url
function showActivity(url, title) {
	if(!nativeState) {
		return false;
	}
	nativeState = false;
	setimeoutfunction = setTimeout("nativeState=true", 2000);
	try {
		if(clientType == "android") {
			contact.showActivity(url, title);
		} else { //ios
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('showActivity', {
					url: url,
					title: title
				});
			} else {
				contact_showActivity(url, title);
			}
		}
	} catch(e) {}
}

var clearHistoryStatus = 0;
// 清除历史缓存记录
// 缓存清除后，后退会直接关闭当前原生界面
function clearHistory() {
	try {
		if(clientType == "android") {
			contact.clearHistory();
		} else { //ios
			clearHistoryStatus = 1;
		}
	} catch(e) {}
}

function setClearHistory() {
	return clearHistoryStatus;
}

//关闭当前的原生界面
function goBack() {
	try {
		if(clientType == "android") {
			contact.goBack();
		} else { //ios					
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('closeActivity');
			} else {
				contact_closeActivity();
			}
		}
	} catch(e) {}
}

var refreshStatus = 0;
//界面刷新
function setRefreshOnResume() {
	try {
		if(clientType == "android") {
			contact.setRefreshOnResume();
		} else { //ios
			refreshStatus = 1;
		}
	} catch(e) {}
}

function iosRefresh() {
	return refreshStatus;
}

// 实时聊天联系某人
//@param jid       xmpp账号
function chatWith(jid) {
	try {
		if(clientType == "android") {
			contact.chatWith(jid);
		} else { //ios						
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('chatWith', {
					jid: jid
				});
			} else {
				contact_chatWith(jid);
			}
		}
	} catch(e) {}
}
//弹出登录框
//判断当前的token是否是需要登录
function needLogin(token) {
	var flag;
	try {
		if(clientType == "android") {
			flag = contact.needLogin(token);
		} else { //ios						
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				flag = callNativeMethod('needLogin', {
					token: token
				}, '1');
			} else {
				flag = contact_needLogin(token);
			}
		}
	} catch(e) {}
	return flag;
}
//判断是否安装支付宝客户端
function isAliPayInstall() {
	var flag;
	try {
		if(clientType == "android") {
			flag = contact.isAliPayInstall();
		} else { //ios					
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				flag = callNativeMethod('isAliPayInstall', null, '1');
			} else {
				flag = contact_isAliPayInstall();
			}
		}
	} catch(e) {}
	return flag;
}
//跳转到支付宝支付界面(旧版的web方式支付)
function showAliPayActivity(url) {
	try {
		if(clientType == "android") {
			contact.showAliPayActivity(url);
		} else { //ios		
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('showAliPayActivity', {
					url: url
				})
			} else {
				contact_showAliPayActivity(url);
			}
		}
	} catch(e) {}
}

function pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl, cancleCallBackUrl) {
	var i = 0;
	try {
		if(clientType == "android") {
			try { //判断此处参数是否无定义或null  解决旧版本只有5个参数的问题 空字符串有特殊用途
				i = contact.pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl, cancleCallBackUrl);
			} catch(e) {
				contact.pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl);
			}
		} else { //ios
			try {
				var parameters = {
					type: type,
					data: data,
					queryOrderUrl: queryOrderUrl,
					successCallBackUrl: successCallBackUrl,
					failureCallBackUrl: failureCallBackUrl,
					cancleCallBackUrl: cancleCallBackUrl

				};
				if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
					i = callNativeMethod('pay', parameters, '1');
				} else {
					i = contact_pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl, cancleCallBackUrl);
				}
			} catch(e) {
				contact_pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl);
			}
		}
	} catch(e) {}
	return i;
}

var result = "";
//*
// 调用原生客户端从图库或者摄像头选择图片并上传
// 可选择单张或者多张图片
// 图片上传之后调用js返回结果给网页 onPictureSelected(String json)
// json的结果为图片上传结果返回的消息bean ImagesUploadResult
//
// @param maxPicture 最大上传数量
///
function selectPicture(maxPicture) {
	try {
		if(clientType == "android") {
			contact.selectPicture(maxPicture);
		} else {
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('selectPicture', {
					maxPicture: maxPicture
				});
			} else {
				contact_selectPicture(maxPicture);
			}
		}
	} catch(e) {}
}

//打开个人中心我的订单界面
function showMyOrdersActivity() {
	try {
		if(clientType == "android") {
			contact.showMyOrdersActivity();
		} else {
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('showMyOrdersActivity');
			} else {
				contact_showMyOrdersActivity();
			}
		}
	} catch(e) {}
}
// 从历史stack一个一个的pop出来，知道页面与page相同
//* pop2Page(XXXX.html)跳到上一个XXXX.html
// * 如果是stack里面最后一个，则直接显示该地址
function pop2Page(pageUrl) {
	try {
		if(clientType == "android") {
			contact.pop2Page(pageUrl);
		} else {
			//            

			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('pop2Page', {
					pageUrl: pageUrl
				});
			} else {
				contact_pop2Page(pageUrl);
			}
		}
	} catch(e) {}
}

//返回显示上一个界面
function popUrl() {
	try {
		if(clientType == "android") {
			contact.popUrl();
		} else {
			setTimeout(function() {
				//				
				if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
					callNativeMethod('popUrl');
				} else {
					contact_popUrl();
				}
			}, 200);
		}
	} catch(e) {}
}

//返回生活首页
function backToHomePage() {
	try {
		if(clientType == "android") {
			contact.backToHomePage();
		} else {
			clearHistoryStatus = 2;
		}
	} catch(e) {}
}

//*
// 以原生界面activity的形式打开一个url
// 该界面有一些特殊的设置
//
// @param url       url地址
// @param title     界面显示的标题
// @param type      标题或者特殊分类 1（有编辑/完成按钮）购物车2 购物车详情（共3件的提示），4...
// @param data      特殊JSON数据，type1填null，type2是bean，里面有message，如{message:共3件}
function showActivitySpecial(url, title, type, data) {
	if(!nativeState) {
		return false;
	}
	nativeState = false;
	setimeoutfunction = setTimeout("nativeState=true", 2000);
	try {
		if(clientType == "android") {
			contact.showActivitySpecial(url, title, type, data);
		} else {
			//			

			var parameters = {
				url: url,
				title: title,
				type: type,
				data: data
			};
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('showActivitySpecial', parameters);
			} else {
				contact_showActivitySpecial(url, title, type, data);
			}

		}
	} catch(e) {}
}
//*
// 调用原生客户端进行地图导航
// @param name 地点名称(店铺名)
// @param addressName 地址名称
// @param lon  经度参数，以字符串方式传输，自己转换成浮点数据
// @param lat  纬度参数，以字符串方式传输，自己转换成浮点数据
function showMap(name, addressName, lon, lat) {
	try {
		if(clientType == "android") {
			contact.showMap(name, addressName, lon, lat);
		} else {
			//			
			var parameters = {
				name: name,
				addressName: addressName,
				lon: lon,
				lat: lat
			};
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('showMap', parameters);
			} else {
				contact_showMap(name, addressName, lon, lat);
			}

		}
	} catch(e) {}
}
///**
// * 切换全屏/普通
// *
// * @param isFulllScreen 是否全屏
// */
//@JavascriptInterface
//public void switchFullScreen(boolean isFulllScreen) {
//}
function switchFullScreen(flag) {
	try {
		if(clientType == "android") {
			contact.switchFullScreen(flag);
		} else {
			//			

			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('switchFullScreen', {
					flag: flag
				})
			} else {
				contact_switchFullScreen(flag);
			}
		}
	} catch(e) {}
}

function showProgressDialog() {
	try {
		if(clientType == "android") {
			contact.showProgressDialog();
		} else {
			//			

			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('showProgressDialog');
			} else {
				contact_showProgressDialog();
			}
		}
	} catch(e) {}
}
function closeProgressDialog() {
	try {
		if(clientType == "android") {
			contact.closeProgressDialog();
		} else {
			  callNativeMethod('removeActivityIndicator');
		}
	} catch(e) {}
}

function nativeMethod(command, jsonData) {
	try {
		if(clientType == "android") {
			contact.webJsMethod(command, jsonData);
		} else {
			//            
			if(isCondition(interlxjversionsName) && interlxjversionsName >= 4008) {
				callNativeMethod('webJsMethod', {
					command: command,
					jsonData: jsonData
				});
			} else {
				contact_webJsMethod(command, jsonData);
			}
		}
	} catch(e) {}
}
//禁用原生的页面滑动
function disableNativeScorll() {
	callNativeMethod('disableNativeScorll');

}

/*
 methodName:OC对于的方法名
 parameters:传给OC的参数（jsonString）
 callback:是否需要OC回调给JS（‘0’：否，‘1’：是）
 */
function callNativeMethod(methodName, parameters, callback) {

	var message = {
		'methodName': methodName,
		'parameters': parameters,
		'callback': callback
	}
	var jsonString = json2Str(message);
	var callback = prompt(jsonString);

	return callback;
}

function json2Str(param) {
	if(param && typeof param === 'object') {
		return JSON.stringify(param);
	} else {
		return param || '';
	}
}

/*********************************以下是DEMO*********************************/

function callJsData(title) {

	var jsonData = callNativeMethod('settingName', {
		title: title
	}, '1');
	if(jsonData) {
		document.getElementById('jsParamFuncSpan').innerHTML = jsonData;
	} else {
		document.getElementById('jsParamFuncSpan').innerHTML = 'false';
	}

}

function showNativeAlert(title, message) {
	callNativeMethod('showAlertView', {
		title: title,
		message: message
	}, '0');

}

function showActivityIndicator() {
	callNativeMethod('showActivityIndicator');
}

function editting() {
	document.getElementById('editMode').innerHTML = '正在编辑中。。。';
}

function completeEdit() {
	document.getElementById('editMode').innerHTML = '✔️完成编辑';
}