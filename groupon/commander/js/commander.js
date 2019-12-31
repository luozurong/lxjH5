/*var mmsHost = 'http://tt.hori-gz.com:8090';

var isWxBrowser = true;
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	isWxBrowser = true;
} else {
	isWxBrowser = false;
}*/

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

//var mmsHost = 'http://192.168.51.41:8090';
var vue = new Vue({
	el: '.commander',
	data: {
		status: 4,
		content: '',
		isWxBrowser: isWxBrowser,
		token: GetURLParameter("token"),
	},
	methods: {
		commanderContentAjax: function() {
			var params = {
				body: {},
				header: {
					token: this.token,
					time_stamp: new Date().getTime(),
				}
			}
			console.log(params);
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/groupLeaderConscribe?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				console.log(res);

				this.content = res.body.content;
			}, function(res) {});
		},
		commanderInfoAjax: function(state) {
			var params = {
				body: {},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			console.log(params);
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/searchLeaderInfoStatus?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				console.log(res);
				this.status = res.body.status;
				if(this.status == 1 && !this.isWxBrowser && !state) {
					showActivity(mmsHostN + "/mms/html5/groupon/commander/grouponActivity.htm", "拼团活动");
				}else if(this.status == 1 && this.isWxBrowser ){
					window.location.replace("grouponActivity.htm");
				}
			}, function(res) {});
		},
		jumpPage: function() {
			window.event.cancelBubble = true;
			if(this.isWxBrowser) {
				if(!this.isCondition(this.getCookie("unionid"))) {
					this.wxInfoAjax();
					return false;
				}
				if(this.getCookie("code") != '0') { //非联享家用户走注册流程
					window.location.href = mmsHostN+"/mms/html5/groupon/member/register.htm";
					return false;
				}

				if(this.status == 2 || this.status == 3 || this.status == 4) {
					window.location.href = "commanderInfo.htm";
				} else if(this.status == 0) {
					window.location.href = "successInfo.htm";
				} else if(this.status == 1) {
					window.location.replace("grouponActivity.htm");
				}
			} else { //app环境
				if(this.getCookie("token").indexOf('_') == -1) {
					if(this.status == 2 || this.status == 3 || this.status == 4) {
						showActivity(mmsHostN + "/mms/html5/groupon/commander/commanderInfo.htm", "团长招募");
					} else if(this.status == 0) {
						showActivity(mmsHostN + "/mms/html5/groupon/commander/successInfo.htm", "提交成功");
					} else if(this.status == 1) {
						showActivity(mmsHostN + "/mms/html5/groupon/commander/grouponActivity.htm", "拼团活动");
					}
				} else { //游客
					needLogin(this.getCookie("token"));
					return false;
				}
			}
		},
		getBaseData: function() {
			if(!this.isWxBrowser) { //app环境
				this.setCookie('token', this.GetURLParameter("token"));
				setTitle("团长招募");
				nativeMethod("showClosebutton", null);
			}
			this.commanderContentAjax();

			if(this.isCondition(this.getCookie("token")) && this.getCookie("token").indexOf('_') == -1) { //
				this.commanderInfoAjax();
			}

			var that = this;
			if(this.isWxBrowser) {
				this.wxJsdkConfig();
				if(this.isCondition(this.GetURLParameter("code")) && sessionStorage.getItem("wxLogin") != "haslogin") { //授权重定向页面
					if(this.isCondition(sessionStorage.getItem("codeWechat"))) {
						return false;
					}
					var codeWechat = this.GetURLParameter("code") ? this.GetURLParameter("code") : 1;
					var appid = this.GetURLParameter("appid") ? this.GetURLParameter("appid") : '';
					this.setCookie('appid', appid);
					sessionStorage.setItem("codeWechat", codeWechat);
					this.wxInfoAjax();
					sessionStorage.setItem("wxGzhAuthStart", "0");
					return false;
				}
				if(this.isCondition(this.getCookie("token"))) { //8小时内登录
					if(this.getCookie("token").indexOf('_') == -1) { //正常用户登录，走检测用户账号状态
						this.getTokenInfo();
					} else { //游客登录,每次提示授权
						//this.getTokenInfo(true);
						this.wxLogin();
					}
				} else { //登录信息为空需授权
					this.wxLogin();
				}
			}
		}
	},
	mounted: function() {
		this.getBaseData()
	}
})

function refreshData() {
	setTimeout(function() {
		vue.content = null;
		vue.commanderContentAjax();
		if(vue.isCondition(vue.getCookie("token")) && vue.getCookie("token").indexOf('_') == -1) { //
			vue.commanderInfoAjax(true);
		}
	}, 0);
	return 1;
}