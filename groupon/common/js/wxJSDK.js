(function(doc, win) {
	var docEl = doc.documentElement,
		isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi),
		dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
		dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
		scale = 1 / dpr,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	docEl.dataset.dpr = dpr;
	var recalc = function() {
		var width = docEl.clientWidth;
		if(width / dpr > 768) {
			width = 768 * dpr;
		}
		docEl.style.fontSize = 100 * (width / 414) + 'px';
	};
	recalc();
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
})(document, window)

var url = window.location.host;
var reg = RegExp(/tt/);
var regLocal = RegExp(/localhost/);

if(url.match(reg) || url.match(regLocal)) var wxGzhAuth = 'https://tt.hori-gz.com:8443';
else var wxGzhAuth = 'https://sso.lxjapp.com:8443';

var mmsHost = window.location.href.indexOf("tt.hori-gz") >= 0 ? "https://tt.hori-gz.com:8443" : "https://mms.hori-gz.com:8443";
var mmsHostN = window.location.href.indexOf("tt.hori-gz") >= 0 ? "http://tt.hori-gz.com" : "https://mms.hori-gz.com";

Vue.prototype.wxJsdkConfig = function(list, callback, btlist) {
	var that = this;
	var jsApiListo = [];
	btlist ? jsApiListo = ["hideAllNonBaseMenuItem", 'showMenuItems'] : jsApiListo = ["hideAllNonBaseMenuItem"];
	jsApiListo = jsApiListo.concat(list);
	var btOlist = btlist ? btlist : [];
	//btOlist=btOlist.concat(btlist?btlist:[])
	var params = {
		body: {
			surl: window.location.href.split('#')[0],
			signatureUrl: window.location.href.split('#')[0],
		}
	};
	var paramsStr = encodeURIComponent(JSON.stringify(params));
	var httpURL = wxGzhAuth + "/uums/wxGzh/wxGzhAuth?str=" + paramsStr;
	that.$http.jsonp(httpURL, {
		emulateJSON: true,
		method: "get",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	}).then(function(res) {
		if(res.data.result == 0) {
			//	that.appId = res.data.appid;	
			that.setCookie('appid', res.data.appid);
			wx.config({
				debug: false,
				appId: res.data.appid,
				timestamp: res.data.timestamp,
				nonceStr: res.data.noncestr,
				signature: res.data.signature,
				jsApiList: jsApiListo
			});
			wx.ready(function() {
				callback ? callback(res.data.appid) : '';
				wx.hideAllNonBaseMenuItem();
				if(btlist) {
					wx.showMenuItems({
						menuList: btOlist ? btOlist : []
					});
				}

			});
		}
	}, function(res) {});
}

Vue.prototype.wxLogin = function() {
	var that = this;
	var params = {
		body: {
			surl: window.location.href.split('&code=')[0],
			signatureUrl: window.location.href
		}
	};
	var paramsStr = encodeURIComponent(JSON.stringify(params));
	var httpURL = wxGzhAuth + "/uums/wxGzh/wxGzhAuth?str=" + paramsStr;
	that.$http.jsonp(httpURL, {
		emulateJSON: true,
		method: "get",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	}).then(function(res) {
		if(res.data.result == 0) {
			sessionStorage.setItem("wxGzhAuthStart", "1");
			window.location.replace(res.data.url);
		}
	}, function(res) {});
}
/*toekn验证*/
Vue.prototype.getTokenInfo = function(bindCodeState) {
	var that = this;
	var token = this.getCookie("token");
	var unionid = this.getCookie("unionid");
	var httpURL = wxGzhAuth + "/uums/wxGzh/wxGzhTokenCheck?token=" + token + '&unionid=' + unionid;
	this.$http.jsonp(httpURL, {
		emulateJSON: true,
		method: "get",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	}).then(function(res) {
		if(bindCodeState) { //单纯判断微信号是否为绑定状态
			if(res.data.bindCode == 0) { //bindCode：0为已经绑定，1为非绑定
				that.wxLogin(); //已绑定重新授权更新信息						
			}
		} else {
			if(res.data.code == 1 || res.data.bindCode == 1) { //code：1为非绑定
				that.wxLogin(); //更新信息					
			} else { //token没有过期并账号期间无信息异常更换
				that.searchLeaderInfoStatus();
			}
		}
	}, function(res) {});
}
/*toekn验证*/
Vue.prototype.getTokenInfoCommander = function(bindCodeState) {
	var that = this;
	var token = this.getCookie("token");
	var unionid = this.getCookie("unionid");
	var httpURL = wxGzhAuth + "/uums/wxGzh/wxGzhTokenCheck?token=" + token + '&unionid=' + unionid;
	this.$http.jsonp(httpURL, {
		emulateJSON: true,
		method: "get",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	}).then(function(res) {
		if(bindCodeState) { //单纯判断微信号是否为绑定状态
			if(res.data.bindCode == 0) { //bindCode：0为已经绑定，1为非绑定
				that.wxLogin(); //已绑定重新授权更新信息						
			}
		} else {
			if(res.data.code == 1 || res.data.bindCode == 1) { //code：1为非绑定
				window.location.href = "../member/login.htm?targetPage=grouponActivity";
			} else { //token没有过期并账号期间无信息异常更换
				that.searchLeaderInfoStatus();
			}
		}
	}, function(res) {});
}

/*获取用户信息*/
Vue.prototype.wxInfoAjax = function() {
	var that = this;
	var authorizationCode = sessionStorage.getItem("codeWechat");
	var appid = this.getCookie("appid");
	var httpURL = wxGzhAuth + "/uums/wxGzh/wxGzhLogin?code=" + authorizationCode + '&appid=' + appid;
	this.$http.jsonp(httpURL, {
		emulateJSON: true,
		method: "get",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	}).then(function(res) {

		that.setCookie('token', res.body.token ? res.body.token : '_20181228'); //信息缓存8小时

		that.setCookie('lxjAccount', res.body.lxjAccount); //一般该字段为手机号		
		that.setCookie('nickname', res.body.nickname);
		that.setCookie('headimgurl', res.body.headimgurl);

		that.setCookie('sex', res.body.sex);
		that.setCookie('unionid', res.body.unionid);
		that.setCookie('openid', res.body.openid);
		that.setCookie('userAccount', res.body.userAccount);
		that.setCookie('code', res.body.result);
		if(res.body.result == "1") { //授权信息过期
			that.wxLogin();
		}
		if(res.body.result == '0') { //查找该账户团长状态
			that.searchLeaderInfoStatus();
		} else { //游客默认非团长
			that.setCookie('leaderInfoStatus', "4");
		}
	}, function(res) {});
}

/*获取团长状态*/
Vue.prototype.searchLeaderInfoStatus = function() {
	var that = this;
	var params = {
		body: {},
		header: {
			token: this.getCookie("token"),
			time_stamp: new Date().getTime()
		}
	};
	var paramsStr = encodeURIComponent(JSON.stringify(params));
	var httpURL = mmsHost + "/mms/group/searchLeaderInfoStatus?str=" + paramsStr;
	that.$http.jsonp(httpURL, {
		emulateJSON: true,
		method: "get",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	}).then(function(res) {
		if(res.data.result == 0) {
			that.setCookie('leaderInfoStatus', res.data.status); //团长状态0:待审核 1:正常 2：审核不通过 3：已清退 4不存在该团长			
		}
		var stateLearder = res.data.status ? res.data.status : '4';

		if(window.location.href.indexOf("groupon/commander/grouponDetail") >= 0 || window.location.href.indexOf("groupon/commander/grouponActivity") >= 0 || window.location.href.indexOf("groupon/commander/commanderPersonal") >= 0 || window.location.href.indexOf("groupon/commander/commanderOrder") >= 0) {
			if(stateLearder != "1") {
				window.location.replace("commander.htm");
			}
		}

		if(window.location.href.indexOf("groupon/commander/commander") >= 0) {
			if(stateLearder == "0") { //审核状态
				//window.location.replace("successInfo.htm");
			} else if(stateLearder == "1") { //成为团长
				window.location.replace("grouponActivity.htm");
			}
		}

	}, function(res) {});
}

Vue.prototype.inputOnblur = function() {
	var scrollTop = 0;
	if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		setTimeout(function() {
			try {
				scrollTop = document.scrollingElement.scrollTop;
			} catch(e) {
				scrollTop = document.documentElement.scrollTop;
			}
			scrollTop = Number(scrollTop);
			window.scrollTo(0, scrollTop)
		}, 300)
	}
}

Vue.prototype.setCookie = function(name, value, Days) {
	if(Days <= 0) Days = 7;
	var exp = new Date();
	exp.setTime(exp.getTime() + 8 * 60 * 60 * 1000);
	document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

Vue.prototype.getCookie = function(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)) {
		return decodeURI(arr[2]);
	} else {
		return null;
	}
}

Vue.prototype.GetURLParameter = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}
Vue.prototype.isCondition = function(param) {
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}

var isWxBrowser = true;
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	isWxBrowser = true;
} else {
	if(window.location.href.indexOf("lxjversionsName") >= 0) { //联享家APP内登录模式
		isWxBrowser = false;
	} else {
		isWxBrowser = true;
	}
}

window.onpageshow = function(event) {
	if(event.persisted) {
		//window.location.reload();
		if(isWxBrowser) {
			window.location.reload();
			//Vue.wxJsdkConfig();				
		}
	}
}



/*
 
 * 
 * 	that.setCookie('token',res.body.token); //信息缓存8小时
		
		that.setCookie('lxjAccount',res.body.lxjAccount);//一般该字段为手机号		
		that.setCookie('nickname',res.body.nickname);//一般该字段为手机号	
		that.setCookie('headimgurl',res.body.headimgurl);//一般该字段为手机号	
		
		
		that.setCookie('sex',res.body.sex);//用户性别	
		that.setCookie('unionid',res.body.unionid);//用户unionid
		that.setCookie('openid',res.body.openid);//用户openid	
		that.setCookie('userAccount',res.body.userAccount);//用户账号
		that.setCookie('code',res.body.result);////用户授权状态	
 * 
 * 
 * 
 * 
 * 
 * */