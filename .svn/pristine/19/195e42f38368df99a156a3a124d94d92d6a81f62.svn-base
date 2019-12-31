var isWxBrowser = true;
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	isWxBrowser = true;
} else {
	isWxBrowser = false;
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
var vue = new Vue({
	el: '#app',
	data: {
		isWxBrowser: isWxBrowser,
		popupState: false,
		isAgree: true,
		phoneNum: '',
		randomCodeNum: '',
		picRandomNum: '',
		picRandomUrl: "",
		randomCodeNumState: false,
		randomContent: "获取验证码",
		mobileplaceholder: "请输入手机号",
		messageplaceholder: "请输入短信验证码",

		apiurl3: uumsHost + "/uums/servlet/getPicRandomServlet", //获取图片验证码接口
		apiurl4: uumsHost + "/uums/servlet/getRandomCodeForSmsLogin", //获取短信验证码
		apiurl5: uumsHost + "/uums/wxGzh/wxGzhLoginBindMobile", //获取短信验证码

		apiurl6: uumsHost + "/uums/servlet/mobileCoverOldWx", //替换微信

		apiurls: uumsHost + "/uums/wxGzh/wxGzhAuth", //获取fx

	},
	filters: {
		//状态过滤
	},
	mounted: function() {
		this.$nextTick(function() {
			//this.prizelistTrim(this.prizeList);
			setTimeout(function() {
				var widthCli = document.documentElement.clientHeight;
				document.getElementById("app").style.height = widthCli + "px";
			}, 200);
			
			if(isWxBrowser) {
				this.wxJsdkConfig();
			}
		});
	},
	methods: {
		getPicRandom: function() {

			var params = {};
			var timestamp = new Date().getTime();
			var mobile1 = vue.phoneNum;
			if(vue.randomCodeNumState) {
				return false;
			}
			if(!(/^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/.test(mobile1))) {

				vue.mobileF = true;
				vue.phoneNum = '';
				vue.mobileplaceholder = "*请您输入正确的11位手机号码";
				setTimeout(function() {
					document.getElementById("phone").focus();
				}, 1000);
				return false;
			}

			params.header = {
				token: "test",
				time_stamp: timestamp
			};
			params.body = {
				phone: vue.phoneNum
			};
			vue.picRandomUrl = "";
			vue.picRandomNum = "";
			var paramData = JSON.stringify(params);
			this.$http.jsonp(this.apiurl3 + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				// 响应成功回调
				if(response.body.result == 0) {
					vue.picRandomUrl = response.body.picRandomUrl;
					vue.popupState = true; //弹窗开启
					vue.picRandomState = true;
				}

			}, function(response2) {
				// 响应错误回调
				console.log(JSON.stringify(response2.body))
			});
		},
		getRandomCodeForSmsLogin: function() {
			var params = {};
			var phoneNum1 = String(vue.phoneNum);
			var picRandomNum1 = String(vue.picRandomNum);
			var timestamp = new Date().getTime();
			params.header = {
				token: "test",
				time_stamp: timestamp
			};
			params.body = {
				phone: phoneNum1,
				sourceClientCode: "lxj_u",
				picRandom: picRandomNum1
			};
			var paramData = JSON.stringify(params);
			this.$http.jsonp(this.apiurl4 + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				// this.$http.post(this.apiurl4,params,{emulateJSON: true}).then(function(response) {
				//this.$http.post(this.apiurl4, params).then(function(response) {
				// 响应成功回调
				if(response.body.result == 0) {
					if(response.body.code == 1) {
						vue.popupState = false;
						vue.picRandomState = false;
						lxjTip.msg('正在发送短信验证码', {
							time: 2000
						});
						vue.picRandomUrl = "";
						vue.picRandomNum = "";
						var TIME_COUNT = 60;
						if(!vue.timer) {
							vue.count = TIME_COUNT;
							vue.randomCodeNumState = true;
							vue.timer = setInterval(function() {
								if(vue.count > 0 && vue.count <= TIME_COUNT) {
									vue.count--;
									vue.randomContent = vue.count + "s后重新发送";
								} else {
									clearInterval(vue.timer);
									vue.timer = null;
									vue.randomContent = "获取验证码";
									vue.randomCodeNumState = false;
								}
							}, 1000);
						}
					} else if(response.body.code == 2) {
						lxjTip.msg('验证码不正确', {
							time: 2000
						});
						setTimeout(function() {
							vue.getPicRandom();
						}, 300);
						setTimeout(function() {
							document.getElementById("picRandomNum").focus();
						}, 1000);
					} else {
						lxjTip.msg('抱歉！该手机号今天不能再接收短信验证码', {
							time: 2000
						});
					}
				}

			}, function(response2) {
				// 响应错误回调
				console.log(JSON.stringify(response2.body))
			});
		},
		loginOrRegister: function() {
			
			var that = this;
			if(!this.isAgree) {
				lxjTip.msg('同意用户协议后才能进行注册登录', {
					time: 2000
				});

				return false;
			}

			var mobile1 = vue.phoneNum;
			if(!(/^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/.test(mobile1))) {
				vue.mobileF = true;
				vue.phoneNum = '';
				vue.mobileplaceholder = "*请您输入正确的11位手机号码";
				setTimeout(function() {
					document.getElementById("phone").focus();
				}, 1000);
				return false;
			}

			var picRandomNum2 = vue.randomCodeNum;
			if(!(/^[0-9]\d{1,6}$/.test(picRandomNum2))) {
				lxjTip.msg('请输入正确的短信验证码', {
					time: 2000
				});

				return false;
			}

			var params = {
				body: {
					surl: window.location.href,
					mobile: this.phoneNum,
					smsVerifyCode: this.randomCodeNum,
					openid: this.getCookie("openid"),
					unionid: this.getCookie("unionid"),
					nickname: this.getCookie("nickname"),
					sex: parseInt(this.getCookie("sex")),
					headimgurl: this.getCookie("headimgurl")
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			};

			var paramsStr = encodeURIComponent(JSON.stringify(params));
			this.$http.jsonp(this.apiurl5 + "?str=" + paramsStr, {
				emulateJSON: true,
				method: "post",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				if(res.body.result == 0) {
					if(res.body.code == 0) {
						lxjTip.msg('绑定成功');

						that.setCookie('lxjAccount', res.body.lxjAccount);
						that.setCookie('userAccount', res.body.userAccount);
						that.setCookie('token', res.body.token);
						that.setCookie('code', res.body.code);
						history.go(-1)

					} else if(res.body.code == 1) {
						lxjTip.msg("短信验证码错误 ");
					} else if(res.body.code == 2) {
						//lxjTip.msg('该手机号已经绑定过微信');
						lxjTip.confirm('该手机号已经绑定过微信,是否确认修改绑定当前微信号', {
							skin: 'demo3',
							btn: ['绑定新微信', '取消'],
							yes: function(index) {
								lxjTip.close(); //如果设定了yes回调，需进行手工关闭
								vue.mobileCoverOldWx();
							}
						});

					} else if(res.body.code == 3) {
						//用户微信号已经再其它地方绑定联享家账号，重新登录更新信息
						lxjTip.msg('微信已经绑定');
						sessionStorage.removeItem("codeWechat");
						sessionStorage.setItem("wxLogin","haslogin");
						history.go(-1)
					}
				}

			}, function(res) {});
		},

		mobileCoverOldWx: function() {
			var that = this;

			var mobile1 = vue.phoneNum;
			if(!(/^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/.test(mobile1))) {
				vue.mobileF = true;
				vue.phoneNum = '';
				vue.mobileplaceholder = "*请您输入正确的11位手机号码";
				setTimeout(function() {
					document.getElementById("phone").focus();
				}, 1000);
				return false;
			}

			var picRandomNum2 = vue.randomCodeNum;
			if(!(/^[0-9]\d{1,6}$/.test(picRandomNum2))) {
				lxjTip.msg('请输入正确的短信验证码', {
					time: 2000
				});

				return false;
			}

			var params = {
				body: {
					mobile: this.phoneNum,
					smsVerifyCode: this.randomCodeNum,
					openid: this.getCookie("openid"),
					unionid: this.getCookie("unionid"),
					nickname: this.getCookie("nickname"),
					sex: parseInt(this.getCookie("sex")),
					headimgurl: this.getCookie("headimgurl")
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			};

			var paramsStr = encodeURIComponent(JSON.stringify(params));
			this.$http.jsonp(this.apiurl6 + "?str=" + paramsStr, {
				emulateJSON: true,
				method: "post",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				console.log(res)
				if(res.body.result == 0) {
					lxjTip.msg('绑定成功');
					that.setCookie('lxjAccount', res.body.lxjAccount);
					that.setCookie('userAccount', res.body.userAccount);
					that.setCookie('token', res.body.token);
					that.setCookie('code', 0);
					sessionStorage.setItem("wxLogin","haslogin");
					history.go(-1)
				}

			}, function(res) {});
		},

		cancelRandom: function() {
			vue.picRandomUrl = "";
			vue.picRandomNum = "";
			vue.popupState = false; //弹窗开启
			vue.picRandomState = false;

		},
		confirmRandom: function() {
			var picRandomNum2 = vue.picRandomNum;
			if(!(/^[0-9]\d{1,4}$/.test(picRandomNum2))) {
				lxjTip.msg('请输入正确的图形验证码', {
					time: 2000
				});
				setTimeout(function() {
					document.getElementById("picRandomNum").focus();
				}, 1000);
				return false;
			}
			vue.getRandomCodeForSmsLogin();

		},
		baidutjiFun: function(baiduID) {

		},
		stopClose: function() {
			window.event.cancelBubble = true;
		},
		closePopup: function() {
			this.popupState = false; //弹窗背景关闭
		},
		mobileFocus: function() {
			document.getElementById("phone").focus();
		},
		mobileFocus2: function() {
			document.getElementById("picRandomNum").focus();
		},
		mobileFocus3: function() {
			document.getElementById("message").focus();
		},

	}
});

/*document.getElementById('fourth_box').ontouchstart = function(e){ e.preventDefault(); }*/
/*vue.$watch('classifyList', function(newValue, oldValue) {
});*/

function refreshData() {
	setTimeout(function() {
		//vue.getDatejson(true);
		//vue.getlistLatestrecords();
	}, 0);
	return 1;
}

function isCondition(param) { // (!typeof(a) === undefined)
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}