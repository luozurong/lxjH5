//var token = GetURLParameter('token');
var activityId = GetURLParameter('activityId') ? GetURLParameter('activityId') : '';
//var mmsHost = 'http://tt.hori-gz.com';
var vue = new Vue({
	el: '.grouponDetail',
	data: {
		activityEndTime: 0,
		activityNowTime: 0,
		dayTime: '',
		hhTime: '',
		mmTime: '',
		ssTime: '',
		activityId: activityId,
		activityName: '',
		isEnd: 0,
		isWxBrowser: true,
		shareFlag: false,
		commanderDetailAttr: [],
		chooseNum: 0,
		spreadAttr: [],
		provinceCode: '',
		cityCode: '',
		countryCode: '',
		townCode: '',
		commodityCodesAttr: [],
		activityName: '',
		activityTitel: '',
		commodityLink: '',
		groudLeaderId: '',
		getOrderSolitaireString: ''
	},
	filters: {
		pricePre: function(value) {
			var val = parseInt(value);
			return val;
		},
		priceNext: function(value) {
			var val = '.' + String(parseFloat(value).toFixed(2)).split('.')[1];
			return val;
		}
	},
	methods: {
		grouponDetailAjax: function() {
			var params = {
				body: {
					activityId: activityId
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/getGroupActivityDetailForLeader?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				console.log(res);
				this.activityNowTime = res.body.reqTime;
				this.activityEndTime = res.body.activityEndTime;
				this.activityId = res.body.activityId;
				this.activityName = res.body.activityName;
				this.isEnd = res.body.isEnd;
				this.provinceCode = res.body.provinceCode;
				this.cityCode = res.body.cityCode;
				this.countryCode = res.body.countryCode;
				this.townCode = res.body.townCode;
				var commanderlist = res.body.list;
				for(var i = 0; i < commanderlist.length; i++) {
					commanderlist[i].chooseFlag = false;
				}
				this.commanderDetailAttr = commanderlist;
				if(this.isEnd == 0) {
					var that = this;
					setInterval(function() {
						that.activityNowTime = that.activityNowTime + 1000;
						that.activityTime(that.activityNowTime, that.activityEndTime);
					}, 1000);
				}

				this.commanderInfoAjax();
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
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/searchLeaderInfo?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				console.log(res);
				var province = res.body.province;
				var city = res.body.city;
				var country = res.body.country;
				var town = res.body.town
				this.groudLeaderId = res.body.groudLeaderId;

				/*if(this.provinceCode == ''){
					return false;
				}
				if(this.provinceCode != province){
					lxjTip.msg("本团购活动不在你的小区配送范围内");
					return false;
				}

				if(this.cityCode == ''){
					return false;
				}
				if(this.cityCode != city){
					lxjTip.msg("本团购活动不在你的小区配送范围内");
					return false;
				}

				if(this.countryCode == ''){
					return false;
				}
				if(this.countryCode != country){
					lxjTip.msg("本团购活动不在你的小区配送范围内");
					return false;
				}

				if(this.townCode == ''){
					return false;
				}
				if(this.townCode != town){
					lxjTip.msg("本团购活动不在你的小区配送范围内");
					return false;
				}*/
			}, function(res) {});
		},
		spreadShareAjax: function() {
			var params = {
				body: {
					groupActivityId: activityId
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/getExtensionInfo?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				this.activityName = res.body.activityName;
				this.activityTitel = res.body.activityTitel;
				this.commodityLink = res.body.commodityLink;
				this.WXShareSpead();
			}, function(res) {});
		},
		getOrderSolitaire: function() {
			var params = {
				body: {
					groupActivityId: activityId
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/getOrderSolitaire?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				var getOrderSolitaire = res.body.list;
				for(var i = 0; i < getOrderSolitaire.length; i++) {
					var num = '';
					if(getOrderSolitaire[i].status != 0) {
						var index = i + 1;
						if(index.toString().length == 1) {
							num = '00' + index
						}
						if(index.toString().length == 2) {
							num = '0' + index;
						}
						if(index.toString().length >= 3) {
							num = index;
						}
						this.getOrderSolitaireString += num + ' ' + getOrderSolitaire[i].userName + ' ' + '已支付' + ' ' + getOrderSolitaire[i].commodityName + '*' + getOrderSolitaire[i].buyNum + '\n';
					}
				}
			}, function(res) {});
		},
		groupLeaderShareActivityLog: function() {
			var params = {
				body: {
					activityId: activityId,
					leaderId: this.groudLeaderId
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/groupLeaderShareActivityLog?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {

			}, function(res) {});
		},
		spreadGoods: function() {
			if(this.spreadAttr.length == 0) {
				lxjTip.msg("请选择要推广的商品");
				return false;
			}
			var commodityCodesAttr = [];
			for(var i = 0; i < this.spreadAttr.length; i++) {
				if(this.spreadAttr[i].chooseFlag) {
					commodityCodesAttr.push(this.spreadAttr[i].code);
				}
			}
			this.commodityCodesAttr = commodityCodesAttr;
			this.groupLeaderShareActivityLog();
			if(this.isWxBrowser) {
				this.shareFlag = true;
			} else {
				this.shareFlag = false;
				var jsonData = {
					title: this.activityName,
					subTitle: this.activityTitel?this.activityTitel:" ",
					indexPic: this.commodityLink,
					url: mmsHostN + '/mms/html5/groupon/member/groupPurchase.htm?pageFrom=wxGroup&activityId=' + this.activityId + '&groupLeaderId=' + this.groudLeaderId + '&codes=' + this.commodityCodesAttr.toString()
				};
				var jsonData2 = JSON.stringify(jsonData);
				nativeMethod("share", jsonData2);
			}

			console.log(commodityCodesAttr);
		},
		shareHide: function() {
			this.shareFlag = false;
		},
		chooseFunc: function(i) {
			if(this.commanderDetailAttr[i].chooseFlag) {
				this.commanderDetailAttr[i].chooseFlag = false;
			} else {
				this.commanderDetailAttr[i].chooseFlag = true;
			}
			var num = 0;
			this.spreadAttr = [];
			for(var i = 0; i < this.commanderDetailAttr.length; i++) {
				if(this.commanderDetailAttr[i].chooseFlag) {
					num++;
					this.spreadAttr.push(this.commanderDetailAttr[i]);
				}
			}
			this.chooseNum = num;
		},
		activityTime: function(activityNowTime, activityEndTime) {
			var values = activityEndTime - activityNowTime;
			if(values <= 0) {
				this.isEnd = 1;
				this.dayTime = this.hhTime = this.mmTime = this.ssTime = '00';
				return false;
			} else {
				this.isEnd = 0;
				dayTime = parseInt(values / (24 * 60 * 60 * 1000));
				hhTime = parseInt(values % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
				mmTime = parseInt(values % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
				ssTime = parseInt(values % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) % (60 * 1000) / 1000);

				this.dayTime = dayTime.toString().length == 2 ? dayTime : '0' + dayTime;
				this.hhTime = hhTime.toString().length == 2 ? hhTime : '0' + hhTime;
				this.mmTime = mmTime.toString().length == 2 ? mmTime : '0' + mmTime;
				this.ssTime = ssTime.toString().length == 2 ? ssTime : '0' + ssTime;
			}

		},
		copyUrl: function() {
			if(this.getOrderSolitaireString == '') {
				lxjTip.msg('暂无接龙数据');
				return false;
			}
			copyText(this.getOrderSolitaireString, function() {
				lxjTip.msg('复制成功');
			})
		},
		onCopy: function(e) {
			this.inputOnblur(); //回滚页面
			if(this.getOrderSolitaireString == '') {
				lxjTip.msg('暂无接龙数据');
				return false;
			} else {
				lxjTip.msg('复制成功');
			}
		},
		onError: function(e) {
			console.log("复制失败");
		},
		checkProduct: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "checkProduct.htm?activityId=" + this.activityId;
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/checkProduct.htm?activityId=" + this.activityId, "查看货单");
			}
		},
		goDetail: function(id) {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "../member/commodityDetail.htm?commodityId=" + id;
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/member/commodityDetail.htm?commodityId=" + id, "商品详情");
			}			
		},
		isWxBrowserFunc: function() {
			var that = this;
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == "micromessenger") {
				that.isWxBrowser = true;
			} else {
				that.isWxBrowser = false;
			}
		},

		WXShareSpead: function() {
			var that = this;
			this.wxJsdkConfig(['onMenuShareAppMessage', "onMenuShareTimeline"], function(id) {
				var title = that.activityName;
				var desc = that.activityTitel?that.activityTitel:"    ";
				var imgLogo = that.commodityLink;
				var shareLink = mmsHostN + '/mms/html5/groupon/member/groupPurchase.htm?pageFrom=wxGroup&activityId=' + that.activityId + '&groupLeaderId=' + that.groudLeaderId + '&codes=' + that.commodityCodesAttr.toString();
				var obj = {
					title: title, //标题
					desc: desc, //描述
					link: shareLink,
					imgUrl: imgLogo
				};
				//分享到朋友圈"
				wx.onMenuShareTimeline({
					title: obj.title,
					link: obj.link, // 分享链接
					imgUrl: obj.imgUrl, // 分享图标
					success: function() {
						that.groupLeaderShareActivityLog();
					},
					cancel: function() {}
				});
				//分享给朋友
				wx.onMenuShareAppMessage({
					title: obj.title, // 分享标题
					desc: obj.desc, // 分享描述
					link: encodeURI(obj.link), // 分享链接
					imgUrl: obj.imgUrl, // 分享图标
					success: function() {
						that.groupLeaderShareActivityLog();
					},
					cancel: function() {
						// console.log('分享到朋友失败')
					}
				});
			}, ["menuItem:share:appMessage", "menuItem:share:timeline"]);
		}
	},
	mounted: function() {
		if(!isWxBrowser) { //app环境
			this.setCookie('token', this.GetURLParameter("token"));
			setTitle("活动详情");
			nativeMethod("showClosebutton", null);

		}
		var that = this;
		if(isWxBrowser) {
			if(this.isCondition(this.getCookie("token"))) {
				if(this.getCookie("token").indexOf('_') == -1) { //正常用户登录，走检测用户账号状态
					this.getTokenInfoCommander();
				} else { //游客登录,每次提示授权
					//this.getTokenInfo(true);
					//window.location.href = "../member/login.htm?targetPage=grouponActivity";
					window.location.replace("../member/login.htm?targetPage=grouponDetail&activityId=" + this.activityId);
					return false;
				}
			} else {
				window.location.replace("../member/login.htm?targetPage=grouponDetail&activityId=" + this.activityId);
				return false;
			}
		}
		this.isWxBrowserFunc();
		this.grouponDetailAjax();
		this.spreadShareAjax();
		this.getOrderSolitaire();
		this.$nextTick(function() {

		});
	},
	watch: {
		spreadAttr: function(newVal, oldVal) {
			var that = this;
			var commodityCodesAttr = [];
			for(var i = 0; i < this.spreadAttr.length; i++) {
				if(this.spreadAttr[i].chooseFlag) {
					commodityCodesAttr.push(this.spreadAttr[i].code);
				}
			}
			this.commodityCodesAttr = commodityCodesAttr;
			var title = that.activityName;
			var desc = that.activityTitel?that.activityTitel:"    ";
			var imgLogo = this.commodityLink;
			var shareLink = mmsHostN + '/mms/html5/groupon/member/groupPurchase.htm?pageFrom=wxGroup&activityId=' + this.activityId + '&groupLeaderId=' + this.groudLeaderId + '&codes=' + this.commodityCodesAttr.toString();
			var obj = {
				title: title, //标题
				desc: desc, //描述
				link: shareLink,
				imgUrl: imgLogo
			};
			//分享到朋友圈"
			wx.onMenuShareTimeline({
				title: obj.title,
				link: obj.link, // 分享链接
				imgUrl: obj.imgUrl, // 分享图标
				success: function() {
					that.groupLeaderShareActivityLog();
				},
				cancel: function() {}
			});
			//分享给朋友
			wx.onMenuShareAppMessage({
				title: obj.title, // 分享标题
				desc: obj.desc, // 分享描述
				link: encodeURI(obj.link), // 分享链接
				imgUrl: obj.imgUrl, // 分享图标
				success: function() {
					that.groupLeaderShareActivityLog();
				},
				cancel: function() {
					// console.log('分享到朋友失败')
				}
			});

		}
	}
});

function refreshData() {
	setTimeout(function() {

	}, 0);
	return 1;
}

function copyText(text, callback) { //复制到粘贴板
	var tag = document.createElement('input');
	tag.setAttribute('id', 'cp_hgz_input');
	tag.value = text;
	document.getElementsByTagName('body')[0].appendChild(tag);
	document.getElementById('cp_hgz_input').select();
	document.execCommand('copy');
	document.getElementById('cp_hgz_input').remove();
	if(callback) {
		callback(text)
	}
}

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}