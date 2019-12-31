var token = GetURLParameter('token') ? GetURLParameter("token") : '_test';
var activityId = GetURLParameter('activityId');
//var mmsHost = 'https://tt.hori-gz.com:8443';
var vue = new Vue({
	el: '.checkProduct',
	data: {
		checkProductAttr: [],
		allChooseCheck: false,
		sendProductAttr: [],
		allChooseSend: false,
		activeFlag: true,
		searchProductInput: '',
		registerPhone: '',
		activityId: activityId,
		checkProductAttrState: false,
		sendProductAttrState: false,
	},
	methods: {
		checkProductTab: function(value) {
			if(this.activeFlag) {
				this.activeFlag = false;
			} else {
				this.activeFlag = true;
			}
			if(value == 0) {
				this.sendProductAjax('');
			}

		},
		checkProductAjax: function() {
			var params = {
				body: {
					//registerPhone: this.registerPhone,
					activityId: this.activityId,
					pageNum: 1,
					pageSize: 10000
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/getGroupLeaderExamina?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				var checkAttr = res.body.list;
				for(var i = 0; i < checkAttr.length; i++) {
					checkAttr[i].clickStatus = false;
				}
				this.checkProductAttr = checkAttr;
				//this.getcheckProductAttrState();
			}, function(res) {});
		},
		conformCheckProductAjax: function() {
			var ids = this.checkIds();
			if(ids.length == 0) {
				lxjTip.msg("请选择验货商品");
				return false;
			}
			var params = {
				body: {
					//	registerPhone: this.registerPhone,
					ids: this.checkIds(),
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/groupLeaderConfirmExamina?str=" + paramsStr;
			console.log(httpURL);
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				if(res.body.result == 0) {
					lxjTip.msg("验货成功!");
					this.checkProductAjax();
				}else{
					lxjTip.msg(reason);
				}
			}, function(res) {});
		},
		chooseCheckClick: function(index) {
			if(this.checkProductAttr[index].clickStatus) {
				this.checkProductAttr[index].clickStatus = false;
			} else {
				this.checkProductAttr[index].clickStatus = true;
			}
			var num = 0;
			var numClick = 0;
			for(var i = 0; i < this.checkProductAttr.length; i++) {
				if(this.checkProductAttr[i].status == 0) {
					num++;
				}
				if(this.checkProductAttr[i].clickStatus && this.checkProductAttr[i].status == 0) {
					numClick++;
				}
			}
			if(num == numClick) {
				this.allChooseCheck = true;
			} else {
				this.allChooseCheck = false;
			}
			console.log(this.checkIds());

		},
		allChooseCheckClick: function() {
			if(!this.allChooseCheck) {
				for(var i = 0; i < this.checkProductAttr.length; i++) {
					this.checkProductAttr[i].clickStatus = true;
				}
				this.allChooseCheck = true;
			} else {
				for(var i = 0; i < this.checkProductAttr.length; i++) {
					this.checkProductAttr[i].clickStatus = false;
				}
				this.allChooseCheck = false;
			}
			console.log(this.checkIds());

		},
		checkIds: function() {
			var ids = [];
			for(var i = 0; i < this.checkProductAttr.length; i++) {
				if(this.checkProductAttr[i].clickStatus && this.checkProductAttr[i].status == 0) {
					ids.push(this.checkProductAttr[i].id);
				}
			}
			return ids.toString();
		},
		sendProductAjax: function(value) {
			var params = {
				body: {
					//	registerPhone: this.registerPhone,
					activityId: this.activityId,
					searchPhone: value,
					pageNum: 1,
					pageSize: 10000
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/getGroupLeaderDispatch?str=" + paramsStr;

			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				var sendAttr = res.body.list;
				for(var i = 0; i < sendAttr.length; i++) {
					sendAttr[i].clickStatus = false;
				}
				this.sendProductAttr = sendAttr;
				this.allChooseSend = false;
				//this.getsendProductAttr();
			}, function(res) {});
		},
		conformSendProductAjax: function() {
			var ids = this.sendIds();
			if(ids.length == 0) {
				lxjTip.msg("请选择派货商品");
				return false;
			}
			var params = {
				body: {
					//registerPhone: this.registerPhone,
					ids: this.sendIds()
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime(),
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/groupLeaderConfirmDispatch?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				console.log(res);
				if(res.body.result == 0) {
					lxjTip.msg("确认成功");
					this.searchProduct();
				}
			}, function(res) {});
		},
		chooseSendClick: function(index) {
			if(this.sendProductAttr[index].clickStatus) {
				this.sendProductAttr[index].clickStatus = false;
			} else {
				this.sendProductAttr[index].clickStatus = true;
			}
			var num = 0;
			var numClick = 0;
			for(var i = 0; i < this.sendProductAttr.length; i++) {
				if(this.sendProductAttr[i].status == 0) {
					num++;
				}
				if(this.sendProductAttr[i].clickStatus && this.sendProductAttr[i].status == 0) {
					numClick++;
				}
			}
			if(num == numClick) {
				this.allChooseSend = true;
			} else {
				this.allChooseSend = false;
			}
			console.log(this.sendIds());

		},
		allChooseSendClick: function() {
			if(!this.allChooseSend) {
				for(var i = 0; i < this.sendProductAttr.length; i++) {
					this.sendProductAttr[i].clickStatus = true;
				}
				this.allChooseSend = true;
			} else {
				for(var i = 0; i < this.sendProductAttr.length; i++) {
					this.sendProductAttr[i].clickStatus = false;
				}
				this.allChooseSend = false;
			}
		},
		getcheckProductAttrState: function() {
			var indexN = 0;
			if(vue.checkProductAttr.length > 0) {
				for(var i = 0; i < vue.checkProductAttr.length; i++) {

					if(vue.checkProductAttr[i].status != 1) {
						vue.checkProductAttrState = true;
						break;
					} else {
						indexN++;
					}
				}
				if(indexN == vue.checkProductAttr.length) {
					vue.checkProductAttrState = false;
				}
			}

		},
		getsendProductAttr: function() {
			var indexN = 0;
			if(vue.sendProductAttr.length > 0) {
				for(var i = 0; i < vue.sendProductAttr.length; i++) {
					if(vue.sendProductAttr[i].status != 1) {
						vue.sendProductAttrState = true;
						break;
					}else {
						indexN++;
					}
				}
				if(indexN == vue.sendProductAttr.length) {
					vue.sendProductAttrState = false;
				}
			}
		},
		sendIds: function() {
			var ids = [];
			for(var i = 0; i < this.sendProductAttr.length; i++) {
				if(this.sendProductAttr[i].clickStatus && this.sendProductAttr[i].status == 0) {
					ids.push(this.sendProductAttr[i].id);
				}
			}
			return ids.toString();
		},
		searchProduct: function() {			
			document.getElementById("checkProductSearch").blur();
			var mobile1 = vue.searchProductInput;
			if(mobile1.length == 0) {
				this.sendProductAjax("");
				return false;
			}
			if(!(/^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/.test(mobile1))) {
				lxjTip.msg("*请您输入正确的11位手机号码")
				return false;
			}						
			this.sendProductAjax(this.searchProductInput);
		}
	},
	mounted: function() {
		if(!isWxBrowser) { //app环境
			this.setCookie('token', this.GetURLParameter("token"));
			setTitle("查看货单");
			nativeMethod("showClosebutton", null);
		}
		this.checkProductAjax();
		this.sendProductAjax('');
		var that = this;
		if(isWxBrowser) {
			this.wxJsdkConfig();
		}
	},
	watch: {
		checkProductAttr: function(newVal, oldVal) {
			this.getcheckProductAttrState()
		},
		sendProductAttr: function(newVal, oldVal) {
			this.getsendProductAttr()
		}

	}
});

function refreshData() {
	setTimeout(function() {

	}, 0);
	return 1;
}

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}