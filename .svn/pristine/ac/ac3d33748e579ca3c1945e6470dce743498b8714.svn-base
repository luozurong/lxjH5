var scrollTop = "";

/*var isWxBrowser = true;
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	isWxBrowser=true;
} else {
	isWxBrowser=false;
}



mmsHost = "https://tt.hori-gz.com:8443";*/
/*host = mmsHost;
commodityId = "1540187623912ff3ae4f815742bcbb5a";
organizationSeq = "4400100183";
token = "_15444060121896d708361a0d43a68164";*/

var vue = new Vue({
	el: '#app',
	data: {
		isWxBrowser: isWxBrowser,
		mmsHost: mmsHost,
		stateTixian: 1,
		token: "",
		personalImg: null,
		personalData: null,
		registerPhone: "",
		groupLeaderId: "",
	},
	filters: {
		//状态过滤

	},
	mounted: function() {
		this.$nextTick(function() {
			this.getbasicData();
		});

	},
	methods: {
		getpersonalData: function() {
			var that = this;
			var params = {
				body: {
					//	registerPhone: this.registerPhone,
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/group/personalCenter", params).then(function(res) {
				console.log(res);
				that.stateTixian = res.data.hasWithCash ? "2" : "1";
				that.groupLeaderId = res.data.groupLeaderId;
				that.personalData = res.data;
				if(!isWxBrowser) {
					that.personalImg = res.data.groupLeaderImg ? res.data.groupLeaderImg : "";
				}
			}, function(res) {})
		},
		getWithdrawCash: function(num) {
			window.event.cancelBubble = true;
			if(!isWxBrowser) { //App内不支持提现
				lxjTip.msg("暂只支持‘联享家’微信公众号--团长中心进行提现！", {
					time: 5000
				})
				return false;
			}

			var that = this;
			var params = {
				body: {
					groupLeaderId: this.groupLeaderId,
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/group/withdrawCash", params).then(function(res) {
				console.log(res);
				if(res.data.result == "0") {
					if(res.data.code == "0" || res.data.code == "2") {
						that.stateTixian = 2;
					}
					if(res.data.code == "1") {
						lxjTip.msg("提现金额至少一元以上")
					}
					if(res.data.code == "4") { //后期需补充完善，重新授权拿相对应支付红包微信用户缺少的信息
						
						lxjTip.alert("亲！登录信息已过期，需重新登录", {
							btn:['重新登录'],
							yes: function() {
								sessionStorage.clear()
								lxjTip.close(); //如果设定了yes回调，需进行手工关闭
								window.location.replace("../member/login.htm?targetPage=commanderPersonal");
								
							}
						});
						/*lxjTip.msg("暂只支持‘联享家’微信公众号--团长中心进行提现！", {
							time: 5000
						})*/
					}
				} else {
					lxjTip.msg(res.data.reason, {
						time: 5000
					})
				}

				if(Number(res.data.withdrawMoney) != Number(num)) {
					that.getpersonalData();
				}
			}, function(res) {})
		},

		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;

		},
		//前往提现明细
		goWithdrawalRecord: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "withdrawalRecord.htm";
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/withdrawalRecord.htm", "提现明细");
			}
		}, //前往利润明细
		goProfitRecord: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "profitRecord.htm";
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/profitRecord.htm", "利润明细");
			}
		}, //前往规则说明
		goGrouponLaederRule: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "grouponLaederRule.htm";
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/grouponLaederRule.htm", "规则说明");
			}
		},
		//前往活动
		goGrouponActivity: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "grouponActivity.htm";
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/grouponActivity.htm", "拼团活动");
			}
		}, //前往订单
		goCommanderOrder: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "commanderOrder.htm";
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/commanderOrder.htm", "订单");
			}
		}, //前往我的
		goCommanderPersonal: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "commanderPersonal.htm";
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/commanderPersonal.htm", "我的");
			}
		},

		aminateFun: function() {
			var eleG = document.getElementById("chairmanMoreInfo");
			eleG.style.maxHeight = "0";
		},
		getbasicData: function() {
			if(!this.isWxBrowser) { //app环境
				this.setCookie('token', this.GetURLParameter("token"));
				setTitle("我的");
				nativeMethod("showClosebutton", null);
			}

			this.getpersonalData();
			var that = this;
			if(isWxBrowser) {
				this.personalImg = this.getCookie("headimgurl");
				this.wxJsdkConfig();
			}
		},
	},
	watch: {

	}
});

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}

function refreshData() {
	setTimeout(function() {

	}, 0);
	return 1;
}