var scrollTop = "";



/*mmsHost = "https://tt.hori-gz.com:8443";
host = mmsHost;
commodityId = "1540187623912ff3ae4f815742bcbb5a";
organizationSeq = "4400100183";
token = "_15444060121896d708361a0d43a68164";*/

var vue = new Vue({
	el: '#app',
	data: {
		isWxBrowser: isWxBrowser,
		mmsHost: mmsHost,
		saveOrderData: null,
		pName: '',
		pPhone: '',
		commodityList: null,
		sellerMsgList: null,
		jsonDataleader: null,
		groupLeaderId: "",
		activityId: "",
		totalPrice: 0,
		appId:"",
		openid:"",
		inputWxFocus:false,
	},
	mounted: function() {
		this.$nextTick(function() {
			this.getbasicData();
		});

	},
	methods: {
		submitData: function() {
			if(!this.pName.replace(/(^\s*)|(\s*$)/g, "")){
				lxjTip.msg('亲！提货人不可为空');
				return false;
			}
			var mobile1=this.pPhone;
			if(!(/^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/.test(mobile1))) {

				lxjTip.msg('亲！请您输入正确的11位手机号码');
				return false;
			}
			var that = this;
			var params = {
				body: {
					wxName: this.getCookie("nickname"),
					wxLog: this.getCookie("headimgurl"),
					groupLeaderId: this.groupLeaderId,
					activityId: this.activityId,
					receiverName: this.pName,
					receiverMobile: this.pPhone,
					totalPrice: this.totalPrice,
					orderSource: 2,
					commodityList: this.commodityList,
					sellerMsgList: this.sellerMsgList,
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = this.mmsHost + "/mms/group/saveGroupOrders?str=" + paramsStr;
			/*this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {*/
			axios.post(this.mmsHost + "/mms/group/saveGroupOrders", params).then(function(res) {
				console.log(res);
				//that.couponList = res.data.list ? res.data.list : [];
				if (res.data.result=="0") {
					that.getPayInfo(res.data.totalNo);
				}else{
					lxjTip.msg(res.data.reason,{time:5000})
					setTimeout(function(){
						history.go(-1)
					},3000)
				}
				
			}, function(res) {})
		},

		//开始生成预付款订单信息
		getPayInfo: function(orderN) {
			var that = this;
			var params = {
				body: {
					pay_method: "5",
					orderNo: orderN,
					appid: this.appId,
					channel_flag: "3",
					openid: this.openid,
					//openid: this.$store.state.openid,
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/servlet/getWxPrepayidRequest", params).then(function(res) {
				var sd = res.data;
				//lxjTip.msg(res.data);
				//that.onBridgeReady(sd.obj.appid, sd.obj.timestamp, sd.obj.noncestr, sd.obj.package, sd.obj.sign, orderN)
				wx.chooseWXPay({
					timestamp: sd.obj.timestamp,
					nonceStr: sd.obj.noncestr,
					package: sd.obj.package,
					signType: "MD5",
					paySign: sd.obj.sign,
					success: function(res) {
						//var msgee=JSON.stringify(res)
						that.getWxPayOrderStatus(orderN, that.appId)
					},
					cancel: function(res) {
						//var msgee=JSON.stringify(res)
						//that.getWxPayOrderStatus(orderN, that.appId)
					},
					fail: function(res) {
						var msgee=JSON.stringify(res)
						lxjTip.alert(msgee)
					}
				});
				//that.OrderFreightdata = res.data;
				/*for (let i=0;i<res.data.commoditySku.length;i++) {
					that.skuSelectList.push('0000')
				}*/
			}, function(res) {})
		},

		//获取支付结果
		getWxPayOrderStatus: function(orderN, appid) {
			var that = this;
			var params = {
				body: {
					orderNo: orderN,
					pay_method: "5",
					channel_flag: "3",
					appid: appid,
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/servlet/getWxPayOrderStatus", params).then(function(res) {
					if(res.data.result == 0) {
						if(res.data.obj.trade_state == 'SUCCESS') {
							lxjTip.msg('支付成功');
							
							setTimeout(function(){
								//window.location.replace("../../groupon/member/orderDetail.htm?zhifu=success&orderNo="+orderN)								
								//window.location.href="../../groupon/member/orderDetail.htm?zhifu=success&orderNo="+orderN;
								//window.location.href="orderDetail.htm?zhifu=success&orderNo="+orderN;
								window.location.replace("orderDetail.htm?zhifu=success&orderNo="+orderN)
							},500)
														
						} else {
							lxjTip.msg('支付失败，请稍后到订单中心查看支付结果');
						}
					} else {
						lxjTip.msg('支付失败，请稍后到订单中心查看支付结果');
						
					}
				},
				function(res) {
					lxjTip.msg("网络失败")
				})
		},
		gettotailNum: function(item) {
			var num = 0;
			for(var i = 0; i < item.length; i++) {
				num = num + item[i].num;
			}
			return num;
		},
		gettotailPrice: function(item, index) {
			var num = 0;
			for(var i = 0; i < item.length; i++) {
				num = num + item[i].num * item[i].price * 100;
			}
			return String(parseFloat(num / 100).toFixed(2)).split('.')[index];
		},
		getsubmitData: function() {
			var list = this.saveOrderData;
			var list1 = [];
			var list2 = [];
			for(var i = 0; i < list.length; i++) {
				list1.push({
					sellerId: list[i].sellerId,
					msg: ''
				})
				for(var j = 0; j < list[i].list.length; j++) {
					list2.push({
						commodityId: list[i].list[j].commodityId,
						count: list[i].list[j].num
					})
				}
			}
			this.sellerMsgList = list1;
			this.commodityList = list2;
		},

		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;

		},
		inputWxFocusFun: function(i) {
			this.inputWxFocus=false;
			if (i==1) {
				this.pName=this.pName.replace(/(^\s*)|(\s*$)/g, "");
			}
		},
		memberNameFocusFun: function() {
			window.event.cancelBubble = true;
			document.getElementById("memberName").focus();
		},
		memberPhoneFocusFun: function() {
			window.event.cancelBubble = true;
			document.getElementById("memberPhone").focus();
		},
		aminateFun: function() {
			var eleG = document.getElementById("chairmanMoreInfo");
			eleG.style.maxHeight = "0";
		},
		goConfirmOrder: function() {
			window.event.cancelBubble = true;
			var urlT=window.location.href.indexOf("tt.hori-gz")>=0?"http://tt.hori-gz.com/mms/html5/groupon/member/orderDetail.htm":"https://mms.hori-gz.com/mms/html5/groupon/member/orderDetail.htm";
			window.open(urlT);
		},

		getbasicData: function() {
			this.pName = this.getCookie("nickname") ? this.getCookie("nickname") : '';
			this.pPhone = this.getCookie("lxjAccount") ? this.getCookie("lxjAccount") : '';
			
			this.appId = this.getCookie("appid") ? this.getCookie("appid") : '';
			this.openid = this.getCookie("openid") ? this.getCookie("openid") : '';
			

			this.saveOrderData = JSON.parse(sessionStorage.getItem("saveOrderData"));
			this.getsubmitData();
			this.jsonDataleader = JSON.parse(sessionStorage.getItem("jsonDataleader"));
			this.groupLeaderId = this.jsonDataleader.groupLeaderId;
			this.activityId = this.jsonDataleader.activityId;
			this.totalPrice = this.jsonDataleader.totailPrice;

			var that = this;
			if(isWxBrowser) {
				this.wxJsdkConfig(["chooseWXPay"]);
			}
		}
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