/*var mmsHost = 'https://tt.hori-gz.com:8443';
var token = '15470989253131fe56c7fbc34c7d989a'

var isWxBrowser = true;
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	isWxBrowser = true;
} else {
	isWxBrowser = false;
}*/

var vue = new Vue({
	el: '.grouponActivity',
	data: {
		token: "",
		isWxBrowser: isWxBrowser,
		grouponActivityAttr: [],
	},
	filters: {
		statusFilter: function(value) {
			console.log(value);
			if(value == 1) {
				return '未开始';
			} else if(value == 2) {
				return '进行中';
			} else if(value == 3) {
				return '已结束';
			}
		}
	},
	methods: {
		commanderActivityAjax: function() {
			var params = {
				body: {
					pageNum: 1,
					pageSize: 1000,
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			console.log(params);
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/getGroupActivityList?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				console.log(res);
				this.grouponActivityAttr = res.body.list;
			}, function(res) {});
		},
		commanderInfoAjax: function() {
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
				if(res.body.result == "0") {
					this.status = res.body.status;
					if(this.status != 1 && !this.isWxBrowser) {
						lxjTip.confirm('亲！你还不是团长呢，是否前往成为团长?', {
							skin: 'demo3',
							btn: ['前往团长招募', '取消'],
							yes: function(index) {
								lxjTip.close(); //如果设定了yes回调，需进行手工关闭
								showActivity(mmsHostN + "/mms/html5/groupon/commander/commander.htm", "团长招募");
							}
						});
					} else {
						this.commanderActivityAjax();
					}
				} else if(res.body.result == "005"&&res.body.status!=1) {
					lxjTip.confirm('亲！你还不是团长呢，是否前往成为团长?', {
						skin: 'demo3',
						btn: ['前往团长招募', '取消'],
						yes: function(index) {
							lxjTip.close(); //如果设定了yes回调，需进行手工关闭
							showActivity(mmsHostN + "/mms/html5/groupon/commander/commander.htm", "团长招募");
						}
					});
				}

			}, function(res) {});
		},
		jumpPage: function(activityId) {
			console.log(activityId);
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "grouponDetail.htm?activityId=" + activityId + "&token=" + this.getCookie("token");
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/grouponDetail.htm?activityId=" + activityId, "活动详情");
			}
		},
		//前往活动
		goGrouponActivity: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "grouponActivity.htm";
			} else {
				if(this.status != 1 && !this.isWxBrowser) {
					lxjTip.confirm('亲！你还不是团长呢，是否前往成为团长?', {
						skin: 'demo3',
						btn: ['前往团长招募', '取消'],
						yes: function(index) {
							lxjTip.close(); //如果设定了yes回调，需进行手工关闭
							showActivity(mmsHostN + "/mms/html5/groupon/commander/commander.htm", "团长招募");
						}
					});
				} else {
					showActivity(mmsHostN + "/mms/html5/groupon/commander/grouponActivity.htm", "拼团活动");
				}
			}
		}, //前往订单
		goCommanderOrder: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "commanderOrder.htm";
			} else {
				if(this.status != 1 && !this.isWxBrowser) {
					lxjTip.confirm('亲！你还不是团长呢，是否前往成为团长?', {
						skin: 'demo3',
						btn: ['前往团长招募', '取消'],
						yes: function(index) {
							lxjTip.close(); //如果设定了yes回调，需进行手工关闭
							showActivity(mmsHostN + "/mms/html5/groupon/commander/commander.htm", "团长招募");
						}
					});
				} else {
					showActivity(mmsHostN + "/mms/html5/groupon/commander/commanderOrder.htm", "订单");
				}
			}
		}, //前往我的
		goCommanderPersonal: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "commanderPersonal.htm";
			} else {
				if(this.status != 1 && !this.isWxBrowser) {
					lxjTip.confirm('亲！你还不是团长呢，是否前往成为团长?', {
						skin: 'demo3',
						btn: ['前往团长招募', '取消'],
						yes: function(index) {
							lxjTip.close(); //如果设定了yes回调，需进行手工关闭
							showActivity(mmsHostN + "/mms/html5/groupon/commander/commander.htm", "团长招募");
						}
					});
				} else {
					showActivity(mmsHostN + "/mms/html5/groupon/commander/commanderPersonal.htm", "我的");
				}
			}
		},
	},
	mounted: function() {
		var that = this;
		if(!this.isWxBrowser) { //app环境
			this.setCookie('token', this.GetURLParameter("token"));
			setTitle("拼团活动");
			nativeMethod("showClosebutton", null);
			if(this.GetURLParameter("token").indexOf('_') >= 0) {
				lxjTip.alert("亲！需登录后才能参与团购", {
					yes: function() {
						lxjTip.close(); //如果设定了yes回调，需进行手工关闭
						needLogin(that.getCookie("token"));
					}
				});
				return false;
			}
		}
		
		if(isWxBrowser) {
			this.wxJsdkConfig();
			if(this.isCondition(this.getCookie("token"))) {
				if(this.getCookie("token").indexOf('_') == -1) { //正常用户登录，走检测用户账号状态
					this.getTokenInfoCommander();
				} else { //游客登录,每次提示授权
					//this.getTokenInfo(true);
					//window.location.href = "../member/login.htm?targetPage=grouponActivity";
					window.location.replace("../member/login.htm?targetPage=grouponActivity");
				}
			} else {
				window.location.replace("../member/login.htm?targetPage=grouponActivity");
			}
		} else {
			this.commanderInfoAjax();
			return false;
		}
		this.commanderActivityAjax();
	}
})

function refreshData() {
	setTimeout(function() {
		if(vue.GetURLParameter("token").indexOf('_') == -1) {
			vue.commanderInfoAjax();
		}
	}, 0);
	return 1;
}