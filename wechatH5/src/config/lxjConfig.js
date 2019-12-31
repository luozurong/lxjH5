import Vue from 'vue'
import wx from 'weixin-js-sdk'
import md5 from 'js-md5'
Vue.use(wx)

//标题
Vue.directive('title', {
	inserted: function(el, binding) {
		document.title = el.dataset.title;
	}
})


//设置cookie
Vue.prototype.setCookie = function(name, value, Days){
	if(Days <= 0) Days = 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ encodeURI(value) + ";expires=" + exp.toGMTString();
}

//获取cookie
Vue.prototype.getCookie = function(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return decodeURI(arr[2]);
    }else{
        return "";
    }
}


//生成token
Vue.prototype.tokenMd5 = function() {
	var times = new Date().getTime();
	var uuid = Math.floor(Math.random() * times).toString();
	var tokenMd5 = '_' + md5(uuid).substr(0, 31);
	return tokenMd5;
}

var url = window.location.host;
var reg = RegExp(/tt/);
var regLocal = RegExp(/localhost/);

if(url.match(reg) || url.match(regLocal)) var wxGzhAuth = 'https://tt.hori-gz.com:8443';
else var wxGzhAuth = 'https://sso.lxjapp.com:8443';

//微信jssdk验证
Vue.prototype.wxJsdkConfig = function(list,callback,btlist) {
	var that = this;
	let jsApiListo=["hideAllNonBaseMenuItem", 'showMenuItems'];
	jsApiListo=jsApiListo.concat(list);
	let btOlist=btlist?btlist:[];
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
			that.appId = res.data.appid;			
			wx.config({
				debug: false,
				appId: res.data.appid,
				timestamp: res.data.timestamp,
				nonceStr: res.data.noncestr,
				signature: res.data.signature,
				jsApiList: jsApiListo
			});
			
			wx.ready(function() {
				callback?callback(res.data.appid):'';
				wx.hideAllNonBaseMenuItem();
				wx.showMenuItems({
					menuList: btOlist?btOlist:[]
				});
			});
		}	
	}, function(res) {});
}