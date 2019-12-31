var scrollTop = "";

/*var isWxBrowser = true;
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	isWxBrowser = true;
} else {
	isWxBrowser = false;
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
		stateZhifu: false,
		mmsHost: mmsHost,
		jsonData: null,
		totalNo: "",
	},
	filters: {
		//状态过滤

	},
	mounted: function() {
		this.$nextTick(function() {
			this.getbasicData();
			//this.setCookie('token', '1547090364937fe745b3dee44ea0a276')
		});

	},
	methods: {
		getData: function() {
			var that = this;
			var params = {
				body: {
					totalNo: this.totalNo
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/group/getGroupOrdersDetail", params).then(function(res) {
				that.jsonData = res.data;
			}, function(res) {})

		},
		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;
		},
		serviceJump: function(orderNo, commitPrice, comId, counts) {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = mmsHostN + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wxGroup#/service/" + orderNo + "/" + commitPrice + "/" + comId + "/" + counts;
			} else {
				var url = mmsHostN + "/mms/html5/personal/service.htm?pageFrom=group&&orderNo=" + orderNo + "&commodityPrice=" + commitPrice + "&skuId=" + comId + "&commodityNum=" + counts;
				showActivity(url, "申请售后");
			}
		},
		writeAddress: function(safeguardNo, orderNo) {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = mmsHostN + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wxGroup#/writeAddress/" + safeguardNo + "/" + orderNo;
			} else {
				var url = mmsHostN + '/mms/html5/personal/recycleAddress.htm?childOrderNo=' + orderNo + '&safeguardNo=' + safeguardNo;
				showActivity(url, "填写地址");
			}
		},
		receivingProduct: function(safeguardNo, status) { //售后确认收货
			var that = this;
			lxjTip.confirm('您确定已经收到货了吗？', {
				skin: 'demo3',
				yes: function(index) {

					that.confirmOrderFlag(status, safeguardNo);

					lxjTip.close();
				}
			});
		},
		confirmServise: function(safeguardNo, status) { //售后确认维修
			var that = this;
			lxjTip.confirm('您确定已维修了吗？', {
				skin: 'demo3',
				yes: function(index) {
					that.confirmOrderFlag(status, safeguardNo);
					lxjTip.close();
				}
			});
		},
		confirmOrderFlag: function(processStatus, safeguardNo) { //process:14确认收货，15确认已维修
			var that = this;
			var params = {
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				},
				body: {
					processStatus: processStatus,
					safeguardNo: safeguardNo
				}
			};
			var paramsStr = encodeURIComponent(JSON.stringify(params));
			var httpURL = this.mmsHost + "/mms/servlet/commitConfirmGetGoods?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(res) {
				if(res.body.result == 0) {
					that.getData();
				}
			});
		},

		aminateFun: function() {
			var eleG = document.getElementById("chairmanMoreInfo");
			eleG.style.maxHeight = "0";
		},
		getbasicData: function() {
			if(!this.isWxBrowser) { //app环境
				this.setCookie('token', this.GetURLParameter("token"));
				setTitle("订单详情")
			}
			this.totalNo = this.GetURLParameter("orderNo");
			this.getData()

			var that = this;
			if(isWxBrowser) {
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
		vue.getbasicData();
	}, 0);
	return 1;
}